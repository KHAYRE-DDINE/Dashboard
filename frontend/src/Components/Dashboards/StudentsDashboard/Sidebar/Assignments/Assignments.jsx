import React, { useState } from "react";
import { useLocation, useNavigate, Link, Outlet, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FiSearch, FiFilter, FiMoreHorizontal, FiCalendar, FiClock, FiX } from "react-icons/fi";

import avatar from "../../../../../images/avatar.svg";
import mainLogo from "../../../../../images/logo2.svg";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Assignments() {
  const [activeTab, setActiveTab] = useState("all");
  const [openDrawerId, setOpenDrawerId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [move, setMove] = useState(["about", "resources", "learnings"]);

  const assignmentsData = [
    { id: 1, title: "Mathematics", subject: "Algebra Unit 1", status: "pending", date: "Aug 20", time: "23:10", teacher: avatar, color: "bg-blue-100 text-blue-700" },
    { id: 2, title: "Arabic", subject: "Grammar Rules", status: "completed", date: "Aug 18", time: "14:00", teacher: avatar, color: "bg-emerald-100 text-emerald-700" },
    { id: 3, title: "Programming", subject: "Intro to JS", status: "overdue", date: "Aug 15", time: "23:59", teacher: avatar, color: "bg-red-100 text-red-700" },
    { id: 4, title: "Physics", subject: "Kinematics", status: "pending", date: "Aug 22", time: "10:30", teacher: avatar, color: "bg-indigo-100 text-indigo-700" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Pending</span>;
      case "completed": return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Completed</span>;
      case "overdue": return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Overdue</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  const openDrawer = (assignId) => {
    setOpenDrawerId(assignId);
    navigate(`about/${assignId}`);
  };

  const closeDrawer = () => {
    setOpenDrawerId(null);
    navigate("");
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4 lg:p-8 w-full max-w-[1600px] mx-auto overflow-hidden relative">
      
      {/* Main Content */}
      <div className={cn("flex-1 flex flex-col gap-6 transition-all duration-300", openDrawerId ? "xl:mr-[400px]" : "")}>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900"
          >
            Assignments
          </motion.h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search assignments..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-full sm:w-64"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
              <FiFilter size={18} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {['all', 'pending', 'completed', 'overdue'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors shadow-sm",
                activeTab === tab ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modern Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assignmentsData.filter(a => activeTab === 'all' || a.status === activeTab).map((item, idx) => (
                  <tr 
                    key={item.id} 
                    onClick={() => openDrawer(item.id)}
                    className="hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm", item.color)}>
                          {item.title.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.subject}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 flex items-center gap-1.5"><FiCalendar className="text-gray-400"/> {item.date}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1.5"><FiClock className="text-gray-400"/> {item.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={item.teacher} alt="teacher" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <FiMoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {assignmentsData.filter(a => activeTab === 'all' || a.status === activeTab).length === 0 && (
              <div className="p-8 text-center text-gray-500 font-medium">
                No assignments found for this filter.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right Sidebar - Promo & Alerts (Hidden if drawer is open on desktop) */}
      <div className={cn("xl:w-80 flex flex-col gap-6 transition-all duration-300", openDrawerId ? "hidden" : "flex")}>
        
        {/* Promo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <h3 className="text-xl font-bold mb-2 relative z-10">Study Groups 👥</h3>
          <p className="text-indigo-100 text-sm mb-6 relative z-10">Join a study group for your upcoming assignments to collaborate.</p>
          <button onClick={() => navigate('/dashboard/message')} className="w-full py-2.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm relative z-10">
            Find a Group
          </button>
        </motion.div>

        {/* Alerts Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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

      {/* Assignment Detail Drawer / Panel */}
      <AnimatePresence>
        {openDrawerId && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 overflow-x-hidden right-0 w-full sm:w-[500px] bg-white shadow-2xl border-l border-gray-200 z-[9999999] flex flex-col"
          >
            {/* Drawer Header */}
            <div className="h-24 bg-gradient-to-r from-indigo-600 to-blue-500 p-6 flex justify-between items-start text-white">
              <div>
                <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Unit 2</span>
                <h2 className="text-xl font-bold mt-1">Assignment Detail</h2>
              </div>
              <button 
                onClick={closeDrawer}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Drawer Tabs */}
            <div className="flex items-center px-6 border-b border-gray-100 pt-4">
              {move.map((tab, idx) => {
                const isActive = location.pathname.includes(tab);
                return (
                  <Link
                    key={idx}
                    to={`${tab}/${id}`}
                    className={cn(
                      "capitalize pb-3 text-sm font-semibold transition-colors relative mr-6",
                      isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-800"
                    )}
                  >
                    {tab}
                    {isActive && (
                      <motion.div
                        layoutId="drawerTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Content Area (Outlet) */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <Outlet />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile drawer */}
      <AnimatePresence>
        {openDrawerId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 sm:hidden"
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default Assignments;
