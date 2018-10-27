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
        }

    searchField() {
        return (
            <Container>
                <Row>
                    <Col>
                        <FormText color="muted">
                            Enter your search below
                        </FormText>
                        <Input id = "SearchField" value={this.state.search.match} type = "text" onChange={(event)=>this.updateSearch('match', event)} />
                    </Col>
                    <Col>
                        <FormText color="muted">
                            Enter your search limit
                        </FormText>
                        <Input id = "SearchLimitField" value={this.state.search.limit} type = "number" onChange={(event)=>this.updateSearch('limit', event)} />
                    </Col>
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