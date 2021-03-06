// React libraries
import React, { useRef, useState, useEffect } from "react";

// Material UI Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Extenal CSS
import "./DisplayAssignment.css";

// NPM Packages
import axios from "axios";
import { useHistory } from "react-router-dom";

const DisplayAssignment = ({ assignmentObj, creator }) => {
  // This component is reponsible to show assignment form 

  // parse the object containing info of assignment 
  // like name instructions due 
  var myObj = JSON.parse(assignmentObj);

  // ref to hold the link of answer
  const fileRef = useRef();

  const [submitted, setSubmitted] = useState(false); // status of submission
  const [frameId, setFrameId] = useState(13837); // iframe id
  const [frameLink, setFrameLink] = useState(""); // link for iframe animation
  const frameArray = [65868, 66723, 66619]; // different iframe animations
  let history = useHistory();
  useEffect(() => {
    setFrameLink(`https://embed.lottiefiles.com/animation/${frameId}`);
  }, [frameId]);

  // Change the animation on submission
  const handleFrame = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/assignment/turnInAssignment`,
      data: {
        id: myObj.assignmentId,
        userName: localStorage.getItem("userName"),
      },
    })
      .then((info) => {
        setSubmitted(!submitted);
        setFrameId(frameArray[Math.floor(Math.random() * frameArray.length)]);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  // link to go back to dashboard
  const goHome = () => {
    history.push("/dashboard");
  };

  return (
    <div className="display-assignment">
      <div className="display-panel-left">
        {!creator ? (
          <span className="home-icon" onClick={() => goHome()}>
            <ArrowBackIcon />
            Back
          </span>
        ) : null}
        <span className="display-title display-assignment-section">
          {myObj.title}
        </span>
        <span className="display-assignment-section">
          <span className="display-tab">Cerated By:</span> {myObj.creator}
        </span>

        <span className="display-assignment-section">
          <span className="display-tab">Due on:</span>
          <span>
            {myObj.dueDate}, {myObj.dueTime}
          </span>
        </span>
        <div className="display-instruction-list display-assignment-section">
          <span className="instructions-title">
            <span className="display-tab instruction-tab">
              Instructions for the test
            </span>
          </span>
          {myObj.assignmentInstructions.map((instruction, index) => {
            return (
              <div className="display-instruction-tile" key={index}>
                {index + 1}. {instruction}
              </div>
            );
          })}
        </div>
        {myObj.formLink === "" ? (
          <span className="link-section display-assignment-section">
            <span className="display-tab">Your Work</span>
            <input
              ref={fileRef}
              type="text"
              placeholder="Paste the link here"
              className="work-link"
            />
          </span>
        ) : (
          <a
            href={myObj.formLink}
            target="_blank"
            className="test-link create-btn"
          >
            Open test
          </a>
        )}

        <button
          disabled={creator}
          className="test-link create-btn"
          onClick={() => handleFrame()}
        >
          {submitted ? "Turned In" : "Turn In"}
        </button>
      </div>
      <div className="display-panel-right">
        <iframe src={frameLink}></iframe>
        <span>
          {submitted ? <span className="btn-shine submission-status">Submitted !!!</span> : null}
        </span>
      </div>
    </div>
  );
};

export default DisplayAssignment;
