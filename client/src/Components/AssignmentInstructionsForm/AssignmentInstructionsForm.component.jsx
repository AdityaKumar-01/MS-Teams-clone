// React libraries
import React, { useContext, useState } from "react";

// Material UI icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// External CSS
import "./AssignmentInstructionsForm.styles.css";

// No assinees IMG
import noInstructions from "../../Assets/instructions.png";

// Context API
import { AssignmentContext } from "../../Context/assignmentContext";

const AssignmentInstructionsForm = () => {
  // bring state for assignees form
  // This section of form will let user give instructions for assignment to others
  const {
    handleToggleSection,
    handleFormSubmission,
    assignmentInstructions,
    setAssignmentInstructions,
  } = useContext(AssignmentContext);

  // hold current instruction
  const [currentInstructions, setCurrentInstructions] = useState("");
  const addInstruction = () => {
    if (currentInstructions !== "")
      setAssignmentInstructions([
        ...assignmentInstructions,
        currentInstructions,
      ]); // update instruction list
    setCurrentInstructions("");
  };

  // function to remove any assignment cuurently entered
  const removeInstruction = (id) => {
    setAssignmentInstructions((prevAssignmentInstructions) => {
      return prevAssignmentInstructions.filter((instruction, index) => {
        return index !== id;
      });
    });
  };

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
              value={currentInstructions}
              onChange={(e) => setCurrentInstructions(e.target.value)}
              spellCheck={false}
            />
          </span>
          <span className="add-assignees-btn">
            <AddIcon
              onClick={() => addInstruction()}
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
        {assignmentInstructions.length !== 0 ? (
          assignmentInstructions.map((obj, index) => {
            return (
              <span className="assigness-bubble" id={index} key={index}>
                <p>{obj}</p>
                <span className="assign-remove">
                  <CloseIcon
                    onClick={() => removeInstruction(index)}
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
          <div className="nothing-container">
            <span className="nothing-img">
              <img src={noInstructions} alt="no indtructions" />
            </span>
            <span className="nothing-msg">Instructions will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentInstructionsForm;
