

import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'
import { shallow } from 'enzyme'   // (2)
import ServerOptions from '../src/components/Application/ServerOptions'


function testPort(){

    const wrapper = shallow((<ServerOptions port='8088'/>));
    expect(wrapper.exists('#portId')).toEqual(true);
    expect(wrapper.find('#portId').props().value).toEqual('8088');


}

function testHostname(){

    const wrapper = shallow((<ServerOptions hostname='local'/>));
    expect(wrapper.exists('#hostnameId')).toEqual(true);
    expect(wrapper.find('#hostnameId').props().value).toEqual('local');


}



test('test ServerOptions Port', testPort);
test('test ServerOptions Hostname', testHostname);

