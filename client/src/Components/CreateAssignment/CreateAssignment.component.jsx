// React libraries
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// External CSS
import "./CreateAssignment.styles.css";

import AssignmentCreationForm from "../AssignmentCreationForm/AssignmentCreationForm.component";
import AssignmentAssigneeForm from './../AssignmentAssigneeForm/AssignmentAssigneeForm.component';
import AssignmentInstructionsForm from './../AssignmentInstructionsForm/AssignmentInstructionsForm.component';

const CreateAssignment = () => {
  const asgnName = useRef(); // ref to handle assignment name
  const asgnDueDate = useRef(); // ref to handle assignment due date
  const asgnDueTime = useRef(); // ref to handle assignment due time
  const assgnFormLink = useRef(); // ref to handle assignment form link
  const [err, setError] = useState(""); // state to handle if any error occur
  const [currentSection, setCurrentSection] = useState(1);

  const handleToggleSection = (num) =>{
    setCurrentSection(num);  
  }
  const handleFormSubmission = (e) => {
    e.preventDefault();

    // set error if required fields are empty
    if (
      asgnName.current.value === "" ||
      asgnDueDate.current.value === "" ||
      asgnDueTime.current.value === ""
    )
      setError("Enter all the details");
    else {
      const uid = uuidv4();

      var data = {
        id: uid,
        creator: localStorage.getItem("userName"),
        title: asgnName.current.value,
        date: asgnDueDate.current.value,
        time: asgnDueTime.current.value,
        formLink: assgnFormLink.current.value,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/assignment/create`, data)
        .then((res) => {
          // console.log(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
      asgnName.current.value = "";
      asgnDueDate.current.value = "";
      asgnDueTime.current.value = "";
      assgnFormLink.current.value = "";
    }
  };
  return (
    <div className="assignment-creation-form">
      {currentSection === 1 ? (
        <AssignmentCreationForm
          asgnName={asgnName}
          asgnDueDate={asgnDueDate}
          asgnDueTime={asgnDueTime}
          assgnFormLink={assgnFormLink}
          err={err}
          handleToggleSection={handleToggleSection}
        />
      ) : currentSection === 2 ? (
        <AssignmentAssigneeForm handleToggleSection={handleToggleSection} />
      ) : (
        <AssignmentInstructionsForm
          handleFormSubmission={handleFormSubmission}
          handleToggleSection={handleToggleSection}
        />
      )}
    </div>
  );
};

export default CreateAssignment;
