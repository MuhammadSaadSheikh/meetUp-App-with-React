import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//screens
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Location from "../Screens/Location";
import Profile from "../Screens/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Login} path="/login" />
          <Route exact component={Location} path="/location" />
          <Route exact component={Profile} path="/profile" />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default Router;
