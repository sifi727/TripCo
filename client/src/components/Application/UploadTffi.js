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
        reader.readAsText(file, 'UTF-8');
        reader.onload = function(e) {

            if (file) {


                let result = reader.result;
                // let content = "{\n" +
                //     " \"type\" : \"trip\",\n" +
                //      " \"version\" : 2,\n" +
                //      " \"title\" : \"Shopping loop\",\n" +
                //      " \"options\" : {\n" +
                //      "    \"units\":\"miles\"\n" +
                //      "    },\n" +
                //      " \"places\" : [\n" +
                //      "    {\"id\":\"dnvr\", \"name\":\"Denver\", \"latitude\":39.7392, \"longitude\":-104.9903}, \n" +
                //      "    {\"id\":\"bldr\", \"name\":\"Boulder\", \"latitude\":40.01499, \"longitude\":-105.27055}, \n" +
                //      "    {\"id\":\"foco\", \"name\":\"Fort Collins\", \"latitude\":40.585258, \"longitude\":-105.084419} \n" +
                //      "    ]\n" +
                //      "}";
                console.log("I before content");
                console.log("This is real!!");
                console.log(result);
                console.log("I after content");

            }
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
