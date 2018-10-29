package com.tripco.t07.planner;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import static org.junit.Assert.*;

/*
  This class contains tests for the Calculate class.
 */
@RunWith(JUnit4.class)
public class TestCalculate {
    RequestStub request;
    Calculate calculate;
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
        String distanceRequestJson = "{\"type\": \"distance\",\"version\": 3,"
                + "\"origin\": {\"latitude\": 40.01499,\"longitude\": -105.27055, \"name\":\"Boulder\"},"
                + "\"destination\": {\"latitude\": 40.585258,\"longitude\": -105.084419, \"name\":\"Fort Collins\"},"
                + "\"units\": \"kilometers\",\"distance\": 0}";

        request = new RequestStub();
        request.setTffi(distanceRequestJson);

        delta = 0.1;
        dist = 65;
        version = 3;
        type = "distance";
        units = "kilometers";

        origin = new Place();
        origin.latitude = 40.01499;
        origin.longitude = -105.27055;
        origin.name = "Boulder";

        destination = new Place();
        destination.latitude = 40.585258;
        destination.longitude = -105.084419;
        destination.name = "Fort Collins";
    }

    @Test
    public void testCalculateConstructor() {
        // create a new calculate object directly
        calculate = new Calculate(request);

        // parse the request data.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(calculate.getDistance());

        // initialize distance object with request data.
        gson = new Gson();
        distance = gson.fromJson(requestBody, Distance.class);

        Integer expectedInt = new Integer(65);

        assertEquals(distance.distance, expectedInt);
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
    public void testGetDistanceMethod() {
        String expectedDistanceTffi = "{\"distance\":65,\"version\":3,"
                + "\"origin\":{\"name\":\"Boulder\",\"latitude\":40.01499,\"longitude\":-105.27055},"
                + "\"destination\":{\"name\":\"Fort Collins\",\"latitude\":40.585258,\"longitude\":-105.084419},"
                + "\"type\":\"distance\",\"units\":\"kilometers\"}";

        // create a new calculate object directly
        calculate = new Calculate(request);
        String actualDistanceTffi = calculate.getDistance();

        assertEquals(expectedDistanceTffi, actualDistanceTffi);
    }
}