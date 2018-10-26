// Note the name of this file has X.test.js. Jest looks for any files with this pattern.


import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'              // (2)
import Calculator from '../src/components/Application/Calculator'


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

function testUpdateOriginLatitude() {
  const calculator = shallow((<Calculator options={startProps.trip.options} />));
  expect(calculator.exists('#CalculatorLatitudeOriginId')).toEqual(true);


  calculator.find('#CalculatorLatitudeOriginId').simulate('change', {
    target: {
      value:50
    }
  });
  expect(calculator.state().distance.origin.latitude).toEqual(50);

}

function testUpdateOriginLongitude() {
  const calculator = shallow((<Calculator options={startProps.trip.options} />));
  expect(calculator.exists('#CalculatorLongitudeOriginId')).toEqual(true);


  calculator.find('#CalculatorLongitudeOriginId').simulate('change', {
    target: {
      value:50
    }
  });
  expect(calculator.state().distance.origin.longitude).toEqual(50);

}

function testUpdateDestinationLatitude() {
  const calculator = shallow((<Calculator options={startProps.trip.options} />));
  expect(calculator.exists('#CalculatorLatitudeDestinationId')).toEqual(true);


  calculator.find('#CalculatorLatitudeDestinationId').simulate('change', {
    target: {
      value:50
    }
  });
  expect(calculator.state().distance.destination.latitude).toEqual(50);

}

function testUpdateDestinationLongitude() {
  const calculator = shallow((<Calculator options={startProps.trip.options} />));
  expect(calculator.exists('#CalculatorLongitudeDestinationId')).toEqual(true);


  calculator.find('#CalculatorLongitudeDestinationId').simulate('change', {
    target: {
      value:50
    }
  });
  expect(calculator.state().distance.destination.longitude).toEqual(50);

}

function testUserDefinedFieldsShownWhenSelected() {
  const propsToPassIn = {
    config: null,
    trip: {
      version: 2,
      type: "trip",
      title: "",
      options: {
        units: "user defined",
        unitRadius: 20,
        unitName: "Random User Defined Units"

      },
      places: [],
      distances: [],
      map: ""
    }
  };

  const calculator = shallow((<Calculator options={propsToPassIn.trip.options} />));


  expect(calculator.exists('#DistanceField')).toEqual(true);
  expect(calculator.exists('#DistanceFieldUnits')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadiusName')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadius')).toEqual(true);


}

function testUserDefinedFieldsNotShownWhenNotSelected() {
  const calculator = shallow((<Calculator options={startProps.trip.options} />));


  expect(calculator.exists('#DistanceField')).toEqual(true);
  expect(calculator.exists('#DistanceFieldUnits')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadiusName')).toEqual(false);
  expect(calculator.exists('#DistanceFieldCustomRadius')).toEqual(false);


}

function testUserDefinedFieldsUnitNameEmpty() {
  const propsToPassIn = {
    config: null,
    trip: {
      version: 2,
      type: "trip",
      title: "",
      options: {
        units: "user defined",
        unitRadius: 20,
        unitName: ""

      },
      places: [],
      distances: [],
      map: ""
    }
  };

  const calculator = shallow((<Calculator options={propsToPassIn.trip.options} />));


  expect(calculator.exists('#DistanceField')).toEqual(true);
  expect(calculator.exists('#DistanceFieldUnits')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadiusName')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadius')).toEqual(true);
  let actual = [];
  calculator.find('#DistanceFieldUnits').map((element) => actual.push(element.prop('value')));
  expect(actual.length).toEqual(1);
  expect(actual[0]).toEqual("Unit: User defined");

}

function testUserDefinedFieldsUnitNamePopululated() {
  const propsToPassIn = {
    config: null,
    trip: {
      version: 2,
      type: "trip",
      title: "",
      options: {
        units: "user defined",
        unitRadius: 20,
        unitName: "Random User Defined Units"

      },
      places: [],
      distances: [],
      map: ""
    }
  };

  const calculator = shallow((<Calculator options={propsToPassIn.trip.options} />));


  expect(calculator.exists('#DistanceField')).toEqual(true);
  expect(calculator.exists('#DistanceFieldUnits')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadiusName')).toEqual(true);
  expect(calculator.exists('#DistanceFieldCustomRadius')).toEqual(true);
  let actual = [];
  calculator.find('#DistanceFieldUnits').map((element) => actual.push(element.prop('value')));
  expect(actual.length).toEqual(1);
  expect(actual[0]).toEqual("Unit: Random User Defined Units");

}

function testDistanceNotShownWhenUnitDifferent(){
    const initProps = {
            options: {
                units: "miles"
            }
    };

    const calculator = shallow((<Calculator options={initProps.options} />));
    let initVal= calculator.find('#DistanceField').prop('value');
    expect(initVal).toEqual(0);

    let currentProps = calculator.instance().props;
    currentProps.options.units="kilometers";
    calculator.setProps({options:currentProps.options});
    let changedVal= calculator.find('#DistanceField').prop('value');
    expect(changedVal).toEqual("");

    currentProps = calculator.instance().props;
    currentProps.options.units="miles";
    calculator.setProps({options:currentProps.options});
    let revertVal= calculator.find('#DistanceField').prop('value');
    expect(revertVal).toEqual(0);

}





test('Checks to see that distance origin latitude is updated',testUpdateOriginLatitude())
test('Checks to see that distance origin longitude is updated',testUpdateOriginLongitude());
test('Checks to see that distance destination in latitude is updated',testUpdateDestinationLatitude());
test('Checks to see that distance destination longitude is updated',testUpdateDestinationLongitude());
test("Checks to see that when parent component user Defined unit is selected it is shown in Calculator", testUserDefinedFieldsShownWhenSelected());
test("Checks to see that when parent component user Defined unit when not selected it is shown in Calculator", testUserDefinedFieldsNotShownWhenNotSelected());
test("Checks to see that when parent component user Defined unit with out name rendered correct", testUserDefinedFieldsUnitNameEmpty());
test("Checks to see that when parent component user Defined unit with name rendered correct", testUserDefinedFieldsUnitNamePopululated());

test("Checks to see that when parent component changes units calculated distance value is not shown", testDistanceNotShownWhenUnitDifferent());