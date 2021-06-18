// React libraries
import React, { useState, useEffect } from "react";

// Components
import ChatCard from "./../ChatCard/ChatCard.component";
import BlankDashboard from "./../BlankDashboard/BlankDashboard.component";

// npm packages
import axios from "axios";

// External CSS
import "../TeamsSection/TeamsSection.styles.css";


const DMChats = ({ showHide }) => {
  const [userChats, setUserChats] = useState([]); // holds nameof DMs name
  const [loading, setLoading] = useState(true); // for loading animation

  // Make Api call to backend for DM name
  const getUserChat = () => {

    // User object for making call
    const user = {
      name: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      isDM: true, // differentiating factor
    };
    axios
      .post("/chat/getChat", user)
      .then((response) => {
        // Display names of user with whom you have DMs
        if (response.data.status === 200) {
          // API sends us name of both the person in DM
          // Take only other name that is not you
          const users = response.data.info.filter( 
            (obj) => obj.title !== localStorage.getItem("userName")
          );
          setUserChats(users); // update state
        }
        setLoading(false); // remove the loader
      })
      .catch((err) => console.log(err));
  };
  // useEffect to get data from backend at page loading
  useEffect(() => {
    getUserChat();
  }, []);
  return (
    <div className="teams-section-wrapper">
      {loading ? ( // conditional rendering of loader
        <div className="loader"></div>
      ) : (
        <div className="section-wrapper">
          <div className="header">Your DMs</div>
          <div className="chat-name">
            {userChats && userChats.length > 0 ? (
              userChats.map((data, i) => {
                return <ChatCard data={data} key={i} />; // map every name recieved to Chat Card components to render
              })
            ) : (
              <BlankDashboard showHide={showHide} /> // render when user doesn't have any DM
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DMChats;
