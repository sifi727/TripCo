import './enzyme.config.js'                   // (1)
import React from 'react'
import { shallow } from 'enzyme'
import Search from '../src/components/Application/Search'

const  startProps = {
    port: location.port,
    hostname: location.hostname
};

function testTextFieldExist() {
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname} config={config}/> ));
    expect(wrapper.exists('#SearchField')).toEqual(true);
}

function testNumberFieldExist() {
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
    const wrapper = shallow((<Search port={startProps.port} hostname={startProps.hostname} config={config}/>));
    expect(wrapper.exists('#FoundSearchId')).toEqual(true);
}

function testSearchButtonExist() {
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };


    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname} config={config}/> ));
    expect(wrapper.exists('#SearchButtonId')).toEqual(true);
}
function testFilterCheckBoxes(){
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
  const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname} config={config}/> ));
  let actual = [];
  wrapper.find({ type: 'checkbox' }).map((element) => actual.push(element.prop('value')));
  expect(actual).toEqual(["balloonport", "heliport", "airport", "seaplane base"]);

}

function testFilterCheckBoxes(){
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
  const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname} config={config}/> ));
  let actual = [];
  wrapper.find({ type: 'checkbox' }).map((element) => actual.push(element.prop('value')));
  expect(actual).toEqual(["balloonport", "heliport", "airport", "seaplane base"]);

}


function testTextFieldOnChange() {
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname} config={config} />));
    expect(wrapper.state().search.match).toEqual("");
    wrapper.find('#SearchField').simulate('change', {
        target: {
            value:"Den"
        }
    });
    expect(wrapper.state().search.match).toEqual("Den");
}

function testFoundFieldUpdatedWithNewSearch() {
  const config={

    "filters"       : [{"name":"type",
      "values":["balloonport", "heliport", "airport", "seaplane base"]}
    ],
    "maps"          : ["svg", "kml"]
  };
    const wrapper = shallow(( <Search port={startProps.port} hostname={startProps.hostname} config={config} />));
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
test('Checks to see that the config is render checkboxes', testFilterCheckBoxes());
testFoundFieldUpdatedWithNewSearch