package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;

import java.awt.geom.Point2D;
import java.util.List;
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
  public static final double  CO_SVG_MAP_HEIGHT =  783.0824;


  /**
   * The top level method that does planning. At this point it just adds the map and distances for
   * the places in order. It might need to reorder the places in the future.
   */
  public void plan() {

    this.map = svg();
    this.distances = calculateLegDistances();

  }

  /**
   * Uses the path to access a file and then returns the value as string.
   */
  private String getMapFromFile(String path)
      throws IOException { //copied and modified from An_Introduction_to_Maven.pdf
    BufferedReader reader;

    reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(path)));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    while ((line = reader.readLine()) != null) {
      stringBuilder.append(line + "\n");
    }
    return stringBuilder.toString();
  }

  private List<Point2D> calculalateSvgPoints() {
    List<Point2D> points = new ArrayList<Point2D>();
    for (Place place : places) {
      points.add(calculatePoint(place));
    }
    return points;

  }

  private Point2D calculatePoint(Place place) {
    //This some of this code copied or modified from this
    // source https://stackoverflow.com/questions/14329691/convert-latitude-longitude-point-to-a-pixels-x-y-on-mercator-projection

    // Map image size (in points)
    double mapHeight = 783.0824;
    double mapWidth = 1066.6073;
    double maxLat = 41.2;
    double maxLong = -101.8;
    double minLat = 36.8;
    double minLong = -109.3;

// Determine the map scale (points per degree)
    double xScale = mapWidth / (maxLong - minLong); //width per long
    double yScale = mapHeight / (maxLat - minLat);

// position of map image for point
    double x = (place.longitude - minLong) * xScale;
    double y = (maxLat - place.latitude) * yScale;

    return new Point2D.Double(x, y);

  }

  private String pointsToSvgPath() {
    List<Point2D> points = calculalateSvgPoints();
    boolean createdMarker = false;

    StringBuilder stringBuilder = new StringBuilder("d= ");

    for (Point2D point : points) {
      if (!createdMarker) {
        stringBuilder
            .append(String.format("\"M %f,%f", point.getX(), point.getY())); //start place for loop
        createdMarker = true;
      } else {
        stringBuilder.append(
            String.format(" L %f,%f", point.getX(), point.getY())); // line from previous place
      }

    }
    stringBuilder.append(" z\""); //closes loop
    return stringBuilder.toString();

  }

  private String lineStyle() {
    return "style=\"fill:none; fill-rule:evenodd;stroke:green;stroke-width:3.62829995;stroke-linejoin:round;stroke-miterlimit:3.8636899\"";
  }

  public String getSvgPath() {
    if (places.size() == 0) {
      return "";
    }
    String head = "<path\n";
    StringBuilder stringBuilder = new StringBuilder(head);
    stringBuilder.append(pointsToSvgPath() + "\n");
    stringBuilder.append(lineStyle() + "\n");
    stringBuilder.append(String.format("\tid=\"path-%s\"\n" + "\t\t\t/>\n", title));

    //    + "\t\t\t<g/>",title));
    return stringBuilder.toString();

  }

  private String addPathToSvgMap(String map, String path) {
    StringBuilder stringBuilder = new StringBuilder(map);
    if (places.size() == 0) {
      return stringBuilder.toString();
    }
    int indexOfFirstClosingGroupTag = map.indexOf("</g>");
    stringBuilder.insert(indexOfFirstClosingGroupTag - 1, "\n" + path + "\n");
    return stringBuilder.toString();

  }


  /**
   * Returns an SVG containing the background and the legs of the trip.
   */
  private String svg() {
    String coBackGroundSvg = "";
    try {

      coBackGroundSvg = addPathToSvgMap(getMapFromFile(CO_BACKGROUND_FILE_PATH), getSvgPath());
    } catch (Exception e) {
      return "";
    }
    return coBackGroundSvg;

  }

  /**
   * Returns the distances between consecutive places, including the return to the starting point to
   * make a round trip.
   */

  private int legDistance(Place origin, Place destination) {
    Distance distance = null;
    if (options.units.equals("user defined")) {
      distance = new Distance(origin, destination, options.unitName, options.units,
          options.unitRadius);
    } else {
      distance = new Distance(origin, destination, null, options.units, -1);
    }
    distance.calculateTotalDistance();
    return distance.distance;
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