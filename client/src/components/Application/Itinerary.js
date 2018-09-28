import React, {Component} from 'react'
import {Card, CardHeader, CardBody, ButtonGroup} from 'reactstrap'
import {Container, Table, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'


class Itinerary extends Component{
  constructor(props) {
    super(props);
    this.getRows = this.getRows.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.getTotalDistance = this.getTotalDistance.bind(this);
    this.getBlankPlaceHolder= this.getBlankPlaceHolder.bind(this);

  }

  //Function returns the placeholder if no data can be filled in the table.
   getBlankPlaceHolder() {
    return '-';
  }
  //Get the distance out of the TIFF obj. If no distance value is present then returns placeholder
  getDistance (index) {
    if( this.props.trip.distances === null || typeof this.props.trip.distances === 'undefined'  || this.props.trip.distances.length==0)
    {
      return this.getBlankPlaceHolder();
    }
    return this.props.trip.distances[index];

  }

  /**
   * Calc totalDistance from previousDestance and the index of distance in the distance array
   */

  getTotalDistance(previousDistance,index) {
    if( this.props.trip.distances === null || typeof this.props.trip.distances === 'undefined'  || this.props.trip.distances.length==0)
    {
      return this.getBlankPlaceHolder();
    }
    return previousDistance+this.props.trip.distances[index];

  }

  /**
   * Builds the row of table to present in the view
   */
  getRows () {
    var index = -1;  //starts at -1 to indicate that the foreach is on the 1 place and
                    // total distance and leg distance are both 0
    var totaldistance = 0;

    const rows = this.props.trip.places.map((place)=> {

      if(index == -1){ // the first entry in the table and is special because leg and total at both 0

      index++;

      //table is |place name| leg distance| total distance|
      return (
          <tr key={'intinerary-row 0'}>
            < td > {place.name} </td>
            < td > 0 < /td>
            < td > 0 < /td>
          < /tr>
      )

    }
    totaldistance = this.getTotalDistance(totaldistance,index);
    //table is |place name| leg distance| total distance|
    //table entry for middle destinations
    var row = (
        <tr key={'intinerary-row '+(index+1)}>
          < td > {place.name} </td>
          < td > {this.getDistance(index)} < /td>
          < td > {totaldistance}< /td>
        < /tr>
  )
    index++;
    return row;
  }


  );

    totaldistance = this.getTotalDistance(totaldistance,index);

    rows.push(
            <tr key ={'intererary-row74'}>
              < td > {this.props.trip.places[0].name} </td>
              < td > {this.getDistance(index)} < /td>
              < td > {totaldistance}< /td>
             < /tr>);
    return rows;

  }

  /**
   *   Renders the view
   */
  render() {
    //Checks to see if places has been set.

    if( this.props.trip.places === null || typeof this.props.trip.places === 'undefined'  || this.props.trip.places.length==0)
    {
      return (<Container></Container>);  //return nothing because there is not places to build a table from
    }

    return (
        <Card>
          <CardBody>
            <Table>
            <thead>
              <tr>
                  <th>Destination</th>
                  <th>Leg of the Trip Distance</th>
                  <th>Total Trip Distance</th>
              </tr>
            </thead>
            <tbody>
               {this.getRows()}
             </tbody>
        </Table>
      </CardBody>
    </Card>
  )
  }
}

export default Itinerary;
