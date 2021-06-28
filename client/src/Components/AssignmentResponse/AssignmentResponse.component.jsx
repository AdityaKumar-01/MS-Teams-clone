import React from "react";

const AssignmentResponse = ({ assignmentObj }) => {
  var myObj = JSON.parse(assignmentObj);

  return (
    <div className="assignment-response">
      <div className="assignment-response-header">
        <span>{myObj.title} Responses</span>
        <span>Assigned to {myObj.assigneesName.length} people</span>
      </div>
      <div>
        <span>{myObj.assigneesName}</span>
      </div>
      <span>{myObj.assigneesName[2]}</span>
    </div>
  );
};

export default AssignmentResponse;
