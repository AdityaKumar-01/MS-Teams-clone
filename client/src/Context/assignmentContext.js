// React libraries
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useHistory } from "react-router-dom";
// USerContext that will help to fetch values
const AssignmentContext = React.createContext();

// UserProvider react item to deliver all values
// Provider contains all the states and funcions which can be required by other components

const AssignmentProvider = ({ children }) => {
  const [err, setError] = useState(""); // state to handle if any error occur
  const [assigneesErr, setAssigneesErr] = useState(""); // state to handle if any error occur
  const [currentSection, setCurrentSection] = useState(1);
  const [asgnName, setAsgnName] = useState("");
  const [asgnDueDate, setAsgnDueDate] = useState("");
  const [asgnDueTime, setAsgnDueTime] = useState("");
  const [assgnFormLink, setAssgnFormLink] = useState("");
  const [assigneesName, setAssigneesName] = useState([]);
  const [assignmentInstructions, setAssignmentInstructions] = useState([]);

  let history = useHistory();

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
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/assignment/create`, data)
      .then((res) => {
        console.log(res.status);
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
