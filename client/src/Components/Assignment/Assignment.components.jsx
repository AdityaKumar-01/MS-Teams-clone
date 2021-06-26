// React libraries
import React, { useState, useEffect } from "react";

// components
import AssignmentCard from "./../AssignmentCard/AssignmentCard.component";
import CreateAssgnForm from "./../CreateAssgnForm/CreateAssgnForm.component";

// Icons and animation
import UseAnimations from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertCircle";
import { motion } from "framer-motion";
import DoneAllIcon from "@material-ui/icons/DoneAll";
// External CSS
import "./Assingment.styles.css";

import axios from "axios";
import Collapsible from "react-collapsible";

const Assignment = () => {
  const [asgnList, setAsgnList] = useState([]);

  useEffect(() => {
    getAssignmentList();
  }, []);

  const getAssignmentList = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/assignment/getAssignment`)
      .then((data) => {
        console.log(data.data.list);
        setAsgnList(data.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
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
            <p>You are up to date</p>
          ) : (
            asgnList.map((assignment) => {
              return (
                <AssignmentCard
                  id={assignment.assignmentId}
                  title={assignment.title}
                  date={assignment.dueDate}
                  time={assignment.dueTime}
                />
              );
            })
          )}
        </Collapsible>

        <span className="assignment-status">
          <DoneAllIcon style={{ color: "#81B214", "margin-right": "10px" }} />
          Completed
        </span>
        <Collapsible
          trigger="Show >"
          className="assignment-done assignment-list-items"
          triggerWhenOpen="Hide"
          transitionTime={300}
        >
          <AssignmentCard date="11-06-2021" time="12:03" />
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
          <AssignmentCard date="24-06-2021" time="20:03" />
        </Collapsible>
      </div>
      <div id="form-creation" className="form-area">
        <CreateAssgnForm getAssignmentList={getAssignmentList} />
      </div>
    </div>
  );
};

export default Assignment;
