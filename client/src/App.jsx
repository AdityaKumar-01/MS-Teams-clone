import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Pages
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ChatArea from "./Components/ChatArea/ChatArea.component";
// CSS
import "./App.css";
import { UserProvider } from './Context/userContext';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route path="/" exact component={LoginPage} />
          <Route path="/dashboard" exact component={DashBoard} />
          <Route path="/dashboard/chat/:id" component={ChatArea} />
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
