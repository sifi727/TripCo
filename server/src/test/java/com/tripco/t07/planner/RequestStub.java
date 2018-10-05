package com.tripco.t07.planner;

import spark.Request;

public class RequestStub extends Request {
  private String tffi;

  // Implement the methods needed
  // I fake my return values
  public RequestStub(){
    super();
  }

  public void setTffi(String tffi) {
    this.tffi = tffi;
  }

  @Override
  public String body (){
    return tffi;
  }
}