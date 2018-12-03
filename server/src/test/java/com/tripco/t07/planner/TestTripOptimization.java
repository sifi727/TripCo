package com.tripco.t07.planner;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

import static org.junit.Assert.*;
/*
  This class contains tests for the TripOptimization class.
 */
@RunWith(JUnit4.class)
public class TestTripOptimization {
    TripOptimization tripOptimization;
    Option options = new Option();
    ArrayList<Place> places = new ArrayList<>();

    private ArrayList<Place> getOptimizedPlaces(){
        ArrayList<Place> updatedPlaces = new ArrayList<>();
        Place place1 = new Place();
        place1.id="dnv";
        place1.name="Denver";
        place1.latitude=39.7392;
        place1.longitude=-104.9903;
        Place place2 = new Place();
        place2.id="bldr";
        place2.name="Boulder";
        place2.latitude=40.01499;
        place2.longitude=-105.27055;
        Place place3 = new Place();
        place3.id="foco";
        place3.name="Fort Collins";
        place3.latitude=40.58258;
        place3.longitude=-105.084419;
        //optimized places in correct order
        updatedPlaces.add(place1);
        updatedPlaces.add(place2);
        updatedPlaces.add(place3);
        return updatedPlaces;
    }

    private String convertPlacesToStringByName(ArrayList<Place> list){
        String retString = new String();
        for(Place place: list){
            retString+=place.id;
        }
        return retString;
    }

    @Before
    public void initialize(){
        places.clear();
        Place place1 = new Place();
        place1.id="dnv";
        place1.name="Denver";
        place1.latitude=39.7392;
        place1.longitude=-104.9903;
        Place place2 = new Place();
        place2.id="bldr";
        place2.name="Boulder";
        place2.latitude=40.01499;
        place2.longitude=-105.27055;
        Place place3 = new Place();
        place3.id="foco";
        place3.name="Fort Collins";
        place3.latitude=40.58258;
        place3.longitude=-105.084419;
        //out of order places
        places.add(place1);
        places.add(place3);
        places.add(place2);

    }

    @Test
    public void testShort() {
        options.optimization = "short";
        tripOptimization = new TripOptimization(places,options.optimization);
        ArrayList<Place> updatedPlaces = getOptimizedPlaces();
        ArrayList<Place> tripPlace = tripOptimization.optimizedTripPlaces();
        assertEquals(convertPlacesToStringByName(updatedPlaces), convertPlacesToStringByName(tripPlace));

    }

    @Test
    public void testShorter() {
        options.optimization = "shorter";
        tripOptimization = new TripOptimization(places,options.optimization);
        ArrayList<Place> updatedPlaces = getOptimizedPlaces();
        ArrayList<Place> tripPlace = tripOptimization.optimizedTripPlaces();
        assertEquals(convertPlacesToStringByName(updatedPlaces), convertPlacesToStringByName(tripPlace));

    }
}
