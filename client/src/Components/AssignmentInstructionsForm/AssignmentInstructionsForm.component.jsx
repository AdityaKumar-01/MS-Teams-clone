import React from 'react'

const AssignmentInstructionsForm = ({
  handleToggleSection,
  handleFormSubmission,
}) => {
  return (
    <div>
      <h1>Assignment Instructions</h1>
      <button
        type="button"
        onClick={() => handleToggleSection(2)}
        className="create-btn"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={(e) => handleFormSubmission(e)}
        className="create-btn"
      >
        Submit
      </button>
    </div>
  );
};

export default AssignmentInstructionsForm