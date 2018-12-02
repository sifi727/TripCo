import React, {Component} from 'react'
import {Card, CardBody} from 'reactstrap'

export default class Info extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <p className="lead">Welcome, begin by choosing which activity you would like to do:</p>
            <ol >
              <li>Plan a Trip</li>
              <ul>
                <li>
                  Choose options for trip planning, information to display about the locations, and how the trip map and itinerary should be saved</li>
                <li>
                  Choose your destinations by loading existing data sets, searching our extensive database of locations worldwide, or manually adding individual locations</li>
                <li>
                  Plan the trip with the options you selected, review and revise the trip origin and order, and save the trip map and itinerary for future reference</li>
              </ul>
              <li>Calculate a Distance</li>
              <ul>
                <li>
                  Input two distances, latitude and longitude, and calculate the distance between them</li>
              </ul>
              <li>Learn About the Development Team</li>
              <ul>
                <li>
                  View pictures of the team and some information about each of us</li>
              </ul>
            </ol>
          </CardBody>
        </Card>
      </div>
    )
  }
}