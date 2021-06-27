import React, { useContext, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import "./AssignmentAssigneeForm.styles.css";

import { AssignmentContext } from "../../Context/assignmentContext";
const AssignmentAssigneeForm = () => {
  const { handleToggleSection, assigneesName, setAssigneesName } =
    useContext(AssignmentContext);

  const [currentAssignee, setCurrentAssignee] = useState("");
  const addAssignee = () => {
    setAssigneesName([...assigneesName, currentAssignee]);
    setCurrentAssignee("");
  };

  const removeAssignee = (id) => {
    console.log(id);
    setAssigneesName((prevAssigneesName) => {
      return prevAssigneesName.filter((assignee, index) => {
        return index !== id;
      });
    });
  };
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
              value={currentAssignee}
              onChange={(e) => setCurrentAssignee(e.target.value)}
              spellCheck={false}
            />
          </span>
          <span className="add-assignees-btn">
            <AddIcon
              onClick={() => addAssignee()}
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
        {assigneesName.length !== 0 ? (
          assigneesName.map((name, index) => {
            return (
              <span className="assigness-bubble" id={index} key={index}>
                <p>{name}</p>
                <span className="assign-remove">
                  <CloseIcon
                    onClick={() => removeAssignee(index)}
                    style={{
                      fontSize: 20,
                      color: "white",
                      marginLeft: "10px",
                    }}
                  />
                </span>
              </span>
            );
          })
        ) : (
          <p>No one</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentAssigneeForm;
