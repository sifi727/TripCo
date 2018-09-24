package com.tripco.t07.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {

  Trip trip;

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
    String placesJson = " {\"options\" : {\n" +
        "\"units\":\"miles\"\n" +
        "},\"places\"    : [\n" +
        "  {\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903},\n"
        +
        "  {\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055},\n"
        +
        "  {\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.58258, \"longitude\":-105.084419}\n"
        +
        "  ]}";

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
  public void testNoPlacesMap() {
    trip.places = new ArrayList<>();
    trip.plan();
    BufferedReader reader;
    reader= new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    try {
      while ((line = reader.readLine()) != null) {
        stringBuilder.append(line+"\n");
      }
    }
    catch (Exception e)
    {
      fail();
    }
    assertEquals(trip.map,stringBuilder.toString());
  }

  @Test public void testWithPlacesNoTitleMap(){
    trip.places = new ArrayList<>();
    String placesJson = " {\"options\" : {\n" +
        "\"units\":\"miles\"\n" +
        "},\"places\"    : [\n" +
        "  {\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903},\n"
        +
        "  {\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055},\n"
        +
        "  {\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.58258, \"longitude\":-105.084419}\n"
        +
        "  ]}";

    Gson gson = new Gson();
    trip = gson.fromJson(placesJson, Trip.class);
    BufferedReader reader;
    reader= new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    try {
      while ((line = reader.readLine()) != null) {
        stringBuilder.append(line+"\n");
      }
    }
    catch (Exception e)
    {
      fail();
    }
    int indexOfClosingSvgTag =  stringBuilder.indexOf("</g>");
    stringBuilder.insert(indexOfClosingSvgTag-1,"\n"+"<path\n"
        + "d= \"M 612.900997,259.983357 L 573.045438,210.900108 L 599.515929,109.884258 z\"\n"
        + "style=\"fill:none; fill-rule:evenodd;stroke:green;stroke-width:3.62829995;stroke-linejoin:round;stroke-miterlimit:3.8636899\"\n"
        + "\tid=\"path-null\"\n"
        + "\t\t\t/>\n\n");
    trip.plan();

    assertEquals(stringBuilder.toString(),trip.map);


  }

}
