// Note the name of this file has X.test.js. Jest looks for any files with this pattern.


import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'              // (2)
import PlanUtilities from '../src/components/Application/PlanUtilities'




const  startProps = {
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
 *This function test the Plan button is disabled when PlanUtilities is created and file has not been uploaded
*/
function testPlanTiffButtonDisabledAStartofPage() {

  var parentFunc = new Function("object", ""); //do nothing

  const uploadTffi = shallow((
      <PlanUtilities trip={startProps.trip} updateTffiObject={parentFunc}/>
));

  let actual = [];
  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);


}
/**
 * This function test the Plan button will be enabled when fileIsSelected is true
 */

function testPlanTiffButtonDisabledAndEnableWhenFileSelectedIsTrue() {

  var parentFunc = new Function("object", ""); //do nothing

  const uploadTffi = shallow((
      <PlanUtilities trip={startProps.trip} updateTffiObject={parentFunc}/>
));

  uploadTffi.setState({fileIsSelected: true});
  let actual = [];
  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([false]);
}



/**
 *This function test the Plan button will be enabled when a file is selected.
 */

function testPlanTiffChangeFile() {

  var parentFunc = new Function("object",
      "expect(JSON.stringify(object)==JSON.stringify(tripTFFIVersion2).toEqual(true))");

  const uploadTffi = shallow((
      < PlanUtilities trip = {startProps.trip} updateTffiObject = {parentFunc} />
));


  let actual = [];

  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);

  expect(uploadTffi.exists('#FileTffiInputFieldId')).toEqual(true);

  uploadTffi.find('#FileTffiInputFieldId').simulate('change', {
    target: {
      files: [new Blob([JSON.stringify(tripTFFIVersion2, null, 2)],
          {type: 'application/json'})]
    }
  });

  actual = [];
  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([false]);
}
//Test functions calls below//

test('Check to see if button is created and disabled (Function)', testPlanTiffButtonDisabledAStartofPage);
test('Check to see if button is enabled when file is selected(Function)', testPlanTiffButtonDisabledAndEnableWhenFileSelectedIsTrue);

//Currently SKIP this test because we could not figure out how to test FileReader.onload because of event change was not complete in firing before expected were checked.
test.skip('Check to see if file upload on change(Function)', testPlanTiffChangeFile);