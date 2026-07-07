import React, { useContext, useEffect, useState } from "react";
import "./Dashboards.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { IoLibrary } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaChartPie } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";

import { LanguageContext } from "../../App";
import { toast, ToastContainer } from "react-toastify";

function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const language = useContext(LanguageContext);

  const StudentsList = [
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
      listName: "library",
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

  const secondNotify = () => {
    toast("Dashboard still under development");
  };

  useEffect(() => {
    secondNotify();
  }, []);

  return (
    <div className="dashboard min-h-screen overflow-x-hidden bg-[#F8FAFF]">
      <Header setSidebarWidth={setSidebarWidth} sidebarWidth={sidebarWidth} />
        <main className={`layout flex relative pt-[56px] min-h-screen`}>
          <Sidebar
            list={StudentsList}
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
          />
          <div
            className={`flex-1 transition-all duration-300 min-h-[calc(100vh-56px)] w-full`}
            style={{ 
              marginLeft: window.innerWidth >= 768 ? `${sidebarWidth}px` : '0',
              width: window.innerWidth >= 768 ? `calc(100% - ${sidebarWidth}px)` : '100%'
            }}
          >
            <Outlet />
          </div>
          <ToastContainer />
        </main>
     
    </div>
  );
}

export default Dashboard;
