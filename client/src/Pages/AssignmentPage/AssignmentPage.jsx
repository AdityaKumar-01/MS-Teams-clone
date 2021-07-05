// REact libraries
import React, { useEffect, useState } from "react";

// NPM Packages
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { Helmet } from "react-helmet";

// Components
import DisplayAssignment from "../../Components/DisplayAssignment/DisplayAssignment.component";
import AssignmentResponse from './../../Components/AssignmentResponse/AssignmentResponse.component';

// Extenal CSS
import "./AssignmentPage.styles.css";

const AssignmentPage = () => {
  // This page is reponsible to show assignmnt and its response
  // If the user is creator then will show response too else only assignment 
  const [loading, setLoading] = useState(true);
  const [assignmentObj, setAssignmentObj] = useState("");
  const [isCreator, setIsCreator] = useState(false);

  let history = useHistory();
  
  useEffect(() => {
    // get assignment Id from URL
    const { id } = queryString.parse(history.location.search);
    getAssignmentDetails(id);
    setLoading(true);
  }, [history.location.search]);

  // get the details of assignment from backend based on id fetched from URL
  const getAssignmentDetails = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/assignment/getAssignmentDetails`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((data) => {
       
        if (data.data.list.creator)
          data.data.list.creator === localStorage.getItem("userName")
            ? setIsCreator(true)
            : setIsCreator(false);
        setAssignmentObj(JSON.stringify(data.data.list));
        setLoading(false);
      });
  };
  return (
    <div className="assignment-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MS TEAM CLONE | ASSIGNMENT</title>
      </Helmet>
      {loading ? (
        <div className="loader"></div>
      ) : isCreator ? (
        <div className="assignment-container">
          <AssignmentResponse assignmentObj={assignmentObj} />
          <span className="assignment-preview">
            <em>What assginee will see</em>
          </span>
          <DisplayAssignment assignmentObj={assignmentObj} creator={true} />
        </div>
      ) : (
        <div className="assignment-container">
          <DisplayAssignment assignmentObj={assignmentObj} creator={false} />
        </div>
      )}
    </div>
  );
};

export default AssignmentPage;
