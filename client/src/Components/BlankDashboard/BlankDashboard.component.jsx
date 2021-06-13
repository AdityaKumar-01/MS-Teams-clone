// React libraries
import React from "react";

// Utility libraries
import axios from "axios";

// Assets
import empty from "../../Assets/empty.png";

// External CSS
import "./BlankDashboard.styles.css";

const BlankDashboard = ({ getUserChat }) => {
  
  // call to backend to create a chat room
  const createChat = () => {
    const data = {
      name: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      title: "lets chatch up",
    };
    axios
      .post("/chat/createChat", data)
      .then((data) => {
        getUserChat(); // on success call render the team selection area
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="empty-wrapper">
      <span className="empty-img">
        <img src={empty} alt="empty" />
      </span>
      <span className="empty-msg">
        <p>You don't have any chat room</p>
        <button className="create-chat" onClick={createChat}>
          Create Room
        </button>
      </span>
    </div>
  );
};

export default BlankDashboard;
