import React, {Component} from 'react'
import {Card, CardHeader, CardBody, ButtonGroup} from 'reactstrap'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'

/* The UploadTffi allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class UploadTffi extends Component{
    constructor(props) {
        super(props);
        this.readFuction = this.readFuction.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    submit(){

          request(this.props.trip,'plan').then(response => {
            this.props.updateTffiObject(response);

    });


    }

    readFuction(e){
            let result = e.target.result;  //makes the json string store that some where.
            this.props.updateTffiObject(JSON.parse(result));
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
                            <Button onClick={(event) => this.submit()}>Upload</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default UploadTffi;
