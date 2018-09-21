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
  This class contains tests for the Distance class.
 */
@RunWith(JUnit4.class)
public class TestDistance {

  Distance distance;
  Gson gson;

  double delta;
  int dist;
  int version;
  Place origin;
  Place destination;
  String type;
  String units;

  // Setup to be done before every test in TestDistance
  @Before
  public void initialize() {
    gson = new Gson();

    delta = 0.1;
    dist = 0;
    version = 2;
    type = "distance";
    units = "miles";

    origin = new Place();
    origin.latitude = 40.01499;
    origin.longitude = -105.27055;
    origin.name = "Boulder";

    destination = new Place();
    destination.latitude = 39.7392;
    destination.longitude = -104.9903;
    destination.name = "Denver";
  }

  @Test
  public void testDistanceFromJson() {
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 2,"
        + "\"origin\": {\"latitude\": 40.01499,\"longitude\": -105.27055, \"name\":\"Boulder\"},"
        + "\"destination\": {\"latitude\": 39.7392,\"longitude\": -104.9903, \"name\":\"Denver\"},"
        + "\"units\": \"miles\",\"distance\": 0}";

    // initialize distance object with json data
    distance = gson.fromJson(distanceRequestJson, Distance.class);

    assertEquals(distance.distance, dist);
    assertEquals(distance.type, type);
    assertEquals(distance.units, units);
    assertEquals(distance.version, version);

    assertEquals(distance.destination.latitude, destination.latitude, delta);
    assertEquals(distance.destination.longitude, destination.longitude, delta);
    assertEquals(distance.destination.name, destination.name);

    assertEquals(distance.origin.latitude, origin.latitude, delta);
    assertEquals(distance.origin.longitude, origin.longitude, delta);
    assertEquals(distance.origin.name, origin.name);
  }

  @Test
  public void testDistanceNoJson() {
    // create a new distance object directly
    distance = new Distance(origin, destination, units);

    assertEquals(distance.destination, destination);
    assertEquals(distance.origin, origin);
    assertEquals(distance.units, units);
  }

  @Test
  public void testDistanceNoJsonCustomRadius() {
    // create a new distance object directly
    distance = new Distance(origin, destination, "accurate miles", "user defined", 3958.7613);

    assertEquals(distance.destination.latitude, destination.latitude, delta);
    assertEquals(distance.destination.longitude, destination.longitude, delta);
    assertEquals(distance.destination.name, destination.name);

    assertEquals(distance.origin.latitude, origin.latitude, delta);
    assertEquals(distance.origin.longitude, origin.longitude, delta);
    assertEquals(distance.origin.name, origin.name);

    assertEquals(distance.unitRadius, 3958.7613, delta);
    assertEquals(distance.unitName, "accurate miles");
    assertEquals(distance.units, "user defined");
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestIncorrectUnits() {
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 1,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"parsec\",\"distance\": 0}";

    // initialize distance object with json data
    distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, 0);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestKilometers() {
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 1,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"kilometers\",\"distance\": 0}";

    // initialize distance object with json data
    distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, 13432);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestMiles() {
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 1,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"miles\",\"distance\": 0}";

    // initialize distance object with json data
    distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, 8347);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestNauticalMiles() {
    String distanceRequestJson = "{\"type\": \"distance\",\"version\": 1,"
        + "\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
        + "\"destination\": {\"latitude\": -33.8688,\"longitude\": 151.2093},"
        + "\"units\": \"nautical miles\",\"distance\": 0}";

    // initialize distance object with json data
    distance = gson.fromJson(distanceRequestJson, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();

    assertEquals(distance.distance, 7252);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonIncorrectUnits() {
    distance = new Distance(origin, destination, "parsec");
    distance.calculateTotalDistance();
    assertEquals(distance.distance, 0);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonKilometers() {
    distance = new Distance(origin, destination, "kilometers");
    distance.calculateTotalDistance();
    assertEquals(distance.distance, 39);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonKilometersSwitchInput() {
    distance = new Distance(destination, origin, "kilometers");
    distance.calculateTotalDistance();
    assertEquals(distance.distance, 39);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonMiles() {
    distance = new Distance(origin, destination, "miles");
    distance.calculateTotalDistance();
    assertEquals(distance.distance, 24);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonNauticalMiles() {
    distance = new Distance(origin, destination, "nautical miles");
    distance.calculateTotalDistance();
    assertEquals(distance.distance, 21);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonUserDefinedUnits() {
    distance = new Distance(origin, destination, "actual miles", "user defined", 3958.7613);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, 24);
  }
}
