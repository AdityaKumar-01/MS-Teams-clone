// React libraries
import React, { useState, useEffect } from "react";

// Utility libraries
import axios from "axios";

// External CSS
import "./Dashboard.styles.css";

// Components
import ChatCard from "./../../Components/ChatCard/ChatCard.component";
const DashBoard = () => {

  // Hook to store chat room name of user
  const [userChats, setUserChats] = useState([]);

  // useEffect to get data from backend at page loading 
  useEffect(() => {
    axios
      .get("/chat/getChat")
      .then((response) => {
        setUserChats(response.data.names); // setting data to hooks received from backend
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="form-header header">Join Your Chat Room</div>
      <div className="chat-name">
        {userChats ? (
          userChats.map((name, i) => {
            return <ChatCard name={name} key={i} />; // map every name recieved to Chat Card components to render
          })
        ) : (
          <h1>Nothing here</h1>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
