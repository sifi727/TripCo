package com.tripco.t07.server;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;


/*
  This class contains tests for the Greeting class.
 */

@RunWith(JUnit4.class)
public class TestGreeting {
    Greeting greeting;


    @Test
    public void testGreeting() {
        String name = "Team 07";
        String html = "<html><head></head><body><h1>Hello "+name+"!</h1></body></html>";
        assertEquals(greeting.html(name),html);
    }

}