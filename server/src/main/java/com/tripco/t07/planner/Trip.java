package com.tripco.t07.planner;

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
  public int version;

  // Constants
  public static final String SVG_BACKGROUND_FILE_PATH = "/World_map_with_nations.svg";
  // Map image size (in points)
  public static final double SVG_MAP_HEIGHT = 512;
  public static final double SVG_MAP_WIDTH = 1024;

  //Map borders lat and long
  //These values came from here https://commons.wikimedia.org/wiki/File:USA_Colorado_location_map.svg
  public static final double SVG_MAP_MAX_LATITUDE = 90;
  public static final double SVG_MAP_MAX_LONGITUDE = 180;
  public static final double SVG_MAP_MIN_LATITUDE = -90;
  public static final double SVG_MAP_MIN_LONGITUDE = -180;

  //SVG path style
  public static final String SVG_MAP_PATH_LINE_STYLE = "style=\"fill:none; fill-rule:evenodd;stroke:green;stroke-width:3.62829995;stroke-linejoin:round;stroke-miterlimit:3.8636899\"";


  /**
   * The top level method that does planning. At this point it just adds the map and distances for
   * the places in order. It might need to reorder the places in the future.
   */
  public void plan() {

    if(options ==null)
    {
      options = new Option();
      options.units="miles";
    }
    if(title==null)
    {
      title="";
    }



    this.places=optimizePlaces();
    this.distances = calculateLegDistances();
    this.map = svg(SVG_BACKGROUND_FILE_PATH);

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

  /**
   * Calculates the x,y pixel coordinates for all the trip.places on the CObackground.svg This
   * method uses the trip.places longitude and latitude
   */
  private List<Point2D> calculalateSvgPoints() {
    List<Point2D> points = new ArrayList<Point2D>();
    for (Place place : places) {
      points.add(calculatePoint(place));
    }
    return points;

  }

  /**
   * Calculates the x,y pixel coordinates to be placed on the CObackground.svg. This method uses the
   * Place.java longitude and latitude
   */
  private Point2D calculatePoint(Place place) {
    //This some of this code copied or modified from this
    // source https://stackoverflow.com/questions/14329691/convert-latitude-longitude-point-to-a-pixels-x-y-on-mercator-projection

// Determine the map scale (points per degree)
    double xAxisScale = SVG_MAP_WIDTH / (SVG_MAP_MAX_LONGITUDE - SVG_MAP_MIN_LONGITUDE);
    double yAxisScale = SVG_MAP_HEIGHT / (SVG_MAP_MAX_LATITUDE - SVG_MAP_MIN_LATITUDE);

// position of map image for point
    double x = (place.longitude - SVG_MAP_MIN_LONGITUDE) * xAxisScale;
    double y = (SVG_MAP_MAX_LATITUDE - place.latitude) * yAxisScale;

    return new Point2D.Double(x, y);

  }
  private String OffMapToRightPath(Point2D previousPoint, Point2D currentPoint){
    double rightoffMap = currentPoint.getX()+ SVG_MAP_WIDTH;
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append(
        String.format(" L %f,%f",rightoffMap, currentPoint.getY()));
    stringBuilder
        .append(String.format(" M %f,%f",
            -previousPoint.getX(), previousPoint.getY()));
    stringBuilder.append(
        String.format(" L %f,%f", currentPoint.getX(), currentPoint.getY()));
    return stringBuilder.toString();
  }

  private String OffMapToLeftPath(Point2D previousPoint, Point2D currentPoint)
  {
    StringBuilder stringBuilder = new StringBuilder();

    double leftOfMapX= SVG_MAP_WIDTH -currentPoint.getX()-previousPoint.getX();
    double rightOfMapX=previousPoint.getX()+ SVG_MAP_WIDTH;
    stringBuilder.append(
        String.format(" L %f,%f",leftOfMapX, currentPoint.getY()));

    stringBuilder
        .append(String.format(" M %f,%f",
            rightOfMapX, previousPoint.getY()));
    stringBuilder.append(
        String.format(" L %f,%f", currentPoint.getX(), currentPoint.getY()));

    return stringBuilder.toString();

  }

  private boolean needToWrapAroundMap(Place p1, Place p2) {
    return (Math.abs(p1.longitude-p2.longitude)>180); //need to take in account going left and right off map
  }

  /**
   * Converts the trip.places to a SVG path string
   */
  private String placesToSvgPath() {

    places.add(places.get(0)); // add the start to the end.
    StringBuilder stringBuilder = new StringBuilder("d= ");

    for (int i=0; i<places.size(); i++) {
      Place currentPlace = places.get(i);
      Point2D point = calculatePoint(currentPlace);
      if(i==0)
      {
        stringBuilder
            .append(String.format("\"M %f,%f",
                point.getX(), point.getY()));
      }
      else if(needToWrapAroundMap(places.get(i),places.get(i-1))) //places greater than 180 degrees apart
      {
        Place prevPlace = places.get(i-1);
        Point2D prevPoint = calculatePoint(prevPlace);

        if(prevPlace.longitude>currentPlace.longitude) //go right off map
        {
          stringBuilder.append(OffMapToRightPath(prevPoint,point));
        }
        else { //go left off map
          stringBuilder.append(OffMapToLeftPath(prevPoint,point));
        }
      }
      else //closer than 180 degrees apart.
      {
        stringBuilder.append(
            String.format(" L %f,%f", point.getX(), point.getY()));
      }
    }
    places.remove(places.size()-1); //duplicate city for the end point
    stringBuilder.append(" \""); //closes path
    return stringBuilder.toString();

  }

  /**
   * Gets the SVG Path from trip.places. If trip.places is null or empty pass back a empty String
   */

  public String getSvgPath() {
    if (places == null || places.size() == 0) {
      return "";
    }
    StringBuilder stringBuilder = new StringBuilder("<path\n"); //start of path tag
    stringBuilder.append(placesToSvgPath() + "\n");
    stringBuilder.append(SVG_MAP_PATH_LINE_STYLE + "\n");  //sets the way the line will look
    stringBuilder.append(
        String.format("\tid=\"path-%s\"\n" + "\t\t\t/>\n", title)); //if no title set will be null
    return stringBuilder.toString();

  }

  /**
   * This adds the SVG path to the map. Inserts it before the second to last </g> Returns the map
   * with the path inserted. If trip.places is empty or null returns the map without a path.
   */

  private String addPathToSvgMap(String map, String path) {
    StringBuilder stringBuilder = new StringBuilder(map);
    //No places in trip so return a map.
    if (places == null || places.size() == 0) {
      return stringBuilder.toString();
    }
    int indexOfFirstClosingGroupTag = map.lastIndexOf("</svg>");  //find last svg tag tag
    stringBuilder.insert(indexOfFirstClosingGroupTag,
        "\n" + path + "\n"); //insert the path before group tag
    return stringBuilder.toString();

  }


  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @param fileLocation
   */
  private String svg(String fileLocation) {
    String coBackGroundSvg = "";
    try {


      coBackGroundSvg = addPathToSvgMap(getMapFromFile(fileLocation), getSvgPath());
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

  private  ArrayList<Place> optimizePlaces(){
    ArrayList<Place> updatedPlaces=places;
    if(options.optimization!=null && !options.optimization.equalsIgnoreCase("none")){
      ShortOptimization optimizedPlaces = new ShortOptimization(places,options.optimization);
      updatedPlaces = optimizedPlaces.nearestNeighborShortestPlaces();
    }
    return updatedPlaces;
  }
}