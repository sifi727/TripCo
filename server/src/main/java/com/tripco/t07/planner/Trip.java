package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import spark.Request;
import java.util.ArrayList;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 */
public class Trip {

  // The variables in this class should reflect TFFI.
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  // Constants
  public static final String CO_BACKGROUND_FILE_PATH = "/CObackground.svg";


  /**
   * The top level method that does planning. At this point it just adds the map and distances for
   * the places in order. It might need to reorder the places in the future.
   */
  public void plan() {

    this.map = svg();
    this.distances = legDistances();

  }

  /**
   * Uses the path to access a file and then returns the value as string.
   */
  private String getStringFromFile(String path)
      throws IOException { //copied and modified from An_Introduction_to_Maven.pdf
    BufferedReader reader;

    reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(path)));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    while ((line = reader.readLine()) != null) {
      stringBuilder.append(line);
    }
    return stringBuilder.toString();
  }


  /**
   * Returns an SVG containing the background and the legs of the trip.
   */
  private String svg() {
    String coBackGroundSvg = "";
    try {

      coBackGroundSvg = getStringFromFile(CO_BACKGROUND_FILE_PATH);
    } catch (IOException e) {
      return "";
    }
    return coBackGroundSvg;

  }

  /**
   * Returns the distances between consecutive places, including the return to the starting point to
   * make a round trip.
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();

    // hardcoded example
    dist.add(12);
    dist.add(23);
    dist.add(34);
    dist.add(45);
    dist.add(65);
    dist.add(19);

    return dist;
  }

}