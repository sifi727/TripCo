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
    expect(addPlace.exists('#AddPlaceInputLongitudeOriginId')).toEqual(true);
  //   actual = [];
  //   addPlace.find('#AddPlaceLatitudeInputId').map((element) => actual.push(element.prop('value')));
  //   expect(actual.length).
  // calculator.find('#DistanceFieldUnits').map((element) => actual.push(element.prop('value')));
  //};


}

test("Test that a latitude field exists",testLatitudeInputExists());