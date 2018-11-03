package com.tripco.t07.server;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.List;

public class Config {

  private short version = 4;
  private String type = "config";

  private List<String> units = Arrays
      .asList("miles", "kilometers", "nautical miles", "user defined");
  private List<OptimizationLevel> optimization = Arrays
      .asList(new OptimizationLevel("none", "The trip is not optimized."),
          new OptimizationLevel("short", "Nearest neighbor."),
              new OptimizationLevel("shorter", "2-opt."));
  private List<String> attributes = Arrays.asList("name", "id", "latitude", "longitude");


  //Getter methods for testing.
  public short getVersion() {
    return this.version;
  }

  public String getType() {
    return this.type;
  }

  public List<String> getUnits() {
    return this.units;
  }

  static String getConfig() {
    Config conf = new Config();
    Gson gson = new Gson();

    return gson.toJson(conf);
  }
}
