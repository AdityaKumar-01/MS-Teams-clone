import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ChatArea from "./Components/ChatArea/ChatArea.component";

// CSS
import "./App.css";

// Context API
import { UserProvider } from "./Context/userContext";
import VideoChat from './VideoChat.component';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route path="/" exact component={LoginPage} />
          <Route path="/dashboard" exact component={DashBoard} />
          <Route path="/dashboard/chat" component={ChatArea} />
          <Route path="/meet" exact component={VideoChat}/>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
