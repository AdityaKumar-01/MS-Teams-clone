// React libraries
import React, { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
// External CSS
import "./Dashboard.styles.css";

// Material UI Icons
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

// Components
import TeamsSection from "./../../Components/TeamsSection/TeamsSection.component";
const CreateTeam  =  lazy(() => import("./../../Components/CreateTeam/CreateTeam.component"));
const DMChats  =  lazy(() => import("./../../Components/DMChats/DMChats.component"));
const ProfileSetting  =  lazy(() => import("./../../Components/ProfileSetting/ProfileSetting.component"));
const Assignment  =  lazy(() => import("./../../Components/Assignment/Assignment.components"));


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
      <Helmet>
        <meta charSet="utf-8" />
        <title>MS TEAM CLONE | DASHBOARD</title>
      </Helmet>
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
        {showSection[0] ? (
          <Suspense fallback={<p></p>}>
            <CreateTeam showHide={showHide} />
          </Suspense>
        ) : null}
        {showSection[1] ? <TeamsSection showHide={showHide} /> : null}
        {showSection[2] ? (
          <Suspense fallback={<p></p>}>
            <DMChats showHide={showHide} />
          </Suspense>
        ) : null}
        {showSection[3] ? (
          <Suspense fallback={<p></p>}>
            <Assignment showHide={showHide} />
          </Suspense>
        ) : null}
        {showSection[4] ? (
          <Suspense fallback={<p></p>}>
            <ProfileSetting showHide={showHide} />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

export default DashBoard;
