import React, { useState, useEffect } from "react";

// components
import Attendees from "./../Attendees/Attendees.component";
import MeetController from "./../MeetController/MeetController.component";

// Icons
import ForumSharpIcon from "@material-ui/icons/ForumSharp";

// External CSS
import "./room.styles.css";
const Room = ({ roomName, room, handleLogOut }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
     console.log(room.localParticipant.audioTracks);
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
    <Attendees key={participant.sid} participant={participant} />
  ));
  return (
    <div className="room-wrapper">
      <div className="room-left-panel">
        <div className="participants-frames">
          {room && (
            <Attendees
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          )}
          {remoteParticipants}
        </div>
        <MeetController handleLogOut={handleLogOut} roomName={roomName} />
      </div>
      <div className="room-right-panel">chat section</div>
      <ForumSharpIcon />
    </div>
  );
};

export default Room;
