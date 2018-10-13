import React, {Component} from 'react'
import {Card, CardBody,CardTitle,InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'
import {Button, Form, FormGroup, FormText} from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'


/* The Add allows the user to add a place to itinerary using the function passed in to pass values to the parent.
 */
class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:"",
      longitude:"",
      name:"",
      id:""
    };
    this.updateState = this.updateState.bind(this);
    this.addValuesToItinerary-this.addValuesToItinerary.bind(this);
    this.resetState = this.resetState.bind(this);
    this.createInputText = this.createInputText.bind(this);
    this.createInputNumber = this.createInputNumber.bind(this);
    this.latitudeInputGroup = this.latitudeInputGroup.bind(this);
    this.longitudeInputGroup = this.longitudeInputGroup.bind(this);
    this.nameInputGroup = this.nameInputGroup.bind(this);
    this.idInputGroup = this.idInputGroup.bind(this);

  };
  updateState(field,event){
    let updateState = this.state;
    updateState[field]=event.target.value;

    this.setState(updateState);

  }
  resetState() {
    this.setState({
      latitude: "",
      longitude: "",
      name: "",
      id: ""
    });
  }


  addValuesToItinerary()
  {
    this.props.addPlace(this.state);
    this.resetState();

  }

  createInputText(id,valueName)
  {
    return(<Input id = {id}  value={this.state[valueName]}  onChange={(event)=>this.updateState(valueName,event)} type = "text" />);

  }

  createInputNumber(id,valueName)
  {
    return(<Input id = {id}  value={this.state[valueName]}  onChange={(event)=>this.updateState(valueName,event)} type = "number" step="any"/>);

  }

  nameInputGroup()
  {
    return (
        <InputGroup>
      <InputGroupText>
        Name:
      </InputGroupText>
      {this.createInputText("AddPlaceInputNameId","name")};
    </InputGroup>);

  }

  idInputGroup()
  {
    return(
        <InputGroup>
      <InputGroupText>
        Id:
      </InputGroupText>
      {this.createInputText("AddPlaceInputPlaceIdId","id")};
    </InputGroup>);
  }

  latitudeInputGroup()
  {
    return(
        <InputGroup>
          <InputGroupText>
            Latitude:
          </InputGroupText>
          {this.createInputNumber("AddPlaceInputLatitudeId","latitude")};
        </InputGroup>
    );
  }

  longitudeInputGroup()
  {
    return(
        <InputGroup>
          <InputGroupText>
            Longitude:
          </InputGroupText>
          {this.createInputNumber("AddPlaceInputLongitudeId","longitude")};
        </InputGroup>
    );

  }
  render() {

    return (
        <Card>
          <CardBody>
            <CardTitle> Add </CardTitle>
              {this.nameInputGroup()}
              {this.idInputGroup()}
              {this.latitudeInputGroup()}
              {this.longitudeInputGroup()}
            <InputGroup>
              <Button id="AddPlaceButtonAddId" onClick={()=>this.addValuesToItinerary()}> Add</Button>
            </InputGroup>
          </CardBody>
        </Card>
    );
  }
}
export default AddPlace;