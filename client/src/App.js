import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Device from "./components/main/devicePage";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Login} />
          <Route path="/device" component={Device} />
        </div>
      </Router>
    );
  }
}

export default App;
