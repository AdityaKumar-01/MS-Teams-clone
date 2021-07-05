// REact libraries
import React, { useState, useEffect } from "react";

// NPM packages
import ReactAutocomplete from "react-autocomplete";
import axios from "axios";

// This component will let user to pick user from exiting users list for making DM
const AutoComplete = ({ input, setInput }) => {
  
  const [userNames, setUserNames] = useState([]); // holds name of current user list
  
  // call the backend to get all users names
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/getUser`)
      .then((data) => {
        setUserNames(data.data.data);
      });
  }, []);
  return (
    <ReactAutocomplete
      items={userNames}
      shouldItemRender={(item, value) => item.label.indexOf(value) > -1}
      getItemValue={(item) => item.label}
      // list of user and its styling
      renderItem={(item, highlighted) => (
        <div
          key={item.id}
          style={{
            backgroundColor: highlighted ? "#F54748" : "transparent",
            borderRadius: "5px",
            textAlign: "center",
            cursor: "pointer",
            height: "25px",
            
          }}
        >
          {item.label}
        </div>
      )}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onSelect={(value) => setInput(value)}
    />
  );
};

export default AutoComplete;
