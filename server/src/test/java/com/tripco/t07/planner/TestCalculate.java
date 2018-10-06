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
    String distance;
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
                + "\"units\": \"miles\",\"distance\": 0}";

        request = new RequestStub();
        request.setTffi(distanceRequestJson);

        delta = 0.1;
        dist = 41;
        version = 3;
        type = "distance";
        units = "miles";

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

        calculate = new Calculate(request);

        assertEquals(calculate.distance.distance, dist);
        assertEquals(calculate.distance.type, type);
        assertEquals(calculate.distance.units, units);
        assertEquals(calculate.distance.version, version);

        assertEquals(calculate.distance.destination.latitude, destination.latitude, delta);
        assertEquals(calculate.distance.destination.longitude, destination.longitude, delta);
        assertEquals(calculate.distance.destination.name, destination.name);

        assertEquals(calculate.distance.origin.latitude, origin.latitude, delta);
        assertEquals(calculate.distance.origin.longitude, origin.longitude, delta);
        assertEquals(calculate.distance.origin.name, origin.name);
    }

}
