import React, { useRef, useState, useEffect } from "react";

import "./DisplayAssignment.css";

const DisplayAssignment = ({ assignmentObj, creator }) => {
  const fileRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [frameId, setFrameId] = useState(13837);
  const [frameLink, setFrameLink] = useState("");
  const frameArray = [65868,66723,66619];
  useEffect(() => {
    setFrameLink(`https://embed.lottiefiles.com/animation/${frameId}`)
  }, [frameId])
  const handleFrame = () =>{
    setSubmitted(!submitted);
    setFrameId(frameArray[Math.floor(Math.random() * frameArray.length)]);
  }
  
  var myObj = JSON.parse(assignmentObj);
  return (
    <div className="display-assignment">
      <div className="display-panel-left">
        <span className="display-title display-assignment-section">
          {myObj.title}
        </span>
        <span className="display-creator display-assignment-section">
          <span className="display-tab">Cerated By:</span> {myObj.creator}
        </span>

        <span className="display-due display-assignment-section">
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
          <span className="display-due display-assignment-section">
            <span className="display-tab instruction-tab">
              Your Work
              <em>(Note: This form accept link of your uploaded work)</em>
            </span>
            <input
              ref={fileRef}
              type="text"
              placeholder="Paste the link here"
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
          Turn In
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
