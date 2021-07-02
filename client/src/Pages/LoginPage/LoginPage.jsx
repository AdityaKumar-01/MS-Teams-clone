import React,{useState} from 'react';
import { Helmet } from "react-helmet";
// Components
import SignUp from './../../Components/SignUp/SignUp.component';
import SignIn from './../../Components/SignIn/SignIn.component';

// Assets
import signIn from "../../Assets/sign.png"

// CSS
import "./LoginPage.styles.css"
const LoginPage = () => {

    // hooks to show desire form
   const [showUp, setShowUp] = useState(true);
   
    // to toggle between forms
   const handleOptionClick = () => {
     setShowUp(!showUp);
   };
   
    return (
      <div className="form-wrapper" id="form-section">
        <Helmet>
          <meta charSet="utf-8" />
          <title>MS TEAMS CLONE | LOGIN</title>
        </Helmet>
        <div className="form-header header">Get Started</div>
        <div className="form-content">
          <div className="form-img">
            <img src={signIn} alt="sign" />
          </div>
          <div className="form-body">
            <div className="form-option">
              <span
                className={showUp ? "showUp" : "showDown"}
                onClick={handleOptionClick}
              >
                Sign Up
              </span>
              <span
                className={!showUp ? "showUp" : "showDown"}
                onClick={handleOptionClick}
              >
                Sign In
              </span>
            </div>
            <div className="form-component">
              {showUp ? <SignUp /> : <SignIn />}
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;
