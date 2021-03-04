import React from 'react';
import ReactDOM from 'react-dom';


function App(props) {
    return <h1>Cześć, {props.name}</h1>;
  }



ReactDOM.render(<App name="Your name"/>, document.getElementById('app'));