package com.tripco.t07.planner;

public class ShorterOptimization {

  public void reverseBetweeniIndecency([int]route, leftIndex, rightIndex) {
    int temp;
    while (leftIndex < rightIndex) {
      temp = route[leftIndex];
      route[leftIndex] = route[rightIndex];
      route[rightIndex] = temp;
      leftIndex++;
      rightIndex--;
    }
  }

  //2optReverse(route, i1, k) { // reverse in place
//    while(i1 < k) {
//    temp = route[i1]
//    route[i1] = route[k]
//    route[k] = temp
//    i1++; k--
//    }
//    }
//
  int distanceBetweenCity(int[][] distance, int[] route, cityIndex1, cityIindex2) {
    return distance[route[index1]][route[cityIindex2]];
  }

  public int twoOpt(int[] route, int[][] distance) {
    boolean improvement = true;
    int n = route.length;
    int delta;
    while (improvement) {
      improvement = false;
      for (i = 0; i <= n - 3; i++) {
        for (k = i + 2; k <= n - 1; k++) {
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
  }
}

//  improvement = true
//      while improvement {
//    improvement = false
//    for (i = 0; i <= n-3; i++) { // assert n>4
//      for (k = i + 2; k <= n-1; k++) {
//        delta = -dis(route,i,i+1)-dis(route,k,k+1)+dis(route,i,k)+dis(route,i+1,k+1)
//        if (delta < 0) { //improvement?
//          2optReverse(route, i+1, k)
//          improvement = true
//        }
//      }
//    }
//  }

