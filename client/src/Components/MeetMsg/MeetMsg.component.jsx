import React from 'react';
import VideoCallIcon from "@material-ui/icons/VideoCall";
import "./MeetMsg.styles.css";
const MeetMsg= ({message, isSenderMsg }) => {
  console.log(message);
  // {message.text.split("-")[1]}
  return (
    <div className="meet-msg">
      <div
        className="meet-block"
        style={{ float: isSenderMsg ? "right" : "left", margin: isSenderMsg ? " 0 40px": "0 0px"}}
      >
        <span className="meet-row">
          <span className="meet-heading">
            Meeting called by {message.sender.username}
          </span>
          <span>
            <VideoCallIcon style={{ color: "white", fontSize: 50 }} />
          </span>
        </span>
        <span meet-row>
          <span className="join-btn">Join </span>
        </span>
      </div>
    </div>
  );
}

export default MeetMsg;
