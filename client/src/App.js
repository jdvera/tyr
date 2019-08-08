import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Main from "./pages/Main";
import User from "./pages/User";
import Nav from "./components/Nav";
import API from "./util/API.js";
import "./App.css";


class App extends Component {
  state = {
    character: ""
  };

  componentDidMount() {
    const id = window.location.pathname.split("/")[2]
    if (id) {
      API.getCharacterName(id).then(({ data }) => {
        this.setState(data);
      });
    }
  }

  updateAppState = stateObj => {
    this.setState(stateObj);
  };

  render() {
    return (
      <div>
        <Nav character={this.state.character} updateAppState={this.updateAppState} />
        <Router>
          <Container bsPrefix="container page-wrapper">
            <Switch>
              <Route exact path="/user/:userId" render={props => <User {...props} updateAppState={this.updateAppState} />} />
              <Route render={props => <Main {...props} updateAppState={this.updateAppState} />} />
            </Switch>
          </Container>
        </Router>
      </div>
    );
  };
};

export default App;
