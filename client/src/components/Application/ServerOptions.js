import React, {Component} from 'react'
import {Col, Form, FormText, Input, Row} from 'reactstrap'

class ServerOptions extends Component {
  constructor(props) {
    super(props);

    this.buildColumn = this.buildColumn.bind(this);
  }

  buildColumn(field, id, options, state, txt) {
    return (
        <Col>
          <Form key={state + "_form"}>
            <h3>
              {txt}
            </h3>
            <h4 style={{color: "#00006a"}}>
              {state}
            </h4>
            <FormText color="muted">
              {options}
            </FormText>
            <Input id={id} type={"text"} value={this.props[field]}
                   onChange={(event) => {
                     return this.props.updateOptionState(field,
                         event);
                   }}/>
          </Form>
        </Col>
    )
  }

  render() {
    const buildColumn = this.buildColumn;

    return (
        <Row>
          {buildColumn("hostName", "hostnameId", "Enter a new hostname:",
              this.props.hostname, "Current Hostname:")}
          {buildColumn("portNumber", "portId", "Enter a new port number:",
              this.props.port, "Current Port:")}
        </Row>

    )
  }
}

export default ServerOptions;