import React, {useState} from "react";
import AssignmentCard from "./../AssignmentCard/AssignmentCard.component";
import "./Assingment.styles.css";
import UseAnimations from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertCircle";
import CreateAssgnForm from './../CreateAssgnForm/CreateAssgnForm.component';

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
          Pending
          <UseAnimations animation={alertCircle} size={35} />
        </span>
        <div className="assignment-pending assignment-list-items">
          <AssignmentCard />
        </div>
        <span className="assignment-status">Completed</span>
        <div className="assignment-done assignment-list-items">
          <AssignmentCard />
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
          <div>
            <CreateAssgnForm toggleFormVisibility={toggleFormVisibility} />
          </div>
        ) : null}
      </div>
      <div className="assignment-list">
        <div className="assignment-pending assignment-list-items">
          <AssignmentCard />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
