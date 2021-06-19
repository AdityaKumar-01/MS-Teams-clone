import React, {useContext} from 'react';

// Micro animations and Icon
import CallEndSharpIcon from "@material-ui/icons/CallEndSharp";
import UseAnimations from "react-useanimations";
import microphone from "react-useanimations/lib/microphone";
import video from "react-useanimations/lib/video";
import { MeetContext } from "../../Context/meetContext";
// External CSS
import "./MeetController.styles.css";

const MeetController = ({
  handleLogOut,
  handleToggleAudio,
  handleToggleVideo,
}) => {
  const { vidState, audState } = useContext(MeetContext);

  return (
    <div className="control-panel">
      <span>
        <UseAnimations
          animation={microphone}
          onClick={handleToggleAudio}
          reverse={!audState}
          size={30}
          className="control-icon"
        />
      </span>
      <span>
        <CallEndSharpIcon
          onClick={() => handleLogOut()}
          style={{ color: "red" }}
          className="control-icon"
        />
      </span>
      <span>
        <UseAnimations
          animation={video}
          onClick={handleToggleVideo}
          reverse={!vidState}
          size={30}
          className="control-icon"
        />
      </span>
    </div>
  );
};

export default MeetController;
