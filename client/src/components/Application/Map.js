import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Document } from 'reactstrap'
import { get_comfig } from '../../api/api.js'

/* The Map allows the user to view the map image provided in the Trip TFFI file */
class Map extends Component{
    constructor(props) {
        super(props);
        document.getElementById("mapImage").src = this.props.trip.map;
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <img id="mapImage" src="" />
                </CardBody>
            </Card>
        )
    }
}

export default Map;
