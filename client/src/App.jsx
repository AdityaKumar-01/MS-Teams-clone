import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ChatArea from "./Pages/ChatArea/ChatArea.component";
import MeetWindow from "./Pages/MeetWindow/MeetWindow.component";

// CSS
import "./App.css";

// Context API
import { UserProvider } from "./Context/userContext";
import { MeetProvider } from "./Context/meetContext";
import { AssignmentProvider } from "./Context/assignmentContext";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <MeetProvider>
            <AssignmentProvider>
              <Route path="/" exact component={LoginPage} />
              <Route path="/dashboard" exact component={DashBoard} />
              <Route path="/dashboard/chat" component={ChatArea} />
              <Route path="/meet" exact component={MeetWindow} />
            </AssignmentProvider>
          </MeetProvider>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
