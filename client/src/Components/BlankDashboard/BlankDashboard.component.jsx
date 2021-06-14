// React libraries
import React from "react";

// Assets
import empty from "../../Assets/empty.png";

// External CSS
import "./BlankDashboard.styles.css";

const BlankDashboard = ({ showHide }) => {
  return (
    <div className="empty-wrapper">
      <span className="empty-img">
        <img src={empty} alt="empty" />
      </span>
      <span className="empty-msg">
        <p>You don't have any team</p>
        <button className="create-chat-btn" onClick={() => showHide(0)}>
          Create Team
        </button>
      </span>
    </div>
  );
};

export default BlankDashboard;
