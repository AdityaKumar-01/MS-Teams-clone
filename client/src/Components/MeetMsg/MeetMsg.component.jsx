// react libraries
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Material UI icon
import VideoCallIcon from "@material-ui/icons/VideoCall";

// External CSS
import "./MeetMsg.styles.css";

// Context API
import { UserContext } from "../../Context/userContext";

const MeetMsg = ({ msgObj, isSenderMsg, chatId }) => {

  // get data from context API
  const { handleSubmit, setRoomName, setRoomId } = useContext(UserContext);
  
  let history = useHistory();
  
  // function to join a meeting
  const startMeet = () => {
    setRoomId(chatId);
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
