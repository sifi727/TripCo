package com.tripco.t07.planner;

import java.awt.geom.Point2D;
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
  public ArrayList<Long> distances;
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
   * The top level method that does planning. At this point it just adds the map and distances for the places in order. It might need to reorder the places in the future.
   */
  public void plan() {

    if (options == null) {
      options = new Option();
      options.units = "miles";
    }
    if (title == null) {
      title = "";
    }

    this.places = optimizePlaces();
    this.distances = calculateLegDistances();
    if (options.map != null && options.map.toLowerCase().equals("kml")) {
      this.map = getKML();
    } else {
      this.map = svg(SVG_BACKGROUND_FILE_PATH);
    }
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
   * Calculates the x,y pixel coordinates to be placed on the CObackground.svg. This method uses the Place.java longitude and latitude
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

  private String OffMapToRightPath(Point2D previousPoint, Point2D currentPoint) {
    double rightoffMap = currentPoint.getX() + SVG_MAP_WIDTH;
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append(
        String.format(" L %f,%f", rightoffMap, currentPoint.getY()));
    stringBuilder
        .append(String.format(" M %f,%f",
            -previousPoint.getX(), previousPoint.getY()));
    stringBuilder.append(
        String.format(" L %f,%f", currentPoint.getX(), currentPoint.getY()));
    return stringBuilder.toString();
  }

  private String OffMapToLeftPath(Point2D previousPoint, Point2D currentPoint) {
    StringBuilder stringBuilder = new StringBuilder();

    double leftOfMapX = SVG_MAP_WIDTH - currentPoint.getX() - previousPoint.getX();
    double rightOfMapX = previousPoint.getX() + SVG_MAP_WIDTH;
    stringBuilder.append(
        String.format(" L %f,%f", leftOfMapX, currentPoint.getY()));

    stringBuilder
        .append(String.format(" M %f,%f",
            rightOfMapX, previousPoint.getY()));
    stringBuilder.append(
        String.format(" L %f,%f", currentPoint.getX(), currentPoint.getY()));

    return stringBuilder.toString();
  }

  private boolean needToWrapAroundMap(Place p1, Place p2) {
    return (Math.abs(p1.longitude - p2.longitude)
        > 180); //need to take in account going left and right off map
  }

  /**
   * Converts the trip.places to a SVG path string
   */
  private String placesToSvgPath() {

    places.add(places.get(0)); // add the start to the end.
    StringBuilder stringBuilder = new StringBuilder("d= ");

    for (int i = 0; i < places.size(); i++) {
      Place currentPlace = places.get(i);
      Point2D point = calculatePoint(currentPlace);
      if (i == 0) {
        stringBuilder
            .append(String.format("\"M %f,%f",
                point.getX(), point.getY()));
      } else if (needToWrapAroundMap(places.get(i),
          places.get(i - 1))) //places greater than 180 degrees apart
      {
        Place prevPlace = places.get(i - 1);
        Point2D prevPoint = calculatePoint(prevPlace);

        if (prevPlace.longitude > currentPlace.longitude) //go right off map
        {
          stringBuilder.append(OffMapToRightPath(prevPoint, point));
        } else { //go left off map
          stringBuilder.append(OffMapToLeftPath(prevPoint, point));
        }
      } else //closer than 180 degrees apart.
      {
        stringBuilder.append(
            String.format(" L %f,%f", point.getX(), point.getY()));
      }
    }
    places.remove(places.size() - 1); //duplicate city for the end point
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
   * This adds the SVG path to the map. Inserts it before the second to last </g> Returns the map with the path inserted. If trip.places is empty or null returns the map without a path.
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
   * Returns the distances between consecutive places, including the return to the starting point to make a round trip.
   */

  private long legDistance(Place origin, Place destination) {
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
   * Returns the distances between consecutive places, including the return to the starting point to make a round trip.
   */
  private ArrayList<Long> calculateLegDistances() {

    ArrayList<Long> dist = new ArrayList<Long>();
    if (places == null || places.size() == 0) {

      dist.add((long)0);
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
  
  private  ArrayList<Place> optimizePlaces() {
    ArrayList<Place> updatedPlaces = places;
    if(options.optimization != null && !options.optimization.equalsIgnoreCase("none")) {
      TripOptimization optimizedPlaces = new TripOptimization(places, options.optimization);
      updatedPlaces = optimizedPlaces.optimizedTripPlaces();
    }
    return updatedPlaces;
  }


  /**
   * Creates a KML formatted string with all the places in trip.places
   *
   * @return a string representation of the trip in KML format
   */
  private String getKML() {
    int count = 2;
    // initialize KML with heading and starting tags
    String KML = getKMLStartTag();
    // setup the style for the line
    KML += getKMLStyleTag();
    // draw the path through each location in places
    KML += getKMLPlacemarkTagWithLineString();
    // add a placemark for each location in places
    KML += getKMLPlacemarkForEachPlace();
    // end any open tags
    KML += indent(2) + "</Document>\n" +
        indent(0) + "</kml>";
    return KML;
  }


  /**
   * Get a KML tag with the correct LookAt tag to focus view when loaded
   *
   * @return String with the KML information
   */
  private String getKMLLookAtTag() {
      String KML = indent(6) + "<LookAt>\n" +
            indent(8) + "<longitude>" +  places.get(0).longitude + "</longitude>\n" +
            indent(8) + "<latitude>" + places.get(0).latitude + "</latitude>\n" +
            indent(8) + "<altitude>2357</altitude>\n" +
            indent(6) + "</LookAt>\n";
      return KML;
    }


  /**
   * Get a KML tag with the correct heading, Document, description
   *
   * @return String with the KML information
   */
  private String getKMLStartTag() {
    String KML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n" +
        indent(2) + "<Document>\n";

    // Add a title if one exists
    if (title != null && title.length() > 0) {
      KML += indent(4) + "<name>" + title + "</name>\n";
    }

    // description
    KML += indent(4) + "<description>Aggregated trip from all places</description>\n";

    return KML;
  }


  /**
   * Get a KML tag with the correct style tag and info
   *
   * @return String with the KML information
   */
  private String getKMLStyleTag() {
    String KML = indent(4) + "<Style id=\"blueLineRedPoly\">\n" +
        indent(6) + "<LineStyle>\n" +
        indent(8) + "<color>FFff0000</color>\n" +
        indent(8) + "<width>4</width>\n" +
        indent(6) + "</LineStyle>\n" +
        indent(6) + "<PolyStyle>\n" +
        indent(8) + "<color>FF0000ff</color>\n" +
        indent(6) + "</PolyStyle>\n" +
        indent(4) + "</Style>\n";
    return KML;
  }


  /**
   * Get a KML tag with the correct style tag and info
   *
   * @return String with the KML information
   */
  private String getKMLPlacemarkForEachPlace() {
    String KML = "";
    int count = 0;

    for (Place place : places) {
      KML += indent(4) + "<Placemark>\n" +
          indent(6) + "<name>" + place.name + "</name>\n" +
          indent(6) + "<description>" + place.id + "</description>\n";
      if(count == 0) {
        // the first tag focuses the camera
        KML += getKMLLookAtTag();
        count++;
      }
      KML += indent(6) + "<Point>\n" +
          indent(8) + "<coordinates>" + place.longitude + "," + place.latitude + ",2357</coordinates>\n" +
          indent(6) + "</Point>\n" +
          indent(4) + "</Placemark>\n";
    }
    return KML;
  }


  /**
   * Get a KML tag with the correct style tag and info
   *
   * @return String with the KML information
   */
  private String getKMLPlacemarkTagWithLineString() {
    String KML = indent(4) + "<Placemark>\n" +
        indent(6) + "<name>Path of the Trip</name>\n" +
        indent(6) + "<description>" + places.get(0).id + "</description>\n" +
        indent(6) + "<styleUrl>#blueLineRedPoly</styleUrl>\n" +
        indent(6) + "<LineString>\n" +
        indent(8) + "<extrude>1</extrude>\n" +
        indent(8) + "<altitudeMode>absolute</altitudeMode>\n" +
        indent(8) + "<coordinates>\n";

    // add the lat, long, and altitude - for each place in places
    for (Place place : places) {
      KML += indent(10) + place.longitude + "," + place.latitude + "," + "2357\n";
    }

    // add the start to make it a round trip
    KML += indent( 10) + places.get(0).longitude + "," + places.get(0).latitude + "," + "2357\n";

    // end open tags
    KML += indent(8) + "</coordinates>\n" +
        indent(6) + "</LineString>\n" +
        indent(4) + "</Placemark>\n";

    return KML;
  }


  /**
   * Get an indent string the length of count
   *
   * @param count => the length of spaces to return\
   * @return an indented string the length of count
   */
  private String indent(int count) {
    String retString = "";
    for (int i = 0; i < count; i++) {
      retString += " ";
    }
    return retString;
  }
}