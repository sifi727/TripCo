package com.tripco.t07.planner;
//package resources.CObackground.svg;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.util.ArrayList;

import static org.junit.Assert.*;

/*
  This class contains tests for the Plan class.
 */
@RunWith(JUnit4.class)
public class TestPlan {
    RequestStub request;
    Plan plan;
    Trip trip;
    Gson gson;

    //Variables within a trip tffi.
    String type;
    String title;
    Option options;

    ArrayList<Place> places;
    ArrayList<Integer> distances;
    public String map;
    public int version;

    //A private helper methods that helps with testing.
    private Place setPlace(String id, String name, Double latitude, Double longitude) {
        Place place = new Place();
        place.id = id;
        place.name = name;
        place.latitude = latitude;
        place.longitude = longitude;
        return place;
    }

    // Setup to be done before every test in TestPlan
    @Before
    public void initialize() {
        String tripRequestJson = "{\"type\":\"trip\",\"title\":\"Shopping loop\","
                + "\"options\": {\"units\":\"user defined\",\"unitName\":\"accurate miles\",\"unitRadius\": 3958.7613},"
                + "\"places\": [{\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903},"
                + "{\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055},"
                + "{\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.585258, \"longitude\":-105.084419}]"
                + "\"map\": \"\",\"version\": 3}";

        request = new RequestStub();
        request.setTffi(tripRequestJson);

        type = "trip";
        title = "Shopping loop";
        map = "";
        version = 3;

        options = new Option();
        options.units = "user defined";
        options.unitName = "accurate miles";
        options.unitRadius = 3958.7613;

        places = new ArrayList<Place>();
        places.add(setPlace("dnvr", "Denver", 39.7392, -104.9903));
        places.add(setPlace("bldr", "Boulder", 40.01499, -105.27055));
        places.add(setPlace("foco", "Fort Collins", 40.585258, -105.084419));

        distances = new ArrayList<Integer>();
        distances.add(24);
        distances.add(41);
        distances.add(59);
    }

    @Test
    public void testPlanConstructor() {
        // create a new plan object directly
        plan = new Plan(request);

        // parse the request data.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(plan.getTrip());

        // initialize distance object with request data.
        gson = new Gson();
        trip = gson.fromJson(requestBody, Trip.class);

        assertEquals(type, trip.type);
    }
}