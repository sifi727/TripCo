import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Info from './Info'
import Map from './Map';
import Options from './Options';
import PlanUtilities from './PlanUtilities'
import {get_config, request, get_port} from '../../api/api';
import Itinerary from './Itinerary';
import Calculator from './Calculator';
import AddPlace from './AddPlace';
import Search from './Search';
import About from './About';
/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripHasChanged: false,
      config: null,
      port: location.port,
      hostname: location.hostname,
      attributesToShow: [],
      trip: {
        version: 4,
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
    this.addPlace = this.addPlace.bind(this);
    this.isObjNullorUndefined = this.isObjNullorUndefined.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateHostname = this.updateHostname.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this.updateTffiObject = this.updateTffiObject.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.resetTrip = this.resetTrip.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.removePlace = this.removePlace.bind(this);
    this.updateAttributesToShow = this.updateAttributesToShow.bind(this);
    this.initConfig =  this.initConfig.bind(this);
  }
initConfig(port=this.state.port,hostname=this.state.hostname){
  get_config('config',port,hostname).then(
      config => {
    if(!config.attributes){
    const minAttributes = ["name", "id", "latitude", "longitude"];
    config["attributes"] = minAttributes;
  }

  this.setState({
    config: config
  });

  this.setState({

    attributesToShow: config.attributes
  });
}

);

}

  componentWillMount() {

    this.initConfig(get_port());


  }

  removePlace(index){
    if(index==this.state.trip.places.length) {
      index=0;
    }

    let trip = this.state.trip;
    trip.places.splice(index,1);
    this.setState({"trip":trip});
    this.setState({"tripHasChanged":true});


  }

  isObjNullorUndefined(object) {
    return (object === null || typeof object === 'undefined');

  }
  updatePort(value) {
      this.setState({
          port:value
      });
  }
  updateHostname(value){
      this.setState({
          hostname:value
      });
  }
  updateTrip(field, value) {
    let state = this.state;
    state["trip"][field] = value;
    this.setState(state);
  }

  updateBasedOnResponse(value) {
    this.setState({'trip': value});
  }

  updateOptions(option, value) {
    let trip = this.state.trip;
    trip.options[option] = value;
    this.setState(trip);
    if(option=="units") {
        this.setState({'tripHasChanged': true});
    }
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
      //version, type, and places elements are req elements assumed to be in object

      let trip = object;

      if (!trip.options)
      {
        trip["options"]={
          units: "miles",
        };

      }
      if(!trip.title)
      {
        trip["title"]="";
      }

      if(!trip.map)
      {
        trip["map"]="";
      }

      if(!trip.distances)
      {
        trip["distances"]=[];
      }
      let state = this.state;
      state['tripHasChanged']=false;
      state['trip']=trip;

      this.setState(state);

  }


  addPlace(object)
  {
    let place = object;
    let trip = this.state.trip;
    trip.places.push(place);
    this.setState({'tripHasChanged':true});
    this.setState({"trip":trip})
  }


  resetTrip() {
      var blanktrip = {
          version: this.state.trip.version,
          type: "trip",
          title: "",
          options: this.state.trip.options,
          places: [],
          distances: [],
          map: ""
      };

      this.updateTffiObject(blanktrip);
  }


  reverseTrip(){
    let trip = this.state.trip;
    trip.places.reverse();
    trip.distances.reverse();
    this.setState({"trip":trip});
    this.setState({'tripHasChanged':true});

  }
  updateAttributesToShow(attributeValue)
  {
    let attributesToShow  = this.state.attributesToShow;


    if(this.state.attributesToShow.includes(attributeValue)) {
      attributesToShow= attributesToShow.filter((value, index, arg) => {return(value != attributeValue);});
    }
    else {
      attributesToShow.push(attributeValue);
    }
    this.setState({attributesToShow:attributesToShow});

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
          <Itinerary trip={this.state.trip} attributes={this.state.attributesToShow} updatePlaces={this.updatePlaces} tripHasChanged={this.state.tripHasChanged} reverseTrip={this.reverseTrip}
          removePlace={this.removePlace}/>
          <Options options={this.state.trip.options} config={this.state.config}
                   updateOptions={this.updateOptions} port={this.state.port} hostname={this.state.hostname}
                   updatePort={this.updatePort} updateHostname={this.updateHostname}
                   attributes={this.state.config.attributes}
                   attributesToShow={this.state.attributesToShow}
                   updateAttributesToShow={this.updateAttributesToShow}
                     initConfig={this.initConfig}
                   />
          <PlanUtilities trip={this.state.trip} updateTffiObject={this.updateTffiObject}
                         port={this.state.port} hostname={this.state.hostname} resetTrip={this.resetTrip} />
          <Calculator options={this.state.trip.options} port={this.state.port} hostname={this.state.hostname} />
          <Search port={this.state.port} hostname={this.state.hostname} addPlace={this.addPlace} />
          <About/>
        </Container>

    )
  }
}

export default Application;
