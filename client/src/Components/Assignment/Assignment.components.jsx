// React libraries
import React, { useState, useEffect } from "react";

// components
import AssignmentCard from "./../AssignmentCard/AssignmentCard.component";
import CreateAssignment from "../CreateAssignment/CreateAssignment.component";

// Icons and animation
import UseAnimations from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertCircle";
import DoneAllIcon from "@material-ui/icons/DoneAll";

// External CSS
import "./Assingment.styles.css";

// NPM packages
import axios from "axios";
import Collapsible from "react-collapsible";

const Assignment = () => {
  const [asgnList, setAsgnList] = useState([]); // holds the assignment list 
  const [loading, setLoading] = useState(true); // for the status of loader
  
  // useEffect to call backend and get the list of current assignment
  useEffect(() => {
    getAssignmentList();
  }, []);

  // function to get data and update hooks state
  const getAssignmentList = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/assignment/getAssignment`, {
        params: {
          userName: localStorage.getItem("userName"),
        },
      })
      .then((data) => {
        setAsgnList(data.data.list); // update hooks state
        setLoading(false); // remove loader
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="assignment-outer-wrapper">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="assignment-wrapper">
          <div className="assignment-title ">
            <span className="header">Your Assignments</span>
          </div>

          <div className="assignment-type">
            <span>Assigned to You</span>
          </div>

          <div className="assignment-list">
            <span className="assignment-status">
              {asgnList.length === 0 ? null : (
                <UseAnimations animation={alertCircle} size={35} />
              )}
              Pending
            </span>
            <Collapsible
              trigger="Show >"
              className="assignment-pending assignment-list-items"
              open={true}
              triggerWhenOpen="Hide"
              transitionTime={300}
            >
              {asgnList.length === 0 ? (
                <p className="work-msg">You are up to date</p>
              ) : (
                asgnList.map((assignment) => { // map those assignment that has a status of false in turnedIn
                  if (
                    assignment.creator !== localStorage.getItem("userName") &&
                    !assignment.turnedIn
                  )
                    return (
                      <AssignmentCard
                        id={assignment.assignmentId}
                        title={assignment.title}
                        date={assignment.dueDate}
                        time={assignment.dueTime}
                        key={assignment.assignmentId}
                        mine={false}
                      />
                    );
                })
              )}
            </Collapsible>

            <span className="assignment-status">
              <DoneAllIcon style={{ marginRight: "10px" }} />
              Completed
            </span>
            <Collapsible
              trigger="Show >"
              className="assignment-done assignment-list-items"
              triggerWhenOpen="Hide"
              transitionTime={300}
            >
              {asgnList.map((assignment) => {
                // map those assignment that has a status of true in turnedIn
                if (
                  assignment.creator !== localStorage.getItem("userName") &&
                  assignment.turnedIn
                )
                  return (
                    <AssignmentCard
                      id={assignment.assignmentId}
                      title={assignment.title}
                      date={assignment.dueDate}
                      time={assignment.dueTime}
                      key={assignment.assignmentId}
                      mine={false}
                    />
                  );
              })}
            </Collapsible>
          </div>
          <div className="assignment-type">
            <span>Created by You</span>
          </div>
          <div className="assignment-list">
            <Collapsible
              trigger="Show >"
              className="assignment-pending assignment-list-items"
              triggerWhenOpen="Hide"
              transitionTime={300}
            >
              {asgnList.length === 0 ? (
                <p>Ypu haven't created any assignment</p>
              ) : (
                asgnList.map((assignment) => {
                  // map those assignment that has creator same as currently logged in user
                  if (assignment.creator === localStorage.getItem("userName"))
                    return (
                      <AssignmentCard
                        id={assignment.assignmentId}
                        title={assignment.title}
                        date={assignment.dueDate}
                        time={assignment.dueTime}
                        key={assignment.assignmentId}
                        mine={true}
                      />
                    );
                })
              )}
            </Collapsible>
          </div>
          <div className="form-area">
            <div className="assgn-creation-header header">
              Create Assignment
            </div>
            <CreateAssignment />
          </div>
          <div className="form-area-pad"></div>
        </div>
      )}
    </div>
  );
};

export default Assignment;
