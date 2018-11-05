import React, {Component} from 'react'
import {Button, Card, CardBody, CardTitle, FormText, Input, InputGroup, InputGroupText, Container, Row, Col} from 'reactstrap'
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

            this.searchField = this.searchField.bind(this);
            this.updateSearch = this.updateSearch.bind(this);
            this.searchButton = this.searchButton.bind(this);
            this.submit = this.submit.bind(this);
            this.buildCol = this.buildCol.bind(this);
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

    updateSearch(field, event) {
            let search = this.state.search;
            search[field] = event.target.value;
            this.setState({search:search});
    }

    searchButton() {
        return (
            <Button id="SearchButtonId"  onClick={(event) => this.submit()}>Search</Button>
        );
    }

    submit() {
        let search = this.state.search;

        request(search, 'search', this.props.port, this.props.hostname).then(response => {
            this.setState({"search": response});
        });
    }

    render() {
        const searchField = this.searchField();
        const searchButton = this.searchButton();

        return (
            <Card>
                <CardBody>
                    <CardTitle>Seach and Add New Destinations</CardTitle>
                    {searchField}
                    <br />
                    {searchButton}
                </CardBody>
            </Card>
        )
    }
}

export default Search;