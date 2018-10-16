import React, {Component} from 'react'
import {Card, CardBody,CardTitle,InputGroup, InputGroupText, Input} from 'reactstrap'
import {Button} from 'reactstrap'
import {get_comfig} from '../../api/api.js'


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
    this.addValuesToItinerary = this.addValuesToItinerary.bind(this);
    this.resetState = this.resetState.bind(this);
    this.createInputText = this.createInputText.bind(this);
    this.createInputNumber = this.createInputNumber.bind(this);
    this.numberInputGroup = this.numberInputGroup.bind(this);
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

  numberInputGroup(id,value,inputGroupText)
  {
    return(
        <InputGroup>
          <InputGroupText>
            {inputGroupText}
          </InputGroupText>
          {this.createInputNumber(id,value)}
        </InputGroup>);

  }

  textInputGroup(id,value,inputGroupText) {
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
              {this.textInputGroup("AddPlaceInputNameId","name","Name:")}
              <br/>
              {this.textInputGroup("AddPlaceInputPlaceIdId","id","Id:")}
              <br/>
              {this.numberInputGroup("AddPlaceInputLatitudeId","latitude","Latitude:")}
              <br/>
              {this.numberInputGroup("AddPlaceInputLongitudeId","longitude","Longitude:")}
              <br/>
            <InputGroup>
              <Button id="AddPlaceButtonAddId" onClick={()=>this.addValuesToItinerary()}> Add</Button>
            </InputGroup>
          </CardBody>
        </Card>
    );
  }
}
export default AddPlace;