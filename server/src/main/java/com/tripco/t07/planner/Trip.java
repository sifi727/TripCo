package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import spark.Request;
import java.util.ArrayList;

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

  /**
   * The top level method that does planning. At this point it just adds the map and distances for
   * the places in order. It might need to reorder the places in the future.
   */
  public void plan() {

    this.map = svg();
    this.distances = calculateLegDistances();

  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   */
  private String svg() {

    // hardcoded example
    return "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";
  }

  /**
   * Returns the distance between the two places.
   */

  private int legDistance(Place origin, Place destination) {

    Distance distance = new Distance(origin, destination, options.units);
    distance.calculateTotalDistance();
    return (distance.distance);

  }

  /**
   * Returns the distances between consecutive places, including the return to the starting point to
   * make a round trip.
   */
  private ArrayList<Integer> calculateLegDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();
    if (places == null || places.size() == 0) {

      dist.add(0);
      return dist;

    }
    int originIndex = 0;     //start at first city
    int destinationIndex = 1; //first destination

    while (destinationIndex < places.size()) {
      dist.add(legDistance(places.get(originIndex), places.get(destinationIndex)));
      originIndex++;
      destinationIndex++;
    }
    dist.add(
        legDistance(places.get(places.size() - 1), places.get(0))); //to make it a round trip back

    return dist;
  }


}