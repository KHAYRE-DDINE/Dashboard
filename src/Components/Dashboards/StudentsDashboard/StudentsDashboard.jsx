import "./StudentsDashboard.css";
import Home from "./Sidebar/Home/Home";
import Courses from "./Sidebar/Courses/Courses";
import Classes from "./Sidebar/Classes/Classes";
import Library from "./Sidebar/Library/Library";
import Assignments from "./Sidebar/Assignments/Assignments";
import Message from "./Sidebar/Message/Message";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { LanguageContext } from "../../../App";
import Account from "./Sidebar/Account/Account";
import Calender from "./Sidebar/Calendar/Calendar";
import Current from "./Sidebar/Courses/Current/Current";
import Archived from "./Sidebar/Courses/Archived/Archived";
import Completed from "./Sidebar/Courses/Completed/Completed";
import About from "./Sidebar/Assignments/About/About";
import Learning from "./Sidebar/Assignments/Learning/Learning";
import Resources from "./Sidebar/Assignments/Resources/Resources";
import Help from "./Sidebar/Help/Help";
import Settings from "./Sidebar/Settings/Settings";
import Charts from "./Sidebar/Charts/Charts";

function StudentsDashboard() {
  const language = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "Education-Platform") {
      navigate("landing-page");
    }
  });

  return (
    <React.Fragment>
      {language === "english" ? (
        <div className="student-dash ">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />}>
              <Route path="current learning" element={<Current />} />
              <Route path="Archived" element={<Archived />} />
              <Route path="Completed" element={<Completed />} />
            </Route>
            <Route path="classes" element={<Classes />} />
            <Route path="charts" element={<Charts />} />
            <Route path="calendar" element={<Calender />} />
            <Route path="library" element={<Library />} />
            <Route path="message" element={<Message />} />
            <Route path="assignments" element={<Assignments />}>
              <Route path="about/:id" element={<About />} />
              <Route path="learnings/:id" element={<Learning />} />
              <Route path="resources/:id" element={<Resources />} />
            </Route>
            <Route path="account" element={<Account />} />
            <Route path="help" element={<Help />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
          <Outlet />
        </div>
      ) : (
        <div className="student-dash text-end">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />}>
              <Route path="current learning" element={<Current />} />
              <Route path="Archived" element={<Archived />} />
              <Route path="Completed" element={<Completed />} />
            </Route>
            <Route path="classes" element={<Classes />} />
            <Route path="calendar" element={<Calender />} />
            <Route path="library" element={<Library />} />
            <Route path="message" element={<Message />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="account" element={<Account />} />
          </Routes>
          <Outlet />
        </div>
      )}
    </React.Fragment>
  );
}
export default StudentsDashboard;
