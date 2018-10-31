import React, {Component} from 'react'
import {Button, Card, CardBody, Container, Table} from 'reactstrap'

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.getDistance = this.getDistance.bind(this);
    this.getFirstRow = this.getFirstRow.bind(this);
    this.getNthRow = this.getNthRow.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getTotalDistance = this.getTotalDistance.bind(this);
    this.getUnitName = this.getUnitName.bind(this);
    this.returnBlankPlaceHolder = this.returnBlankPlaceHolder.bind(this);
    this.deleteRowInItinerary = this.deleteRowInItinerary.bind(this);
    this.getTableHeader = this.getTableHeader.bind(this);
    this.userFriendlyHeader = this.userFriendlyHeader.bind(this);
    this.buildRow = this.buildRow.bind(this);
  }

  /**
   *   Check to see if distances object is invalid
   *   @return true if object is invalid
   */
  returnBlankPlaceHolder() {
    if (this.props.tripHasChanged === true || this.props.trip.distances === null
        || typeof this.props.trip.distances === 'undefined'
        || this.props.trip.distances.length === 0) {
      return true;
    }
  }

  /**
   *   Get the distance out of the TIFF obj.
   *   @return '-' if no distance value is present
   */
  getDistance(index) {
    if (this.returnBlankPlaceHolder()) {
      return '-';
    }
    return this.props.trip.distances[index];
  }

  buildRow(place,distance,totalDistance,isFirstRow, deleteElementId, rowElementId)
  {
   let row  = this.props.attributes.map((attribute) => {
      return (<td>{place[attribute]}</td>);

    });
      row.unshift(< td><input type="radio" name={"start"} checked={isFirstRow} value={0} readOnly={isFirstRow}/></td>);
      row.push(< td> {distance} </td>);
      row.push(< td> {totalDistance}</td>);
      row.push(< td> <Button  id={deleteElementId} onClick={(event)=>this.deleteRowInItinerary(event)}>Delete</Button> </td>);

    return (<tr key={rowElementId}>
      {row}
      </tr>
  );
     // return row;

  }
  /**
   *   Build the First row in the table
   */
  getFirstRow(place) {
    //table is |place name| leg distance| total distance|
    return (<tr key={'intinerary-row 0'}>
      < td><input type="radio" name={"start"} checked={true} value={0} readOnly={true}/></td>
      < td> {place.name} </td>
        <td> {place.id} </td>
      < td> 0</td>
      < td> 0</td>
        < td> <Button id="DeleteButton0" onClick={(event)=>this.deleteRowInItinerary(event)}>Delete</Button> </td>
    </tr>);
  }
  deleteRowInItinerary(row)
  {


    this.props.removePlace(row.target.parentNode.parentNode.rowIndex-1);

  }

  /**
   *   Build any Nth row in the table
   */
  getNthRow(index, name, totalDistance) {
    return (<tr key={'intinerary-row ' + (index + 1)}>
      < td><input type="radio" name={"start"} value={index + 1}
                  onChange={this.props.updatePlaces}/></td>
      < td> {name} </td>
      < td> {this.getDistance(index)} </td>
      < td> {totalDistance}</td>
    < td> <Button  id={"DeleteButton"+index} onClick={(event)=>this.deleteRowInItinerary(event)}>Delete</Button> </td>
    </tr>)
  }

  /**
   *   Calc totalDistance from:
   *   previousDestance and the distance array
   *   @return totalDistance if trip.distances is vald otherwise placeHolder character '-'
   */
  getTotalDistance(previousDistance, index) {
    if (this.returnBlankPlaceHolder()) {
      return '-';
    }
    return previousDistance + this.props.trip.distances[index];
  }

  /**
   *   Builds the row of table to present in the view
   *   @return the newly constructed row
   */
  getRows() {
    var index = -1;  //starts at -1 to indicate that the foreach is on the 1 place and
    // total distance and leg distance are both 0
    var totaldistance = 0;

    const rows = this.props.trip.places.map((place) => {
      if (index === -1) { // the first entry in the table and is special because leg and total at both 0
        index++;
        //return this.getFirstRow(place);
      return this.buildRow(place,0,0,true,"DeleteButton"+index,'intinerary-row 0');
      }
      totaldistance = this.getTotalDistance(totaldistance, index);
      //table is |place name| leg distance| total distance|
      //table entry for middle destinations
      //var row = (this.getNthRow(index, place.name, totaldistance));
    var row =this.buildRow(place,this.getDistance(index),totaldistance,false,"DeleteButton"+index,'intinerary-row ' + (index + 1));
      index++;
      return row;
    });

    totaldistance = this.getTotalDistance(totaldistance, index);

    // var lastrow = (this.getNthRow(index, this.props.trip.places[0].name,
    //     totaldistance));

    var lastrow=this.buildRow(this.props.trip.places[0],this.getDistance(index),totaldistance,false,"DeleteButton"+index,'intinerary-row ' + (index +1));
    rows.push(lastrow);
    return rows;
  }

  /**
   *   Get the correct unit name for table headings
   *   @return unitname as a String
   */
  getUnitName() {
    var unitname = "";
    if (this.props.trip.options.units === "user defined") {
      unitname = this.props.trip.options.unitName?this.props.trip.options.unitName:"";
    }
    else {
      unitname = this.props.trip.options.units;
    }
    return unitname;
  }

  userFriendlyHeader(header)
  {
    let words = header.split("-").map((word)=> {
      return word.charAt(0).toUpperCase()+word.slice(1);

    });
    return(words.join(' '));
  }

  getTableHeader()
  {

    var unitname = this.getUnitName();

    let header = this.props.attributes.map((attribute) => {
      if(attribute=='name'){

          return(<th>Destination</th>);
      }

      return( <th> {this.userFriendlyHeader(attribute)} </th>);
  });
      header.unshift(<th>Starting Location</th>);
      header.push(<th>{"Leg of the Trip (" + unitname + ")"}</th>);
      header.push(<th>{"Total Trip Distance (" + unitname + ")"}</th>);
  header.push(<th></th>); //for delete

    //header.push(<th></th>); //for delete

    return(
        <tr>
        {header}
        </tr>
    );

  //   return(
  //
  //       <tr>
  //       <th>Starting Location</th>
  // <th>Destination</th>
  //<th>{"Leg of the Trip (" + unitname + ")"}</th>
  // <th>{"Total Trip Distance (" + unitname + ")"}</th>
  // </tr>
  //
  //   );

  }

  /**
   *   Renders the view
   */
  render() {
    if (this.props.trip.places === null || typeof this.props.trip.places
        === 'undefined' || this.props.trip.places.length === 0) {
      return (<Container/>);  //return nothing because there is not places to build a table from
    }

    var unitname = this.getUnitName();

    return (
        <Card>
          <CardBody>
            <Button id="reverseButton" onClick={this.props.reverseTrip}> Reverse
              Trip Order </Button>
          </CardBody>
          <CardBody style={{overflow:'scroll', maxHeight:'500px'}}>
            <Table>
    <thead>
    {this.getTableHeader()}
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