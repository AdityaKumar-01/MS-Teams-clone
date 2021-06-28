import React from 'react'

const DisplayAssignment = ({ assignmentObj }) => {
    console.log(assignmentObj);
    var myObj = JSON.parse(assignmentObj); 
    console.log(myObj);
  return (
    <div>
      <span>{myObj.creator}</span>
      <span>{myObj.title}</span>
      <span>{myObj.dueDate}</span>
      <span>{myObj.dueTime}</span>
      <span>{myObj.formLink}</span>
      <span>{myObj.assigneesName}</span>
      <span>{myObj.assignmentInstructions}</span>
    </div>
  );
};

export default DisplayAssignment
