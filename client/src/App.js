import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import User from "./pages/User";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/user/:username" component={User} />
          <Route component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
