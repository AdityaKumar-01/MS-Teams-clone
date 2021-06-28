import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import DisplayAssignment from "../../Components/DisplayAssignment/DisplayAssignment.component";
import AssignmentResponse from './../../Components/AssignmentResponse/AssignmentResponse.component';

const AssignmentPage = () => {
  const [loading, setLoading] = useState(true);
  const [assignmentObj, setAssignmentObj] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const { id } = queryString.parse(history.location.search);
    getAssignmentDetails(id);
    setLoading(true);
  }, [history.location.search]);

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
        data.data.list.creator === localStorage.getItem("userName")
          ? setIsCreator(true)
          : setIsCreator(false)
        setAssignmentObj(JSON.stringify(data.data.list));
        setLoading(false);
      });
  };
  return (
    <div className="assignment-page">
      {loading ? (
        <div className="loader"></div>
      ) : isCreator ? (
        <div className="assignment-container">
          <AssignmentResponse assignmentObj={assignmentObj} />
          <DisplayAssignment assignmentObj={assignmentObj} />
        </div>
      ) : (
        <DisplayAssignment assignmentObj={assignmentObj} />
      )}
    </div>
  );
};

export default AssignmentPage;
