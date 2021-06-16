import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Video from "twilio-video";
import Room from "./Room.component";
import axios from "axios";
const VideoChat = () => {
  const [roomName, setRoomName] = useState(uuidv4());
  const [room, setRoom] = useState(null);
  const [userName, setUserName] = useState("");
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    handleSubmit();
  }, []);
  const handleSubmit = useCallback(async () => {

    const info = {
      identity: userName,
      room: roomName,
    };
    setConnecting(true);
    await axios.post("/video/token", info).then((data) => {
      console.log(data);
      Video.connect(data.data.token, {
        name: roomName,
      })
        .then((room) => {
            console.log(room);
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.log(err);
          console.log(data.data.token);
          setConnecting(false);
        });
    });
  }, [roomName, userName]);

  const handleLogOut = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticpants.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
    });
  }, []);
  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogOut();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);

      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogOut]);
  let render;

  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogOut={handleLogOut} />
    );
  } else {
    render = <div>{connecting ? <h1>Connecting</h1> : <h1>Connected</h1>}</div>;
  }
  return render;
};

export default VideoChat;
