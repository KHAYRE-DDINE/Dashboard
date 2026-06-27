import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiBook, FiClock, FiCheckCircle, FiAward, FiCalendar, FiBell } from "react-icons/fi";
import { CiBadgeDollar } from "react-icons/ci";

import icon from "../../../../../images/logo.svg";
import mainLogo from "../../../../../images/logo2.svg";
import avatar from "../../../../../images/avatar.svg";
import useAuthContext from "../../../../authentication/AuthContext";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const activityData = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.8 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4.2 },
  { name: "Fri", hours: 3.1 },
  { name: "Sat", hours: 5.5 },
  { name: "Sun", hours: 2.0 },
];

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [days, setDays] = useState([]);
  const [today, setToday] = useState("");

  const firstName =
    currentUser?.firstName || currentUser?.["first name"] || "Student";
  const fullName =
    `${currentUser?.firstName || currentUser?.["first name"] || ""} ${
      currentUser?.lastName || currentUser?.["last name"] || ""
    }`.trim() || "Student";

  const stats = [
    { label: "Active Courses", value: "12", icon: FiBook, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Completed", value: "8", icon: FiCheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Hours Learned", value: "124", icon: FiClock, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Avg. Score", value: "A-", icon: FiAward, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  const recentCourses = [
    { title: "Algebra 101", progress: 75, color: "bg-blue-500", icon: "📐" },
    { title: "Physics Basics", progress: 40, color: "bg-indigo-500", icon: "⚛️" },
    { title: "Arabic Lit", progress: 90, color: "bg-emerald-500", icon: "📚" },
    { title: "Intro to JS", progress: 15, color: "bg-amber-500", icon: "💻" },
  ];

  const tests = [
    { subject: "Mathematics", topic: "Linear Equations", date: "Jul 20", time: "10:00 AM", color: "border-blue-500" },
    { subject: "Physics", topic: "Kinematics", date: "Jul 22", time: "02:00 PM", color: "border-indigo-500" },
    { subject: "Arabic", topic: "Grammar Rules", date: "Jul 25", time: "09:00 AM", color: "border-emerald-500" },
  ];

  useEffect(() => {
    const getFourDays = () => {
      const todayDate = new Date();
      const daysArray = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(todayDate);
        date.setDate(todayDate.getDate() + i);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        daysArray.push(`${day} ${month}`);
      }
      setDays(daysArray);
    };
    const getTodayDate = () => {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      setToday(day + " " + shortMonths[month]);
    };
    getTodayDate();
    getFourDays();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-4 lg:p-8 w-full max-w-[1600px] mx-auto">
      {/* Left Main Content */}
      <div className="flex-1 flex flex-col gap-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {firstName}! 👋</h1>
              <p className="text-indigo-100 text-lg">You've learned for 5 hours this week. Keep it up!</p>
            </div>
            <button onClick={() => navigate('/dashboard/courses')} className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm">
              Resume Learning
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart & Recent Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Weekly Activity</h3>
              <select className="bg-gray-50 border-none text-sm font-medium text-gray-600 rounded-lg py-2 px-3 outline-none cursor-pointer">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <CartesianGrid vertical={false} stroke="#F3F4F6" />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#4F46E5', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Courses</h3>
              <button onClick={() => navigate('/dashboard/courses')} className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-5">
              {recentCourses.map((course, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white shadow-sm group-hover:scale-105 transition-transform", course.color)}>
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-semibold text-sm group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                      <div className={cn("h-1.5 rounded-full", course.color)} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{course.progress}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="xl:w-80 flex flex-col gap-6">
        
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-100 to-indigo-100"></div>
          <img src={avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-sm z-10 mt-6 bg-white" />
          <h2 className="text-lg font-bold text-gray-900 mt-3">{fullName}</h2>
          <p className="text-gray-500 text-sm font-medium">7th Grade Scholar</p>
          
          <div className="flex justify-center gap-2 mt-4 w-full pt-4 border-t border-gray-100">
            {[1, 2, 3, 4, 5].map((badge) => (
              <div key={badge} className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shadow-sm">
                <CiBadgeDollar size={18} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mini Calendar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Schedule</h3>
            <FiCalendar className="text-gray-400" />
          </div>
          <div className="flex justify-between items-center">
            {days.map((day, index) => {
              const isToday = today === day;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center justify-center w-12 h-14 rounded-xl cursor-pointer transition-colors",
                    isToday ? "bg-indigo-600 text-white shadow-md" : "hover:bg-gray-50 text-gray-600"
                  )}
                >
                  <span className="text-xs font-medium">{day.split(" ")[1]}</span>
                  <span className="text-lg font-bold">{day.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Tests */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-1"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Tests</h3>
            <button onClick={() => navigate('/dashboard/calendar')} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiBell size={14} />
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {tests.map((test, idx) => (
              <div key={idx} className={cn("p-4 rounded-xl bg-gray-50 border-l-4", test.color)}>
                <h4 className="font-bold text-gray-900 text-sm">{test.subject}</h4>
                <p className="text-xs font-medium text-gray-500 mt-1">{test.topic}</p>
                <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm">
                    <FiCalendar size={12} className="text-indigo-500"/> {test.date}
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm">
                    <FiClock size={12} className="text-indigo-500"/> {test.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Home;
