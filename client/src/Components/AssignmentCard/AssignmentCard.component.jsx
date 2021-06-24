import React, { useEffect, useState } from "react";

import "./AssingmentCard.styles.css";

const AssignmentCard = ({ date, time }) => {
  const [colorCode, setColorCode] = useState("");

  useEffect(() => {
    handleDueStatus();
  });

  const handleDueStatus = () => {
    const currentDate = new Date();

    const dueDay = parseInt(date.split("-")[0]);
    const dueMonth = parseInt(date.split("-")[1]);
    const dueHr = parseInt(time.split(":")[0]);
    const dueMin = parseInt(time.split(":")[1]);
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentHr = currentDate.getHours();
    const currentMin = currentDate.getMinutes();

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
