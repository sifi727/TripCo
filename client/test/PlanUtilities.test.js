// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

import './enzyme.config.js'                   // (1)
import React from 'react'
import {shallow} from 'enzyme'              // (2)
import PlanUtilities from '../src/components/Application/PlanUtilities'

const startProps = {
  config: null,
  trip: {
    version: 2,
    type: "trip",
    title: "",
    options: {
      units: "miles"
    },
    places: [],
    distances: [],
    map: ""
  }
};

var tripTFFIVersion2 = {
  "version": 2,
  "type": "trip",
  "title": "Shopping loop",
  "options": {
    "units": "miles"
  },
  "places": [
    {
      "id": "dnvr",
      "name": "Denver",
      "latitude": 39.7392,
      "longitude": -104.9903
    },
    {
      "id": "bldr",
      "name": "Boulder",
      "latitude": 40.01499,
      "longitude": -105.27055
    },
    {
      "id": "foco",
      "name": "Fort Collins",
      "latitude": 40.58258,
      "longitude": -105.084419
    }
  ]
};

/**
 *  This function tests that the Plan button is
 *  disabled when PlanUtilities is created
 */
function testPlanTffiButtonDisabledAtStartofPage() {

  var parentFunc = new Function("object", ""); //do nothing

  const planUtil = shallow((
      <PlanUtilities trip={startProps.trip} updateTffiObject={parentFunc}/>
  ));

  let actual = [];
  planUtil.find('#PlanTffiButtonId').map(
      (element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);

}

/**
 *   This function tests that the Plan button will
 *   stay disabled when a file with
 *   no places gets uploaded
 */

function testPlanTffiButtonDisabledWhenABlankFileIsUploaded() {

  var parentFunc = new Function("object", ""); //do nothing

  const planUtil = shallow((
      <PlanUtilities trip={startProps.trip} updateTffiObject={parentFunc}/>
  ));

  planUtil.setState({fileIsSelected: true});
  let actual = [];
  planUtil.find('#PlanTffiButtonId').map(
      (element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);

}

/**
 *   This function test that the Plan button will
 *   be enabled when the TFFI object has valid places
 */

function testPlanTffiButtonEnabledWhenTffiHasPlaces() {

  var parentFunc = new Function("object", ""); //do nothing

  const planUtil = shallow((
      <PlanUtilities trip={tripTFFIVersion2} updateTffiObject={parentFunc}/>
  ));

  let actual = [];
  planUtil.find('#PlanTffiButtonId').map(
      (element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([false]);
}

/**
 *   This function test that the Plan button will
 *   be enabled when a file is selected.
 */

function testPlanTffiChangeFile() {

  var parentFunc = new Function("object",
      "expect(JSON.stringify(object)==JSON.stringify(tripTFFIVersion2).toEqual(true))");

  const planUtil = shallow((
      <PlanUtilities trip={startProps.trip} updateTffiObject={parentFunc}/>
  ));

  let actual = [];

  planUtil.find('#PlanTffiButtonId').map(
      (element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);

  expect(planUtil.exists('#FileTffiInputFieldId')).toEqual(true);

  planUtil.find('#FileTffiInputFieldId').simulate('change', {
    target: {
      files: [new Blob([JSON.stringify(tripTFFIVersion2, null, 2)],
          {type: 'application/json'})]
    }
  });

  actual = [];
  planUtil.find('#PlanTffiButtonId').map(
      (element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([false]);
}

//Test functions calls below//

test('Check to see if _Plan_ button is created and disabled (Function)',
    testPlanTffiButtonDisabledAtStartofPage);
test(
    'Check to see if _Plan_ button remains disabled when file with no places is uploaded (Function)',
    testPlanTffiButtonDisabledWhenABlankFileIsUploaded);
test(
    'Check to see if _Plan_ button is enabled when file with valid places is uploaded (Function)',
    testPlanTffiButtonEnabledWhenTffiHasPlaces);

//Currently SKIP this test because we could not figure out how to test FileReader.onload because of event change was not complete in firing before expected were checked.
test.skip('Check to see if file upload on change (Function)',
    testPlanTffiChangeFile);