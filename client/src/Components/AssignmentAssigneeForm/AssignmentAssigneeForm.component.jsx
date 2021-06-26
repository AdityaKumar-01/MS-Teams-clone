import React from 'react'

const AssignmentAssigneeForm = ({ handleToggleSection }) => {
  return (
    <div>
      <h1>Assignees Form</h1>
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
  );
};

export default AssignmentAssigneeForm
