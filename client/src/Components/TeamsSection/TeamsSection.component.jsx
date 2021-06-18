import React, { useState, useEffect } from "react";
import ChatCard from "./../ChatCard/ChatCard.component";
import BlankDashboard from "./../BlankDashboard/BlankDashboard.component";
import axios from "axios";

import "./TeamsSection.styles.css";
const TeamsSection = ({ showHide }) => {
  const [userChats, setUserChats] = useState([]);
  const getUserChat = () => {
    const user = {
      name: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      isDM:false
    };
    axios
      .post("/chat/getChat", user)
      .then((response) => {
        setUserChats(response.data.info); // setting data to hooks received from backend
      })
      .catch((err) => console.log(err));
  };
  // useEffect to get data from backend at page loading
  useEffect(() => {
    getUserChat();
  }, []);
  return (
    <div className="teams-section-wrapper">
      <div className="header">Your Teams</div>
      <div className="chat-name">
        {userChats && userChats.length >0 ? (
          userChats.map((data, i) => {
            return <ChatCard data={data} key={i} />; // map every name recieved to Chat Card components to render
          })
        ) : (
          <BlankDashboard showHide={showHide} /> // render when user doesn't have any team
        )}
      </div>
    </div>
  );
};

export default TeamsSection;
