import React, {Component} from 'react'
import {Card, CardBody} from 'reactstrap'
import {Button, Form, FormGroup, FormText} from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'

/* The UploadTffi allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class UploadTffi extends Component{
    constructor(props) {
        super(props);
        this.readFuction = this.readFuction.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.submit = this.submit.bind(this);
      this.state = {
        fileIsSelected:false



      };
    }

    submit(){

          request(this.props.trip,'plan').then(response => {
            this.props.updateTffiObject(response);

    });


    }

    readFuction(e){

            console.log("fileSelect"+this.state.fileIsSelected);
      this.setState({
        fileIsSelected: true
      });
            let result = e.target.result;  //makes the json string store that some where.
            let json = JSON.parse(result);
            if(json.options === null || typeof json.options === 'undefined'){
               return;
            }
            this.props.updateTffiObject(json);

      console.log("fileSelect"+this.state.fileIsSelected);
    }

    uploadFile(event){
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.readAsText(file, 'UTF-8');
        reader.onload = this.readFuction;
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <input type="file" name="file" id="tffi" onChange={this.uploadFile} />
                            <FormText color="muted">
                                Insert your TFFI file in the above input.
                            </FormText>
                            <Button id="PlanTffiButtonId" disabled={!this.state.fileIsSelected} onClick={(event) => this.submit()}>Plan</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default UploadTffi;
