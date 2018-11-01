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
        //Creating the search string for the database
        String search = "select id,name,municipality,type,latitude,longitude from airports where ";

        String temp = "name like '%" + match + "%' or id like '%" + match + "%' or ";
        search += temp;

        temp = "municipality like '%" + match + "%' or type like '%" + match + "%' or ";
        search += temp;

        temp = "latitude like '%" + match + "%' or longitude like '%" + match + "%'";
        search += temp;

        return search;
    }

    public String applyLimit(Integer limit, String match, SearchObject searchObject){
        //Applying the limit of the search, if provided by the user

        if(searchObject.limit == null){
            limit = 0;
        }

        if(limit > 0){
            match += " limit " + Integer.toString(limit) + ";";
        }
        else{
            match += " limit 30;";
        }

        return match;
    }

    public void updatePlaces(ArrayList<Place> places, ResultSet query) throws SQLException {
        //Processing the data returned from the database into the places ArrayList
        while(query.next()){
            Place placeSearch = new Place();
            placeSearch.name = query.getString("name");
            placeSearch.id = query.getString("id");
            placeSearch.latitude = Double.parseDouble(query.getString("latitude"));
            placeSearch.longitude = Double.parseDouble(query.getString("longitude"));
            places.add(placeSearch);
        }
    }



}
