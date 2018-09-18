package com.tripco.t07.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
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
  public void testDistances() {
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 12, 23, 34, 45, 65, 19);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }

  @Test 
  public void testMap() {
    trip.places = new ArrayList<>();
    trip.plan();
    BufferedReader reader;

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
