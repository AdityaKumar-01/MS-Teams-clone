import React, { useState, useEffect } from "react";

// components
import Attendees from "./../Attendees/Attendees.component";
import MeetController from "./../MeetController/MeetController.component";

// Icons
import ForumSharpIcon from "@material-ui/icons/ForumSharp";

// External CSS
import "./Room.styles.css";
import ChatInMeet from './../ChatInMeet/ChatInMeet.component';
import ChatArea from './../../Pages/ChatArea/ChatArea.component';

const Room = ({ roomName, room, handleLogOut }) => {
  const [participants, setParticipants] = useState([]);
  const [showChat, setShowChat] = useState(false);
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
      <div className="room-right-panel">{showChat ? <ChatInMeet /> : null}</div>
      <span className="msg-in-meet-btn">
        <ForumSharpIcon onClick={() => setShowChat(!showChat)} />
      </span>
    </div>
  );
};

export default Room;
