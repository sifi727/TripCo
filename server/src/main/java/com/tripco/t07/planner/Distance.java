package com.tripco.t07.planner;

public class Distance {

  //The variables in this class should match the REST API definition.
  public Double unitRadius;
  public int distance;
  public int version;
  public Place origin;
  public Place destination;
  public String type;
  public String unitName;
  public String units;

  //Constructor(s)
  public Distance() {
  }

  public Distance(Place origin, Place destination, String unitname, String units, double radius) {
    this.destination = destination;
    this.origin = origin;
    this.units = units;
    // only set these for user defined units
    if (radius > 0) {
      this.unitRadius = new Double(radius);
      this.unitName = unitname;
    }
  }

  //class methods

  //This calls a helper method haversineVincenty().
  public void calculateTotalDistance() {
    haversineVincenty();
  }

  // switch on the units and return the correct radius
  // or zero if we encounter an error
  public double getRadiusFromUnits() {
    switch (this.units) {
      case "miles":
        return 3959.0;
      case "kilometers":
        return 6371.0;
      case "nautical miles":
        return 3440.0;
      case "user defined":
        return this.unitRadius.doubleValue();
      default:
        return 0;
    }
  }

  // Calculates the total distance between two points
  // using the Haversine Vincenty formula
  private void haversineVincenty() {
    //We have to covert the latitude and longitude angles from degrees to radians.
    //The latitude and longitude are also String variables so they will have to be converted to doubles for the formula.
    double origin_latitude = Math.toRadians(this.origin.latitude);
    double origin_longitude = Math.toRadians(this.origin.longitude);
    double destination_latitude = Math.toRadians(this.destination.latitude);
    double destination_longitude = Math.toRadians(this.destination.longitude);
    //The delta-lambda variable is the absolute differences between the two longitudes.
    double delta_lambda = Math.abs(origin_longitude - destination_longitude);
    // the radius of the Earth
    double radius = getRadiusFromUnits();

    /**
     *  We have broken the formula into several lines, calculating the innermost components first and then plugging into a more general formula,
     *  Reference source to the haversineVincenty formula: https://en.wikipedia.org/wiki/Great-circle_distance (Vincenty formula)
     */

    double left_sqrt_component = Math
        .pow(Math.cos(destination_latitude) * Math.sin(delta_lambda), 2);
    double right_sqrt_component = Math.pow(
        (Math.cos(origin_latitude) * Math.sin(destination_latitude)) - (Math.sin(origin_latitude)
            * Math.cos(destination_latitude) * Math.cos(delta_lambda)), 2);
    double numerator = Math.sqrt(left_sqrt_component + right_sqrt_component);
    double left_denominator_component = Math.sin(origin_latitude) * Math.sin(destination_latitude);
    double right_denominator_component =
        Math.cos(origin_latitude) * Math.cos(destination_latitude) * Math.cos(delta_lambda);
    double denominator = left_denominator_component + right_denominator_component;

    //Calculate the distance between the origin and the destination.
    this.distance = (int) (Math.round(radius * Math.atan2(numerator, denominator)));
  }
}
