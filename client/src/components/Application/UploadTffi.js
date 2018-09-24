import React, {Component} from 'react'
import {Card, CardHeader, CardBody, ButtonGroup} from 'reactstrap'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

/* The UploadTffi allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class UploadTffi extends Component{
    constructor(props) {
        super(props);
    }

    tffi(){
        let tffi = document.getElementById('tffi');
        tffi.type = "submit";
        this.props.updateTffiObject(tffi);
    }

    uploadFile(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        console.log(file);


        if(file){

            let content = reader.readAsText(file,'UTF-8');
            console.log(content);
        }
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
                            <Button onClick={(event) => this.tffi()}>Upload</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default UploadTffi;
