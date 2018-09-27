import React, {Component} from 'react'
import {Card, CardHeader, CardBody, ButtonGroup} from 'reactstrap'
import {Container, Table, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'



class Itinerary extends Component{
  constructor(props) {
    super(props);
    this.calcTotalDistance = this.calcTotalDistance.bind(this);

  }
  calcTotalDistance  () {

  }


  render() {
    if( this.props.trip.places === null || typeof this.props.trip.places === 'undefined'  || this.props.trip.places.length==0)
    {
      console.log("place not there");
      return (<Container></Container>);
    }
    if( this.props.trip.distances === null || typeof this.props.trip.distances === 'undefined'  || this.props.trip.distances.length==0)
    {
      console.log("distance not there");
      return (<Container></Container>);

    }
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
    var index = -1;
    var totaldistance = 0;

   const rows = this.props.trip.places.map((place)=> {
     console.log("Distance" + this.props.trip.distances[index]);
     if(index == -1)
     {
       index++;
       return (
           <tr key={'intinerary-row 0'}>
           < td > {place.name} </td>
     < td > 0 < /td>
     < td > 0 < /td>
     < /tr>
     )

     }
     totaldistance = totaldistance + this.props.trip.distances[index];
      var row = (
          <tr key={'intinerary-row '+(index+1)}>
          < td > {place.name} </td>
       < td > {this.props.trip.distances[index]} < /td>
    < td > {totaldistance}< /td>
    < /tr>
  )
    //{this.props.trip.distances[index]}
    index++;
    return row;
  }


  );
   console.log("rows");
   console.log(rows);

    totaldistance = totaldistance+this.props.trip.distances[index];

    rows.push(<tr key ={'intererary-row74'}>
    < td > {this.props.trip.places[0].name} </td>
    < td > {this.props.trip.distances[index]} < /td>
    < td > {totaldistance}< /td>
    < /tr>);

    return (
        <Table>
        <thead>
        <tr>
    <th>Destination</th>
    <th>Leg Distance</th>
    <th>Total Trip Distance</th>
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
