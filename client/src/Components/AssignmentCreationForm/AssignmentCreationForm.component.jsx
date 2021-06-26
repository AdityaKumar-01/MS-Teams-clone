import React from "react";

const AssignmentCreationForm = ({
  asgnName,
  asgnDueDate,
  asgnDueTime,
  assgnFormLink,
  err,
  handleToggleSection,
}) => {
  return (
    <form >
      {err}
      <span>
        Assignment Title <span style={{ color: "red" }}>*</span>
      </span>
      <input type="text" ref={asgnName} required placeholder="Enter here" />
      <span>
        Assignment Due Date <span style={{ color: "red" }}>*</span>
      </span>
      <input type="date" ref={asgnDueDate} required />
      <span>
        Assignment Due Time<span style={{ color: "red" }}>*</span>
      </span>
      <input type="time" ref={asgnDueTime} required />
      <span>Assignment Form Link</span>
      <input
        type="text"
        ref={assgnFormLink}
        required
        placeholder="Paste the link here"
      />
      <span className="btns">
        <button
          type="button"
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
