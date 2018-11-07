package com.tripco.t07.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

/*
  This class contains tests for the Config class.
 */
@RunWith(JUnit4.class)

public class TestConfig {
    Config config;

    short version;
    String type;
    List<String> units;

    // Setup to be done before every test in TestConfig
    @Before
    public void initialize() {
        version = 4;
        type = "config";
        units = Arrays.asList("miles", "kilometers", "nautical miles", "user defined");
    }

    @Test
    public void testConfigConstructor() {
        // create a new config object directly
        config = new Config();

        assertEquals(version, config.getVersion());
        assertEquals(type, config.getType());
        assertEquals(units, config.getUnits());
    }


    @Test

    public void testGetConfigMethod() {
        String expectedConfigTffi = "{\"version\":" + version + ",\"type\":\"config\",\""+
            "units\":[\"miles\",\"kilometers\",\"nautical miles\",\"user defined\"],"+
            "\"optimization\":[{\"label\":\"none\",\"description\":\"The trip is not optimized.\"}"+
            ",{\"label\":\"short\",\"description\":\"Nearest neighbor.\"},{\"label\":\"shorter\",\"description\":\"2-opt.\"}],\"attributes\":[\"name\",\"id\",\"latitude\",\"longitude\"]}";

        // create a new config object directly
        config = new Config();
        String actualConfigTffi = config.getConfig();

        assertEquals(expectedConfigTffi, actualConfigTffi);
    }
}
