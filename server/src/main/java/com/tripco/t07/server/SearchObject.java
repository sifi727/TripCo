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
    ArrayList<Filter> filters;

private String addFilters()
{
    if(filters!=null && filters.isEmpty()==false) {
        String filterMatch = "(";
        for(int i=0; i<filters.size(); i++)
        {
            Filter filter = filters.get(i);
            for(int j=0; j<filter.values.length; j++) {
                String value = filter.values[j];
                filterMatch = filterMatch + filter.name + " like " + "'%"+value+"%'";
                if (j + 1 < filter.values.length) {
                    filterMatch = filterMatch + " or ";
                }

            }

        }
        return filterMatch +")";

    }
    return "";
}
private String createMatcher(String match) {
    String matcher = "";
    if(match==null || "".equals(match))
    {
        if(filters==null || filters.isEmpty()) {
            return  " order by world_airports.name ";
        }

        return "Where"+addFilters()+ " order by world_airports.name ";
    }

     matcher = "Where (region.name like '%"+ match +"%' or country.name like '%" + match +"%' or continents.name  like '%"+ match +"%' or world_airports.name like '%" + match + "%' or world_airports.id like '%" + match + "%' or municipality like '%" +
        match + "%' or type like '%" + match + "%' or latitude like '%" + match + "%' or longitude like '%" + match + "%')";
    if(filters!=null && filters.isEmpty()==false) {
        matcher = matcher + " AND " + addFilters();
    }

    matcher = matcher + " order by world_airports.name ";

    return matcher;
}

    public String createSearch(String match){


        String search = "SELECT world_airports.name as name, world_airports.municipality as municipality, region.name as region, country.name as country,\n"
            + "continents.name as continents, world_airports.latitude, world_airports.longitude,world_airports.id, world_airports.type as type\n"
            + "FROM continents\n"
            + "INNER JOIN country ON continents.id = country.continent\n"
            + "INNER JOIN region ON country.id = region.iso_country\n"
            + "INNER JOIN world_airports ON region.id = world_airports.iso_region ";
        search += createMatcher(match);

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
            + "INNER JOIN world_airports ON region.id = world_airports.iso_region\n";


        countQuery += createMatcher(match);

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
