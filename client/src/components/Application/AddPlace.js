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

  };
  render() {

    return (
        <Card>
          <CardBody>
            <CardTitle> Add </CardTitle>


          </CardBody>
        </Card>
    );
  }
}
export default AddPlace;