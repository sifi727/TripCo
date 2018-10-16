package com.tripco.t07.planner;

import java.util.ArrayList;

public class ShortOptimization {
    private ArrayList<Place> places;

    ShortOptimization(ArrayList<Place> places){
        this.places=places;
    }

    ArrayList<Place> nearestNeighbor(){
        boolean[] visitedPlaces = new boolean[places.size()];
        boolean finished = false;
        ArrayList<Place> sortedPlaces = new ArrayList<>();
        sortedPlaces.add(places.get(0));
        visitedPlaces[0] = true;
        while (!finished) {
            Place currentPlace = closestPlace(places.get(0), places, visitedPlaces);
            visitedPlaces[places.indexOf(currentPlace)] = true;
            sortedPlaces.add(currentPlace);

            for (boolean visitedPlace : visitedPlaces) {
                if (!visitedPlace) {
                    finished = false;
                    break;
                }

                finished = true;
            }
        }

        return sortedPlaces;
    }


    public Place closestPlace(Place origin, ArrayList<Place> places, boolean[] visitedPlaces) {

        int shortestDistance = Integer.MAX_VALUE;
        Place closestPlace = null;
        for (int placeIndex = 0; placeIndex < places.size(); placeIndex++) {
            if (!places.get(placeIndex).equals(origin) && !visitedPlaces[placeIndex]) {
                Distance distance = new Distance(origin,places.get(placeIndex),"miles", "miles", -1);
                distance.calculateTotalDistance();
                if (distance.distance <= shortestDistance) {
                    shortestDistance = distance.distance;
                    closestPlace = places.get(placeIndex);
                }
            }
        }
     return closestPlace;
    }
}
