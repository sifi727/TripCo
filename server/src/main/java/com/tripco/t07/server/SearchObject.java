package com.tripco.t07.server;

import com.tripco.t07.planner.Place;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;


public class SearchObject {
    String type;
    Integer version;
    String match;
    Integer limit;
    ArrayList<Place> places;
    Integer found;
    ArrayList<String> filters;




    public String createSearch(String match){


        String search = "SELECT world_airports.name as name, world_airports.municipality as municipality, region.name as region, country.name as country,\n"
            + "continents.name as continents, world_airports.latitude, world_airports.longitude,world_airports.id, world_airports.type as type\n"
            + "FROM continents\n"
            + "INNER JOIN country ON continents.id = country.continent\n"
            + "INNER JOIN region ON country.id = region.iso_country\n"
            + "INNER JOIN world_airports ON region.id = world_airports.iso_region\n"
            + "Where ";


        String matcher = "world_airports.name like '%" + match + "%' or world_airports.id like '%" + match + "%' or municipality like '%" +
                 match + "%' or type like '%" + match + "%' or latitude like '%" + match + "%' or longitude like '%" + match + "%' order by world_airports.name";
        search += matcher;

        return search;
    }


    public String applyLimit(Integer limit, String match, SearchObject searchObject){

        if(searchObject.limit == null || limit == 0){
          return match; //no limit except DB limit
        }

        match += " limit " + Integer.toString(limit) + ";";
        return match;
    }

    public String createCount(String match)
    {
        String countQuery = "SELECT count(*) as found\n"
            + "FROM continents\n"
            + "INNER JOIN country ON continents.id = country.continent\n"
            + "INNER JOIN region ON country.id = region.iso_country\n"
            + "INNER JOIN world_airports ON region.id = world_airports.iso_region\n"
            + "Where ";


        String matcher = "world_airports.name like '%" + match + "%' or world_airports.id like '%" + match + "%' or municipality like '%" +
            match + "%' or type like '%" + match + "%' or latitude like '%" + match + "%' or longitude like '%" + match + "%' order by world_airports.name";
        countQuery += matcher;

        return countQuery;
    }


    public static void updatePlaces(ArrayList<Place> places, ResultSet query) throws SQLException {
        while (query.next()) {
            Place foundPLace = new Place();
            foundPLace.name = query.getString("name");
            foundPLace.id = query.getString("id");
            foundPLace.latitude = Double.parseDouble(query.getString("latitude"));
            foundPLace.longitude = Double.parseDouble(query.getString("longitude"));
            places.add(foundPLace);
        }
    }

        public static void updateFound(SearchObject search, ResultSet query) throws SQLException{
        query.next();
            search.found= Integer.parseInt(query.getString("found"));
        }






}
