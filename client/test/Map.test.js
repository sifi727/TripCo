import './enzyme.config.js'
import React from 'react'
import { mount } from 'enzyme'
import Map from '../src/components/Application/Map'

describe("Map", () => {
  let props;
  let mountedMap;

  const map = () => {
    if (!mountedMap) {
      mountedMap = mount(
          <Map trip={props.trip}/>
      );
    }
    return mountedMap;
  };

  beforeEach(() => {
    props = {
      tripHasChanged: false,
      config: null,
      port: 8088,
      hostname: "localhost:",
      trip: {
        version: 3,
        type: "trip",
        title: "Kazoo",
        options: {
          units: "miles",
        },
        places: [],
        distances: [],
        map: ""
      }
    };
    mountedMap = undefined;
  });

  it("always renders a single Card", () => {
    const Cards = map().find("Card");
    expect(Cards.length).toEqual(1);
  });

  it("always renders a single level three header", () => {
    const headers = map().find("h3");
    expect(headers.length).toEqual(1);
  });
});