import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FiBookOpen, FiClock, FiPlayCircle, FiCheckCircle, FiMoreVertical } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";

import mainLogo from "../../../../../images/logo2.svg";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Courses() {
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);
  const [move, setMove] = useState(["current learning", "completed", "archived"]);
  
  const [subject, setSubject] = useState([
    {
      id: 1,
      subject: "Arabic Literature",
      description: "Arabic is a beautiful language, like a treasure chest filled with secrets!",
      progress: 65,
      totalHours: 24,
      students: 120,
      color: "bg-emerald-500",
      bgSoft: "bg-emerald-50",
      textSoft: "text-emerald-700",
      icon: "📚"
    },
    {
      id: 2,
      subject: "Physics",
      description: "Physics is like being a superhero, figuring out how everything moves.",
      progress: 30,
      totalHours: 40,
      students: 85,
      color: "bg-indigo-500",
      bgSoft: "bg-indigo-50",
      textSoft: "text-indigo-700",
      icon: "⚛️"
    },
    {
      id: 3,
      subject: "Mathematics",
      description: "Math is the language of the universe, helping us decode hidden patterns.",
      progress: 90,
      totalHours: 60,
      students: 210,
      color: "bg-blue-500",
      bgSoft: "bg-blue-50",
      textSoft: "text-blue-700",
      icon: "📐"
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.endsWith("courses") || location.pathname.endsWith("courses/")) {
      navigate("current learning");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4 lg:p-8 w-full max-w-[1600px] mx-auto">
      {/* Left Main Content */}
      <div className="flex-1 flex flex-col gap-8">
        
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900"
          >
            My Courses
          </motion.h1>
          <button onClick={() => navigate('/dashboard/library')} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            Browse Catalog
          </button>
        </div>

        {/* Course Cards Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.map((course, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: id * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col"
              >
                {/* Card Header (Color Block) */}
                <div className={cn("h-24 w-full relative p-4 flex justify-between items-start", course.bgSoft)}>
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm bg-white")}>
                    {course.icon}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors bg-white/50 rounded-lg p-1">
                    <FiMoreVertical size={20} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.subject}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                    {course.description}
                  </p>

                  {/* Meta Stats */}
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-5">
                    <span className="flex items-center gap-1.5"><FiClock size={14} className={course.textSoft} /> {course.totalHours}h Total</span>
                    <span className="flex items-center gap-1.5"><PiStudentFill size={14} className={course.textSoft} /> {course.students}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-gray-900">Course Progress</span>
                      <span className={cn("text-xs font-bold", course.textSoft)}>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={cn("h-2 rounded-full transition-all duration-1000", course.color)} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <button onClick={() => navigate('/dashboard/assignments')} className={cn("flex-1 py-2.5 rounded-xl font-semibold text-sm flex justify-center items-center gap-2 transition-colors", course.color, "text-white hover:opacity-90")}>
                      <FiPlayCircle size={18} /> Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tabs and Outlet Section */}
        <div className="mt-4">
          <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
            {move.map((tab, idx) => {
              const isActive = location.pathname.includes(tab.replace(" ", "%20")) || location.pathname.includes(tab);
              return (
                <Link
                  key={idx}
                  to={tab}
                  className={cn(
                    "capitalize pb-3 text-sm font-semibold transition-colors relative",
                    isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="courseTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <div className="min-h-[200px]">
            <Outlet context={{ subject, cn }} />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="xl:w-80 flex flex-col gap-6">
        
        {/* Promo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <h3 className="text-xl font-bold mb-2 relative z-10">Upgrade to Pro 🚀</h3>
          <p className="text-indigo-100 text-sm mb-6 relative z-10">Get access to premium courses, 1-on-1 tutoring, and advanced analytics.</p>
          <button className="w-full py-2.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm relative z-10">
            View Plans
          </button>
        </motion.div>

        {/* Upcoming Classes Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Classes</h3>
            <span onClick={() => navigate('/dashboard/calendar')} className="text-indigo-600 text-sm font-medium cursor-pointer hover:underline">View all</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={enrolling} alt="enrolling" className="w-24 h-auto mb-4" />
            <h4 className="text-gray-900 font-bold mb-2">Ready to learn?</h4>
            <p className="text-gray-500 text-sm mb-4">Make sure you never miss a class by enrolling in your upcoming semesters early.</p>
            <button onClick={() => navigate('/dashboard/calendar')} className="text-indigo-600 font-semibold text-sm hover:underline">Start Enrolling →</button>
          </div>
        </motion.div>

        {/* Alerts Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            <span onClick={() => navigate('/dashboard/settings')} className="text-indigo-600 text-sm font-medium cursor-pointer hover:underline">Settings</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={config} alt="config" className="w-24 h-auto mb-4" />
            <h4 className="text-gray-900 font-bold mb-2">Configure your alerts</h4>
            <p className="text-gray-500 text-sm mb-4">Be notified of important events in your class or school so you never miss a thing.</p>
            <button onClick={() => navigate('/dashboard/settings')} className="text-indigo-600 font-semibold text-sm hover:underline">Setup Alerts →</button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Courses;
