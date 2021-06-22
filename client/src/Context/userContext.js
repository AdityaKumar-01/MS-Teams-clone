// React libraries
import React, { useState, useCallback } from "react";

// NPM packages
import * as Video from "twilio-video";
import axios from "axios";
import { useHistory } from "react-router-dom";

// USerContext that will help to fetch values
const UserContext = React.createContext();

// UserProvider react item to deliver all values
// Provider contains all the states and funcions which can be required by other components

const UserProvider = ({ children }) => {
  const [name, setName] = useState(""); // holds name of currently log user
  const [secret, setSecret] = useState(""); // holds pwd of currently log user
  const [id, setId] = useState(0); // holds id of chat
  const [roomName, setRoomName] = useState(""); // holds name current meet room name i.e. a uuid
  const [room, setRoom] = useState(null); // holds room data of ongoing meet
  const [connecting, setConnecting] = useState(false); // holds status of connection before joining any meet
  

  let history = useHistory();
  const setUserName = (name) => {
    setName(name);
  };

  const setPwd = (pwd) => {
    setSecret(pwd);
  };

  const setRoomId = (roomId) => {
    setId(roomId);
  };

  const handleSubmit = useCallback(async () => {
    const info = {
      identity: name,
      room: roomName,
    };

    setConnecting(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/video/token`, info).then((data) => {
      Video.connect(data.data.token, {
        name: localStorage.getItem("roomName"),dominantSpeaker: true,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.log(err);
          setConnecting(false);
        });
    });
  }, [roomName, name]);

  const handleLogOut = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
        history.push("/dashboard/chat");
      }
    });
  }, []);
  // values holds functions and states to be shared
  const value = {
    setUserName,
    setPwd,
    setRoomId,
    name,
    secret,
    id,
    handleSubmit,
    handleLogOut,
    connecting,
    room,
    roomName,
    setRoomName,
   
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
// export both context and provider
// Context are required by components to fetch data
// Provider is reponsible to tell the react app that we are using context API
export { UserContext, UserProvider };
