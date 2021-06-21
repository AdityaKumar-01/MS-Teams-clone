import React, { useState, useRef } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import "./ProfileSetting.styles.css";
const ProfileSetting = () => {
  const [userNameStatus, setUserNameStatus] = useState("");
  const [pwdStatus, setPwdStaus] = useState("");

  const userName = useRef();
  const pwd = useRef();
  const conPwd = useRef();

  const updateUser = () => {
    const user = {
      newName: userName.current.value,
      name:localStorage.getItem("userName"),
      password: localStorage.getItem("password")
    };
    // Sending data to backend to check user exists else enroll the user
    axios
      .post("/user/signIn", user)
      .then((data) => {
        setUserNameStatus(data.data.msg);
        if (data.data.status === 201) {
          // Store the data to local storage to avoid user logging every time
          localStorage.setItem("userName", userName.current.value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    e.target.className === "update-user-name" ? updateUser() : console.log("pwd");
  };
  return (
    <div className="profile-settings">
      <div className="profile-overview">
        <span>
          <Avatar
            name={localStorage.getItem("userName")}
            size="80"
            className="card-avatar"
            round={true}
          />
        </span>
        <span className="profile-name">{localStorage.getItem("userName")}</span>
      </div>

      <div className="update-form-container">
        <div className="update-form">
          <span className="profile-update-title">Update Username</span>
          <span>{userNameStatus}</span>
          <form onSubmit={(e) => handleUpdate(e)} className="update-user-name">
            <input
              type="text"
              placeholder="Enter new username"
              required
              ref={userName}
            />
            <button className="create-chat-btn">Update</button>
          </form>
        </div>
        <div className="create-chat-or-col">
          <hr width="1" size="100" />
          OR
          <hr width="1" size="100" />
        </div>
        <div className="update-form">
          <span className="profile-update-title">Update Password</span>
          <span>{pwdStatus}</span>
          <form onSubmit={(e) => handleUpdate(e)} className="update-user-pwd">
            <input
              type="password"
              placeholder="Enter new password"
              required
              ref={pwd}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              required
              ref={conPwd}
            />
            <button className="create-chat-btn">Update</button>
          </form>
        </div>
      </div>
      <div>
        <button className="create-chat-btn">Log Out</button>
      </div>
    </div>
  );
};

export default ProfileSetting;
