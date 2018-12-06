import  React, { Component } from 'react';
// Import actual leaflet
import Leaflet from 'leaflet';
// Stylesheet required for leaflet to function
// You must include this import
import 'leaflet/dist/leaflet.css';
// react-leaflet items
import { Map, TileLayer, Polyline } from 'react-leaflet';
import {Card, CardBody, Col, Row} from "reactstrap";

// A basic map component
class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.needToWrapAroundMap= this.needToWrapAroundMap.bind(this);
    }

  needToWrapAroundMap(place1Long, place2Long) {
  return (Math.abs(place1Long-place2Long)>180); //need to take in account going left and right off map
}


  render() {
    // We can limit users to only a certain area, by giving the bottom left and top right corners
    let bounds = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
    // A starting position to center the map at
    let position = [15, -15];

    // Here are coordinates to make two lines from 3 points
    let placesTrip = [];
    let copyOfPlaces=this.props.trip.places.slice();


    let maplatLong = [];
    console.log("reset maplatLong");
    console.log(maplatLong);
    console.log("copy place");
    console.log(copyOfPlaces);
    if(copyOfPlaces.length>0)
    {
      console.log("start if maplatLong should be empty");
      console.log(maplatLong);
      console.log("first place in maplatLong");
      maplatLong.push([copyOfPlaces[0].latitude,copyOfPlaces[0].longitude]);
      console.log(maplatLong);
      copyOfPlaces.push(this.props.trip.places[0]); //make round trip;
      console.log("Number places");
      console.log(copyOfPlaces);

    }
     for(var i = 1; i<copyOfPlaces.length; i++){ //start at one because we if statement account for first place

    let currentPlace = copyOfPlaces[i];
    let prevPlace = copyOfPlaces[i-1];
    //
    //
    //
       if(this.needToWrapAroundMap(prevPlace.longitude,currentPlace.longitude)) {

           if (prevPlace.longitude > currentPlace.longitude){ //go right off map
             maplatLong.push([currentPlace.latitude ,currentPlace.longitude + 360]);
             placesTrip.push([maplatLong]);
             maplatLong=[];
             maplatLong.push([prevPlace.latitude,prevPlace.longitude-360]);
             maplatLong.push([currentPlace.latitude,currentPlace.longitude]);
           }
           else {
             console.log(currentPlace.name);
             console.log(currentPlace);
             console.log(prevPlace.name);
             console.log(prevPlace);
             maplatLong.push([currentPlace.latitude ,currentPlace.longitude - 360]);

             placesTrip.push([maplatLong]);
             maplatLong = [];
             console.log("after rest");
             console.log(currentPlace.name);
             console.log(currentPlace);
             console.log(prevPlace.name);
             console.log(prevPlace);
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
        <Card>
          <CardBody>








            <h3>{this.props.trip.title}</h3>
            <Row>
              <Col sm="12" md={{ offset: 1 }}>
        <Map center={position} zoom={1.637} style={{height: 500, maxWidth: 800}} minZoom={1.637} maxBounds={bounds}>
          {/* A tile layer, the actual map data (and an attribution) */}
          <TileLayer
              attribution='&amp;copy <a href=https://wikimediafoundation.org/wiki/Maps_Terms_of_Use;>Wikimedia Maps</a>'
              url='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
          />
          {/* Here's a line that uses all three of our coordinates */}
          <Polyline positions={placesTrip} color='green'/>
          {/* Here's another line that uses some different coordinates, for only two points. */}
        </Map>
              </Col>
            </Row>
          </CardBody>
        </Card>
    );
  }
}

export default LeafletMap;