import React, { useState, useRef, useEffect, useContext } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { UserContext } from "../../Context/userContext";
import "./ProfileSetting.styles.css";
import { useHistory } from "react-router-dom";
const ProfileSetting = ({ showHide }) => {
  const { setUserName, setPwd } = useContext(UserContext); // brings data from user context
  const [userNameStatus, setUserNameStatus] = useState(""); // state to hold data of update username form
  const [pwdStatus, setPwdStaus] = useState(""); // state to hold data of password username form
  const userName = useRef(); // ref to store username
  const pwd = useRef(); // ref to store password
  const conPwd = useRef(); // ref to store confirm password 

  let history = useHistory();
  useEffect(() => {}, [setUserName]);
  const updateUser = () => {
    const user = {
      newName: userName.current.value,
      name: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
    };
    // Sending data to backend to check user exists else enroll the user
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/updateUserName`, user)
      .then((data) => {
        setUserNameStatus(data.data.msg);
        if (data.data.status === 200) {
          // Store the data to local storage to avoid user logging every time
          localStorage.setItem("userName", userName.current.value);
          setUserName(userName.current.value);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updatePwd = () => {
    const user = {
      newPwd: pwd.current.value,
      name: localStorage.getItem("userName"),
      password: localStorage.getItem("password"),
    };
    if (pwd.current.value === conPwd.current.value) {
      // Sending data to backend to check user exists else enroll the user
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/updateUserPwd`, user)
        .then((data) => {
          setPwdStaus(data.data.msg);
          if (data.data.status === 200) {
            // Store the data to local storage to avoid user logging every time
            localStorage.setItem("password", pwd.current.value);
            setPwd(pwd.current.value);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else setPwdStaus("password don't match");
  };

  const handleLogOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    e.target.className === "update-user-name" ? updateUser() : updatePwd();
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
              spellCheck={false}
            />
            <button className="create-btn">Update</button>
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
            <button className="create-btn">Update</button>
          </form>
        </div>
      </div>
      <div>
        <button className="create-btn" onClick={() => handleLogOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSetting;
