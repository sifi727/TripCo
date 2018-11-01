import React, {Component} from 'react'
import {Card, CardBody, FormText, Input, ListGroup,ListGroupItem, Row, Col} from 'reactstrap'
import {ButtonGroup, Button, Form, FormGroup} from 'reactstrap'
import {userFriendlyAttribute} from '../../api/api.js'


class AttributeOptions extends Component{
  constructor(props){
    super(props);

    this.buildAttributeListItem = this.buildAttributeListItem.bind(this);
    this.buildListofAttributes = this.buildListofAttributes.bind(this);
  }

  buildAttributeListItem(attribute)
  {
    return(<ListGroupItem><Input type="checkbox" value={attribute} checked={this.props.attributesToShow.includes(attribute)} onClick={ (event)=> this.props.updateAttributesToShow(event.target.value)} /> {userFriendlyAttribute(attribute)}</ListGroupItem>);

  }

  buildListofAttributes(attribute)
  {
    return(
        <Row>
        <Col>
       <p>Attributes to display</p>
        <ListGroup style={{overflow:'scroll', maxHeight:'150px'}}>
        {this.props.attributes.map((attribute)=>this.buildAttributeListItem(attribute))}
        </ListGroup>
    </Col>
      </Row>
    );

  }
  render(){
    return(

        <ListGroup>
        {this.buildListofAttributes()}
    </ListGroup>
  );
  }
}
export default AttributeOptions;