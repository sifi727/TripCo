import  React, { Component } from 'react';
// Import actual leaflet
import Leaflet from 'leaflet';
// Stylesheet required for leaflet to function
// You must include this import
import 'leaflet/dist/leaflet.css';
// react-leaflet items
import { Map, TileLayer, Polyline } from 'react-leaflet';

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

    let prevPlaceLong=undefined;
    let prevPlaceLat = undefined;
    let maplatLong = [];
    console.log("reset maplatLong");
    console.log(maplatLong);
    if(this.props.trip.places.length>0)
    {
      console.log("start if maplatLong should be empty");
      console.log(maplatLong);
      console.log("first place in maplatLong");
      maplatLong.push([this.props.trip.places[0].latitude,this.props.trip.places[0].longitude]);
      console.log(maplatLong);
      prevPlaceLong=this.props.trip.places[0].longitude;
      prevPlaceLat=this.props.trip.places[0].latitude;

    }
     for(var i = 1; i<this.props.trip.places.length; i++){ //start at one because we if statement account for first plac

    let place = this.props.trip.places[i];
    //
    //
    //
    //    if(this.needToWrapAroundMap(prevPlaceLong,place.longitude)) {
    //      console.log("need to wrap");
    //
    //        if (prevPlace.longitude > currentPlace.longitude) //go right off map
    //        {
    //          latLong.push([currentPlace.latitude,currentPlace.longitude+360])
    //          placesTrip.push([latLong]);
    //          latLong=[];
    //          latLong.push([prevPlaceLat,prevPlaceLong-360]);
    //          latLong.push([currentPlace.latitude,currentPlace.longitude]);
    //
    //         // OffMapToRightPath(prevPoint, point)
    //        }
    //
    //        else
    //        {


             // let leftOfMapX = SVG_MAP_WIDTH - currentPoint.getX() - previousPoint.getX();
             // let rightOfMapX = previousPoint.getX() + SVG_MAP_WIDTH;
             // stringBuilder.append(
             //     String.format(" L %f,%f", leftOfMapX, currentPoint.getY()));
             //
             // stringBuilder
             // .append(String.format(" M %f,%f",
             //     rightOfMapX, previousPoint.getY()));
             // stringBuilder.append(
             //     String.format(" L %f,%f", currentPoint.getX(), currentPoint.getY()));
             //
             // return stringBuilder.toString();

    //       }
    //
    //        //\\ let latLong=(new L.LatLng(place.latitude, place.longitude+(prevPlaceLong-180))).wrap();
           prevPlaceLong = place.longitude;
           prevPlaceLat=place.latitude;
    //
    //
    //
    //   }
    //
    //    else
    //    {
         console.log("Do not to wrap");
         prevPlaceLong=place.longitude;
         prevPlaceLat=place.latitude;
         maplatLong.push([place.latitude, place.longitude]);
     //  }
    //
    //
    //
    //
    }
    if(this.props.trip.places.length>0 ) {
      maplatLong.push([this.props.trip.places[0].latitude,this.props.trip.places[0].longitude]);
      placesTrip.push(maplatLong);
    }
    console.log("placesTrip value");
    console.log(placesTrip);

    // Here's a set of coordinates for a single line.
    let singleLine = [
      [[45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2]],
      [[40.78, -73.91],
        [41.83, -87.62],
        [32.76, -96.72]]
    ];

    /*
     * Let's create a map, and use the publicly available Wikimedia tiles for it.
     * Then let's add some different Polylines- lines that can have multiple points.
     */
    return (
        <Map center={position} zoom={2} style={{height: 500, maxWidth: 800}} minZoom={1} maxBounds={bounds}>
          {/* A tile layer, the actual map data (and an attribution) */}
          <TileLayer
              attribution='&amp;copy <a href=https://wikimediafoundation.org/wiki/Maps_Terms_of_Use;>Wikimedia Maps</a>'
              url='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
          />
          {/* Here's a line that uses all three of our coordinates */}
          <Polyline positions={placesTrip} color='green'/>
          {/* Here's another line that uses some different coordinates, for only two points. */}
          <Polyline positions={singleLine} color='red'/>
        </Map>
    );
  }
}

export default LeafletMap;