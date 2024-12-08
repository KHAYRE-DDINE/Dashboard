import React, { useContext, useState } from "react";
import "./Dashboards.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import dashboard from "../../images/dashboard.svg";
import recent from "../../images/recent.svg";
<<<<<<< HEAD
// import Assignment from "../../images/assignment.svg";
=======
import Assignment from "../../images/assignment.svg";
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
import classes from "../../images/classes.svg";
import library from "../../images/library.svg";
import routine from "../../images/routine.svg";
import notice from "../../images/notice.svg";
import account from "../../images/account.svg";
<<<<<<< HEAD
import chart from "../../images/chart.svg";
import { IoLibrary } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaChartPie } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";

=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
import { LanguageContext, roleContext } from "../../App";

function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const location = useLocation();
  const language = useContext(LanguageContext);
  const role = useContext(roleContext);

  const AdminList = [
<<<<<<< HEAD
    { listName: "dashboard", listIcon: <IoHome /> },
    { listName: "recent", listIcon: recent },
    // { listName: "teachers", listIcon: Assignment },
    { listName: "classes", listIcon: classes },
    { listName: "library", listIcon: library },
    { listName: "routine", listIcon: routine },
    { listName: "notice", listIcon: <IoMdHelpCircleOutline /> },
=======
    { listName: "dashboard", listIcon: dashboard },
    { listName: "recent", listIcon: recent },
    { listName: "teachers", listIcon: Assignment },
    { listName: "classes", listIcon: classes },
    { listName: "library", listIcon: library },
    { listName: "routine", listIcon: routine },
    { listName: "notice", listIcon: notice },
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
    { listName: "account", listIcon: account },
  ];
  const TeacherList = [
    { listName: "dashboard", listIcon: dashboard },
    { listName: "recent", listIcon: recent },
<<<<<<< HEAD
    // { listName: "teachers", listIcon: Assignment },
=======
    { listName: "teachers", listIcon: Assignment },
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
    { listName: "classes", listIcon: classes },
    { listName: "library", listIcon: library },
    { listName: "routine", listIcon: routine },
    { listName: "notice", listIcon: notice },
    { listName: "account", listIcon: account },
  ];
  const StudentsList = [
<<<<<<< HEAD
    {
      listName: "dashboard",
      listIcon: (
        <IoHome
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    {
      listName: "courses",
      listIcon: (
        <FaBookOpen
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    {
      listName: "assignments",
      listIcon: (
        <FaTasks
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    // { listName: "classes", listIcon: classes },
    {
      listName: "charts",
      listIcon: (
        <FaChartPie
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    {
      listName: "calendar",
      listIcon: (
        <FaRegCalendarAlt
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    {
      listName: "message",
      listIcon: (
        <LuMessagesSquare
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    {
      listName: "Library",
      listIcon: (
        <IoLibrary
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
    {
      listName: "account",
      listIcon: (
        <CgProfile
          className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
          size={"18px"}
        />
      ),
    },
  ];

  return (
    <div className="dashboard min-h-screen overflow-x-hidden">
      <Header setSidebarWidth={setSidebarWidth} sidebarWidth={sidebarWidth} />
=======
    { listName: "dashboard", listIcon: dashboard },
    { listName: "courses", listIcon: recent },
    { listName: "assignments", listIcon: Assignment },
    { listName: "classes", listIcon: classes },
    { listName: "calendar", listIcon: library },
    { listName: "message", listIcon: routine },
    { listName: "Library", listIcon: notice },
    { listName: "account", listIcon: account },
  ];

  return (
    <div className=" dashboard min-h-screen overflow-x-hidden">
      <Header />
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
      {language === "english" ? (
        <main className={`layout flex relative top-[56px]`}>
          <Sidebar
            list={
              role === "student"
                ? StudentsList
                : role === "teacher"
                ? TeacherList
                : AdminList
            }
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
          />
          <div
            className={`under-layout absolute right-0  xlg:px-10 `}
            style={{ width: `calc(100% - ${sidebarWidth}px)` }}
          >
            <Outlet />
          </div>
        </main>
      ) : (
        <main className={`layout flex flex-row-reverse relative top-[56px]`}>
          <Sidebar
            list={
              role === "student"
                ? StudentsList
                : role === "teacher"
                ? TeacherList
                : AdminList
            }
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
          />
          <div
            className={`under-layout absolute left-0 xlg:px-10`}
            style={{ width: `calc(100% - ${sidebarWidth}px)` }}
          >
            <Outlet />
          </div>
        </main>
      )}
    </div>
  );
}

export default Dashboard;
