import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'

/* The Map allows the user to view the map image provided in the Trip TFFI file */
class Map extends Component{
    constructor(props) {
        super(props);
        this.getMap = this.getMap.bind(this);
    }

    getMap() {
      if( (this.props.trip.options.map !== null && this.props.trip.options.map === "kml") || this.props.trip.map === "") {
        return <Media object src={'/World_map_with_nations.svg'} alt={"Upload your trip to view it here"}/>
      }
      return <Media object src={'data:image/svg+xml;base64,' + btoa(this.props.trip.map)} alt={"Upload your trip to view it here"}/>;
    }


    render() {
      return <Card>
            <CardBody>
              <h3>{this.props.trip.title}</h3>
              {this.getMap()}
            </CardBody>
          </Card>;
    }
}

export default Map;
