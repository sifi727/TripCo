import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import AddPlace from '../src/components/Application/AddPlace'




function testLatitudeInputExists(){
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
}


function testLongitudeInputExists(){
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
  //   actual = [];
  //   addPlace.find('#AddPlaceLatitudeInputId').map((element) => actual.push(element.prop('value')));
  //   expect(actual.length).
  // calculator.find('#DistanceFieldUnits').map((element) => actual.push(element.prop('value')));
  //};

}

function testAddButtonInputExists(){
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
test("Test latitude field rendered",testLatitudeInputExists());
test("Test longitude field rendered",testLongitudeInputExists());
test("Test Add button rendered",testAddButtonInputExists());