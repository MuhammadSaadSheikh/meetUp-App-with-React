import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//screens
import Home1 from '../Screens/Home1'
import Login from "../Screens/Login";
import Location from "../Screens/Location";
import Profile from "../Screens/Profile";
import Meeting from '../Screens/Meeting'

const Router = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact component={Home1} path="/" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Location} path="/location" />
          <Route exact component={Profile} path="/profile" />
          <Route exact component={Meeting} path="/meeting" />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default Router;
