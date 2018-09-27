import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormText} from 'reactstrap'
import { ButtonGroup, Button, Form, FormGroup, Table } from 'reactstrap'

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
    this.initialUnitName = this.initialUnitName.bind(this);
    this.initialUnitRadius = this.initialUnitRadius.bind(this);
    this.isUserDefined = false;
    this.initialUnitName();
    this.initialUnitRadius();
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
  
  initialUnitName(){
      this.props.updateOptions('unitName', "unitName")
  }

  initialUnitRadius(){
      this.props.updateOptions('unitRadius', 0.0);
  }

  handleUnitName(event){
      this.props.updateOptions('unitName', event.target.value)
  }

    handleUnitRadius(event){
        this.props.updateOptions('unitRadius', event.target.value)
    }

  render() {
    const isUserDefined = this.isUserDefined;
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
          <FormGroup>
               {form}
           </FormGroup>
        </CardBody>
      </Card>
    )
  }
}

export default Options;
