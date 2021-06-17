import React, { useState, useEffect } from "react";
import Attendees from './../Attendees/Attendees.component';


const Room = ({ roomName, room, handleLogOut }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(participants);
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
      console.log(participants);
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
    <div>
      <main className="room">
        <h2> Room : {roomName}</h2>
        <button onClick={handleLogOut}>Leave Meeting</button>
        <div className="all-participants">
          {room && (
            <Attendees
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          )}
          {remoteParticipants}
        </div>
      </main>
    </div>
  );
};

export default Room;
