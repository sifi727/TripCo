import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'
import Search from '../src/components/Application/Search'
import {Col, FormText, Input} from "reactstrap";

const  startProps = {
    port: location.port,
    hostname: location.hostname
};

function testTextFieldExist() {
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}/> ));
    expect(wrapper.exists('#SearchField')).toEqual(true);
}

function testNumberFieldExist() {
    const wrapper = shallow((<Search port={startProps.port} hostname={startProps.hostname}/>));
    expect(wrapper.exists('#SearchLimitField')).toEqual(true);
}

function testButtonExist() {
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}/> ));
    expect(wrapper.exists('#SearchButtonId')).to.equal(true);
}

function testTextField() {
    const searchProps = {
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

    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}  />));
    expect(wrapper.state().search.match).toEqual("");

}

test('Checks to see that the search text field renders',testTextFieldExist());
test('Checks to see that the search number field renders',testNumberFieldExist());
test('Checks to see that the search button renders',testButtonExist());
test('Checks to see that the search text field changes the \"match\" field in the search state',testTextField());