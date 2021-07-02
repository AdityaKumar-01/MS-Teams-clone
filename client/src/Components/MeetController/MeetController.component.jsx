import React, {useContext} from 'react';

// Micro animations and Icon
import CallEndSharpIcon from "@material-ui/icons/CallEndSharp";
import UseAnimations from "react-useanimations";
import microphone from "react-useanimations/lib/microphone";
import video from "react-useanimations/lib/video";
import { MeetContext } from "../../Context/meetContext";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
// External CSS
import "./MeetController.styles.css";

const MeetController = ({
  handleLogOut,
  handleToggleAudio,
  handleToggleVideo,
  handleScreenSharing,
}) => {
  const { vidState, audState, screenTrack,  } =
    useContext(MeetContext);

  return (
    <div className="control-panel">
      <span>
        <Tooltip
          title="Mute/Unmute Mic"
          TransitionComponent={Zoom}
          placement="top"
        >
          <UseAnimations
            animation={microphone}
            onClick={handleToggleAudio}
            reverse={!audState}
            size={30}
            className="control-icon"
          />
        </Tooltip>
      </span>
      <span>
        <Tooltip title="End Call" TransitionComponent={Zoom} placement="top">
          <CallEndSharpIcon
            onClick={() => handleLogOut()}
            style={{ color: "red" }}
            className="control-icon"
          />
        </Tooltip>
      </span>
      <span>
        <Tooltip
          title="Mute/Unmute Video"
          TransitionComponent={Zoom}
          placement="top"
        >
          <UseAnimations
            animation={video}
            onClick={handleToggleVideo}
            reverse={!vidState}
            size={30}
            className="control-icon"
          />
        </Tooltip>
      </span>
      <span>
        <Tooltip
          title="Share your Screen"
          TransitionComponent={Zoom}
          placement="top"
        >
          {screenTrack ? (
            <StopScreenShareIcon onClick={() => handleScreenSharing()} />
          ) : (
            <ScreenShareIcon onClick={() => handleScreenSharing()} />
          )}
        </Tooltip>
      </span>
    </div>
  );
};

export default MeetController;
