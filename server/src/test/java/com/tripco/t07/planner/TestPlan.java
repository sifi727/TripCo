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
@RunWith(JUnit4.class)
public class TestPlan {
    RequestStub request;
    Plan plan;

    // Setup to be done before every test in TestPlan
    @Before
    public void initialize() {
        String tripRequestJson = "{\"type\":\"trip\",\"title\":\"Example\","
                + "\"options\": {\"units\":\"user defined\",\"unitName\":\"accurate miles\",\"unitRadius\": 3958.7613},"
                + "\"places\": [{\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903}"]"
                + "\"map\": \"\",\"version\": 3}";

        request = new RequestStub();
        request.setTffi(tripRequestJson);

        Plan plan = new Plan(request);
    }

    @Test
    public void testGetTrip() {
        String result = plan.getTrip();
        assertEquals(tripRequestJson, result);
    }
}