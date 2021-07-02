import React, { useState, useEffect, useContext } from "react";

// components
import Attendees from "./../Attendees/Attendees.component";
import MeetController from "./../MeetController/MeetController.component";
import ChatInMeet from "./../ChatInMeet/ChatInMeet.component";

// Icons
import ForumSharpIcon from "@material-ui/icons/ForumSharp";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

// External CSS
import "./Room.styles.css";
import Video from "twilio-video";
import LocalVideoTrack from "twilio-video"
import { isEmpty, first } from "lodash";
import { MeetContext } from "../../Context/meetContext";
const Room = ({ roomName, room, handleLogOut }) => {
  const [participants, setParticipants] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [currentDomntSpeaker, setCurrentDomntSpeaker] = useState("");

  const {
    vidState,
    audState,
    setVidState,
    setAudState,
    screenTrack,
    setScreenTrack,
  } = useContext(MeetContext);

  useEffect(() => {
    // add new participant in the room state
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    // filter out the participant on leaving meet
    const participantDisConnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    // twilio functtion listening on new participant or leaving participant
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisConnected);

    room.participants.forEach(participantConnected);
    room.on("dominantSpeakerChanged", (participant) => {
      handleDomntSpeaker(participant);
    });
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisConnected", participantDisConnected);
    };
  }, [room]);

  // create components for remote participants
  const remoteParticipants = participants.map((participant) => (
    <Attendees
      key={participant.sid}
      participant={participant}
      isLocal={false}
      dominantSpeaker={currentDomntSpeaker === participant.sid ? true : false}
    />
  ));

  const handleDomntSpeaker = (participant) => {
    if (participant) {
      console.log(participant.sid);
      setCurrentDomntSpeaker(participant.sid);
    }
  };
  // function handle state of local participant video
  const handleToggleVideo = () => {
    // setVidState(!vidState);
    room.localParticipant.videoTracks.forEach((publication) =>
      publication.track.isEnabled
        ? publication.track.disable()
        : publication.track.enable()
    );
  };

  // function handle state of local participant audio
  const handleToggleAudio = () => {
    // setAudState(!audState);
    room.localParticipant.audioTracks.forEach((publication) =>
      publication.track.isEnabled
        ? publication.track.disable()
        : publication.track.enable()
    );
  };

  const handleScreenSharing = () => {
    if (!screenTrack) {
      navigator.mediaDevices
        .getDisplayMedia()
        .then((stream) => {
        
          var track =  new Video.LocalVideoTrack(stream.getTracks()[0]);
          // setScreenTrack(track)
          
          room.localParticipant.publishTrack(track);
          
          // shareScreen.innerHTML = "Stop sharing";
          track.mediaStreamTrack.onended = () => {
            handleScreenSharing();
          };
        })
        .catch(() => {
          alert("Could not share the screen.");
        });
    } else {
      room.localParticipant.unpublishTrack(screenTrack);
      screenTrack.stop();
      setScreenTrack(null);
      // shareScreen.innerHTML = "Share screen";
    }
  };
  return (
    <div className="room-wrapper">
      <div className="room-left-panel">
        <div className="participants-frames">
          {room && ( // render local participant
            <Attendees
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              isLocal={true}
              dominantSpeaker={
                currentDomntSpeaker === room.localParticipant.sid ? true : false
              }
            />
          )}
          {/* render remote participant in the room */}
          {remoteParticipants}
        </div>
        <MeetController
          handleLogOut={handleLogOut}
          roomName={roomName}
          handleToggleVideo={handleToggleVideo}
          handleToggleAudio={handleToggleAudio}
          handleScreenSharing={handleScreenSharing}
        />
      </div>
      {/* conditional rendering of chat in meet toggled using chat icon */}
      <div className="room-right-panel">{showChat ? <ChatInMeet /> : null}</div>
      <span className="msg-in-meet-btn">
        <Tooltip
          title="Chat in Meet"
          TransitionComponent={Zoom}
          placement="left"
        >
          <ForumSharpIcon
            style={{ fontSize: 40, cursor: "pointer" }}
            onClick={() => setShowChat(!showChat)}
          />
        </Tooltip>
      </span>
    </div>
  );
};

export default Room;
