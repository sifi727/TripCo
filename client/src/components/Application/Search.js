import React, {Component} from 'react'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  FormText,
  Input,
  Row,
  Table,
  Label,
  Collapse,
  ButtonGroup
} from 'reactstrap'
import {request, get_comfig} from '../../api/api.js'

class Search extends Component {
        constructor(props) {
            super(props);
            this.state = {
                search:{
                    "version"   : 4,
                    "type"      : "search",
                    "match"     : "",
                    "filters"   : [],
                    "limit"     : 25,
                    "found"     : 0,
                    "places"    : []
                }
            }

            this.buildCol = this.buildCol.bind(this);
            this.deleteRowInTable = this.deleteRowInTable.bind(this);
            this.getTable = this.getTable.bind(this);
            this.getTableHeader = this.getTableHeader.bind(this);
            this.getTableRow = this.getTableRow.bind(this);
            this.searchButton = this.searchButton.bind(this);
            this.searchField = this.searchField.bind(this);
            this.submit = this.submit.bind(this);
            this.td = this.td.bind(this);
            this.updateSearch = this.updateSearch.bind(this);
            this.checkboxGroup = this.checkboxGroup.bind(this);
            this.innerCheckboxGroup = this.innerCheckboxGroup.bind(this);
            this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
            this.toggle = this.toggle.bind(this);
            this.updateSearchFilter = this.updateSearchFilter.bind(this);
            this.addValueToSearchFilter = this.addValueToSearchFilter.bind(this);
            this.removeValueToSearchFilter= this.removeValueToSearchFilter.bind(this);
            this.resetFilter = this.resetFilter.bind(this);
            this.addAll = this.addAll.bind(this);
        }

    buildCol(text, id, value, type, field) {
            return (
                <Col>
                    <FormText color="muted" >
                        {text}
                    </FormText>
                    <Input id ={id} value={value} type ={type} onChange={(event)=>this.updateSearch(field, event)} />
                </Col>
            );
    }

    resetFilter()
    {
      document.querySelectorAll('.searchFilterTextBoxGroupClass:checked').forEach( el => el.checked = false );
      let search =      {search:{
      "version"   : 4,
          "type"      : "search",
          "match"     : "",
          "filters"   : [],
          "limit"     : 25,
          "found"     : 0,
          "places"    : []
    }};
      this.setState(search);

    }
  componentDidUpdate(prevProps)
    {

      if(prevProps.port !== this.props.port || prevProps.host !== this.props.host)
      {
        this.resetFilter();
      }
    }


    deleteRowInTable(place) {
        let places = this.state.search.places;
        let index = places.indexOf(place);

        /*
         * The reference source to the line below: https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
         */
        if (index !== -1) {
            places.splice(index, 1);
        }

        this.setState({places:places});
    }

    getTable() {
        const getTableHeader = this.getTableHeader();
        const getTableRow = this.getTableRow();

        if(this.state.search.places.length > 0)  {
            return (
                <Table striped={true} bordered={true} responsive={true} >
                    {getTableHeader}
                    <tbody>
                    {getTableRow}
                    </tbody>
                </Table>
            );
        }
    }

    getTableHeader() {
        return (
            <thead>
                <tr><th>Destination</th><th>Id</th><th>Latitude</th><th>Longitude</th><th>Add to Itinerary</th></tr>
            </thead>
        )
    }

    getTableRow() {
        const td = this.td;
        const rows = this.state.search.places.map((place) =>
            <tr key={Math.random() + '_row'} >
                {td(place['name'])}
                {td(place['id'])}
                {td(place['latitude'])}
                {td(place['longitude'])}
                <td key={place['name'] + '_button'} align="center" >
                    <Button id={place['name'] + '_add'} onClick={(event) => {this.props.addPlace(place), this.deleteRowInTable(place)}} >Add</Button>
                </td>
            </tr>
        );
        return rows
    }

    searchButton() {
        return (
            <Button id="SearchButtonId"  onClick={(event) => this.submit()}>Search</Button>

        );
    }

    searchField() {
        const buildCol = this.buildCol;

        return (
            <Container>
                <Row>
                    {buildCol('Enter your search below', 'SearchField', this.state.search.match, 'text', 'match')}
      {buildCol('Found', 'FoundSearchId', this.state.search.found, 'text', 'match')}
                </Row>
            </Container>
        );
    }

    submit() {
        let search = this.state.search;

        request(search, 'search', this.props.port, this.props.hostname).then(response => {
            this.setState({"search": response});
          this.setState({collapse: false});
        });
    }

    td(field) {
        return (
            <td key={field + '_field'} > {field} </td>
        )
    }

    updateSearch(field, event) {
        let search = this.state.search;
        search[field] = event.target.value;
        this.setState({search:search});
    }
    updateSearchFilter(search,name,values)
    {
      for (var i in search["filters"]) { // modified from here https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer/4689892
        if (search["filters"][i].name == name) {
          search["filters"][i].values = values;
          this.setState({search: search});
          break;
        }
      }

    }

    removeValueFromValues(values, value)
    {
      let rtnValues= values.filter((elementValue,index,arr)=>{  //filter out the value you don't want
        return elementValue != value;
      });

      return rtnValues;

    }

    addValueToSearchFilter(search,event){
      var type = search.filters.find(
          x => x.name === event.target.name);

      if (!type) {  // the filter do not have type filter in it.
        let obj = {
          "name": event.target.name,
          "values": [event.target.value]
        };

        search["filters"].push(obj);
        this.setState({search: search});
      }
      else {  // the filter has the key but not the value

        type["values"].push(event.target.value);
        this.updateSearchFilter(search,event.target.name,type.values);

      }

    }

    removeValueToSearchFilter(search,event){
      var values = search.filters.find(
          x => x.name === event.target.name).values;

      values=this.removeValueFromValues(values, event.target.value);

      this.updateSearchFilter(search,event.target.name,values);

      values = search.filters.find(
          x => x.name === event.target.name).values;
      if(values.length==0) {

        var type = this.state.search.filters.filter((kvp)=>{

            return(kvp.values.length>0);}
            );
        if(!type)
        {
          type=[];
        }
        search["filters"] = type;
        this.setState({search: search});
      }
    }


  onCheckBoxClick(event){

          let search = this.state.search;

          if(event.target.checked) {

            this.addValueToSearchFilter(search,event);
          }
          else   //removing a filter
          {
             this.removeValueToSearchFilter(search,event);
          }
    }

  innerCheckboxGroup(filter)
  {

    return(filter.values.map((value)=>{
      return(
          <FormGroup check  className="ml-4">
            <Input className={"searchFilterTextBoxGroupClass"} type="checkbox" name={filter.name} value={value} id={filter.name+value} onClick={(event)=>this.onCheckBoxClick(event)} />
            <Label for={value} check>{value}</Label>
          </FormGroup>
      );
    }));
  }

    checkboxGroup()
    {
     let checkboxes= this.props.config.filters.map((filter)=>{
         return(
             <FormGroup check  >
             <Label>{filter.name}</Label>


             {this.innerCheckboxGroup(filter)}
             </FormGroup>

     );

      });
       return(checkboxes

       );

    }
  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  addAll(){
      this.state.search.places.forEach(place => {
          this.props.addPlace(place);
      });
      let search = this.state.search;
      search.places =[];
      this.setState(search);
  }

    render() {
        const searchField = this.searchField();
        const searchButton = this.searchButton();
        const getTable = this.getTable();
        const checkboxGroup = this.checkboxGroup();

        return (
            <Card>
                <CardBody >
                    <CardTitle>Seach and Add New Destinations</CardTitle>
                    {searchField}
                    <br />
                    <Row>
                      <Col>
                        <ButtonGroup>
                            {searchButton}
                            <Button onClick={this.addAll}> Add All Results</Button>
                            <Button  onClick={this.toggle}>Search Filters</Button>
                        </ButtonGroup>
                      </Col>
                        <Col  offset-sm-1>
                        <Collapse isOpen={this.state.collapse}>
                          {checkboxGroup}
                        </Collapse>
                        </Col>

                      <Col>

                      </Col>
                    </Row>
                    <br /><br />
                    <div style={{overflow:'scroll', maxHeight:'400px'}} >
                    {getTable}
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default Search;