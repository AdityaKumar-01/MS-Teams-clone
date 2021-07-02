import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AssignmentResponse.styles.css";

const AssignmentResponse = ({ assignmentObj }) => {
  var myObj = JSON.parse(assignmentObj);
  
  const [assigneeStatus, setAssigneeStatus] = useState([]);
  const [mailStatus, setMailStatus] = useState("");
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
          
          setAssigneeStatus(data.data.info);
        });
    };
    getStatus();
  }, []);

  const sendMail = () =>{
    const obj = {
      sender: myObj.creator,
      receiver: myObj.assigneesName,
      title:myObj.title,
      dueDay:myObj.dueDate,
      dueTime:myObj.dueTime,
      instructions:myObj.assignmentInstructions
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/mail/send`, obj)
    .then((data) =>{
      setMailStatus(data.data.msg);
    })
    .catch((err) =>{
      console.log(err);
    })
  }
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
              : "No one"}
          </div>
        </div>
      </div>
      <div className="mail-section">
        <p>Notify assignees about Assignment</p>
        <button onClick = {() =>{
          sendMail();
        }} className="mail-btn">Send Mail</button>
        <p>{mailStatus}</p>
      </div>
    </div>
  );
};

export default AssignmentResponse;
