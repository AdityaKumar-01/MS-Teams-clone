// React library
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

//  CSS
import "./SignIn.styles.css"

const SignIn = () => {

  // ref to store form value
  const emailRef = useRef();
  const passwordRef = useRef();

  //  Hooks states
  const [errorMsg, seterrorMsg] = useState("");

  // instance of hitory to puhs to other routes
  let history = useHistory();

  //  handle form submition
  const handleClick = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === "" || emailRef.current.value === "")
      seterrorMsg("Enter details");
    else {
      history.push("/dashboard");
    }
  };
  
  return (
    <div className="signin-form form">
      {errorMsg === "" ? null : <span className="error-span">{errorMsg}</span>}
      <input ref={emailRef} type="text" required placeholder="Username" />
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
