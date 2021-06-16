import React, { useState, useEffect } from "react";
import Participant from "./Participant.component";

const Room = ({ roomName, room, handleLogOut }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
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
    <Participant key={participant.id} participant={participant} />
  ));
  return (
    <div>
      <main className="room">
        <h2> Room : {roomName}</h2>
        <button onClick={handleLogOut}>Leave Meeting</button>
        <div className="all-participants">
          {room && (
            <Participant
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
