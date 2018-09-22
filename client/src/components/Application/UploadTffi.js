import React, {Component} from 'react'
import {Card, CardHeader, CardBody, ButtonGroup} from 'reactstrap'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

/* The UploadTffi allows the user to upload their Trip TFFI file
 * and then updates the parent Trip object in the Application.js.
 */
class UploadTffi extends Component{
    constructor(props) {
        super(props);

        this.trip = {
            version: 2,
            type: "trip",
            title: "",
            places: [],
            options: {},
            distances: [],
            map: ""
        };
    }

    tffi(tffi){
        this.trip = tffi;
        this.props.updateTffiObject(this.trip)
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleFile">Upload TFFI file:File</Label>
                            <Input type="file" name="file" id="tffi" />
                            <FormText color="muted">
                                Insert your TFFI file in the above input.
                            </FormText>
                            <Button onClick={(event) => tffi(document.getElementById('tffi').submit())}>Submit</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default UploadTffi;
