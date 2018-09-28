import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';
import UploadTffi from './UploadTffi'
import { get_config } from '../../api/api';
import Itinerary from './Itinerary';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: null,
      trip: {
        version: 2,
        type: "trip",
        title: "",
        options : {
          units: "miles"
        },
        places: [],
        distances: [],
        map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateTffiObject = this.updateTffiObject.bind(this);
    this.isObjNullorUndefined = this.isObjNullorUndefined.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
  }

  componentWillMount() {
    get_config().then(
        config => {
      this.setState({
      config:config
    })
  }
  );
  }
  isObjNullorUndefined(object){
    return(object === null || typeof object === 'undefined');

  }


  updateTrip(field, value){
    let trip = this.state.trip;
    trip[field] = value;
    this.setState(trip);
  }

  updateBasedOnResponse(value) {
    this.setState({'trip': value});
  }

  updateOptions(option, value){
    let trip = this.state.trip;
    trip.options[option] = value;
    this.setState(trip);
  }

  updateTffiObject(object){
    //version, type, and places elements

    let trip = object;

    this.updateTrip("places",trip.places); //required
    this.updateTrip("type",trip.type);
    this.updateTrip("version", trip.version);

    if(this.isObjNullorUndefined(trip.title)){

      this.updateTrip("",trip.title);
    }
    else {
      this.updateTrip("title", trip.title);
    }

    if(this.isObjNullorUndefined(trip.options)) {
     //do nothing keep units as defined by buttons
    }
    else {
      this.updateOptions("units",trip.options.units);
    }

    if(this.isObjNullorUndefined(trip.map)){
      trip.map ="";
    }

    else {
      this.updateTrip("map",trip.map);
    }


    if(this.isObjNullorUndefined(trip.distances)) {
      trip.distances = [];
    }
    else{
      this.updateTrip("distances",trip.distances);
    }



  }


  render() {
    if(!this.state.config) { return <div/> }

    return(
        <Container id="Application">
        <Info/>
        <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
    <UploadTffi trip={this.state.trip} updateTffiObject={this.updateTffiObject}/>
    <Itinerary trip={this.state.trip} />
    </Container>
  )
  }
}

export default Application;
