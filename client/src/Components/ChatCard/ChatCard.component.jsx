// React library
import React from "react";

// external CSS
import "./ChatCard.styles.css";
const ChatCard = ({ name }) => {
  return <div className="chat-card">{name}</div>;
};

export default ChatCard;
