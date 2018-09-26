import React, {Component} from 'react'
import {Card, CardHeader, CardBody, ButtonGroup} from 'reactstrap'
import { Table, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'



class Itinerary extends Component{
  constructor(props) {
    super(props);

  }


  render() {
  //   const buttons = this.props.config.units.map((unit) =>
  //       <Button
  //   key={'distance_button_' + unit}
  //   className='btn-outline-dark unit-button'
  //   active={this.props.options.units === unit}
  //   value={unit}
  //   onClick={(event) => this.props.updateOptions('units', event.target.value)}
  // >
  //   {unit.charAt(0).toUpperCase() + unit.slice(1)}
  // </Button>
  // );

   const rows = this.props.trip.places.map((place)=> {

      var row = (
          <tr>
          < td > {place.name} </td>
       < td > Otto < /td>
    < td > foo < /td>
    < /tr>
  )
    return row;
  }

  );
//    console.log(rows);

    return (
        <Table>
        <thead>
        <tr>
    <th>Destination</th>
    <th>Leg Distance</th>
    <th>Total Trip Distan  ce</th>
    </tr>
    </thead>
    <tbody>
    {rows}
    </tbody>
    </Table>
  )
  }
}

export default Itinerary;
