// React libraries
import React, { useState } from "react";

// External CSS
import "./Dashboard.styles.css";

// Components
import CreateTeam from "./../../Components/CreateTeam/CreateTeam.component";
import TeamsSection from "./../../Components/TeamsSection/TeamsSection.component";
import DMChats from "./../../Components/DMChats/DMChats.component";
import ProfileSetting from "./../../Components/ProfileSetting/ProfileSetting.component";
import Assignment from "./../../Components/Assignment/Assignment.components";

// Material UI Icons
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
const DashBoard = () => {
  // React hooks to handle local states
  const [showSection, setShowSection] = useState([
    false,
    true,
    false,
    false,
    false,
  ]); // state of all section to display
  const [currentSection, setcurrentSection] = useState(1); // index of current displayed section

  // function to toggle sections
  const showHide = (num) => {
    var arr = showSection;
    arr[currentSection] = false; // make the state of current displayed section to false
    arr[num] = !arr[num]; // toggle the state of section to be displayed
    setShowSection(arr);
    setcurrentSection(num);
  };
  return (
    <div className="dashboard-wrapper">
      {/* Navbar items */}
      <div className="nav-bar-list">
        <ul>
          <li onClick={() => showHide(0)}>
            <Tooltip
              title="Cerate Team/DM"
              TransitionComponent={Zoom}
              placement="right"
            >
              <AddCircleRoundedIcon
                style={{ color: "f54748", fontSize: 35, cursor: "pointer" }}
              />
            </Tooltip>
          </li>
          <li onClick={() => showHide(1)}>
            <Tooltip
              title="Your Teams"
              TransitionComponent={Zoom}
              placement="right"
            >
              <GroupRoundedIcon
                style={{ color: "f54748", fontSize: 35, cursor: "pointer" }}
              />
            </Tooltip>
          </li>
          <li onClick={() => showHide(2)}>
            <Tooltip
              title="Your DMs"
              TransitionComponent={Zoom}
              placement="right"
            >
              <PersonSharpIcon
                style={{ color: "f54748", fontSize: 35, cursor: "pointer" }}
              />
            </Tooltip>
          </li>
          <li onClick={() => showHide(3)}>
            <Tooltip
              title="Your Assignments"
              TransitionComponent={Zoom}
              placement="right"
            >
              <AssignmentTurnedInRoundedIcon
                style={{ color: "f54748", fontSize: 35, cursor: "pointer" }}
              />
            </Tooltip>
          </li>
          <li onClick={() => showHide(4)}>
            <Tooltip
              title="Profile Settings"
              TransitionComponent={Zoom}
              placement="right"
            >
              <SettingsRoundedIcon
                style={{ color: "f54748", fontSize: 35, cursor: "pointer" }}
              />
            </Tooltip>
          </li>
        </ul>
      </div>

      {/* conditional rendering of sections  */}
      <div className="display-section">
        {showSection[0] ? <CreateTeam showHide={showHide} /> : null}
        {showSection[1] ? <TeamsSection showHide={showHide} /> : null}
        {showSection[2] ? <DMChats showHide={showHide} /> : null}
        {showSection[3] ? <Assignment /> : null}
        {showSection[4] ? <ProfileSetting showHide={showHide} /> : null}
      </div>
    </div>
  );
};

export default DashBoard;
