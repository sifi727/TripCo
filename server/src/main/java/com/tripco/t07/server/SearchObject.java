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
    ArrayList<Place> places ;

    public String createSearch(String match){

        String search = "select id,name,municipality,type,latitude,longitude from airports where ";
        String matcher = "name like '%" + match + "%' or id like '%" + match + "%' or municipality like '%" +
                 match + "%' or type like '%" + match + "%' or latitude like '%" + match + "%' or longitude like '%" + match + "%' order by name";
        search += matcher;

        return search;
    }

    public String applyLimit(Integer limit, String match, SearchObject searchObject){

        if(searchObject.limit == null){
            limit = 0;
        }

        match += " limit " + Integer.toString(limit) + ";";

        System.out.println("search string: "+match);
        return match;
    }

    public void updatePlaces(ArrayList<Place> places, ResultSet query) throws SQLException {
        System.out.println("called correctly");
        while(query.next()){
            System.out.println("found ");
            Place foundPLace = new Place();
            foundPLace.name = query.getString("name");
            foundPLace.id = query.getString("id");
            foundPLace.latitude = Double.parseDouble(query.getString("latitude"));
            foundPLace.longitude = Double.parseDouble(query.getString("longitude"));
            places.add(foundPLace);
            System.out.println(foundPLace);
        }
    }



}
