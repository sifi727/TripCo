import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'
import Search from '../src/components/Application/Search'

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
    expect(wrapper.exists('#FoundSearchId')).toEqual(true);
}

function testSearchButtonExist() {
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}/> ));
    expect(wrapper.exists('#SearchButtonId')).toEqual(true);
}

function testTextFieldOnChange() {
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}  />));
    expect(wrapper.state().search.match).toEqual("");
    wrapper.find('#SearchField').simulate('change', {
        target: {
            value:"Den"
        }
    });
    expect(wrapper.state().search.match).toEqual("Den");
}

function testFoundFieldUpdatedWithNewSearch() {
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}  />));
  let updateSearch ={
    "version"   : 4,
        "type"      : "search",
        "match"     : "",
        "filters"   : [],
        "limit"     : 25,
        "found"     : 12,
        "places"    : []
  };
    wrapper.setState({"search":updateSearch});
    let foundVal= wrapper.find('#FoundSearchId').prop('value');
    expect(12).toEqual(foundVal);
        }



test('Checks to see that the search text field renders',testTextFieldExist());
test('Checks to see that the search number field renders',testNumberFieldExist());
test('Checks to see that the search button renders',testSearchButtonExist());
test('Checks to see that the search text field changes the \"match\" field in the search state',testTextFieldOnChange());
testFoundFieldUpdatedWithNewSearch