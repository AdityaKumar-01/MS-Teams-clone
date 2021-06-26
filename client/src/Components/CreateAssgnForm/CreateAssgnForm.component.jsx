// React libraries
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// External CSS
import "./CreateAssgnForm.styles.css";

const CreateAssgnForm = ({getAssignmentList,  }) => {
  const asgnName = useRef(); // ref to handle assignment name
  const asgnDueDate = useRef(); // ref to handle assignment due date
  const asgnDueTime = useRef(); // ref to handle assignment due time
  const assgnFormLink = useRef(); // ref to handle assignment form link
  const [err, setError] = useState(""); // state to handle if any error occur

 
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
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/assignment/create`,
        data
      ).then((res) =>{
        // console.log(res.status);
        
       
      }).catch((err) =>{
        console.log(err);
      })
      getAssignmentList();
       
        
    }
  };
  return (
    <form className="assignment-creation-form">
      {err}
      <span>
        Assignment Title <span style={{ color: "red" }}>*</span>{" "}
      </span>
      <input type="text" ref={asgnName} required placeholder="Enter here" />
      <span>
        Assignment Due Date <span style={{ color: "red" }}>*</span>{" "}
      </span>
      <input type="date" ref={asgnDueDate} required />
      <span>
        Assignment Due Time<span style={{ color: "red" }}>*</span>{" "}
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
        <button type="button" onClick={(e) => handleFormSubmission(e)} className="create-btn">
          Create
        </button>
        
      </span>
    </form>
  );
};

export default CreateAssgnForm;
