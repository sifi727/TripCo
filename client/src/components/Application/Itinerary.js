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
   getBlankPlaceHolder()
  {
    return '-';

  }
  getDistance (index)
  {
    if( this.props.trip.distances === null || typeof this.props.trip.distances === 'undefined'  || this.props.trip.distances.length==0)
    {
      return this.getBlankPlaceHolder();
    }
    return this.props.trip.distances[index];

  }
  getTotalDistance(previousDistance,index)
  {
    if( this.props.trip.distances === null || typeof this.props.trip.distances === 'undefined'  || this.props.trip.distances.length==0)
    {
      return this.getBlankPlaceHolder();
    }
    return previousDistance+this.props.trip.distances[index];

  }

  getRows ()
  {
    var index = -1;
    var totaldistance = 0;

    const rows = this.props.trip.places.map((place)=> {
      //console.log("Distance" + this.props.trip.distances[index]);
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
    totaldistance = this.getTotalDistance(totaldistance,index);

    var row = (
        <tr key={'intinerary-row '+(index+1)}>
      < td > {place.name} </td>
  < td > {this.getDistance(index)} < /td>
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

    totaldistance = this.getTotalDistance(totaldistance,index);

    rows.push(<tr key ={'intererary-row74'}>
      < td > {this.props.trip.places[0].name} </td>
  < td > {this.getDistance(index)} < /td>
  < td > {totaldistance}< /td>
  < /tr>);
    return rows;

  }

  render() {
    let rows;
    if( this.props.trip.places === null || typeof this.props.trip.places === 'undefined'  || this.props.trip.places.length==0)
    {
      console.log("place not there");
      return (<Container></Container>);
    }
    // if( this.props.trip.distances === null || typeof this.props.trip.distances === 'undefined'  || this.props.trip.distances.length==0)
    // {
    //   return (<Container></Container>);
    //
    // }

      rows = this.getRows();



    return (
        <Table>
        <thead>
        <tr>
    <th>Destination</th>
    <th>Leg of the Trip Distance</th>
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
