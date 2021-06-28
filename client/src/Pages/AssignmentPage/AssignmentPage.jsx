import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import DisplayAssignment from "../../Components/DisplayAssignment/DisplayAssignment.component";

const AssignmentPage = () => {
  const [loading, setLoading] = useState(true);
  const [assignmentObj, setAssignmentObj] = useState("");

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
        setAssignmentObj(JSON.stringify(data.data.list));
        setLoading(false);
      });
  };
  return (
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <DisplayAssignment assignmentObj={assignmentObj} />
      )}
    </div>
  );
};

export default AssignmentPage;
