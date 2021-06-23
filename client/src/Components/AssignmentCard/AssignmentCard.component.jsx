import React from 'react';
import "./AssingmentCard.styles.css"
const AssignmentCard= () => {
    return (
      <div className="assignment-card">
        <div className="assignment-card-detail">
          <span className="assignment-card-title">Maths Quiz 1</span>
          <span className="assignment-card-deadline">Ends on 23rd July</span>
        </div>
        <div className="assignment-card-btn"><button>Start</button></div>
      </div>
    );
}

export default AssignmentCard;
