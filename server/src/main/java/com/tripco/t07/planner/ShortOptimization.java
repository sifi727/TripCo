package com.tripco.t07.planner;

import java.util.ArrayList;

public class ShortOptimization {
    private Place [] places;

    ShortOptimization(ArrayList<Place> places){
        this.places=places.toArray(new Place[places.size()]);
    }


    ArrayList<Place> nearestNeighborShortestPlaces(){

        int shortestTrip = Integer.MAX_VALUE;
        ArrayList<Place> shortestTripPlaces = new ArrayList<>(places.length);
        for(int i=0; i<places.length; i++){
            int visitedCount = 1;
            ArrayList<Place> sortedPlaces = new ArrayList<>(places.length);
            boolean[] visitedPlaces = new boolean[places.length];
            int totalTripDistance = 0;
            sortedPlaces.add(places[i]);
            visitedPlaces[i] = true;
            Place previousPlace = places[i];
            while (visitedCount<places.length) {
                int nextVisitedPlaceIndex = closestPlace(i, places, visitedPlaces);
                Place nextVisitedPlace=places[nextVisitedPlaceIndex];
                visitedPlaces[nextVisitedPlaceIndex] = true;
                sortedPlaces.add(nextVisitedPlace);
                totalTripDistance += legDistance(previousPlace, nextVisitedPlace);
                previousPlace=nextVisitedPlace;
                visitedCount++;

                }
//                for (boolean visitedPlace : visitedPlaces) {
//                    if (!visitedPlace) {
//                        finished = false;
//                        break;
//                    }
//
//                    finished = true;
//                }
//            }
            totalTripDistance+=legDistance(places[i],previousPlace); //add to make it round trip
            if(totalTripDistance<=shortestTrip){
                shortestTrip=totalTripDistance;
                shortestTripPlaces=sortedPlaces;
            }
        }


        return shortestTripPlaces;
    }


    public int closestPlace(int originIndex, Place[] places, boolean[] visitedPlaces) {

        int shortestDistance = Integer.MAX_VALUE;
        int closestPlaceIndex = 0;
        for (int placeIndex = 0; placeIndex < places.length; placeIndex++) {
            if (placeIndex!=originIndex && !visitedPlaces[placeIndex]) {
                int distance = legDistance(places[originIndex], places[placeIndex]);
                if (distance <= shortestDistance) {
                    shortestDistance = distance;
                    closestPlaceIndex = placeIndex;
                }
            }
        }
     return closestPlaceIndex;
    }

    private int legDistance(Place origin, Place destination) {
        Distance distance = new Distance(origin, destination, null, "miles", -1);
        distance.calculateTotalDistance();
        return distance.distance;
    }
}
