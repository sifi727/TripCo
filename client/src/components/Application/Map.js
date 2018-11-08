import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'
import { get_comfig } from '../../api/api.js'

/* The Map allows the user to view the map image provided in the Trip TFFI file */
class Map extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
              <CardBody>
                <h3>{this.props.trip.title}</h3>
                <Media object src={'data:image/svg+xml;base64,' + btoa(this.props.trip.map)} alt={"Upload your trip to view it here"}/>
              </CardBody>
            </Card>
        )
    }
}

export default Map;
