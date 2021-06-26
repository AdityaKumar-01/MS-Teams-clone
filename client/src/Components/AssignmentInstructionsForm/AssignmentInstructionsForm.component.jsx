import React from 'react'
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import "./AssignmentInstructionsForm.styles.css";
const AssignmentInstructionsForm = ({
  handleToggleSection,
  handleFormSubmission,
}) => {
  return (
    <div className="assignent-assignees-form">
      <div className="assignment-assignees-left-panel">
        <span className="panel-title">Add Instructions for Assignment</span>
        <div className="assign-form">
          <span>
            <input
              className="assginees-input"
              type="text"
              placeholder="Write here ..."
            />
          </span>
          <span className="add-assignees-btn">
            <AddIcon
              style={{ color: "f54748", cursor: "pointer", fontSize: 30 }}
            />
          </span>
        </div>
        <div className="btns">
          <button
            type="button"
            onClick={() => handleToggleSection(2)}
            className="create-btn"
          >
            Back
          </button>
          <button
            type="button"
            onClick={(e) => handleFormSubmission(e)}
            className="create-btn"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="assignment-instructions-right-panel">
        <span className="assigness-bubble">
          <p>Attempt All question each question carry 1 marks</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
        <span className="assigness-bubble">
          <p>Aditya</p>
          <span className="assign-remove">
            <CloseIcon
              style={{ fontSize: 20, color: "white", marginLeft: "10px" }}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default AssignmentInstructionsForm