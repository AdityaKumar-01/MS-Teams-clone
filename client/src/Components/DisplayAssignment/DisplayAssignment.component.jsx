import React, { useRef, useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./DisplayAssignment.css";

const DisplayAssignment = ({ assignmentObj, creator }) => {
  const fileRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [frameId, setFrameId] = useState(13837);
  const [frameLink, setFrameLink] = useState("");
  const frameArray = [65868,66723,66619];

  let history = useHistory();
  useEffect(() => {
    setFrameLink(`https://embed.lottiefiles.com/animation/${frameId}`)
  }, [frameId])
  const handleFrame = () =>{
    setSubmitted(!submitted);
    setFrameId(frameArray[Math.floor(Math.random() * frameArray.length)]);
  }
  
  const goHome = () =>{
    history.push("/dashboard")
  }
  var myObj = JSON.parse(assignmentObj);
  return (
    <div className="display-assignment">
      <div className="display-panel-left">
      {!creator ?(<span className="home-icon" onClick={() => goHome()} ><ArrowBackIcon/>Back</span>):null }
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
              <div className="display-instruction-tile">
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
          {submitted ? ("Turned In"):("Turn In")}
        </button>
      </div>
      <div className="display-panel-right">
        <iframe src={frameLink}></iframe>
        <span>
          {submitted ? <span className="btn-shine">Submitted !!!</span> : null}
        </span>
        
      </div>
    </div>
  );
};

export default DisplayAssignment;
