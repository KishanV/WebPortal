import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <AwesomeComponent />
      </div>
    );
  }
}

window.reactApp = function(elm){
    render(<App/>, elm);
}

exports.init = function(elm){
    render(<App/>, elm);
}
