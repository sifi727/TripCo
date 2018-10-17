import './enzyme.config.js'
import React from 'react'
import { mount } from 'enzyme'
import Info from '../src/components/Application/Info'

describe("Info", () => {
  let mountedInfo;

  const info = () => {
    if (!mountedInfo) {
      mountedInfo = mount(
          <Info/>
      );
    }
    return mountedInfo;
  };

  beforeEach(() => {
    mountedInfo = undefined;
  });

  it("always renders a div", () => {
    const divs = info().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always renders a single Card", () => {
    const Cards = info().find("Card");
    expect(Cards.length).toEqual(1);
  });
});