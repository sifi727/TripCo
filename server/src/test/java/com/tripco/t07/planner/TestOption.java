package com.tripco.t07.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/*
  This class contains test(s) for the Option class.
 */
@RunWith(JUnit4.class)
public class TestOption {
    Option option;

    String optimization;
    String unitName;
    Double unitRadius;
    String units;

    // Setup to be done before every test in TestOption
    @Before
    public void initialize() {
        option = new Option();

        option.optimization = "short";
        option.unitName = "accurate miles";
        option.unitRadius = 3958.7613;
        option.units = "user defined";
    }

    @Test
    public void testPlace() {
        optimization = "short";
        unitName = "accurate miles";
        unitRadius = 3958.7613;
        units = "user defined";

        assertEquals(optimization, option.optimization);
        assertEquals(unitName, option.unitName);
        assertEquals(unitRadius, option.unitRadius);
        assertEquals(units, option.units);
    }
}
