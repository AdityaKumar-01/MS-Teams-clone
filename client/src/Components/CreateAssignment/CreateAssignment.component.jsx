// React libraries
import React, { useContext } from "react";

// External CSS
import "./CreateAssignment.styles.css";

// Components i.e. 3 sections of assignment form
import AssignmentCreationForm from "../AssignmentCreationForm/AssignmentCreationForm.component";
import AssignmentAssigneeForm from "./../AssignmentAssigneeForm/AssignmentAssigneeForm.component";
import AssignmentInstructionsForm from "./../AssignmentInstructionsForm/AssignmentInstructionsForm.component";

import { AssignmentContext } from "../../Context/assignmentContext";
const CreateAssignment = () => {
  const { currentSection } = useContext(AssignmentContext);

  return (
    <div className="assignment-creation-section">
      {currentSection === 1 ? (
        <AssignmentCreationForm />
      ) : currentSection === 2 ? (
        <AssignmentAssigneeForm />
      ) : (
        <AssignmentInstructionsForm />
      )}
    </div>
  );
};

export default CreateAssignment;
