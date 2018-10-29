package com.tripco.t07.planner;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.unitils.reflectionassert.ReflectionAssert;

import static org.junit.Assert.*;

/*
  This class contains tests for the Distance class.
 */
@RunWith(JUnit4.class)
public class TestDistance {

  private Distance expectedDistance;

  private Gson gson;

  private Integer expectedInt;

  private Place origin;
  private Place destination;

  private String distanceRequestJson;
  private String units;

  // Setup to be done before every test in TestDistance
  @Before
  public void initialize() {

    gson = new Gson();

    destination = new Place();
    destination.latitude = 39.7392;
    destination.longitude = -104.9903;
    destination.name = "Denver";

    origin = new Place();
    origin.latitude = 40.01499;
    origin.longitude = -105.27055;
    origin.name = "Boulder";

    units = "miles";
  }

  @Test
  public void testDistanceMinimumRequiredElements() {
    destination = new Place();
    destination.latitude = 39.7392;
    destination.longitude = -104.9903;

    origin = new Place();
    origin.latitude = 40.01499;
    origin.longitude = -105.27055;

    distanceRequestJson = "{\"origin\": {\"latitude\": 40.01499,\"longitude\": -105.27055},"
        + "\"destination\": {\"latitude\": 39.7392,\"longitude\": -104.9903},"
        + "\"units\": \"miles\"}";

    expectedDistance = gson.fromJson(distanceRequestJson, Distance.class);

    // create a new distance object directly
    Distance distance = new Distance(origin, destination, null, units, -1);

    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);

    // Calculate Total Distance and test again
    expectedDistance.calculateTotalDistance();
    distance.calculateTotalDistance();
    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);
  }

  @Test
  public void testDistanceAllPossibleElements() {
    distanceRequestJson = "{\"type\": \"distance\","
        + "\"version\": 4,"
        + "\"origin\": {\"latitude\": 40.01499,\"longitude\": -105.27055,\"name\": \"Boulder\"},"
        + "\"destination\": {\"latitude\": 39.7392,\"longitude\": -104.9903,\"name\": \"Denver\"},"
        + "\"units\": \"user defined\",\"unitName\": \"accurate miles\",\"unitRadius\": 3958.7613,"
        + "\"distance\": 0}";

    expectedDistance = gson.fromJson(distanceRequestJson, Distance.class);

    // create a new distance object directly
    Distance distance = new Distance(0, 4, origin, destination, "distance", "accurate miles", "user defined",
        3958.7613);

    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);

    // Calculate Total Distance and test again
    expectedDistance.calculateTotalDistance();
    distance.calculateTotalDistance();
    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);
  }

  @Test
  public void testDistanceNoJsonCustomRadius() {
    // create a new distance object directly
    Distance distance = new Distance(origin, destination, "accurate miles", "user defined",
        3958.7613);

    distanceRequestJson = "{\"origin\": {\"latitude\": 40.01499,\"longitude\": -105.27055,\"name\": \"Boulder\"},"
        + "\"destination\": {\"latitude\": 39.7392,\"longitude\": -104.9903,\"name\": \"Denver\"},"
        + "\"units\": \"user defined\",\"unitName\": \"accurate miles\",\"unitRadius\": 3958.7613}";

    expectedDistance = gson.fromJson(distanceRequestJson, Distance.class);
    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);

    // Calculate Total Distance and test again
    expectedDistance.calculateTotalDistance();
    distance.calculateTotalDistance();
    ReflectionAssert.assertReflectionEquals(distance, expectedDistance);
  }

  @Test
  public void testCalculateTotalDistanceJsonRequestIncorrectUnits() {
    expectedInt = 0;
    distanceRequestJson = "{\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
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
    expectedInt = 13432;
    distanceRequestJson = "{\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
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
    expectedInt = 8347;
    distanceRequestJson = "{\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
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
    expectedInt = 7252;
    distanceRequestJson = "{\"origin\": {\"latitude\": 40.5854,\"longitude\": -105.0844},"
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
    expectedInt = 0;
    Distance distance = new Distance(origin, destination, null, "parsec", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonKilometers() {
    expectedInt = 39;
    Distance distance = new Distance(origin, destination, null, "kilometers", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonKilometersSwitchInput() {
    expectedInt = 39;
    Distance distance = new Distance(destination, origin, null, "kilometers", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonMiles() {
    expectedInt = 24;
    Distance distance = new Distance(origin, destination, null, "miles", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonNauticalMiles() {
    expectedInt = 21;
    Distance distance = new Distance(origin, destination, null, "nautical miles", -1);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }

  @Test
  public void testCalculateTotalDistanceNoJsonUserDefinedUnits() {
    expectedInt = 24;
    Distance distance = new Distance(origin, destination, "actual miles", "user defined",
        3958.7613);
    distance.calculateTotalDistance();
    assertEquals(distance.distance, expectedInt);
  }
}
