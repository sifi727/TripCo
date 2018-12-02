import React, {Component} from 'react'
import {Button, Card, CardBody, CardTitle, InputGroup, InputGroupText, Input} from 'reactstrap'

/* The Add allows the user to add a place to itinerary using the function passed in to pass values to the parent.
 */
class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      latitude: "",
      longitude: "",
      municipality: "",
      region: "",
      country: "",
      continent: ""
    };
    this.updateState = this.updateState.bind(this);
    this.addValuesToItinerary = this.addValuesToItinerary.bind(this);
    this.resetState = this.resetState.bind(this);
    this.createInputText = this.createInputText.bind(this);
    this.createInputNumber = this.createInputNumber.bind(this);
    this.numberInputGroup = this.numberInputGroup.bind(this);
  };

  updateState(field, event) {
    let updateState = this.state;
    updateState[field] = event.target.value;

    this.setState(updateState);

  }

  resetState() {
    this.setState({
      id: "",
      name: "",
      latitude: "",
      longitude: "",
      municipality: "",
      region: "",
      country: "",
      continent: ""
    });
  }

  addValuesToItinerary() {
    this.props.addPlace(this.state);
    this.resetState();

  }

  createInputText(id, valueName) {
    return (<Input id={id} value={this.state[valueName]} onChange={(event) => this.updateState(valueName, event)} type="text"/>);

  }

  createInputNumber(id, valueName) {
    return (<Input id={id} value={this.state[valueName]} onChange={(event) => this.updateState(valueName, event)} type="number" step="any"/>);

  }

  numberInputGroup(id, value, inputGroupText) {
    return (
        <InputGroup>
          <InputGroupText>
            {inputGroupText}
          </InputGroupText>
          {this.createInputNumber(id, value)}
        </InputGroup>);

  }

  textInputGroup(id, value, inputGroupText) {
    return (
        <InputGroup>
          <InputGroupText>
            {inputGroupText}
          </InputGroupText>
          {this.createInputText(id, value)}
        </InputGroup>
    );
  }

  render() {

    return (
        <Card>
          <CardBody>
            <CardTitle> Add </CardTitle>
            {this.textInputGroup("AddPlaceInputNameId", "name", "Name:")}
            <br/>
            {this.textInputGroup("AddPlaceInputPlaceIdId", "id", "Id:")}
            <br/>
            {this.numberInputGroup("AddPlaceInputLatitudeId", "latitude", "Latitude:")}
            <br/>
            {this.numberInputGroup("AddPlaceInputLongitudeId", "longitude", "Longitude:")}
            <br/>
            {this.textInputGroup("AddPlaceInputMunicipalityId", "municipality", "Municipality:")}
            <br/>
            {this.textInputGroup("AddPlaceInputRegionId", "region", "Region:")}
            <br/>
            {this.textInputGroup("AddPlaceInputCountryId", "country", "Country:")}
            <br/>
            {this.textInputGroup("AddPlaceInputContinentId", "continent", "Continent:")}
            <br/>
            <InputGroup>
              <Button id="AddPlaceButtonAddId" onClick={() => this.addValuesToItinerary()}> Add</Button>
            </InputGroup>
          </CardBody>
        </Card>
    );
  }
}

export default AddPlace;