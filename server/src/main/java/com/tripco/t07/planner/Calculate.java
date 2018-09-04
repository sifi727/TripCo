package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

/** Class to handle distance calculation requests.
 * Parses requests to json and invokes Distance
 * methods to calculate total trip distance.
 * Provides method to obtain calculated
 * distance, converted to json, for response.
 */
public class Calculate {

  private Distance distance;

  /** Instantiate a Calculate object
   * using valid request data.
   */
  public Calculate(Request request) {
    // parse the request data.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // initialize distance object with request data.
    Gson gson = new Gson();
    distance = gson.fromJson(requestBody, Distance.class);

    // calculate total distance.
    distance.calculateTotalDistance();
  }

  /** Handles the response for a Distance object.
   * Does the conversion from a Java class to a Json string.*
   */
  public String getDistance() {
    Gson gson = new Gson();
    return gson.toJson(distance);
  }
}
