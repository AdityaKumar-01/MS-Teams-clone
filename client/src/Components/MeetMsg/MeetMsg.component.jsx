import React from 'react';
import VideoCallIcon from "@material-ui/icons/VideoCall";
import "./MeetMsg.styles.css";
const MeetMsg= ({message, isSenderMsg }) => {
  // {message.text.split("-")[1]}
  return (
    <div className="meet-block" style={{ float: isSenderMsg ? "right": "left"}}>
      <span className="meet-row">
        <span className="meet-heading">Meeting called by {message.sender_username}</span>
        <span>
          <VideoCallIcon style={{ color: "white", fontSize: 50 }} />
        </span>
      </span>
      <span meet-row>
        <span className="join-btn">Join </span>
      </span>
    </div>
  );
}

export default MeetMsg;
