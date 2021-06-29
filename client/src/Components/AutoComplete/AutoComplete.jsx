import React, { useState, useEffect } from "react";
import ReactAutocomplete from "react-autocomplete";

import axios from "axios";
const AutoComplete = ({ input, setInput }) => {
  
  const [userNames, setUserNames] = useState([]);
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
