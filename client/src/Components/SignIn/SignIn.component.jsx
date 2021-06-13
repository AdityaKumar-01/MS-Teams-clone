// React library
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

// utility libraries
import axios from "axios"

//  CSS
import "./SignIn.styles.css"

const SignIn = () => {

  // ref to store form value
  const userNameRef = useRef();
  const passwordRef = useRef();

  //  Hooks states
  const [errorMsg, seterrorMsg] = useState("");

  // instance of hitory to puhs to other routes
  let history = useHistory();

  const handleEnrollement = () => {
    const user = {
      name: userNameRef.current.value,
      password: passwordRef.current.value,
    };
    // Sending data to backend to check user exists else enroll the user
    axios
      .post("/user/signIn", user)
      .then((data) => {
        if (data.data.status === 201) {

          // Store the data to local storage to avoid user logging every time
          localStorage.setItem("userName", userNameRef.current.value);
          localStorage.setItem("password", passwordRef.current.value);
          history.push("/dashboard");
        } else if (data.data.status === 404) seterrorMsg(data.data.msg);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  //  handle form submition
  const handleClick = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === "" || userNameRef.current.value === "")
      seterrorMsg("Enter details");
    else {
      handleEnrollement();
    }
  };
  
  return (
    <div className="signin-form form">
      {errorMsg === "" ? null : <span className="error-span">{errorMsg}</span>}
      <input ref={userNameRef} type="text" required placeholder="Username" />
      <br />
      <input
        ref={passwordRef}
        type="password"
        required
        placeholder="Password"
      />
      <br />
      <button onClick={handleClick}>Sign In</button>
    </div>
  );
};

export default SignIn;
