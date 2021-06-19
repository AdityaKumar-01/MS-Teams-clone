import React, { useState, useEffect, useContext } from "react";

// components
import Attendees from "./../Attendees/Attendees.component";
import MeetController from "./../MeetController/MeetController.component";

// Icons
import ForumSharpIcon from "@material-ui/icons/ForumSharp";

// External CSS
import "./Room.styles.css";
import ChatInMeet from './../ChatInMeet/ChatInMeet.component';

import { MeetContext } from "../../Context/meetContext";
const Room = ({ roomName, room, handleLogOut }) => {
  const [participants, setParticipants] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const { vidState, audState, setVidState, setAudState } =
    useContext(MeetContext);
  useEffect(() => {
    
    //  console.log(room.localParticipant.audioTracks);
    const participantConnected = (participant) => {
     
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
     
    };
    const participantDisConnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisConnected);

    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisConnected", participantDisConnected);
    };
   
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Attendees key={participant.sid} participant={participant} isLocal = {false} />
  ));
  const handleToggleVideo = () => {
    // setVidState(!vidState);
    room.localParticipant.videoTracks.forEach((publication) =>
      publication.track.isEnabled
        ? publication.track.disable()
        : publication.track.enable()
    );
  };
  const handleToggleAudio= () => {
    // setAudState(!audState);
    room.localParticipant.audioTracks.forEach((publication) =>
      publication.track.isEnabled
        ? (publication.track.disable())
        : publication.track.enable()
    );
  };
  return (
    <div className="room-wrapper">
      <div className="room-left-panel">
        <div className="participants-frames">
          {room && (
            <Attendees
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              isLocal={true}
            />
          )}
          {remoteParticipants}
        </div>
        <MeetController
          handleLogOut={handleLogOut}
          roomName={roomName}
          handleToggleVideo={handleToggleVideo}
          handleToggleAudio={handleToggleAudio}
        />
      </div>
      <div className="room-right-panel">{showChat ? <ChatInMeet /> : null}</div>
      <span className="msg-in-meet-btn">
        <ForumSharpIcon onClick={() => setShowChat(!showChat)} />
      </span>
    </div>
  );
};

export default Room;
