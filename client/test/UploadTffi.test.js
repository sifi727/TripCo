// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

/*  First we import our Enzyme configuration (1), this is defined in a different
 *    file and is require to use Enzyme for components. In addition to the standard
 *    imports you've seen before, we are using Enzyme.shallow (2), this "renders"
 *    your component but only for the first layer in the DOM (ie. <Itinerary/> will
 *    just render <Itinerary/> even though it may have more components under it.).
 *    Shallow rendering prevents problems with lower components from showing up in
 *    the tests of parent components.
*/

import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'              // (2)
import UploadTffi from '../src/components/Application/UploadTffi'




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
function updateTffi(object)
{
  return true;
}


/* Test example using a pre-defined function */
function testPlanTiffButtonDisabledAStartofPage() {
  console.log(startProps);
  console.log(updateTffi);

  const uploadTffi = shallow((
      <UploadTffi trip={startProps.trip} updateTffiObject={updateTffi}/>
));

  let actual = [];
  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);


}

function testPlanTiffButtonDisabledAndEnableWhenFileSelected() {
  console.log(startProps);
  console.log(updateTffi);

  const uploadTffi = shallow((
      <UploadTffi trip={startProps.trip} updateTffiObject={updateTffi}/>
));

  uploadTffi.setState({fileIsSelected:true});
  let actual = [];
  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([false]);


}
function testPlanTiffChangeFile() {

  var parentFunc = new Function("object", "expect(JSON.stringify(object)==JSON.stringify(tripTFFIVersion2).toEqual(true))");

  const uploadTffi = shallow((
      <UploadTffi trip={startProps.trip} updateTffiObject={parentFunc}/>
));
  var tripTFFIVersion2 = {
    "version"   : 2,
    "type"      : "trip",
    "title"     : "Shopping loop",
    "options" : {
      "units"        : "miles"
    },
    "places"    : [
      {"id":"dnvr", "name":"Denver", "latitude":39.7392, "longitude":-104.9903},
      {"id":"bldr", "name":"Boulder", "latitude":40.01499, "longitude":-105.27055},
      {"id":"foco", "name":"Fort Collins", "latitude":40.58258, "longitude":-105.084419}
    ]

  };

  let actual = [];

  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([true]);





  expect(uploadTffi.exists('#FileTffiInputFieldId')).toEqual(true);

   uploadTffi.find('#FileTffiInputFieldId').simulate('change',{target: {files:[ new Blob([JSON.stringify(tripTFFIVersion2, null, 2)], {type : 'application/json'})] }});


  actual = [];
  uploadTffi.find('#PlanTffiButtonId').map((element) => actual.push(element.prop('disabled')));
  expect(actual).toEqual([false]);


}



test('Check to see if button is created and disabled (Function)', testPlanTiffButtonDisabledAStartofPage);
test('Check to see if button is enabled when file is selected(Function)', testPlanTiffButtonDisabledAndEnableWhenFileSelected);
test('Check to see if file upload on change(Function)', testPlanTiffChangeFile);
