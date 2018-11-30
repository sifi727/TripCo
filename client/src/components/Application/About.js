import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'


class About extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
              <CardBody>
                <h3>{"Alex"}</h3>
                <Media object src={""} alt={"Alex"}/>
              </CardBody>
              <CardBody>
                <h3>{"David"}</h3>
                <Media object src={""} alt={"David"}/>
              </CardBody>
              <CardBody>
                <h3>{"Dm"}</h3>
                <Media object src={""} alt={"Dm"}/>
              </CardBody>
              <CardBody>
                <h3>{"Jerrel"}</h3>
                <Media object src={""} alt={"Jerrel"}/>
              </CardBody>
            </Card>
        )
    }
}

export default About;
