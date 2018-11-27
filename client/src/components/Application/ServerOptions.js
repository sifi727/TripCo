import React, {Component} from 'react'
import {Card, CardBody, FormText} from 'reactstrap'
import {ButtonGroup, Button, Col, Form, FormGroup, Row} from 'reactstrap'

class ServerOptions extends Component{
    constructor(props){
        super(props);

        this.buildColumn = this.buildColumn.bind(this);
    }

    buildColumn(txt, state) {
        return (
            <Col>
                <Form>
                    <FormText style={{fontSize : "16px"}}>
                        {txt}
                    </FormText>
                    <h3 style={{color : "#00006a"}}>
                        {state}
                    </h3>
                </Form>
            </Col>
        );
    }

    render() {
        const buildColumn = this.buildColumn();

        return (
            <Row>
                {buildColumn('Current Hostname:', this.props.hostname)}
                {buildColumn('Current Port:', this.props.port)}
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
                */
            </Row>

            /*

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