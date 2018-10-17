package com.tripco.t07.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.junit.Ignore;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {

  Trip trip;

  //Helper Class
  private String getJsonThreeCityWithMiles() {
    return " {\"options\" : {\n" +
        "\"units\":\"miles\" , \"optimization\": \"short\" \n" +
        "},\"places\"    : [\n" +
        "  {\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903},\n"
        +
        "  {\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055},\n"
        +
        "  {\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.58258, \"longitude\":-105.084419}\n"
        +
        "  ]}";
  }

  private String getJsonShortTripThreeCityWithMiles() {
    return " {\"options\" : {\n" +
            "\"units\":\"miles\"\n" +
            "},\"places\"    : [\n" +
            "  {\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903},\n"
            +
            "  {\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055},\n"
            +
            "  {\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.58258, \"longitude\":-105.084419}\n"
            +
            "  ]}";
  }
  private String getJsonMinVersionTwoTripTFFI ()
  {
    return ("{\n"
        + " \"type\" : \"trip\",\n"
        + " \"version\" : 2,\n"
        + " \"places\" : [\n"
        + "    {\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903}, \n"
        + "    {\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055}, \n"
        + "    {\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.58258, \"longitude\":-105.084419} \n"
        + "    ]\n"
        + "}");

  }

  private String getJsonFourStateBorderWithTitle() {
    return "{\n"
        + "  \"version\"   : 2,\n"
        + "  \"type\"      : \"trip\",\n"
        + "  \"title\"     : \"Shopping loop\",\n"
        + "    \"options\" : { \n"
        + "  \"units\"        : \"miles\"\n"
        + "},\n"
        + "  \"places\"    : [\n"
        + "  {\"id\":\"AZ-CO\", \"name\":\"B1\", \"latitude\":36.999, \"longitude\":-109.044},\n"
        + "  {\"id\":\"CO-KS\", \"name\":\"B2\", \"latitude\":36.993, \"longitude\":-102.041},\n"
        + "  {\"id\":\"CO-NE\", \"name\":\"B3\", \"latitude\":40.003, \"longitude\":-102.051},\n"
        + "   {\"id\":\"CO-UT\", \"name\":\"B4\", \"latitude\":41.000, \"longitude\":-109.044}\n"
        + "  ]\n"
        + "}";
  }

  private String getJsonFourStateCornerBorderWithCustomUnits() {
    return "{\n"
        + "\t\"type\": \"trip\",\n"
        + "\t\"version\": 2,\n"
        + "\t\"title\": \"Four Corners of CO State\",\n"
        + "\t\"options\": {\n"
        + "\t\t\"units\": \"user defined\",\n"
        + "\t\t\"unitName\": \"accurate miles\",\n"
        + "\t\t\"unitRadius\": 3958.7613\n"
        + "\t},\n"
        + "\t\"places\": [{\n"
        + "\t\t\t\"id\": \"AZ-CO\",\n"
        + "\t\t\t\"name\": \"B1\",\n"
        + "\t\t\t\"latitude\": 36.999,\n"
        + "\t\t\t\"longitude\": -109.044\n"
        + "\t\t},\n"
        + "\t\t{\n"
        + "\t\t\t\"id\": \"CO-KS\",\n"
        + "\t\t\t\"name\": \"B2\",\n"
        + "\t\t\t\"latitude\": 36.993,\n"
        + "\t\t\t\"longitude\": -102.041\n"
        + "\t\t},\n"
        + "\t\t{\n"
        + "\t\t\t\"id\": \"CO-WY\",\n"
        + "\t\t\t\"name\": \"B3\",\n"
        + "\t\t\t\"latitude\": 41,\n"
        + "\t\t\t\"longitude\": -102.041\n"
        + "\t\t},\n"
        + "\t\t{\n"
        + "\t\t\t\"id\": \"CO-UT\",\n"
        + "\t\t\t\"name\": \"B4\",\n"
        + "\t\t\t\"latitude\": 41.000,\n"
        + "\t\t\t\"longitude\": -109.044\n"
        + "\t\t}\n"
        + "\t]\n"
        + "}";
  }



  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }


  @Test
  public void testDistancesWithZeroPlaces() {
    trip.places = new ArrayList<>();
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    expectedDistances.add(0);
    assertEquals(expectedDistances, trip.distances);

  }


  @Test
  public void testDistancesWithPlaces() {
    trip.places = new ArrayList<>();
    String placesJson = getJsonThreeCityWithMiles();

    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 24, 40, 58);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }



  @Test
  public void testShortTripDistancesWithPlaces() {
    trip.places = new ArrayList<>();
    String placesJson = getJsonShortTripThreeCityWithMiles();

    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 24, 40, 58);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void testDistanceWithNullPlaces() {
    trip.places = null;
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    expectedDistances.add(0);
    assertEquals(expectedDistances, trip.distances);

  }

  @Test
  public void testDistanceWithMinTripTFFI () {
    String placesJson = getJsonMinVersionTwoTripTFFI();
    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    try {
      trip.plan();
    }
    catch (Exception e)
    {
      fail();
    }
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 24, 40, 58);
    assertEquals(2,trip.version);
    assertEquals(expectedDistances,trip.distances);
    assertEquals("miles",trip.options.units);

  }




  @Test
  public void testNoPlacesMap() {
    trip.places = new ArrayList<>();
    trip.plan();
    BufferedReader reader;
    reader = new BufferedReader(
        new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    try {
      while ((line = reader.readLine()) != null) {
        stringBuilder.append(line + "\n");
      }
    } catch (Exception e) {
      fail();
    }
    assertEquals(trip.map, stringBuilder.toString());
  }

  @Test
  public void testWithPlacesAndTitleAndCustomUnitsGetSvgPath() {
    trip.places = new ArrayList<>();
    String placesJson = getJsonFourStateCornerBorderWithCustomUnits();
    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    String svgPathActual = trip.getSvgPath();
    assertEquals("<path\n"
        + "d= \"M 36.406863,747.665719 L 1032.333652,748.733558 L 1032.333652,35.594655 L 36.406863,35.594655 z\"\n"
        + "style=\"fill:none; fill-rule:evenodd;stroke:green;stroke-width:3.62829995;stroke-linejoin:round;stroke-miterlimit:3.8636899\"\n"
        + "\tid=\"path-Four Corners of CO State\"\n"
        + "\t\t\t/>\n", svgPathActual);


  }

  @Test
  public void testWithPlacesAndTitleGetSvgPath() {
    trip.places = new ArrayList<>();
    String placesJson = getJsonFourStateBorderWithTitle();
    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    String svgPathActual = trip.getSvgPath();
    assertEquals("<path\n"
        + "d= \"M 36.406863,747.665719 L 1032.333652,748.733558 L 1030.911509,213.034007 L 36.406863,35.594655 z\"\n"
        + "style=\"fill:none; fill-rule:evenodd;stroke:green;stroke-width:3.62829995;stroke-linejoin:round;stroke-miterlimit:3.8636899\"\n"
        + "\tid=\"path-Shopping loop\"\n"
        + "\t\t\t/>\n", svgPathActual);


  }


  @Test
  public void testWithPlacesNoTitleMap() {
    trip.places = new ArrayList<>();
    String placesJson = getJsonThreeCityWithMiles();

    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    BufferedReader reader;
    reader = new BufferedReader(
        new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    try {
      while ((line = reader.readLine()) != null) {
        stringBuilder.append(line + "\n");
      }
    } catch (Exception e) {
      fail();
    }
    int indexOfClosingSvgTag = stringBuilder.indexOf("</g>");
    stringBuilder.insert(indexOfClosingSvgTag - 1, "\n" + "<path\n"
        + "d= \"M 612.900997,259.983357 L 573.045438,210.900108 L 599.515929,109.884258 z\"\n"
        + "style=\"fill:none; fill-rule:evenodd;stroke:green;stroke-width:3.62829995;stroke-linejoin:round;stroke-miterlimit:3.8636899\"\n"
        + "\tid=\"path-\"\n"
        + "\t\t\t/>\n\n");
    trip.plan();

    assertEquals(stringBuilder.toString(), trip.map);


  }

}
