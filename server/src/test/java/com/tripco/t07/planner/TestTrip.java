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
  public void testMap() {
    trip.places = new ArrayList<>();
    trip.plan();
    BufferedReader reader;
    assertEquals(trip.map,
        "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>");

    reader= new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

    StringBuilder stringBuilder = new StringBuilder();
    String line = "";
    try {
      while ((line = reader.readLine()) != null) {
        stringBuilder.append(line);
      }
    }
    catch (Exception e)
    {
      fail();
    }
    assertEquals(trip.map,stringBuilder.toString());
  }

}
