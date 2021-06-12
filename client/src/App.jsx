import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// Pages
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Pages/DashBoard/DashBoard";

// CSS
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/dashboard" component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
