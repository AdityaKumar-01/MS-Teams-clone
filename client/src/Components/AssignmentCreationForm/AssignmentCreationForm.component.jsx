import React, {useContext} from "react";

import "./AssignmentCreationForm.styles.css";
import { AssignmentContext } from "../../Context/assignmentContext";
const AssignmentCreationForm = () => {
  const {
    err,
    asgnName,
    setAsgnName,
    asgnDueDate,
    setAsgnDueDate,
    asgnDueTime,
    setAsgnDueTime,
    assgnFormLink,
    setAssgnFormLink,
    handleToggleSection,
  } = useContext(AssignmentContext);
  return (
    <form className="assignment-creation-form">
      {err}
      <span>
        Assignment Title <span style={{ color: "red" }}>*</span>
      </span>
      <input
        type="text"
        required
        placeholder="Enter title"
        onChange={(e) => setAsgnName(e.target.value)}
        value={asgnName}
      />
      <span>
        Assignment Due Date <span style={{ color: "red" }}>*</span>
      </span>
      <input
        type="date"
        onChange={(e) => setAsgnDueDate(e.target.value)}
        value={asgnDueDate}
        required
      />
      <span>
        Assignment Due Time<span style={{ color: "red" }}>*</span>
      </span>
      <input
        type="time"
        onChange={(e) => setAsgnDueTime(e.target.value)}
        value={asgnDueTime}
        required
      />
      <span>Assignment Form Link</span>
      <input
        type="text"
        onChange={(e) => setAssgnFormLink(e.target.value)}
        value={assgnFormLink}
        required
        placeholder="Paste the link here"
      />
      <span className="btns">
        <button
          tye="button"
          onClick={() => handleToggleSection(2)}
          className="create-btn"
        >
          Next
        </button>
      </span>
    </form>
  );
};

export default AssignmentCreationForm;
