import React, { useEffect, useContext } from "react";

// Context
import { UserContext } from "../../Context/userContext";

// Components
import Room from '../../Components/Room/Room.component';

// External CSS
import "./MeetWindow.styles.css"
const MeetWindow = () => {
  const { handleLogOut, room, roomName, connecting } = useContext(UserContext);

  // useEffect to clean the window is user leave the meet
  useEffect(() => {
    if (room) {
      const cleanArea = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogOut();
        }
      };
      // event listener for removing ongoing events like camera attach and mic
      window.addEventListener("pagehide", cleanArea);
      window.addEventListener("beforeunload", cleanArea);

      return () => {
        window.removeEventListener("pagehide", cleanArea);
        window.removeEventListener("beforeunload", cleanArea);
      };
    }
  }, [room, handleLogOut]);
  let render;

  // display room component once we have it ready else show connecting
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogOut={handleLogOut} />
    );
  } else {
    render = (
      <div>
        {/* contional rendering while page is loading */}
        {connecting ? (
          <div className="loading-container">
            <h1 className="btn-shine connection-status">Connecting ...</h1>
          </div>
        ) : (
          <div className="loading-container">
            <h1 className="btn-shine connection-status">Connected</h1>{" "}
          </div>
        )}
      </div>
    );
  }
  return render;
};

export default MeetWindow;
