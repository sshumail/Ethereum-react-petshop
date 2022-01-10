import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Templates
import AppTemplate from "templates/app";
// Pages
import IndexPage from "pages";

export default () => (
  <Router>
    <Switch>
      <AppTemplate>
        <Route path="/" exact component={IndexPage} />
      </AppTemplate>
    </Switch>
  </Router>
);
