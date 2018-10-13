import React, {Component} from 'react'
import {Card, CardBody,CardTitle,InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'
import {Button, Form, FormGroup, FormText} from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'

/* The Calculator allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    distance:{
      "type"          : "distance",
        "version"       : 3,
        "origin"        : {
            "latitude":  0,
          "longitude": 0,
          "name":""},
      "destination"   :

          {
            "latitude": 0,
            "longitude":  0,
            "name":""},
        "units"         : "miles",
        "distance"      : 0
    }

    };


    this.updateDistance = this.updateDistance.bind(this);
    this.distanceFields = this.distanceFields.bind(this);
    this.originFields = this.originFields.bind(this);
    this.destinationFields = this.destinationFields.bind(this);
    this.inputTag = this.inputTag.bind(this);

  };



  submit(){
    let distance = this.state.distance;
    distance.units=this.props.options.units;
    if(distance.units=='user defined')
    {
      distance.unitRadius=this.props.options.unitRadius;

    }

    request(distance,'distance',this.props.port, this.props.hostname).then(response => {

      this.setState({"distance": response});

  });


  }
  updateDistance(field,field1, event) {
    let distance = this.state.distance;
    distance[field][field1] = event.target.value;
    this.setState({distance:distance});
  }

  distanceFields()
  {
    if(this.props.options.units =="user defined"){
      return(
          <InputGroup>
             <Input id = "DistanceField"  value={this.state.distance.distance} readOnly  type = "text" />
             <Input id = "DistanceFieldUnits"  value={this.props.options.unitName?"Unit: " + this.props.options.unitName:"Unit: User defined"} readOnly  type = "text" /> <InputGroupAddon addonType="append">
          <Input id = "DistanceFieldCustomRadiusName"  value="Unit Radius"  readOnly type = "text" />
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
              <Input id = "DistanceFieldCustomRadius"  value={this.props.options.unitRadius}  readOnly type = "text" />
          </InputGroupAddon>
      </InputGroup>

      );
    }
    else{
      return(
          <InputGroup>
            < Input id = "DistanceField"  value={this.state.distance.distance} readOnly  type = "text" />
            < Input id = "DistanceFieldUnits"  value={"Unit: " + this.props.options.units} readOnly  type = "text" />
          </InputGroup>
      );

    }
  }

  originFields()
  {
    return(
        <InputGroup>
            <InputGroupText>
              From Latitude:
            </InputGroupText>
          {this.inputTag("CalculatorLatitudeOriginId" ,this.state.distance.origin.latitude, (event)=>this.updateDistance("origin","latitude",event))}
        <InputGroupText>
              From Longitude:
        </InputGroupText>
              <Input id = "CalculatorLongitudeOriginId"  value={this.state.distance.origin.longitude} onChange={(event)=>this.updateDistance("origin","longitude",event)} type = "number" />
        </InputGroup>
          );
  }

  inputTag(inputId, inputValue, onChangeEvent )
  {
   return (<Input id = {inputId} value={inputValue} onChange={onChangeEvent} type = "number"  />);

  }


  destinationFields()
          {
          return(
               <InputGroup>
                  <InputGroupText>
                    To Latitude:
                  </InputGroupText>
                 {this.inputTag("CalculatorLatitudeDestinationId" ,this.state.distance.destination.latitude,(event)=>this.updateDistance("destination","latitude",event))}
                  <InputGroupText>
                    To Longitude:
                  </InputGroupText>
                 {this.inputTag("CalculatorLongitudeDestinationId" ,this.state.distance.destination.longitude, (event)=>this.updateDistance("destination","longitude",event))}
                </InputGroup >
            );
          }


  render() {
    const distancePart = this.distanceFields();
    const originFields = this.originFields();
    const destinationFields = this.destinationFields();
    return (
        <Card>
          <CardBody>
            <CardTitle> Calculate Distance</CardTitle>
                {originFields}
                {destinationFields}

            <br />
            <InputGroup>
                        <Button className="pull-right" id="CalcDistButtonId"  onClick={(event) => this.submit()}>Calculate</Button>
              </InputGroup>
              <br />
            <InputGroup>
                <InputGroupText>
                        Distance:
                </InputGroupText>
                {distancePart}
                </InputGroup>

            </CardBody>
          </Card>
          );
  }
}

export default Calculator;