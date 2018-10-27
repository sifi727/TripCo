import React, {Component} from 'react'
import {Button, Card, CardBody, CardTitle, InputGroup, InputGroupText} from 'reactstrap'
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
        }


    render()
    {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Seach and Add New Destinations</CardTitle>

                </CardBody>
            </Card>
        )
    }
}

export default Search;