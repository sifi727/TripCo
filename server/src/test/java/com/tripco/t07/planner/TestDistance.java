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
import org.unitils.reflectionassert.ReflectionAssert;

import static org.junit.Assert.*;

/*
  This class contains tests for the Distance class.
 */
@RunWith(JUnit4.class)
public class TestDistance {

  Distance expectedDistance;
  Gson gson;

  double delta;
  int version;
  Integer dist;
  Place origin;
  Place destination;
  String type;
  String units;

  // Setup to be done before every test in TestDistance
  @Before
  public void initialize() {

    delta = 0.1;
    gson = new Gson();
    type = "distance";
    units = "miles";
    version = 4;

    destination = new Place();
    destination.latitude = 39.7392;
    destination.longitude = -104.9903;
    destination.name = "Denver";

    origin = new Place();
    origin.latitude = 40.01499;
    origin.longitude = -105.27055;
    origin.name = "Boulder";

    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"miles\",\"distance\": 0}";

    expectedDistance = gson.fromJson(distanceRequestJson, Distance.class);
  }

  @Test
  public void testDistanceNoDistance() {
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"miles\"}";

    expectedDistance = gson.fromJson(distanceRequestJson, Distance.class);
    expectedDistance.calculateTotalDistance();

    // create a new distance object directly
    Distance distance = new Distance(origin, destination, null, units, -1);
    distance.calculateTotalDistance();

    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);
  }

  @Test
  public void testDistanceNoJson() {
    // create a new distance object directly
    Distance distance = new Distance(origin, destination, null, units, -1);
    distance.calculateTotalDistance();
    expectedDistance.calculateTotalDistance();

    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);
  }

  @Test
  public void testDistanceNoJsonCustomRadius() {
    // create a new distance object directly
    Distance distance = new Distance(origin, destination, "accurate miles", "user defined",
        3958.7613);
    distance.calculateTotalDistance();

    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"user defined\",\"unitName\": \"accurate miles\",\"unitRadius\": 3958.7613,\"distance\": 0}";

    expectedDistance = gson.fromJson(distanceRequestJson, Distance.class);
    expectedDistance.calculateTotalDistance();

    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestIncorrectUnits() {
    Integer expectedInt = new Integer(0);
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"parsec\",\"distance\": 0}";

    // initialize distance object with json data
    Distance distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestKilometers() {
    Integer expectedInt = new Integer(13432);
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"kilometers\",\"distance\": 0}";

    // initialize distance object with json data
    Distance distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestMiles() {
    Integer expectedInt = new Integer(8347);
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"miles\",\"distance\": 0}";

    // initialize distance object with json data
    Distance distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestNauticalMiles() {
    Integer expectedInt = new Integer(7252);
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"nautical miles\",\"distance\": 0}";

    // initialize distance object with json data
    Distance distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonIncorrectUnits() {
    Integer expectedInt = new Integer(0);
    Distance distance = new Distance(origin, destination, null, "parsec", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonKilometers() {
    Integer expectedInt = new Integer(39);
    Distance distance = new Distance(origin, destination, null, "kilometers", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonKilometersSwitchInput() {
    Integer expectedInt = new Integer(39);
    Distance distance = new Distance(destination, origin, null, "kilometers", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonMiles() {
    Integer expectedInt = new Integer(24);
    Distance distance = new Distance(origin, destination, null, "miles", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonNauticalMiles() {
    Integer expectedInt = new Integer(21);
    Distance distance = new Distance(origin, destination, null, "nautical miles", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonUserDefinedUnits() {
    Integer expectedInt = new Integer(24);
    Distance distance = new Distance(origin, destination, "actual miles", "user defined",
        3958.7613);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }
}
