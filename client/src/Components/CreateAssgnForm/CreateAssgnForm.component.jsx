import React, { useState, useRef } from "react";
import "./CreateAssgnForm.styles.css";
const CreateAssgnForm = ({ toggleFormVisibility }) => {
  const asgnName = useRef();
  const asgnDueDate = useRef();
  const asgnDueTime = useRef();
  const assgnFormLink = useRef();
  const [err, setError] = useState("");
  const handleFormSubmission = (e) => {
    e.preventDefault();
    if(asgnName.current.value === "" || asgnDueDate.current.value === "" || asgnDueTime.current.value === "")
        setError("Enter all the details");
    else
        toggleFormVisibility();
  };
  return (
    <div className="assignment-form">
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
          <button
            onClick={(e) => handleFormSubmission(e)}
            className="create-btn"
          >
            Submit
          </button>
          <button
            onClick={() => toggleFormVisibility()}
            className="create-btn"
          >
            Cancel
          </button>
        </span>
      </form>
    </div>
  );
};

export default CreateAssgnForm;
