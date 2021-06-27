// React libraries
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// USerContext that will help to fetch values
const AssignmentContext = React.createContext();

// UserProvider react item to deliver all values
// Provider contains all the states and funcions which can be required by other components

const AssignmentProvider = ({ children }) => {
  const [err, setError] = useState(""); // state to handle if any error occur
  const [currentSection, setCurrentSection] = useState(1);
  const [asgnName, setAsgnName] = useState("");
  const [asgnDueDate, setAsgnDueDate] = useState("");
  const [asgnDueTime, setAsgnDueTime] = useState("");
  const [assgnFormLink, setAssgnFormLink] = useState("");
  const [assigneesName, setAssigneesName] = useState([]);
  const [assignmentInstructions, setAssignmentInstructions] = useState([]);
  const handleToggleSection = (num) => {
    setCurrentSection(num);
    console.log(asgnName);
  };
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

  // values holds functions and states to be shared
  const value = {
    err,
    setError,
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
