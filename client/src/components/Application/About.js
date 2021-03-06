import React, { Component } from 'react'
import { Card, CardBody, Media} from 'reactstrap'
import alex from './Alex.jpg'
import jerrel from './Jerrel.jpg'
import david from './David.jpg'
import dmitry from './Dmitry.jpg'

class About extends Component{
    constructor(props) {
        super(props);

        this.buildCardBody = this.buildCardBody.bind(this);
        this.buildParagraphs = this.buildParagraphs.bind(this);
    }

    buildCardBody(alt, name, p1, p2, source) {

        const buildParagraphs = this.buildParagraphs;

        return (
            <CardBody id={alt}>
                <h3>{name}</h3>
                <Media>
                    <Media>
                        <Media object src={source} alt={alt} className='contact_image_rectangle'/>
                    </Media>
                    <Media body>
                        {buildParagraphs(p1)}
                        {buildParagraphs(p2)}
                    </Media>
                </Media>
            </CardBody>
        )
    }

    buildParagraphs(par) {
        return (
            <p className="text-justify ml-2"  >{par}</p>
        )
    }

    render() {
        const buildCardBody = this.buildCardBody;

        return (
            <Card>
              <p/>
              <h3>Team Double07</h3>
                {buildCardBody(
                    "Alex"
                    , "Alex L."
                    , "I am a Colorado native, I grew up in and around Loveland and Fort Collins. I am a dad to two boys (ages 6 and 8) and a yellow lab (also 6). We live in town, under the giant ‘A’ (for Alex). I am only two classes (including this one) away from completing my BA in Computer Science!!"
                    , "My hobbies include watching anime, biking, camping, computers, food, football, hiking, netflix binging, pokémon, and video games (mostly First Person Shooters, but also Mario, Zelda, etc). My favourite colour is green, and I love all kinds of music from heavy metal to pop, in both English and Spanish."
                    , alex
                )}

                {buildCardBody(
                    "David"
                    , "David J."
                    , "Currently, I am student at Colorado State University. In December, I am completing a bachelor’s degree in computer engineering with a minor in computer science. One of my goals with this degree is to learn how to develop software that brings value to individuals."
                    , "When I am not programing you will probably find me working on my truck, reading a good book or hanging out with friends."
                    , david
                )}

                {buildCardBody(
                    "Dmitry"
                    , "Dmitry M."
                    , "I'm a third year student at CSU majoring in computer science. Previously I've graduated from Colorado School of Mines with a degree in petroleum engineering in 2008. I worked as production and drilling engineer in Wyoming and Colorado, including a position as night time rig site supervisor. My focus on drilling optimization and frustration with lack of suitable software in the industry lead me to a career change with the goal of designing software that would fill that void. The industry experience helped me understand the importance of teamwork and communication."
                    , "Originally from Russia, I've lived in Colorado for most of my time in US. My hobbies are traveling and many outdoor activities that this area has to offer, as well as scuba diving."
                    , dmitry
                )}

                {buildCardBody(
                    "Jerrel"
                    , "Jerrel S."
                    , "I am originally from the east coast and lived in Pittsburgh, Pennsylvania for most of my life in a town southeast of Pittsburgh called McKeesport. I am currently majoring in two degrees: Computer Science and Applied Computing Technology. I have been in Colorado since August 2010 and before that, I lived in Georgia for nearly seven years in the city of Columbus. I developed a passion for computers once I was out of high school and I have always enjoyed math when I was younger, so computer science fits well with what I wanted to do as a career."
                    , "As for my hobbies, well I love being behind a computer (obviously) whether it is surfing the web, playing games (I currently like to play Terraria by the way), or even working on personal computing projects. Also when time and money allows it, I love to travel and visit new places. Colorado is the furtherest west that I have been in the US, so eventually I would like to travel west to visit California and Las Vegas!"
                    , jerrel
                )}
            </Card>
        )
    }
}

export default About;
