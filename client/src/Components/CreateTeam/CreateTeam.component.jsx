import React, { useRef } from "react";

import axios from "axios";

import "./CreateTeam.styles.css";
const CreateTeam = ({ showHide }) => {
  const titleRef = useRef();
  const dmRef = useRef();
  const createChat = (e) => {
    e.preventDefault();
    console.log(e.target.className);
    let data;
    if (e.target.className === "create-team-form") {
      data = {
        name: localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
        title: titleRef.current.value,
        isDM: false,
      };
    } else {
      data = {
        name: localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
        userName: dmRef.current.value,
        isDM: true,
      };
    }

    axios
      .post("/chat/createChat", data)
      .then((data) => {
        // on success call render the team selection area
        if (data.data.status === 201 && !data.data.isDM) {
          showHide(1);
        }
        if (data.data.status === 201 && data.data.isDM) {
          showHide(2);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="team-create-wrapper">
      <div className="create-chat-col">
        <span className="create-chat-title">Create a New Team</span>
        <form onSubmit={(e) => createChat(e)} className="create-team-form">
          <input
            placeholder="Enter Team Name"
            required
            type="text"
            ref={titleRef}
          />
          <button className="create-chat-btn">Create</button>
        </form>
      </div>
      <div className="create-chat-or-col">
        <hr width="1" size="100" />
        OR
        <hr width="1" size="100" />
      </div>
      <div className="create-chat-col" onSubmit={(e) => createChat(e)}>
        <span className="create-chat-title">Make a Direct Message</span>
        <form className="create-dm-form">
          <input
            placeholder="Enter User Name"
            required
            type="text"
            ref={dmRef}
          />
          <button className="create-chat-btn">Make</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
