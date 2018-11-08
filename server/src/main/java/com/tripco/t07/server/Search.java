package com.tripco.t07.server;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.planner.Place;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;
import spark.Request;

public class Search {


    // db configuration information
    private static  String myDriver = "com.mysql.jdbc.Driver";
    private static  String myUrl = "jdbc:mysql://127.0.0.1:31407/cs314"; //to access from ssh/port forwarded machine use port 31407, see GitHub guide
    private static final String user="cs314-db";
    private static final String pass="eiK5liet1uej";
    // fill in SQL queries to count the number of records and to retrieve the data
    private static String search = "";
    // Arguments contain the username and password for the
    private static String countQuery ="";

    private SearchObject searchObject;

    public Search(Request request){

        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        Gson gson = new Gson();

        try {
            searchObject = gson.fromJson(requestBody, SearchObject.class);
            searchObject.places = new ArrayList<Place>();
            countQuery = searchObject.createCount(searchObject.match);
            String temp = searchObject.createSearch(searchObject.match);
            temp = searchObject.applyLimit(searchObject.limit, temp, searchObject);
            search = temp;

        } catch (Exception e) {

        }

    }


    public  void contactDB(){

        try {  //Send a search to the database, then process the results
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(search);


            ) {
                SearchObject.updatePlaces(searchObject.places, rsQuery);

            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }

        try {  //Send a search to the database, then process the results
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                Statement stQuery = conn.createStatement();
                ResultSet countResults = stQuery.executeQuery(countQuery);


            ) {
                SearchObject.updateFound(searchObject,countResults);

            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }



    }


    public String getSearch(){

        Gson gson = new Gson();
        return gson.toJson(searchObject);
    }
}
