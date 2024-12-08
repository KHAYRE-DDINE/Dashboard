import "./StudentsDashboard.css";
import Home from "./Sidebar/Home/Home";
import Courses from "./Sidebar/Courses/Courses";
import Classes from "./Sidebar/Classes/Classes";
import Library from "./Sidebar/Library/Library";
import Assignments from "./Sidebar/Assignments/Assignments";
import Message from "./Sidebar/Message/Message";
<<<<<<< HEAD
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
=======
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
import Charts from "./Sidebar/Charts/Charts";
=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533

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
<<<<<<< HEAD
        <div className="student-dash pb-[10px]">
=======
        <div className="student-dash ">
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />}>
              <Route path="current learning" element={<Current />} />
              <Route path="Archived" element={<Archived />} />
              <Route path="Completed" element={<Completed />} />
            </Route>
            <Route path="classes" element={<Classes />} />
<<<<<<< HEAD
            <Route path="charts" element={<Charts />} />
=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
