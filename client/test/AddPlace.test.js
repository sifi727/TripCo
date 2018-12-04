import './enzyme.config.js'
import React from 'react'
import {shallow} from 'enzyme'
import AddPlace from '../src/components/Application/AddPlace'

function testAddButton() {
  var prop = null;
  const expectedProps = {"id": "testId", "name": "The test place", "latitude": 39.7392, "longitude": -104.9903, "municipality": "test", "region": "testRegion", "country": "England", "continent": "Europe", "collapse": false};
  const addPlace = shallow((<AddPlace AddPlace addPlace={(object) => {
    prop = object
  }}/>));
  expect(addPlace.exists('#AddPlaceButtonAddId')).toEqual(true);
  addPlace.setState({"longitude": -104.9903});
  addPlace.setState({"latitude": 39.7392});
  addPlace.setState({"id": "testId"});
  addPlace.setState({"name": "The test place"});
  addPlace.setState({"municipality": "test"});
  addPlace.setState({"region": "testRegion"});
  addPlace.setState({"country": "England"});
  addPlace.setState({"continent": "Europe"});

  addPlace.find('#AddPlaceButtonAddId').simulate('click');

  expect(prop).toEqual(expectedProps);
  expect(addPlace.state().continent).toEqual("");
  expect(addPlace.state().country).toEqual("");
  expect(addPlace.state().id).toEqual("");
  expect(addPlace.state().longitude).toEqual("");
  expect(addPlace.state().latitude).toEqual("");
  expect(addPlace.state().name).toEqual("");
  expect(addPlace.state().municipality).toEqual("");
  expect(addPlace.state().region).toEqual("");
}

function testContinentInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputContinentId')).toEqual(true);
  expect(addPlace.state().continent).toEqual("");
  addPlace.find('#AddPlaceInputContinentId').simulate('change', {
    target: {
      value: "The name of the continent is test place"
    }
  });
  expect(addPlace.state().continent).toEqual("The name of the continent is test place");
}

function testCountryInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputCountryId')).toEqual(true);
  expect(addPlace.state().country).toEqual("");
  addPlace.find('#AddPlaceInputCountryId').simulate('change', {
    target: {
      value: "The name of the country is test place"
    }
  });
  expect(addPlace.state().country).toEqual("The name of the country is test place");
}

function testIdInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputPlaceIdId')).toEqual(true);
  expect(addPlace.state().id).toEqual("");
  addPlace.find('#AddPlaceInputPlaceIdId').simulate('change', {
    target: {
      value: "The name of the id is test place"
    }
  });
  expect(addPlace.state().id).toEqual("The name of the id is test place");
}

function testLatitudeInput() {

  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputLatitudeId')).toEqual(true);
  expect(addPlace.state().latitude).toEqual("");
  addPlace.find('#AddPlaceInputLatitudeId').simulate('change', {
    target: {
      value: 50
    }
  });
  expect(addPlace.state().latitude).toEqual(50);
}

function testLongitudeInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputLongitudeId')).toEqual(true);
  expect(addPlace.state().longitude).toEqual("");
  addPlace.find('#AddPlaceInputLongitudeId').simulate('change', {
    target: {
      value: 65
    }
  });
  expect(addPlace.state().longitude).toEqual(65);
}

function testMuniciplaityInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputMunicipalityId')).toEqual(true);
  expect(addPlace.state().municipality).toEqual("");
  addPlace.find('#AddPlaceInputMunicipalityId').simulate('change', {
    target: {
      value: "The name of the municipality is test place"
    }
  });
  expect(addPlace.state().municipality).toEqual("The name of the municipality is test place");
}

function testNameInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputNameId')).toEqual(true);
  expect(addPlace.state().name).toEqual("");
  addPlace.find('#AddPlaceInputNameId').simulate('change', {
    target: {
      value: "The name of the place is test place"
    }
  });
  expect(addPlace.state().name).toEqual("The name of the place is test place");
}

function testRegionInput() {
  const addPlace = shallow((<AddPlace AddPlace addPlace={() => {
  }}/>));
  expect(addPlace.exists('#AddPlaceInputRegionId')).toEqual(true);
  expect(addPlace.state().region).toEqual("");
  addPlace.find('#AddPlaceInputRegionId').simulate('change', {
    target: {
      value: "The name of the region is test place"
    }
  });
  expect(addPlace.state().region).toEqual("The name of the region is test place");
}

test("Test Add button rendered and update state", testAddButton());
test("Test continent field rendered and update state", testContinentInput());
test("Test country field rendered and update state", testCountryInput());
test("Test Id field rendered and update state", testIdInput());
test("Test longitude field rendered and update state", testLongitudeInput());
test("Test latitude field rendered and update state", testLatitudeInput());
test("Test municipality field rendered and update state", testMuniciplaityInput());
test("Test name field rendered and update state", testNameInput());
test("Test region field rendered and update state", testRegionInput());