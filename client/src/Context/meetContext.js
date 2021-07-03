// React libraries
import React, { useState } from "react";

// USerContext that will help to fetch values
const MeetContext = React.createContext();

// UserProvider react item to deliver all values
// Provider contains all the states and funcions which can be required by other components

const MeetProvider = ({ children }) => {
  const [vidState, setVidState] = useState(true); // holds state for camera is on or not
  const [audState, setAudState] = useState(true); // holds state for mic is on or not
  const [screenTrack, setScreenTrack] = useState(false); // holds state for
  // values holds functions and states to be shared

  const value = {
    vidState,
    setVidState,
    audState,
    setAudState,
    screenTrack,
    setScreenTrack,
  };
  return <MeetContext.Provider value={value}>{children}</MeetContext.Provider>;
};
// export both context and provider
// Context are required by components to fetch data
// Provider is reponsible to tell the react app that we are using context API
export { MeetContext, MeetProvider };
