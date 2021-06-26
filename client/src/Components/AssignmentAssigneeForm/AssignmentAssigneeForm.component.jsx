import React from "react";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import "./AssignmentAssigneeForm.styles.css";
const AssignmentAssigneeForm = ({ handleToggleSection }) => {
  return (
    <div className="assignent-assignees-form">
      <div className="assignment-assignees-left-panel">
        <span className="panel-title">Assign this to</span>
        <div className="assign-form">
          <span>
            <input
              className="assginees-input"
              type="text"
              placeholder="Type assignee name"
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
            onClick={() => handleToggleSection(1)}
            className="create-btn"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => handleToggleSection(3)}
            className="create-btn"
          >
            Next
          </button>
        </div>
      </div>
      <div className="assignment-assignees-right-panel">
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

export default AssignmentAssigneeForm;
