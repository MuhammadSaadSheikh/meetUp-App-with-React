import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Router from "./Routes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return  <Router/>
  }
}

export default App;
