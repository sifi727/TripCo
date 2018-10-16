import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Info from './Info'
import Map from './Map';
import Options from './Options';
import PlanUtilities from './PlanUtilities'
import {get_config} from '../../api/api';
import Itinerary from './Itinerary';
import Calculator from './Calculator';
import AddPlace from './AddPlace';
/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripHasChanged : false,
      config: null,
      port: location.port,
      hostname: location.hostname,
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
    this.addPlace= this.addPlace.bind(this);
    this.isObjNullorUndefined = this.isObjNullorUndefined.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateHostname=this.updateHostname.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this.updateTffiObject = this.updateTffiObject.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
  }

  componentWillMount() {
    get_config().then(
        config => {
          this.setState({
            config: config
          })
        }
    );
  }

  isObjNullorUndefined(object) {
    return (object === null || typeof object === 'undefined');

  }
  updatePort(event) {
      this.setState({
          port:event.target.value
      });
  }
  updateHostname(event){
      this.setState({
          hostname:event.target.value
      });
  }
  updateTrip(field, value) {
    let trip = this.state.trip;
    trip[field] = value;
    this.setState(trip);
  }

  updateBasedOnResponse(value) {
    this.setState({'trip': value});
  }

  updateOptions(option, value) {
    let trip = this.state.trip;
    trip.options[option] = value;
    this.setState(trip);
  }

  updatePlaces(event) {
    this.setState({'tripHasChanged':true});
    let startIndex = event.target.value;
    var newArray = this.state.trip.places.slice(startIndex);
    // copy the begining of the old array
    for(let i = 0; i < startIndex; i++) {
      newArray.push(this.state.trip.places[i]);
    }
    this.updateTrip("places", newArray);
    event.target.checked = false;
  }

  updateTffiObject(object) {
    //version, type, and places elements
    this.setState({'tripHasChanged':false});
    let trip = object;

    this.updateTrip("places", trip.places); //required
    this.updateTrip("type", trip.type);
    this.updateTrip("version", trip.version);

    if (this.isObjNullorUndefined(trip.title)) {

      this.updateTrip("", trip.title);
    }
    else {
      this.updateTrip("title", trip.title);
    }

    if (this.isObjNullorUndefined(trip.options)) {
      //do nothing keep units as defined by buttons
    }
    else {
      this.updateOptions("units", trip.options.units);
    }

    if (this.isObjNullorUndefined(trip.map)) {
      trip.map = "";
    }

    else {
      this.updateTrip("map", trip.map);
    }

    if (this.isObjNullorUndefined(trip.distances)) {
      trip.distances = [];
    }
    else {
      this.updateTrip("distances", trip.distances);
    }
    this.setState({"trip": trip});
  }
  addPlace(object)
  {
    let place = object;
    let trip = this.state.trip;
    trip.places.push(place);
    this.setState({"trip":trip})
  }

  render() {
    if (!this.state.config) {
      return <div/>
    }

    return (
        <Container id="Application">
          <Info/>
          <Map trip={this.state.trip}/>
          <AddPlace addPlace={this.addPlace}/>
          <Itinerary trip={this.state.trip} updatePlaces={this.updatePlaces} tripHasChanged={this.state.tripHasChanged}/>
          <Options options={this.state.trip.options} config={this.state.config}
                   updateOptions={this.updateOptions} port={this.state.port} hostname={this.state.hostname}
                   updatePort={this.updatePort} updateHostname={this.updateHostname} />
          <PlanUtilities trip={this.state.trip} updateTffiObject={this.updateTffiObject}
                         port={this.state.port} hostname={this.state.hostname}/>
          <Calculator options={this.state.trip.options} port={this.state.port} hostname={this.state.hostname} />
        </Container>
    )
  }
}

export default Application;
