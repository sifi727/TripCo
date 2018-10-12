import React, {Component} from 'react'
import {Card, CardBody, FormText} from 'reactstrap'
import {ButtonGroup, Button, Form, FormGroup} from 'reactstrap'
class ServerOptions extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Form>
                <FormText color="muted">
                    Enter your server options:
                </FormText>
                <input type="text" value={this.props.port} onChange={this.props.updatePort}/>
                <input type="text" value={this.props.hostname} onChange={this.props.updateHostname}/>
            </Form>
        )
    }
}
export default ServerOptions;