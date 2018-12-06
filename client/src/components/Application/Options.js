import React, {Component} from 'react'
import {Card, CardBody, FormText} from 'reactstrap'
import {ButtonGroup, Button, Form, FormGroup, Col, Row} from 'reactstrap'
import ServerOptions from './ServerOptions'
import AttributeOptions from './AttributeOptions'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostName: "",
      portNumber: ""
    };

    this.displayFields = this.displayFields.bind(this);
    this.handleUnitName = this.handleUnitName.bind(this);
    this.handleUnitRadius = this.handleUnitRadius.bind(this);
    this.buildOptimizationButtons = this.buildOptimizationButtons.bind(this);
    this.buildOptimizationForm = this.buildOptimizationForm.bind(this);
    this.submitServerInfo = this.submitServerInfo.bind(this);
    this.updateOptionState = this.updateOptionState.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.isUserDefined = false;
  }

  displayFields() {
    if (this.isUserDefined) {
      return (
          <Form>
            <FormText color="muted">
              Enter your user defined unit name:
            </FormText>
            <input type="text" name="uName" id="unitName"
                   value={this.props.options.unitName}
                   onChange={this.handleUnitName}/>

            <FormText color="muted">
              Enter your user defined unit radius:
            </FormText>
            <input type="text" name="uRaduis" id="unitRadius"
                   value={this.props.options.unitRadius}
                   onChange={this.handleUnitRadius}/>
          </Form>
      )
    }
  }

  handleUnitName(event) {
    this.props.updateOptions('unitName', event.target.value)
  }

  handleUnitRadius(event) {
    this.props.updateOptions('unitRadius', event.target.value)
  }

  buildOptimizationButtons() {
    const buttons = this.props.config.optimization.map((optimizationLevel) =>
        < Button
            key={'optimization_button_' + optimizationLevel.label}
            className='btn-outline-dark unit-button'
            active={this.props.options.optimization === optimizationLevel.label}
            value={optimizationLevel.label}
            onClick={(event) => this.props.updateOptions('optimization',
                event.target.value)}
        >
          {optimizationLevel.label.charAt(0).toUpperCase()
          + optimizationLevel.label.slice(1)}
        </Button>
    );
    return (buttons);

  }

  buildOptimizationForm() {
    const buttons = this.buildOptimizationButtons();
    return (
        <FormGroup>
          <FormText color="muted">
            Select optimization level:
          </FormText>
          <Form>
            <ButtonGroup vertical>
              {buttons}
            </ButtonGroup>
          </Form>
        </FormGroup>
    );

  }

  submitServerInfo() {
    this.props.updateHostname(this.state.hostName);
    this.props.updatePort(this.state.portNumber);
    this.props.initConfig(this.state.portNumber, this.state.hostName);

  }

  updateOptionState(field, event) {
    if (field === "hostName") {
      this.setState({
        hostName: event.target.value
      });
    } else {
      this.setState({
        portNumber: event.target.value
      });
    }
  }

  updateMap(event) {
    if(window.confirm("If you change this option, you will have to plan a new trip to view the map in this new format.")) {
      // clear out the map
      this.props.updateTrip('map', '');
      // change the map type in options
      this.props.updateOptions('map',
          event.target.value);
    }
  }

  render() {
    const isUserDefined = this.isUserDefined;
    var optimizationForm = null;
    if (this.props.config.optimization) {
      optimizationForm = this.buildOptimizationForm();

    }
    const buttons = this.props.config.units.map((unit) =>
        <Button
            key={'distance_button_' + unit}
            className='btn-outline-dark unit-button'
            active={this.props.options.units === unit}
            value={unit}
            onClick={(event) => this.props.updateOptions('units',
                event.target.value)}
        >
          {unit.charAt(0).toUpperCase() + unit.slice(1)}
        </Button>
    );

    let mapBtns;
    if(this.props.config.maps !== null) {
      mapBtns = this.props.config.maps.map((type) =>
          <Button
              key={'map_button_' + type}
              className='btn-outline-dark unit-button'
              active={this.props.options.map === type}
              value={type}
              onClick={(event) => this.updateMap(event)}
          >
            {type}
          </Button>
      );
    }

    let saveBtn;
    if(this.props.map !== null) {
      if(this.props.map === "") {
        saveBtn = <a className="btn btn-secondary.disabled text-white"
                     download="map.kml">
          Save Map
        </a>
      }
      else {
        saveBtn = <a className="btn btn-secondary text-white"
                     href={`data:text/plain;charset=utf-8,${
                         encodeURIComponent(this.props.map)}`}
                     download="map.kml">
          Save Map
        </a>
      }
    }

    let form;

    if (this.props.options.units === "user defined") {
      this.isUserDefined = true;
      form = this.displayFields()
    } else {
      this.isUserDefined = false;
    }

    return (
        <Card>
          <CardBody>
            <Row>
              <Col>
                <p>Select the options you wish to use.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormText color="muted">
                  Select the units or define your own:
                </FormText>
                <ButtonGroup vertical>
                  {buttons}
                </ButtonGroup>
              </Col>
              <Col>
                <FormGroup>
                  {form}
                  {optimizationForm}
                </FormGroup>
              </Col>

              <Col>
                <FormText color="muted">
                  Select the version of map:
                </FormText>
                <ButtonGroup vertical>
                  {mapBtns}
                  {saveBtn}
                </ButtonGroup>
              </Col>
              <Col>
                <AttributeOptions attributes={this.props.attributes}
                                  attributesToShow={this.props.attributesToShow}
                                  updateAttributesToShow={this.props.updateAttributesToShow}/>
              </Col>
            </Row>
            <ServerOptions port={this.props.port} hostname={this.props.hostname}
                           portNumber={this.state.portNumber}
                           hostName={this.state.hostName}
                           updatePort={this.props.updaButtontePort}
                           updateHostname={this.props.updateHostname}
                           updateOptionState={this.updateOptionState}/>
            <Row>
              <Button  value="updateBtn"
                      onClick={(event) => {
                        this.submitServerInfo()
                      }}>Update</Button>
            </Row>
          </CardBody>
        </Card>
    )
  }
}

export default Options;
