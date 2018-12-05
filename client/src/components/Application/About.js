import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'
import alex from './Alex.jpg'
import jerrel from './Jerrel.jpg'
import david from './David.jpg'

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
                    <Media object src={david} alt={"David"} className='contact_image_rectangle'/>
                  </Media>
                  <Media body>
                    <p>Currently, I am student at Colorado State University. In December, I am completing a bachelor’s degree in computer engineering with a minor in computer science. One of my goals with this degree is to learn how to develop software that brings value to individuals. </p>
                    <p>When I am not programing you will probably find me working on my truck, reading a good book or hanging out with friends.</p>

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
                    <Media object src={jerrel} alt={"Jerrel"} className='contact_image_rectangle'/>
                  </Media>
                  <Media body>
                    <p>I am originally from the east coast and lived in Pittsburgh, Pennsylvania for most of my life in a town southeast of Pittsburgh called McKeesport. I am currently majoring in two degrees: Computer Science and Applied Computing Technology. I have been in Colorado since August 2010 and before that, I lived in Georgia for nearly seven years in the city of Columbus. I developed a passion for computers once I was out of high school and I have always enjoyed math when I was younger, so computer science fits well with what I wanted to do as a career.</p>

                      <p>As for my hobbies, well I love being behind a computer (obviously) whether it is surfing the web, playing games (I currently like to play Terraria by the way), or even working on personal computing projects. Also when time and money allows it, I love to travel and visit new places. Colorado is the furtherest west that I have been in the US, so eventually I would like to travel west to visit California and Las Vegas!</p>
                  </Media>
                </Media>
              </CardBody>
            </Card>
        )
    }
}

export default About;
