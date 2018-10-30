import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'
import Search from '../src/components/Application/Search'

const  startProps = {
    port: location.port,
    hostname: location.hostname,
};

function testTextField() {


    const wrapper = shallow((<Search />));
    expect(wrapper.exists('#SearchField')).toEqual(true);
}

test('Checks to see that the search text field renders',testTextField());