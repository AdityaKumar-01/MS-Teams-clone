// React library
import React from "react";
import Avatar from "react-avatar";
// external CSS
import "./ChatCard.styles.css";
const ChatCard = ({ name }) => {
  return (
    <div className="chat-card">
      <span>
        <Avatar name={name} size="80" className="card-avatar"/>
      </span>
      <span>{name}</span>
    </div>
  );
};

export default ChatCard;
