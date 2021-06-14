// React library
import React,{useContext} from "react";
import Avatar from "react-avatar";
import {useHistory} from "react-router-dom"
import { UserContext } from "../../Context/userContext";

// external CSS
import "./ChatCard.styles.css";
const ChatCard = ({ data }) => {
  const { setRoomId } = useContext(UserContext);
let history = useHistory();
  const handleClick = () => {
    console.log(data.id);
    setRoomId(data.id);
    history.push(`/dashboard/chat/${data.id}`)
  }
  return (
    <div className="chat-card" onClick= {() => handleClick()}>
      <span>
        <Avatar name={data.title} size="80" className="card-avatar"/>
      </span>
      <span>{data.title}{data.id}</span>
    </div>
  );
};

export default ChatCard;
