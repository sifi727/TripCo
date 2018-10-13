import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import AddPlace from '../src/components/Application/AddPlace'




function testLatitudeInput(){
 const prop = {
    trip: {
      version: 3,
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
    const addPlace = shallow((<AddPlace trip={prop.trip}/>));
    expect(addPlace.exists('#AddPlaceInputLatitudeId')).toEqual(true);
    expect(addPlace.state().latitude).toEqual(null);
    addPlace.find('#AddPlaceInputLatitudeId').simulate('change', {
    target: {
      value:50
    }});
    expect(addPlace.state().latitude).toEqual(50);
}


function testLongitudeInput(){
  const prop = {
    trip: {
      version: 3,
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
  const addPlace = shallow((<AddPlace trip={prop.trip}/>));
  expect(addPlace.exists('#AddPlaceInputLongitudeId')).toEqual(true);
  expect(addPlace.state().longitude).toEqual(null);
  addPlace.find('#AddPlaceInputLongitudeId').simulate('change', {
    target: {
      value:65
    }});
  expect(addPlace.state().longitude).toEqual(65);

}

function testAddButton(){
  const prop = {
    trip: {
      version: 3,
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
  const addPlace = shallow((<AddPlace trip={prop.trip}/>));
  expect(addPlace.exists('#AddPlaceButtonAddId')).toEqual(true);

}
function testNameInput(){
  const prop = {
    trip: {
      version: 3,
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
  const addPlace = shallow((<AddPlace trip={prop.trip}/>));
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