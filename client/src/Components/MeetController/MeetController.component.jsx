import React, {useContext} from 'react';

// Context
import {UserContext} from "../../Context/userContext";

// Micro animations and Icon
import CallEndSharpIcon from "@material-ui/icons/CallEndSharp";
import UseAnimations from "react-useanimations";
import microphone from "react-useanimations/lib/microphone";
import video from "react-useanimations/lib/video";

// External CSS
import "./MeetController.styles.css";

const MeetController= ({handleLogOut, roomName}) => {
    const { vidOn, setVidOn, audOn, setAudOn } = useContext(UserContext);

    const toggleVidOn = () =>{
        setVidOn(!vidOn);
    }
    const toggleAudOn = () => {
      setAudOn(!audOn);
    };


    return (
      <div className="control-panel">
        <span>
          <UseAnimations
            animation={microphone}
            onClick={toggleAudOn}
            reverse={!audOn}
            size={30}
          />
        </span>
        <span>
          <CallEndSharpIcon
            onClick={() => handleLogOut()}
            style={{ color: "red" }}
          />
        </span>
        <span>
          <UseAnimations
            animation={video}
            onClick={toggleVidOn}
            reverse={!vidOn}
            size={30}
          />
        </span>
      </div>
    );
}

export default MeetController;
