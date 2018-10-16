import React, {Component} from 'react'
import {Card, CardBody, FormText} from 'reactstrap'
import {ButtonGroup, Button, Form, FormGroup} from 'reactstrap'
import ServerOptions from './ServerOptions';

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.displayFields = this.displayFields.bind(this);
    this.handleUnitName = this.handleUnitName.bind(this);
    this.handleUnitRadius = this.handleUnitRadius.bind(this);
    this.buildOptimizationButtons = this.buildOptimizationButtons.bind(this);
    this.buildOptimizationForm = this.buildOptimizationForm.bind(this);
    this.isUserDefined = false;
  }

  displayFields(){
      if(this.isUserDefined){
          return(
              <Form>
                  <FormText color="muted">
                      Enter your user defined unit name:
                  </FormText>
                  <input type="text" name="uName" id="unitName" value={this.props.options.unitName} onChange={this.handleUnitName}/>

                  <FormText color="muted">
                      Enter your user defined unit radius:
                  </FormText>
                  <input type="text" name="uRaduis" id="unitRadius" value={this.props.options.unitRadius} onChange={this.handleUnitRadius}/>
              </Form>
          )
      }
  }

  handleUnitName(event){
      this.props.updateOptions('unitName', event.target.value)
  }

    handleUnitRadius(event){
        this.props.updateOptions('unitRadius', event.target.value)
    }

    buildOptimizationButtons()
    {
      const buttons = this.props.config.optimization.map( (optimizationLevel) =>
        < Button
            key = {'optimization_button_' +o ptimizationLevel.label}
            className = 'btn-outline-dark unit-button'
            active = {this.props.options.optimization === optimizationLevel.label}
            value = {optimizationLevel.label}
            onClick = {(event) => this.props.updateOptions('optimization', event.target.value)}
         >
          {optimizationLevel.label.charAt(0).toUpperCase() + optimizationLevel.label.slice(1)}
        </Button>
    );
      return(buttons);

    }

  buildOptimizationForm()
  {
    const buttons =  this.buildOptimizationButtons();
    return(
        <FormGroup>
          <FormText color="muted">
            Select Optimization Level.
          </FormText>

          <Form>
            <ButtonGroup>
              {buttons}
            </ButtonGroup>
          </Form>
        </FormGroup>
    );

  }

  render() {
    const isUserDefined = this.isUserDefined;
    var optimizationForm = null;
    if(this.props.config.optimization) {
      optimizationForm = this.buildOptimizationForm();

    }
    const buttons = this.props.config.units.map((unit) =>
      <Button
        key={'distance_button_' + unit}
        className='btn-outline-dark unit-button'
        active={this.props.options.units === unit}
        value={unit}
        onClick={(event) => this.props.updateOptions('units', event.target.value)}
      >
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );

    let form;

    if(this.props.options.units == "user defined"){
        this.isUserDefined = true;
        form = this.displayFields()
    }
    else{
        this.isUserDefined = false;
    }

    return(
      <Card>
        <CardBody>
          <p>Select the options you wish to use.</p>
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
          {optimizationForm}
          <FormGroup>
               {form}
              <ServerOptions port= {this.props.port} hostname = {this.props.hostname}
                             updatePort={this.props.updatePort} updateHostname={this.props.updateHostname}/>
           </FormGroup>
        </CardBody>
      </Card>
    )
  }
}

export default Options;
