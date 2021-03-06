import  React, { Component } from 'react';

// Stylesheet required for leaflet to function
// You must include this import
import 'leaflet/dist/leaflet.css';
// react-leaflet items
import { Map, TileLayer, Polyline } from 'react-leaflet';
import {Button, Card, CardBody, Col, Collapse, Row} from "reactstrap";


class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        collapse: true
    };
    this.getLabel = this.getLabel.bind(this);
    this.needToWrapAroundMap= this.needToWrapAroundMap.bind(this);
    this.toggle = this.toggle.bind(this);
};

    getLabel() {
        // return the correct symbol based on state
        if(this.state.collapse) {
            return "-";
        }
        return "Show Map";
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

  needToWrapAroundMap(place1Long, place2Long) {
  return (Math.abs(place1Long-place2Long)>180); //need to take in account going left and right off map
}


  render() {
    // We can limit users to only a certain area, by giving the bottom left and top right corners
    let bounds = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
    // A starting position to center the map at
    let position = [15, -15];


    let placesTrip = [];
    let copyOfPlaces=this.props.trip.places.slice();


    let maplatLong = [];
    if(copyOfPlaces.length>0)
    {
      maplatLong.push([copyOfPlaces[0].latitude,copyOfPlaces[0].longitude]);
      copyOfPlaces.push(this.props.trip.places[0]); //make round trip;
    }
     for(var i = 1; i<copyOfPlaces.length; i++){

    let currentPlace = copyOfPlaces[i];
    let prevPlace = copyOfPlaces[i-1];

       if(this.needToWrapAroundMap(prevPlace.longitude,currentPlace.longitude)) {

           if (prevPlace.longitude > currentPlace.longitude){ //go right off map
             maplatLong.push([currentPlace.latitude ,currentPlace.longitude + 360]);
             placesTrip.push([maplatLong]);
             maplatLong=[];
             maplatLong.push([prevPlace.latitude,prevPlace.longitude-360]);
             maplatLong.push([currentPlace.latitude,currentPlace.longitude]);
           }
           else {
             maplatLong.push([currentPlace.latitude ,currentPlace.longitude - 360]);

             placesTrip.push([maplatLong]);
             maplatLong = [];
             maplatLong.push([prevPlace.latitude,prevPlace.longitude+360]);
             maplatLong.push([currentPlace.latitude, currentPlace.longitude]);
           }
       }
       else {
         maplatLong.push([currentPlace.latitude, currentPlace.longitude]);
       }
     }
    if(maplatLong.length>0 ) {
      placesTrip.push(maplatLong);
    }


    return (
        <div>
            <Button onClick={this.toggle} className="float-right">
              <span aria-hidden>{this.getLabel()}</span>
            </Button>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                  <CardBody>
                    <h3>{this.props.trip.title}</h3>
                    <Row>
                      <Col sm="12" md={{ offset: 1 }}>
                        <Map center={position} zoom={1.637} style={{height: 500, maxWidth: 800}} minZoom={1.637} maxBounds={bounds}>
                          {/* A tile layer, the actual map data (and an attribution) */}
                          <TileLayer
                              attribution='&amp;copy <a href=https://wikimediafoundation.org/wiki/Maps_Terms_of_Use;>Wikimedia Maps</a>'
                              url='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'/>
                          <Polyline positions={placesTrip} color='green'/>
                        </Map>
                      </Col>
                    </Row>
                  </CardBody>
              </Card>
            </Collapse>
          </div>
    );
  }
}

export default LeafletMap;