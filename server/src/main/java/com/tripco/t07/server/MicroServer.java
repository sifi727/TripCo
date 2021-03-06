package com.tripco.t07.server;

import com.tripco.t07.planner.Calculate;
import com.tripco.t07.planner.Plan;

import spark.Request;
import spark.Response;
import spark.Spark;

import java.net.InetAddress;
import java.net.UnknownHostException;

import static spark.Spark.*;


/** A simple micro-server for the web.  Just what we need, nothing more.
 *
 */
public class MicroServer {

  private int    port;
  private String name;
  private String path = "/public/";

  /** Creates a micro-server to load static files and provide REST APIs.
   *
   * @param port Which port to start the server on
   * @param name Name of the server
   */
  MicroServer(int port, String name) {
    this.port = port;
    this.name = name;

    port(port);

    // serve the static files: index.html and bundle.js
    Spark.staticFileLocation(this.path);
    get("/", (req, res) -> {res.redirect("index.html"); return null;});

    // register all micro-services and the function that services them.
    // start with HTTP GET
    get("/about", this::about);
    get("/echo", this::echo);
    get("/hello/:name", this::hello);
    get("/team", this::team);
    get("/config", this::config);
    // client is sending data, so a HTTP POST is used instead of a GET
    post("/plan", this::plan);
    post("/distance",this::distance);
    post("/search",this::search);


    System.out.println("\n\nServer running on port: " + this.port + "\n\n");
  }

  /** A REST API that describes the server.
   *
   * @param request
   * @param response
   * @return
   */
  private String about(Request request, Response response) {

    response.type("text/html");
    response.header("Access-Control-Allow-Origin", "*");

    return "<html><head></head><body><h1>"+name+" Micro-server on port "+port+"</h1></body></html>";
  }

  /** A REST API that returns the current server configuration
   *
   * @param request
   * @param response
   * @return
   */
  private String config(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return Config.getConfig();
  }

  /** A REST API that echos the client request.
   *
   * @param request
   * @param response
   * @return
   */
  private String echo(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return HTTP.echoRequest(request);
  }

  /** A REST API demonstrating the use of a parameter.
   *
   * @param request
   * @param response
   * @return
   */
  private String hello(Request request, Response response) {

    response.type("text/html");
    response.header("Access-Control-Allow-Origin", "*");

    return Greeting.html(request.params(":name"));
  }


  /** A REST API to support trip planning.
   *
   * @param request
   * @param response
   * @return
   */
  private String plan(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    Plan plan = new Plan(request);
    String trip = plan.getTrip();

    return trip;
  }

  /** A REST API that returns the team information associated with the server.
   *
   * @param request
   * @param response
   * @return
   */
  private String team(Request request, Response response) {

    response.type("text/plain");
    response.header("Access-Control-Allow-Origin", "*");

    return name;
  }

    /** A REST API that receives a TFFI and returns a TFFI with populated distance variable
     *
     * @param request
     * @param response
     * @return
     */
  private String distance(Request request, Response response){

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    Calculate calculate = new Calculate(request);
    String distance = calculate.getDistance();
    return distance;

  }

  /** A REST API to implement database search.
   *
   * @param request
   * @param response
   * @return
   */
  private String search(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    Search search = new Search(request);
    search.contactDB();

    return search.getSearch();
  }
}