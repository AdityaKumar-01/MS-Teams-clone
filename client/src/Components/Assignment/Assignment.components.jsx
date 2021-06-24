// React libraries
import React, {useState} from "react";

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

// Variant for assignment creation form
const AssgnFormVar = {
  initialState: {
    scale: 3.8,
  },
  finalState: {
    scale: 1,
  },
};

const Assignment = () => {
  const [showPopUpForm, setShowPopUpForm] = useState(false);

  const toggleFormVisibility = () =>{
    setShowPopUpForm(!showPopUpForm);
  }
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
          <UseAnimations
            animation={alertCircle}
            size={35}
          />
          Pending
        </span>
        <div className="assignment-pending assignment-list-items">
          <AssignmentCard date="31-06-2021" time="15:43" />
        </div>
        <span className="assignment-status">
          <DoneAllIcon style={{ color: "#81B214", "margin-right": "10px" }} />
          Completed
        </span>
        <div className="assignment-done assignment-list-items">
          <AssignmentCard date="11-06-2021" time="12:03" />
        </div>
      </div>
      <div className="assignment-type">
        <span>Created by You</span>
      </div>
      <div className="assignment-header">
        <button className="create-btn" onClick={() => toggleFormVisibility()}>
          Create Assignment
        </button>
        {showPopUpForm ? (
          <motion.div
            className="assignment-form"
            variants={AssgnFormVar}
            initial="initialState"
            animate="finalState"
          >
            <CreateAssgnForm toggleFormVisibility={toggleFormVisibility} />
          </motion.div>
        ) : null}
      </div>
      <div className="assignment-list">
        <div className="assignment-pending assignment-list-items">
          <AssignmentCard date="24-06-2021" time="20:03" />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
