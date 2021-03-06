import React, {Component} from 'react'
import {Card, CardBody} from 'reactstrap'
import {Button, Form, FormGroup, FormText, ButtonGroup} from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'

/* The PlanUtilities allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class PlanUtilities extends Component {
  constructor(props) {
    super(props);
    this.readFuction = this.readFuction.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      fileIsSelected: false

    };
  }

  submit() {

    request(this.props.trip, 'plan', this.props.port, this.props.hostname).then(
        response => {
          this.props.updateTffiObject(response);

        });

  }

  readFuction(e) {

    this.setState({
      fileIsSelected: true
    });
    let result = e.target.result;  //makes the json string store that some where.
    let json = JSON.parse(result);
    this.props.updateTffiObject(json);

  }

  clearTrip(event) {
    if(window.confirm("Are sure you want to clear your current itinerary?"))
    {
      this.props.resetTrip();
      document.getElementById("FileTffiInputFieldId").value=null;

    }


  }

  uploadFile(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = this.readFuction;
    reader.readAsText(file, 'UTF-8');
  }

  render() {

    return (
        <Card>
          <CardBody>
            <Form>
              <FormGroup>
                <input id="FileTffiInputFieldId" type="file" name="file"
                       onChange={this.uploadFile}/>
                <FormText color="muted">
                  Insert your TFFI file in the above input.
                </FormText>
                <ButtonGroup>
                  <Button id="PlanTffiButtonId"
                          disabled={!this.props.trip.places.length}
                          onClick={(event) => this.submit()}>Plan</Button>
                  <a className="btn btn-secondary text-white"
                     href={`data:text/json;charset=utf-8,${
                         encodeURIComponent(JSON.stringify(this.props.trip))}`}
                     download="data.json">
                    Save
                  </a>
                   <Button id="ClearTffiButtonId" onClick={(event)=> this.clearTrip()}>Clear Trip</Button>
                </ButtonGroup>

              </FormGroup>
            </Form>
          </CardBody>
        </Card>
    )
  }
}

export default PlanUtilities;