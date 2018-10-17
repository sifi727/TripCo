import './enzyme.config.js'
import React from 'react'
import { mount } from 'enzyme'
import Itinerary from '../src/components/Application/Itinerary'

describe("Itinerary", () => {
  let props;
  let mountedItinerary;

  const itinerary = () => {
    if (!mountedItinerary) {
      mountedItinerary = mount(
          <Itinerary trip={props.trip}/>
      );
    }
    return mountedItinerary;
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
        title: "",
        options: {
          units: "miles",
        },
        places: [],
        distances: [],
        map: ""
      }
    };
    mountedItinerary = undefined;
  });

  describe("when `trip.distances.length` is zero", () => {
    it("does not render a Card", () => {
      const Cards = itinerary().find("Card");
      expect(Cards.length).toEqual(0);
    });

    it("does not render a table", () => {
      const Tables = itinerary().find("Table");
      expect(Tables.length).toEqual(0);
    });
  });

  describe("when `trip.distances.length` is null", () => {
    beforeEach(() => {
      props.trip.places = null;
    });

    it("does not render a Card", () => {
      const Cards = itinerary().find("Card");
      expect(Cards.length).toEqual(0);
    });

    it("does not render a table", () => {
      const Tables = itinerary().find("Table");
      expect(Tables.length).toEqual(0);
    });
  });

  describe("when `trip.distances.length` is undefined", () => {
    beforeEach(() => {
      props.trip.places = undefined;
    });

    it("does not render a Card", () => {
      const Cards = itinerary().find("Card");
      expect(Cards.length).toEqual(0);
    });

    it("does not render a table", () => {
      const Tables = itinerary().find("Table");
      expect(Tables.length).toEqual(0);
    });
  });

  describe("when `props.trip.distances.length` is greater than zero", () => {
    beforeEach(() => {
      props.trip.places = [{"id":"fake", "name":"Fake", "latitude":12.3456, "longitude":-123.4567}];
    });

    it("renders a single Card", () => {
      const Cards = itinerary().find("Card");
      expect(Cards.length).toEqual(1);
    });

    it("renders a two CardBodies", () => {
      const Cards = itinerary().find("CardBody");
      expect(Cards.length).toEqual(2);
    });

    it("renders a `Reverse Trip Order` button", () => {
      expect(itinerary().exists('#reverseButton')).toEqual(true);
    })

    it("renders a table", () => {
      const Tables = itinerary().find("Table");
      expect(Tables.length).toEqual(1);
    });

    it("adds the place to the table", () => {
      const rows = itinerary().find("tr");
      expect(rows.length).toEqual(3);    // 1) header row 2)start place 3) ending (copy of start)
    });

    it("updates `unitname` properly", () => {
      // TODO: need help testing this
    });

    it("updates `Leg Distance` properly", () => {
      // TODO: need help testing this
    });

    it("updates `Total Trip Distance` properly", () => {
      // TODO: need help testing this
    });
  });

  describe("when `props.tripHasChanged` is true", () => {
    beforeEach(() => {
      props.tripHasChanged = true;
      props.trip.places = [{"id":"fake0", "name":"Fake0", "latitude":12.3456, "longitude":-123.4567},
                            {"id":"fake1", "name":"Fake1", "latitude":23.4567, "longitude":-102.4567}];
    });

    it("renders a two CardBodies", () => {
      const Cards = itinerary().find("CardBody");
      expect(Cards.length).toEqual(2);
    });

    it("renders a `Reverse Trip Order` button", () => {
      expect(itinerary().exists('#reverseButton')).toEqual(true);
    })

    it("renders a table", () => {
      const Tables = itinerary().find("Table");
      expect(Tables.length).toEqual(1);
    });

    it("removes all of the distances", () => {
      // TODO: need help testing this
    });
  });
});