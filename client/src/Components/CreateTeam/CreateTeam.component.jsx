import React, { useRef } from "react";

import axios from "axios";

import "./CreateTeam.styles.css";
const CreateTeam = ({showHide}) => {
  const titleRef = useRef();
  const createChat = (e) => {
    e.preventDefault();
    const data = {
      name: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
      title: titleRef.current.value,
    };
    axios
      .post("/chat/createChat", data)
      .then((data) => {
         // on success call render the team selection area
         if(data.data.status === 201){
           showHide(1);
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
        <form onSubmit={(e) => createChat(e)}>
          <input placeholder="Enter Team Name" required type="text" ref ={titleRef}/>
          <button className="create-chat-btn">Create</button>
        </form>
      </div>
      <div className="create-chat-or-col">
        <hr width="1" size="100" />OR<hr width="1" size="100" />
      </div>
      <div className="create-chat-col">
        <span className="create-chat-title">Make a Direct Message</span>
        <form>
          <input placeholder="Enter User Name" required type="text" />
          <button className="create-chat-btn">Make</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
