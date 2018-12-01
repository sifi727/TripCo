import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'
import alex from './Alex.jpg'
import jerrel from './Jerrel.png'

class About extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
              <p/>
              <h3>Team Double07</h3>
              <CardBody>
                <h3>Alex L.</h3>
                <Media>
                  <Media left>
                    <Media object src={alex} alt={"Alex"} className='contact_image_rectangle'/>
                  </Media>
                  <Media body>
                    <p>I am a Colorado native, I grew up in and around Loveland and Fort Collins. I am a dad to two boys (ages 6 and 8) and a yellow lab (also 6). We live in town, under the giant ‘A’ (for Alex). I am only two classes (including this one) away from completing my BA in Computer Science!!</p>

                    <p>My hobbies include watching anime, biking, camping, computers, food, football, hiking, netflix binging, pokémon, and video games (mostly First Person Shooters, but also Mario, Zelda, etc). My favourite colour is green, and I love all kinds of music from heavy metal to pop, in both English and Spanish.</p>
                  </Media>
                </Media>
              </CardBody>

              <CardBody>
                <h3>David J.</h3>
                <Media>
                  <Media left>
                    <Media object src={''} alt={"David"} className='contact_image_square'/>
                  </Media>
                  <Media body>
                    <p>Stub</p>
                  </Media>
                </Media>
              </CardBody>

              <CardBody>
                <h3>Dmitry M.</h3>
                <Media>
                  <Media left>
                    <Media object src={''} alt={"Dmitry"} className='contact_image_square'/>
                  </Media>
                  <Media body>
                    <p>Stub</p>
                  </Media>
                </Media>
              </CardBody>

              <CardBody>
                <h3>Jerrel S.</h3>
                <Media>
                  <Media left>
                    <Media object src={jerrel} alt={"Jerrel"} className='contact_image_square'/>
                  </Media>
                  <Media body>
                    <p>Stub</p>
                  </Media>
                </Media>
              </CardBody>
            </Card>
        )
    }
}

export default About;
