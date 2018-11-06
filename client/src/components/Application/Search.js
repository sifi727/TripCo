import React, {Component} from 'react'
import {Button, Card, CardBody, CardTitle, Col, Container, FormText, Input, Row, Table} from 'reactstrap'
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
                    "limit"     : 0,
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
        }

    buildCol(text, id, value, type, field) {
            return (
                <Col>
                    <FormText color="muted" >
                        {text}
                    </FormText>
                    <Input id ={id} value={value} type ={type} onChange={(event)=>this.updateSearch()} />
                </Col>
            );
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
                <Table striped={true} bordered={true} responsive={true}>
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
                    {buildCol('Enter your search limit', 'SearchLimitField', this.state.search.limit, 'number', 'limit')}
                </Row>
            </Container>
        );
    }

    submit() {
        let search = this.state.search;

        request(search, 'search', this.props.port, this.props.hostname).then(response => {
            this.setState({"search": response});
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



    render() {
        const searchField = this.searchField();
        const searchButton = this.searchButton();
        const getTable = this.getTable();

        return (
            <Card>
                <CardBody style={{overflow:'scroll', maxHeight:'77%'}} >
                    <CardTitle>Seach and Add New Destinations</CardTitle>
                    {searchField}
                    <br />
                    {searchButton}
                    <br /><br />
                    {getTable}
                </CardBody>
            </Card>
        )
    }
}

export default Search;