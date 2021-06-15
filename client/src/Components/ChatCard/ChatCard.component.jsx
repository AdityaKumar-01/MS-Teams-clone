// React library
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

// utility libraries
import Avatar from "react-avatar";

// external CSS
import "./ChatCard.styles.css";

const ChatCard = ({ data }) => {
  const { setRoomId } = useContext(UserContext); // bring the setRoomId to update it when user click the card
  let history = useHistory();
  const handleClick = () => {
    setRoomId(data.id); // update the id state
    history.push(`/dashboard/chat`);
  };
  return (
    <div className="chat-card" onClick={() => handleClick()}>
      <span>
        <Avatar name={data.title} size="80" className="card-avatar" />
      </span>
      <span>
        {data.title}
      </span>
    </div>
  );
};

export default ChatCard;
