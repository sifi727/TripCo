package com.tripco.t07.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import com.google.gson.Gson;
import org.junit.*;

import static org.junit.Assert.*;

/*
  This class contains tests for the Plan class.
 */
public class TestPlan {
    RequestStub request;
    Plan plan;
    Trip trip;
    String tripRequestJson;
    String expectedTrip;
    String actualTrip;
    StringBuilder stringBuilder;

    // Setup to be done before every test in TestPlan
    @Before
    public void initialize() {
        tripRequestJson = "{" +
                                "\"map\": \"\"," +
                                "\"type\": \"trip\"," +
                                "\"title\": \"Test\"," +
                                "\"places\": []," +
                                "\"version\": 3" +
                            "}";

        request = new RequestStub();
        request.setTffi(tripRequestJson);
        plan = new Plan(request);

        Gson gson = new Gson();
        trip = gson.fromJson(tripRequestJson, Trip.class);
        trip.plan();
    }

    @Test
    public void testGetTrip() {
        Gson gson = new Gson();
        Trip trip = gson.fromJson(plan.getTrip(), Trip.class);

        assertEquals(this.trip.type, trip.type);
        assertEquals(this.trip.title, trip.title);
        assertEquals(this.trip.options.units, trip.options.units);
        assertEquals(this.trip.places, trip.places);
        assertEquals(this.trip.distances, trip.distances);
        assertEquals(this.trip.map, trip.map);
        assertEquals(this.trip.version, trip.version);
    }
}