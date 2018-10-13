import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import AddPlace from '../src/components/Application/AddPlace'




function testLatitudeInput(){

    const addPlace = shallow((<AddPlace AddPlace addPlace={()=>{}}/>));
    expect(addPlace.exists('#AddPlaceInputLatitudeId')).toEqual(true);
    expect(addPlace.state().latitude).toEqual("");
    addPlace.find('#AddPlaceInputLatitudeId').simulate('change', {
    target: {
      value:50
    }});
    expect(addPlace.state().latitude).toEqual(50);
}


function testLongitudeInput(){
  const addPlace = shallow((<AddPlace AddPlace addPlace={()=>{}}/>));
  expect(addPlace.exists('#AddPlaceInputLongitudeId')).toEqual(true);
  expect(addPlace.state().longitude).toEqual("");
  addPlace.find('#AddPlaceInputLongitudeId').simulate('change', {
    target: {
      value:65
    }});
  expect(addPlace.state().longitude).toEqual(65);

}

function testAddButton(){
  var prop = null;
  const expectedProps =   {"id":"testId", "name":"The test place", "latitude":39.7392, "longitude":-104.9903};
  const addPlace = shallow((<AddPlace AddPlace addPlace={(object)=>{prop=object}}/>));
  expect(addPlace.exists('#AddPlaceButtonAddId')).toEqual(true);
  addPlace.setState({"longitude":-104.9903});
  addPlace.setState({"latitude":39.7392});
  addPlace.setState({"id":"testId"});
  addPlace.setState({"name":"The test place"});

  addPlace.find('#AddPlaceButtonAddId').simulate('click');



  expect(prop).toEqual(expectedProps);
  expect(addPlace.state().longitude).toEqual("");
  expect(addPlace.state().latitude).toEqual("");
  expect(addPlace.state().name).toEqual("");
  expect(addPlace.state().id).toEqual("");



}
function testNameInput(){
  const addPlace = shallow((<AddPlace AddPlace addPlace={()=>{}}/>));
  expect(addPlace.exists('#AddPlaceInputNameId')).toEqual(true);
  expect(addPlace.state().name).toEqual("");
  addPlace.find('#AddPlaceInputNameId').simulate('change', {
    target: {
      value: "The name of the place is test place"
    }});
  expect(addPlace.state().name).toEqual("The name of the place is test place");

}
test("Test latitude field rendered and update state",testLatitudeInput());
test("Test longitude field rendered and update state",testLongitudeInput());
test("Test Add button rendered and update state",testAddButton());
test("Test name field rendered and update state",testNameInput());