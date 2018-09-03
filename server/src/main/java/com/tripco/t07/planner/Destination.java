package com.tripco.t07.planner;

public class Distance
{
    //The variables in this class should match the REST API definition.
    private String type;
    private int version;
    private Place origin;
    private Place destination;
    private String units;
    private int distance;

    //class getters (or accessors)
    public String getType()
    {
        return this.type;
    }

    public int getVersion()
    {
        return this.version;
    }

    public Place getOrigin()
    {
        return this.origin;
    }

    public Place getDestination()
    {
        return this.destination;
    }

    public String getUnits()
    {
        return this.units;
    }

    public int getDistance()
    {
        return this.distance;
    }


    //class setters (or mutators)
    public void setType(String type)
    {
        this.type = type;
    }

    public void setVersion(int version)
    {
        this.version = version;
    }

    public void setOrigin(Place origin)
    {
        this.origin = origin;
    }

    public void setDestination(Place destination)
    {
        this.destination = destination;
    }

    public void setUnits(String units)
    {
        this.units = units;
    }

    public void setDistance(int distance)
    {
        this.distance = distance;
    }


    //class methods

    //This calls a helper method haversineVincenty().
    public void calculateTotalDistance(Place origin, Place destination)
    {
        haversineVincenty(origin, destination);
    }

    private void haversineVincenty(Place origin, Place destination)
    {
        //We have to covert the latitude and longitude angles from degrees to radians.
        //The latitude and longitude are also String variables so they will have to be converted to doubles for the formula.
        double origin_latitude = Math.toRadians(Double.valueOf(origin.latitude));
        double origin_longitude = Math.toRadians(Double.valueOf(origin.longitude));
        double destination_latitude = Math.toRadians(Double.valueOf(destination.latitude));
        double destination_longitude = Math.toRadians(Double.valueOf(destination.longitude));

        this.distance = Math.atan(Math.sqrt(Math.pow(Math.cos(destination_latitude) + Math.sin(origin_longitude - destination_longitude), 2) + Math.pow((Math.cos(origin_latitude) * Math.sin(destination_latitude)) - (Math.sin(origin_latitude) * Math.cos(destination_latitude) * Math.cos(origin_longitude - destination_longitude), 2)))/((Math.sin(origin_latitude) * Math.sin(destination_latitude)) + (Math.cos(origin_latitude) * Math.cos(destination_latitude) * Math.cos(origin_longitude - destination_longitude))));
    }
}
