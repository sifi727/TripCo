import React, {Component} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Info from './Info'
import Map from './Map';
import Options from './Options';
import PlanUtilities from './PlanUtilities'
import {get_config, get_port} from '../../api/api';
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
      activeTab: '1',
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
    this.initConfig =  this.initConfig.bind(this);
    this.isObjNullorUndefined = this.isObjNullorUndefined.bind(this);
    this.getTabTag = this.getTabTag.bind(this);
    this.getNavTag = this.getNavTag.bind(this);
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
    this.toggle = this.toggle.bind(this);
    this.updateAttributesToShow = this.updateAttributesToShow.bind(this);
  }
initConfig(port=this.state.port,hostname=this.state.hostname){
  get_config('config',port,hostname).then(
      config => {
    if(!config.attributes){
    config["attributes"] = ["name", "id", "latitude", "longitude"];
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
    if(index === this.state.trip.places.length) {
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

  getTabTag() {
    return <TabContent activeTab={this.state.activeTab}>
      <TabPane tabId="1">
        <Itinerary trip={this.state.trip}
                   attributes={this.state.attributesToShow}
                   updatePlaces={this.updatePlaces}
                   tripHasChanged={this.state.tripHasChanged}
                   reverseTrip={this.reverseTrip}
                   removePlace={this.removePlace}/>
        <AddPlace addPlace={this.addPlace}/>
        <Search port={this.state.port} hostname={this.state.hostname}
                addPlace={this.addPlace} config={this.state.config}/>
        <PlanUtilities trip={this.state.trip}
                       updateTffiObject={this.updateTffiObject}
                       port={this.state.port} hostname={this.state.hostname}
                       resetTrip={this.resetTrip}/>
      </TabPane>
      <TabPane tabId="2">
        <Calculator options={this.state.trip.options} port={this.state.port}
                    hostname={this.state.hostname}/>
      </TabPane>
      <TabPane tabId="3">
        <About/>
      </TabPane>
    </TabContent>;
  }

  getNavTag() {
    return <Nav tabs>
      <NavItem>
        <NavLink
            classname={classnames({active: this.state.activeTab === '1'})}
            onClick={() => {
              this.toggle('1');
            }}
        >
          Plan A Trip
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
            classname={classnames({active: this.state.activeTab === '2'})}
            onClick={() => {
              this.toggle('2');
            }}
        >
          Calculate a Distance
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
            classname={classnames({active: this.state.activeTab === '3'})}
            onClick={() => {
              this.toggle('3');
            }}
        >
          About Us
        </NavLink>
      </NavItem>
    </Nav>;
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
    if(option === "units") {
        this.setState({'tripHasChanged': true});
    }
  }

  updatePlaces(event) {
    this.setState({'tripHasChanged':true});
    let startIndex = event.target.value;
    let newArray = this.state.trip.places.slice(startIndex);
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


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  resetTrip() {
      const blanktrip = {
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

    if (!this.state.attributesToShow.includes(attributeValue)) {
      attributesToShow.push(attributeValue);
    } else {
      attributesToShow = attributesToShow.filter((value) => {
        return (value !== attributeValue);
      });
    }
    this.setState({attributesToShow:attributesToShow});

  }


  render() {
    if (!this.state.config) {
      return <div/>
    }

    const getTabTag = this.getTabTag();
    const getNavTag = this.getNavTag();

    return (
        <Container id="Application">
            <Info/>
            <Map trip={this.state.trip}/>
            {getNavTag}
            {getTabTag}
            <Options extension={this.state.trip.options.map} map={this.state.trip.map} options={this.state.trip.options} config={this.state.config}
                   updateOptions={this.updateOptions} port={this.state.port} hostname={this.state.hostname}
                   updatePort={this.updatePort} updateHostname={this.updateHostname}
                   attributes={this.state.config.attributes}
                   attributesToShow={this.state.attributesToShow}
                   updateAttributesToShow={this.updateAttributesToShow}
                   initConfig={this.initConfig}
                   updateTrip={this.updateTrip}
          />
        </Container>
    )
  }
}

export default Application;
