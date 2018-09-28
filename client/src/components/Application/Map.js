import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'
import { get_comfig } from '../../api/api.js'

/* The Map allows the user to view the map image provided in the Trip TFFI file */
class Map extends Component{
    constructor(props) {
        super(props);
      this.setMap = this.setMap.bind(this);
    }

    setMap(props) {
        console.log(this)
        console.log(this.props);
    }

    render() {
        return (
            <Card>
              <CardBody>
                <img src='data:image/svg+xml;utf8,<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="1066.6073" height="783.0824" id="svg2338"> <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"</svg>'/>
              </CardBody>
            </Card>
        )
    }
}

export default Map;
