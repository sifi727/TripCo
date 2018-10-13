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
      latitude:"",
      longitude:"",
      name:""
    };
    this.updateState = this.updateState.bind(this);

  };
  updateState(field,event){
    let updateState = this.state;
    updateState[field]=event.target.value;

    this.setState(updateState);

  }
  render() {

    return (
        <Card>
          <CardBody>
            <CardTitle> Add </CardTitle>
            <InputGroup>
              <Input id = "AddPlaceInputLongitudeOriginId"  value={this.state.longitude}  onChange={(event)=>this.updateState("longitude",event)} type = "text" />

            </InputGroup>


          </CardBody>
        </Card>
    );
  }
}
export default AddPlace;