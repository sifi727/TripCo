import React, {Component} from 'react'
import {Card, CardBody,CardTitle,InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'
import {Button, Form, FormGroup, FormText} from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'
import Add from "./AddPlace";

/* The Add allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class AddPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:null,
      longitude:null,
      name:"",
      id:""
    };
    this.updateState = this.updateState.bind(this);
    this.addValuesToItinerary-this.addValuesToItinerary.bind(this);

  };
  updateState(field,event){
    let updateState = this.state;
    updateState[field]=event.target.value;

    this.setState(updateState);

  }
  addValuesToItinerary(event)
  {
  }

  render() {

    return (
        <Card>
          <CardBody>
            <CardTitle> Add </CardTitle>
            <InputGroup>
              <InputGroupText>
                Name:
              </InputGroupText>
              <Input id = "AddPlaceInputNameId"  value={this.state.name}  onChange={(event)=>this.updateState("name",event)} type = "text" />
            </InputGroup>
            <InputGroup>
              <InputGroupText>
                Name:
              </InputGroupText>
              <Input id = "AddPlaceInputPlaceIdId"  value={this.state.name}  onChange={(event)=>this.updateState("id",event)} type = "text" />
            </InputGroup>

            <InputGroup>
              <InputGroupText>
                Latitude:
              </InputGroupText>
              <Input id = "AddPlaceInputLatitudeId"  value={this.state.latitude}  onChange={(event)=>this.updateState("latitude",event)} type = "number" />
            </InputGroup>
              <InputGroup>
              <InputGroupText>
                Longitude:
              </InputGroupText>
              <Input id = "AddPlaceInputLongitudeId"  value={this.state.longitude}  onChange={(event)=>this.updateState("longitude",event)} type = "number" />
            </InputGroup>
            <InputGroup>
              <Button id="AddPlaceButtonAddId" onclick={(event)=>this.addValuesToItinerary(event)}> Add</Button>
            </InputGroup>
          </CardBody>
        </Card>
    );
  }
}
export default AddPlace;