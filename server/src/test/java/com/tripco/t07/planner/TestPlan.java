package com.tripco.t07.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.junit.*;

import static org.junit.Assert.*;

/*
  This class contains tests for the Plan class.
 */
public class TestPlan {
    RequestStub request;
    Plan plan;
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
                                "\"version\": 3" +
                            "}";

        request = new RequestStub();
        request.setTffi(tripRequestJson);
        Plan plan = new Plan(request);

        BufferedReader reader;
        reader = new BufferedReader(
                new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

        stringBuilder = new StringBuilder();
        String line = "";
        try {
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line + "\n");
            }
        } catch (Exception e) {
            fail();
        }
    }

    @Test
    public void testGetTrip() {
        expectedTrip = "{\n" +
                            "\"type\":\"trip\"," +
                            "\"title\":\"\"," +
                            "\"options\": {\"units\":\"miles\"},\n" +
                            "\"places\":[]," +
                            "\"distances\": [0],\n" +
                            "\"map\": " + stringBuilder.toString()  + "\n" +
                            "\"version\":3," +
                        "}";
        actualTrip = plan.getTrip();
        assertEquals(expectedTrip, actualTrip);
    }
}