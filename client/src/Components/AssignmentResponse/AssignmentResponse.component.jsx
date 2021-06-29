import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AssignmentResponse.styles.css";

const AssignmentResponse = ({ assignmentObj }) => {
  var myObj = JSON.parse(assignmentObj);
  const [assigneeStatus, setAssigneeStatus] = useState([]);
  useEffect(() => {
    const getStatus = () => {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/assignment/assignmentStatus`,
          {
            params: {
              id: myObj.assignmentId,
              asgineesName: myObj.assigneesName,
            },
          }
        )
        .then((data) => {
          console.log(data.data.info);
          setAssigneeStatus(data.data.info);
        });
    };
    getStatus();
  }, []);

  return (
    <div className="assignment-response">
      <div className="assignment-response-header">
        <span className="header">{myObj.title} Responses</span>
        <span className="response-count">
          Assigned to {myObj.assigneesName.length}
          {myObj.assigneesName.length > 1 ? " people" : " person"}
        </span>
      </div>
      <div className="response-response-list">
        <div className="assignment-status-list">
          <span className="status-title">Yet to Turn In</span>
          <div className="assinees-list">
            {assigneeStatus.length !== 0
              ? assigneeStatus.map((obj, key) => {
                  if (obj !== null && !obj.status)
                    return (
                      <span className="assignee-tile" key={key}>
                        {obj.name}
                      </span>
                    );
                })
              : "No one"}
          </div>
        </div>
        <div className="assignment-status-list">
          <span className="status-title">Already Turned In</span>
          <div className="assinees-list">
            {assigneeStatus.length !== 0
              ? assigneeStatus.map((obj, key) => {
                  if (obj !== null && obj.status)
                    return (
                      <span className="assignee-tile" key={key}>
                        {obj.name} at {obj.timeStamp}
                      </span>
                    );
                })
              : ("No one")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentResponse;
