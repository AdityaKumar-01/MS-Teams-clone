import React, {useEffect, useContext } from "react";

import Room from "./Room.component";
import {UserContext} from "./Context/userContext"
const VideoChat = () => {
 
const { handleLogOut, room, roomName, connecting } = useContext(UserContext);
 
  
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
