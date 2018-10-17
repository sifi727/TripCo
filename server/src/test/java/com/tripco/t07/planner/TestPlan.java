package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import java.util.ArrayList;

import org.junit.*;

import static org.junit.Assert.*;

/*
  This class contains tests for the Plan class.
 */
public class TestPlan {
    RequestStub request;
    Plan plan;
    String tripRequestJson;

    // Setup to be done before every test in TestPlan
    @Before
    public void initialize() {
        tripRequestJson = "{" +
                                "\"map\": \"\"," +
                                "\"type\": \"trip\"," +
                                "\"title\": \"Test\"," +
                                "\"version\": 3" +
                            "}";

        request = new RequestStub();
        request.setTffi(tripRequestJson);

        Plan plan = new Plan(request);
    }

    @Test
    public void testGetTrip() {
        // TODO: need to test plan.getTrip()
    }
}