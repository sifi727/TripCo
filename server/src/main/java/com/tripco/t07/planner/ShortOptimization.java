package com.tripco.t07.planner;

import java.util.ArrayList;

public class ShortOptimization {
    private ArrayList<Place> places;

    ShortOptimization(ArrayList<Place> places){
        this.places=places;
    }


    ArrayList<Place> nearestNeighborShortestPlaces(){

        int shortestTrip = Integer.MAX_VALUE;
        ArrayList<Place> shortestTripPlaces = new ArrayList<>();
        for(Place origin:places){
            ArrayList<Place> sortedPlaces = new ArrayList<>();
            boolean[] visitedPlaces = new boolean[places.size()];
            boolean finished = false;
            int totalTripDistance = 0;
            sortedPlaces.add(origin);
            visitedPlaces[places.indexOf(origin)] = true;
            Place previousPlace = origin;
            while (!finished) {
                Place nextVisitedPlace = closestPlace(previousPlace, places, visitedPlaces);
                visitedPlaces[places.indexOf(nextVisitedPlace)] = true;
                sortedPlaces.add(nextVisitedPlace);
                totalTripDistance += legDistance(previousPlace, nextVisitedPlace);
                previousPlace=nextVisitedPlace;
                for (boolean visitedPlace : visitedPlaces) {
                    if (!visitedPlace) {
                        finished = false;
                        break;
                    }

                    finished = true;
                }
            }
            totalTripDistance+=legDistance(origin,previousPlace); //add to make it round trip
            if(totalTripDistance<=shortestTrip){
                shortestTrip=totalTripDistance;
                shortestTripPlaces=sortedPlaces;
            }
        }


        return shortestTripPlaces;
    }


    public Place closestPlace(Place origin, ArrayList<Place> places, boolean[] visitedPlaces) {

        int shortestDistance = Integer.MAX_VALUE;
        Place closestPlace = null;
        for (int placeIndex = 0; placeIndex < places.size(); placeIndex++) {
            if (!places.get(placeIndex).equals(origin) && !visitedPlaces[placeIndex]) {
                int distance = legDistance(origin, places.get(placeIndex));
                if (distance <= shortestDistance) {
                    shortestDistance = distance;
                    closestPlace = places.get(placeIndex);
                }
            }
        }
     return closestPlace;
    }

    private int legDistance(Place origin, Place destination) {
        Distance distance = new Distance(origin, destination, null, "miles", -1);
        distance.calculateTotalDistance();
        return distance.distance;
    }
}
