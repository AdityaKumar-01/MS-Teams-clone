// React libraries
import React, { useEffect, useState } from "react";

// External CSS
import "./AssingmentCard.styles.css";

const AssignmentCard = ({ date, time }) => {
  const [colorCode, setColorCode] = useState("");

  useEffect(() => {
    handleDueStatus();
  });

  // Handle color code of due date
  const handleDueStatus = () => {
    const currentDate = new Date(); // get current date and time

    const dueDay = parseInt(date.split("-")[0]); // get due day and typecast to int
    const dueMonth = parseInt(date.split("-")[1]); // get due month and typecast to int
    const dueHr = parseInt(time.split(":")[0]); // get due hour and typecast to int
    const dueMin = parseInt(time.split(":")[1]); // get due minute and typecast to int
    const currentDay = currentDate.getDate(); // get day from date obj
    const currentMonth = currentDate.getMonth() + 1; // get month from date obj
    const currentHr = currentDate.getHours(); // get hour from date obj
    const currentMin = currentDate.getMinutes(); // get minute from date obj

    // if the due day is tomorrow or later then set it to green color 
    // if the due day is today then set yellow color and if due has past then set it to red
    if (currentMonth > dueMonth || currentDay > dueDay) setColorCode("#FA1E0E");
    else if (dueMonth - currentMonth === 0 && dueDay - currentDay === 0) {
      if (currentHr > dueHr && currentMin > dueMin) setColorCode("#FA1E0E");
      else setColorCode("#FFCC29");
    } else setColorCode("#81B214");
  };
  return (
    <div className="assignment-card">
      <div className="assignment-card-detail">
        <span className="assignment-card-title">Maths Quiz 1</span>
        <span className="assignment-card-deadline" style={{ color: colorCode }}>
          Due: {date}, {time}
        </span>
      </div>
      <div className="assignment-card-btn">
        <button>{colorCode === "#FA1E0E" ? "Open" : "Start"}</button>
      </div>
    </div>
  );
};

export default AssignmentCard;