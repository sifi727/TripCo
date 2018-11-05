package com.tripco.t07.planner;

import java.util.ArrayList;

public class ShortOptimization {
    private Place [] places;
    private int[][] distances;
    private String optimizationLevel;

    ShortOptimization(ArrayList<Place> places, String optimizationLevel){
        this.places=places.toArray(new Place[places.size()]);
        this.distances = new int[places.size()][places.size()];
        this.optimizationLevel=optimizationLevel;

    }


    ArrayList<Place> nearestNeighborShortestPlaces(){

        createDistanceMatrix();
        int shortestTrip = Integer.MAX_VALUE;
        ArrayList<Place> shortestTripPlaces = new ArrayList<>(places.length);
        for(int i=0; i<places.length; i++){
            int [] route = new int[places.length+1];
            int routeIndex=0;
            int visitedCount = 1;
            ArrayList<Place> sortedPlaces = new ArrayList<>(places.length);
            boolean[] visitedPlaces = new boolean[places.length];
            int totalTripDistance = 0;
            sortedPlaces.add(places[i]);
            route[0] = i;
            route[places.length]=i; //to make it a round trip route
            visitedPlaces[i] = true;
            int previousPlaceIndex = i;
            while (visitedCount<places.length) {
                int nextVisitedPlaceIndex = closestPlace(i, places, visitedPlaces);
                Place nextVisitedPlace=places[nextVisitedPlaceIndex];
                visitedPlaces[nextVisitedPlaceIndex] = true;
                sortedPlaces.add(nextVisitedPlace);
                totalTripDistance += distances[previousPlaceIndex][ nextVisitedPlaceIndex];
                previousPlaceIndex = nextVisitedPlaceIndex;
                visitedCount++;
                route[routeIndex] = previousPlaceIndex;
                routeIndex++;
                }

            totalTripDistance+=distances[i][previousPlaceIndex]; //add to make it round trip
            if(optimizationLevel.equalsIgnoreCase("shorter")){

               if(twoOpt(route, distances)<totalTripDistance){
                   sortedPlaces = new ArrayList<>(places.length);
                   for (int j = 0; j < route.length-1; j++) {
                       sortedPlaces.add(places[route[j]]);
                   }
               }
            }
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
                int distance = distances[originIndex][placeIndex];
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

    private void createDistanceMatrix(){

        for (int i = 0; i < places.length; i++) {
            for (int j = 0; j < places.length; j++) {
                distances[i][j] = legDistance(places[i],places[j]);
            }
        }
    }

    public void reverseBetweeniIndecency(int[]route, int leftIndex, int rightIndex) {
        int temp;
        while (leftIndex < rightIndex) {
            temp = route[leftIndex];
            route[leftIndex] = route[rightIndex];
            route[rightIndex] = temp;
            leftIndex++;
            rightIndex--;
        }
    }


    int distanceBetweenCity(int[][] distance, int[] route, int cityIndex1, int cityIindex2) {
        return distance[route[cityIndex1]][route[cityIindex2]];
    }

    int totalDistanceOfRoute(int[][] distance, int [] route)
    {
        int totalDistance = 0;
        for(int i =0; i<route.length-1; i++)
        {
            totalDistance = distance[route[i]][route[i+1]];

        }
        return totalDistance;

    }

    public int twoOpt(int[] route, int[][] distance) {
        boolean improvement = true;
        int n = route.length-1;
        int delta;
        while (improvement) {
            improvement = false;
            for (int i = 0; i <= n - 3; i++) {
                for (int k = i + 2; k <= n - 1; k++) {
                    delta =
                            -distanceBetweenCity(distance, route, i, i + 1) - distanceBetweenCity(distance, route,
                                    k, k + 1) + distanceBetweenCity(distance, route, i, k) + distanceBetweenCity(
                                    distance, route, i + 1, k + 1);
                    if (delta < 0) {
                        reverseBetweeniIndecency(route, i + 1, k);
                        improvement = true;
                    }
                }
            }
        }
        return totalDistanceOfRoute(distance,route);
    }
}
