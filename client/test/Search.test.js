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
    expect(wrapper.exists('#SearchLimitField')).toEqual(true);
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

function testNumberFieldOnChange() {
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname}  />));
    expect(wrapper.state().search.limit).toEqual(0);
    wrapper.find('#SearchLimitField').simulate('change', {
        target: {
            value:7
        }
    });
    expect(wrapper.state().search.limit).toEqual(7);
}

test('Checks to see that the search text field renders',testTextFieldExist());
test('Checks to see that the search number field renders',testNumberFieldExist());
test('Checks to see that the search button renders',testSearchButtonExist());
test('Checks to see that the search text field changes the \"match\" field in the search state',testTextFieldOnChange());
test('Checks to see that the search number field changes the \"limit\" field in the search state',testNumberFieldOnChange());
