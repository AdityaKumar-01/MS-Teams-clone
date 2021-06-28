import React from "react";

import "./AssignmentResponse.styles.css";

const AssignmentResponse = ({ assignmentObj }) => {
  var myObj = JSON.parse(assignmentObj);
  console.log(myObj.assigneesName);
  return (
    <div className="assignment-response">
      <div className="assignment-response-header">
        <span className="header">{myObj.title} Responses</span>
        <span className="response-count">
          Assigned to {myObj.assigneesName.length}
          {myObj.assigneesName.length > 1 ? "people" : "person"}
        </span>
      </div>
      <div className="response-response-list">
        <div className="assignment-status-list">
          <span className="status-title">Yet to Turn In</span>
          <div className="assinees-list">
            {myObj.assigneesName.map((name, key) => {
              return <span className="assignee-tile">{name}</span>;
            })}
          </div>
        </div>
        <div className="assignment-status-list">
          <span className="status-title">Already Turned In</span>
          <div className="assinees-list">
            {myObj.assigneesName.map((name, key) => {
              return <span className="assignee-tile">{name}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentResponse;
