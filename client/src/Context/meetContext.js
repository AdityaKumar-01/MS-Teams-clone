// React libraries
import React, { useState, useEffect, useRef } from "react";

// USerContext that will help to fetch values
const MeetContext = React.createContext();

// UserProvider react item to deliver all values
// Provider contains all the states and funcions which can be required by other components

const MeetProvider = ({ children }) => {
  const [vidOn, setVidOn] = useState(true);
  const [audOn, setAudOn] = useState(true);
  
  
  // values holds functions and states to be shared
  const value = {
    vidOn,
    setVidOn,
    audOn,
    setAudOn,
  };
  return <MeetContext.Provider value={value}>{children}</MeetContext.Provider>;
};
// export both context and provider
// Context are required by components to fetch data
// Provider is reponsible to tell the react app that we are using context API
export { MeetContext, MeetProvider };
