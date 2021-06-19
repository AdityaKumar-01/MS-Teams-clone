import React, { useContext } from "react";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import "./MeetMsg.styles.css";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../Context/userContext";
const MeetMsg = ({ msgObj, isSenderMsg, chatId }) => {
  // {message.text.split("-")[1]}
  const { handleSubmit, setRoomName } = useContext(UserContext);
  let history = useHistory();
  const startMeet = () => {
    console.log(chatId);
    localStorage.setItem("chatId",chatId)
    setRoomName(msgObj.text.split("@")[1]);
    localStorage.setItem("roomName", msgObj.text.split("@")[1]);
    history.push("/meet");
    handleSubmit();
  };

  return (
    <div className="meet-msg">
      <div
        className="meet-block"
        style={{
          float: isSenderMsg ? "right" : "left",
          margin: isSenderMsg ? " 0 40px" : "0 0px",
        }}
      >
        <span className="meet-row">
          <span className="meet-heading">
            Meeting called by {msgObj.sender.username}
          </span>
          <span>
            <VideoCallIcon style={{ color: "white", fontSize: 50 }} />
          </span>
        </span>
        <span className="meet-row">
          <span className="join-btn" onClick={() => startMeet()}>
            Join
          </span>
        </span>
      </div>
    </div>
  );
};

export default MeetMsg;
