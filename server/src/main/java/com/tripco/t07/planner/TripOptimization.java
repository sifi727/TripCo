package com.tripco.t07.planner;

import java.util.ArrayList;
import java.util.Arrays;

public class TripOptimization {
    private Place [] places;
    private long[][] distances;
    private String optimizationLevel;

    public TripOptimization(ArrayList<Place> places, String optimizationLevel){
        this.places=places.toArray(new Place[places.size()]);
        this.distances = new long[places.size()][places.size()];
        this.optimizationLevel=optimizationLevel;

    }


   public ArrayList<Place> optimizedTripPlaces(){

        createDistanceMatrix();
        long shortestTrip = Long.MAX_VALUE;
        int [] shortestRoute = new int [places.length+1];
        for(int i=0; i<places.length; i++){
            int [] route = new int[places.length+1]; //+1 to include round trip
            int routeIndex=0;
            boolean[] visitedPlaces = new boolean[places.length];
            route[0] = i; //starting place
            route[places.length]=i; //to make it a round trip route
            visitedPlaces[i] = true;
            int previousPlaceIndex = i;
            while (true) {
                int nextVisitedPlaceIndex = closestPlace(previousPlaceIndex, places, visitedPlaces);
                if(nextVisitedPlaceIndex==previousPlaceIndex){ //out of places to visit
                    route[routeIndex] = previousPlaceIndex;
                    break;
                }
                visitedPlaces[nextVisitedPlaceIndex] = true;
                route[routeIndex] = previousPlaceIndex;
                previousPlaceIndex = nextVisitedPlaceIndex;
                routeIndex++;
                }

            long routeDistance=sumRoute(route);
            if(optimizationLevel.equalsIgnoreCase("shorter")){
               long twoOptDistance= twoOpt(route);
               if(twoOptDistance<routeDistance){
                   routeDistance=twoOptDistance;
               }
            }

            if(routeDistance<shortestTrip){
                shortestTrip=routeDistance;
                shortestRoute= Arrays.copyOf(route, route.length);
            }
        }

        ArrayList<Place> shortestTripPlaces = new ArrayList<>(places.length);
        for (int j = 0; j < shortestRoute.length-1; j++) {
            shortestTripPlaces.add(places[(int)shortestRoute[j]]);
        }
        return shortestTripPlaces;
    }

    private long sumRoute(int [] route){
        int distance =0;
        for (int i = 0; i <route.length-1 ; i++) {
            distance+=distances[route[i]][route[i+1]];
        }
        return distance;
    }

    private int closestPlace(int originIndex, Place[] places, boolean[] visitedPlaces) {

        long shortestDistance = Long.MAX_VALUE;
        int closestPlaceIndex = originIndex;
        for (int placeIndex = 0; placeIndex < places.length; placeIndex++) {
            if (placeIndex!=originIndex && !visitedPlaces[placeIndex]) {
                long distance = distances[originIndex][placeIndex];
                if (distance <= shortestDistance) {
                    shortestDistance = distance;
                    closestPlaceIndex = placeIndex;
                }
            }
        }
     return closestPlaceIndex;
    }

    private long legDistance(Place origin, Place destination) {
        Distance distance = new Distance(origin, destination, null, "miles", -1);
        distance.calculateTotalDistance();
        return distance.distance;
    }

    private void createDistanceMatrix(){

        for (int i = 0; i < places.length; i++) {
            for (int j = 0; j < places.length; j++) {
                distances[i][j] = legDistance(places[i],places[j]);
            }
        }
    }

    private void reverseBetweenIndeces(int[]route, int leftIndex, int rightIndex) {
        int temp;
        while (leftIndex < rightIndex) {
            temp = route[leftIndex];
            route[leftIndex] = route[rightIndex];
            route[rightIndex] = temp;
            leftIndex++;
            rightIndex--;
        }
    }


   private long distanceBetweenCity(int[] route, int cityIndex1, int cityIindex2) {
        return distances[route[cityIndex1]][route[cityIindex2]];
    }


    private long twoOpt(int[] route) {
        boolean improvement = true;
        long n = route.length-1;
        long delta;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n - 3; i++) {
                for (int k = i + 2; k <= n - 1; k++) {
                    delta =
                            -distanceBetweenCity(route, i, i + 1) - distanceBetweenCity(route,
                                    k, k + 1) + distanceBetweenCity(route, i, k) + distanceBetweenCity(
                                    route, i + 1, k + 1);
                    if (delta < 0) {
                        reverseBetweenIndeces(route, i + 1, k);
                        improvement = true;
                    }
                }
            }
        }
        return sumRoute(route);
    }
}
