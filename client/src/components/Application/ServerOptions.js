import React, {Component} from 'react'
import {FormText, Input} from 'reactstrap'
import {Button, Col, Form, FormGroup, Row} from 'reactstrap'

class ServerOptions extends Component{
    constructor(props){
        super(props);

        this.buildColumn = this.buildColumn.bind(this);
    }

    buildColumn(field, id, options, state, txt) {
        return (
            <Col>
                <Form key={state + "_form"}>
                    <FormText style={{fontSize : "16px"}}>
                        {txt}
                    </FormText>
                    <h3 style={{color : "#00006a"}}>
                        {state}
                    </h3>
                    <p>
                        {options}
                    </p>
                    <Input id ={id} type ={"text"} value={this.props[field]} onChange={(event)=>this.props.updateOptionState(field, event)} />
                </Form>
            </Col>
        )
    }

    render() {
        const buildColumn = this.buildColumn;

        return (
            <Row>
                {buildColumn("hostName", "hostnameID", "Enter a hostname:", this.props.hostname, "Current Hostname:")}
                {buildColumn("portNumber", "portID", "Enter a port number:", this.props.port, "Current Port:")}
            </Row>
 /*
                <Col>
                    <Form>
                        <FormText style={{fontSize : "16px"}}>
                            Current Hostname:
                        </FormText>
                        <h3 style={textSyle}>
                            {this.props.hostname}
                        </h3>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <FormText style={{fontSize : "16px"}}>
                            Current Port:
                        </FormText>
                        <h3 style={textSyle}>
                            {this.props.port}
                        </h3>
                    </Form>
                </Col>

            <Row>

            </Row>
            <Form>
                <FormText color="muted">
                    Enter your server options:
                </FormText>
                <input id="portId" type="text" value={this.props.port} onChange={this.props.updatePort}/>
                <input id="hostnameId" type="text" value={this.props.hostname} onChange={this.props.updateHostname}/>
            </Form>
             */
        )
    }
}
export default ServerOptions;