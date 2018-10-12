import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Info from './Info'
import Map from './Map';
import Options from './Options';
import UploadTffi from './UploadTffi'
import {get_config} from '../../api/api';
import Itinerary from './Itinerary';
import Calculator from './Calculator';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTffiObject = this.updateTffiObject.bind(this);
    this.isObjNullorUndefined = this.isObjNullorUndefined.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.updateHostname=this.updateHostname.bind(this);
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

  updateTffiObject(object) {
    //version, type, and places elements

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

  render() {
    if (!this.state.config) {
      return <div/>
    }

    return (
        <Container id="Application">
          <Info/>
          <Map trip={this.state.trip}/>
          <Itinerary trip={this.state.trip}/>
          <Options options={this.state.trip.options} config={this.state.config}
                   updateOptions={this.updateOptions} port={this.state.port} hostname={this.state.hostname}
                   updatePort={this.updatePort} updateHostname={this.updateHostname} />
          <UploadTffi trip={this.state.trip} updateTffiObject={this.updateTffiObject}
                      port={this.state.port} hostname={this.state.hostname}/>
          <Calculator options={this.state.trip.options} port={this.state.port} hostname={this.state.hostname} />
        </Container>
    )
  }
}

export default Application;
