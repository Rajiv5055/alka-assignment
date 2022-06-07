import React from 'react';
import './App.css';
import LinkButton from "./components/LinkButton";
import { Route, withRouter, Switch } from 'react-router-dom';
import axios from "axios";
 
class App extends React.Component {

  render(){
    return (
      <>
      <div className="App">
        <LinkButton/>
      </div>
      </>
    );
  }
}

export default App;
