// react libraries
import React, { useRef, useState } from "react";

// NPM packages
import axios from "axios";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";

// External CSS
import "./CreateTeam.styles.css";

// Component
import AutoComplete from "./../AutoComplete/AutoComplete";

const CreateTeam = ({ showHide }) => {
  const titleRef = useRef(); // holds data for creating team
  const [teamErr, setTeamErr] = useState(""); // holds error on creation of team
  const [dmErr, setDmErr] = useState(""); // holds error on making DM
  const [dm, setDm] = useState("Enter UserName"); // holds error on

  const createChat = (e) => {
    e.preventDefault(); // prevent page reloading on form submittion

    let data;
    if (e.target.className === "create-team-form") {
      // check which form was submitted
      data = {
        name: localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
        title: titleRef.current.value,
        isDM: false, // false for teams
      };
    } else {
      data = {
        name: localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
        userName: dm, // other person to whom user makes DM
        isDM: true, // true for DM
      };
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/chat/createChat`, data)
      .then((data) => {
        // on success call render the team selection area
        if (data.data.status === 201 && data.data.isDM) showHide(2);
        if (data.data.status === 201 && !data.data.isDM) showHide(1);
        data.data.status === 400 && data.data.isDM
          ? setDmErr(data.data.msg)
          : setTeamErr(data.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function createDirectChat(e) {
    e.preventDefault();
    const authObject = {
      projectID: process.env.REACT_APP_PROJECT_ID,
      userName: localStorage.getItem("userName"),
      userSecret: localStorage.getItem("password"),
    };
    
    getOrCreateChat(authObject, { is_direct_chat: true, usernames: [dm]}, () =>
      setDm("")
    );
  }
  return (
    <div className="team-create-wrapper">
      <div className="create-chat-col">
        {/* creating team form */}
        <span className="create-chat-title">Create a New Team</span>
        <span>{teamErr}</span>
        <form onSubmit={(e) => createChat(e)} className="create-team-form">
          <input
            placeholder="Enter Team Name"
            required
            type="text"
            ref={titleRef}
            spellCheck={false}
          />
          <button className="create-btn">Create</button>
        </form>
      </div>
      {/* form separating column */}
      <div className="create-chat-or-col">
        <hr width="1" size="100" />
        OR
        <hr width="1" size="100" />
      </div>
      {/* making DM form */}
      <div className="create-chat-col">
        <span className="create-chat-title">Make a Direct Message</span>
        <span>{dmErr}</span>
        <form className="create-dm-form" onSubmit={(e) => createChat(e)}>
          <AutoComplete setInput={setDm} input={dm} />
          <button className="create-btn">Make</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
