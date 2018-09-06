package com.tripco.t07.planner;

public class Distance
{
    //The variables in this class should match the REST API definition.
    public String type;
    public int version;
    public Place origin;
    public Place destination;
    public String units;
    public int distance;
 
    //class methods
    //This calls a helper method haversineVincenty().
    public void calculateTotalDistance()
    {
        haversineVincenty();
    }

    private void haversineVincenty()
    {
        //We have to covert the latitude and longitude angles from degrees to radians.
        //The latitude and longitude are also String variables so they will have to be converted to doubles for the formula.
        double origin_latitude = Math.toRadians(this.origin.latitude);
        double origin_longitude = Math.toRadians(this.origin.longitude);
        double destination_latitude = Math.toRadians(this.destination.latitude);
        double destination_longitude = Math.toRadians(this.destination.longitude);
        //The delta-lambda variable is the absolute differences between the two longitudes.
        double delta_lambda = Math.abs(origin_longitude - destination_longitude);
        // the radius of the Earth
        double radius = 0;

        // switch on the units and assign the correct radius
        switch (units) {
            case "miles":
                radius = 3959.0;
                break;
            case "kilometers":
                radius = 6371.0;
                break;
            case "nautical miles":
                radius = 3440.0;
                break;
            default:
                return;
        }


        /**
         *  We have broken the formula into several lines, calculating the innermost components first and then plugging into a more general formula,
         *  Reference source to the haversineVincenty formula: https://en.wikipedia.org/wiki/Great-circle_distance (Vincenty formula)
         */

        double left_sqrt_component = Math.pow(Math.cos(destination_latitude) * Math.sin(delta_lambda), 2);
        double right_sqrt_component = Math.pow((Math.cos(origin_latitude) * Math.sin(destination_latitude)) - (Math.sin(origin_latitude) * Math.cos(destination_latitude) * Math.cos(delta_lambda)), 2);
        double numerator = Math.sqrt(left_sqrt_component + right_sqrt_component);
        double left_denominator_component = Math.sin(origin_latitude) * Math.sin(destination_latitude);
        double right_denominator_component = Math.cos(origin_latitude) * Math.cos(destination_latitude) * Math.cos(delta_lambda);
        double denominator = left_denominator_component + right_denominator_component;

        //Calculate the distance between the origin and the destination. 
        this.distance = (int)(Math.round(radius * Math.atan2(numerator, denominator)));
    }
}
