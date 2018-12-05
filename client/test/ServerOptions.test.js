

import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'
import { shallow } from 'enzyme'   // (2)
import ServerOptions from '../src/components/Application/ServerOptions'


function testPort(){

  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };

  const wrapper = shallow((<ServerOptions updateOptionState={(field,event)=>{
    expect(event.target.value).toEqual(8088);
    expect(field).toEqual('portNumber');}
  }  config={config} />));
    expect(wrapper.exists('#portId')).toEqual(true);
    expect(wrapper.find('#portId').props().value).toEqual(undefined);
  wrapper.find('#portId').simulate('change', {
    target: {
      value: 8088
    }
  });
 // expect(wrapper.find('#portId').props().value).toEqual(8088);



}

function testHostname(){
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
  const wrapper = shallow((<ServerOptions updateOptionState={(field,event)=>{
    expect(event.target.value).toEqual('local');
    expect(field).toEqual('hostName');}} config={config} />));

    expect(wrapper.exists('#hostnameId')).toEqual(true);
    expect(wrapper.find('#hostnameId').props().value).toEqual(undefined);
  wrapper.find('#hostnameId').simulate('change', {
    target: {
      value: 'local'
    }
  });

}



test('test ServerOptions Port', testPort);
test('test ServerOptions Hostname', testHostname);

