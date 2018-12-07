import React, { Component } from 'react'
import { Button, Card, CardBody, Collapse, Media} from 'reactstrap'

/* The Map allows the user to view the map image provided in the Trip TFFI file */
class Map extends Component{
    constructor(props) {
        super(props);
        this.state = {
          collapse: true
        };
        this.getLabel = this.getLabel.bind(this);
        this.getMap = this.getMap.bind(this);
        this.toggle = this.toggle.bind(this);
    };

    getLabel() {
      // return the correct symbol based on state
      if(this.state.collapse) {
        return "-";
      }
      return "+";
    }

    getMap() {
      if( (this.props.trip.options.map !== null && this.props.trip.options.map === "kml") || this.props.trip.map === "") {
        return <Media object src={'/World_map_with_nations.svg'} alt={"Upload your trip to view it here"}/>
      }
      return <Media object src={'data:image/svg+xml;base64,' + btoa(this.props.trip.map)} alt={"Upload your trip to view it here"}/>;
    }

    toggle() {
      this.setState({ collapse: !this.state.collapse });
    }

    render() {
      return <div>
        <Button onClick={this.toggle} className="float-right">
          <span aria-hidden>{this.getLabel()}</span>
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <h3>{this.props.trip.title}</h3>
              {this.getMap()}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    }
}

export default Map;
