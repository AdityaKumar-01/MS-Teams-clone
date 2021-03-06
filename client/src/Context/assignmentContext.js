// React libraries
import React, { useState } from "react";

// NPM packages
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useHistory } from "react-router-dom";

// AssignmentContext that will help to fetch values
const AssignmentContext = React.createContext();

// AssignmentProvider react item to deliver all values
// Provider contains all the states and funcions which can be required by other components

const AssignmentProvider = ({ children }) => {
  const [err, setError] = useState(""); // state to handle if any error occur
  const [assigneesErr, setAssigneesErr] = useState(""); // state to handle if any error occur
  const [currentSection, setCurrentSection] = useState(1); // status of section
  const [asgnName, setAsgnName] = useState(""); // state to handle assignment name
  const [asgnDueDate, setAsgnDueDate] = useState(""); // state to handle due date of assignment
  const [asgnDueTime, setAsgnDueTime] = useState("");
  const [assgnFormLink, setAssgnFormLink] = useState("");
  const [assigneesName, setAssigneesName] = useState([]);
  const [assignmentInstructions, setAssignmentInstructions] = useState([]);

  let history = useHistory();

  // function to jump between section of assignment form 
  // will help you to go forward only when required fields are filled 
  const handleToggleSection = (num) => {
    if (
      num === 2 &&
      (asgnName === "" || asgnDueDate === "" || asgnDueTime === "")
    ) {
      setError("Enter all the details");
    } else if (num === 3 && assigneesName.length === 0) {
      setAssigneesErr("Enter atleast one assignee's name");
    } else setCurrentSection(num);
  };

  // form to handle form submission 
  // will send data to backend to update database
  const handleFormSubmission = (e) => {
    e.preventDefault();
    const uid = uuidv4();

    var data = {
      id: uid,
      creator: localStorage.getItem("userName"),
      title: asgnName,
      date: asgnDueDate,
      time: asgnDueTime,
      formLink: assgnFormLink,
      assigneesName: assigneesName,
      assignmentInstructions: assignmentInstructions,
    };
    
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/assignment/create`, data)
      .then((res) => {
        
        history.push(`/assignment?id=${uid}`);
      })
      .catch((err) => {
        console.log(err);
      });
    
    setAsgnName("");
    setAsgnDueDate("");
    setAsgnDueTime("");
    setAssgnFormLink("");
    setCurrentSection(1);
    setAssigneesName([]);
    setAssignmentInstructions([]);
  };

  // values holds functions and states to be shared
  const value = {
    err,
    setError,
    assigneesErr,
    currentSection,
    setCurrentSection,
    asgnName,
    setAsgnName,
    asgnDueDate,
    setAsgnDueDate,
    asgnDueTime,
    setAsgnDueTime,
    assgnFormLink,
    setAssgnFormLink,
    handleToggleSection,
    handleFormSubmission,
    assigneesName,
    setAssigneesName,
    assignmentInstructions,
    setAssignmentInstructions,
  };
  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
};
// export both context and provider
// Context are required by components to fetch data
// Provider is reponsible to tell the react app that we are using context API
export { AssignmentContext, AssignmentProvider };
