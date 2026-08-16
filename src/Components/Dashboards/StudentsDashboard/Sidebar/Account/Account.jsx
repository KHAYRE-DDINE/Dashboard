import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { 
  FiEdit2, FiMapPin, FiMail, FiCalendar, FiClock, FiBook, 
  FiCheckCircle, FiPlayCircle, FiAward, FiStar, FiVideo, FiBarChart2, FiUpload
} from "react-icons/fi";
import { toast } from "react-toastify";

import defaultAvatar from "../../../../../images/avatar.svg";
import useAuthContext from "../../../../authentication/AuthContext";
import axios from "../../../../api/axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Account() {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser } = useAuthContext();
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [courses, setCourses] = useState([]);
  const [colleagues, setColleagues] = useState([]);

  const fullName = `${currentUser?.firstName || currentUser?.["first name"] || "Student"} ${
    currentUser?.lastName || currentUser?.["last name"] || ""
  }`.trim();

  const userEmail = currentUser?.email || "student@school.edu";
  const userBio = currentUser?.bio || "Passionate about learning mathematics and physics. Always eager to collaborate!";
  const userLocation = currentUser?.location || "Casablanca, Morocco";
  const userTitle = currentUser?.title || "7th Grade Scholar • Software Enthusiast";
  const userAvatar = currentUser?.avatar || defaultAvatar;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data: coursesData } = await axios.get("/courses");
        const { data: messagesData } = await axios.get("/messages");
        if (isMounted) {
          if (Array.isArray(coursesData) && coursesData.length > 0) {
            setCourses(coursesData);
          }
          if (Array.isArray(messagesData)) {
            setColleagues(messagesData.map((m) => ({
              student: m.sender,
              subject: m.lastMessage,
              image: defaultAvatar,
              role: m.role || "Teacher"
            })));
          }
        }
      } catch (err) {
        // Fallback silently if offline
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateCurrentUser({ [field]: reader.result });
        toast.success(`${field === "avatar" ? "Profile picture" : "Cover photo"} updated successfully!`);
      } catch (error) {
        toast.error("Could not update image.");
      }
    };
    reader.readAsDataURL(file);
  };

  const userStats = currentUser?.stats || {
    dateJoined: "3 Months Ago",
    activeClasses: "3",
    completedLessons: "42",
    assignmentsDone: "18",
    videosWatched: "156",
    studyHours: "340",
    averageScore: "B+"
  };

  const stats = [
    { label: "Date Joined", value: userStats.dateJoined, icon: FiCalendar, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Active Classes", value: userStats.activeClasses, icon: FiBook, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Completed Lessons", value: userStats.completedLessons, icon: FiCheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Assignments Done", value: userStats.assignmentsDone, icon: FiEdit2, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Videos Watched", value: userStats.videosWatched, icon: FiVideo, color: "text-rose-600", bg: "bg-rose-100" },
    { label: "Study Hours", value: userStats.studyHours, icon: FiClock, color: "text-cyan-600", bg: "bg-cyan-100" },
    { label: "Average Score", value: userStats.averageScore, icon: FiBarChart2, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const badges = [
    { icon: "🌟", title: "Top Scholar", color: "bg-amber-100 text-amber-600" },
    { icon: "🔥", title: "7 Day Streak", color: "bg-rose-100 text-rose-600" },
    { icon: "📚", title: "Bookworm", color: "bg-indigo-100 text-indigo-600" },
    { icon: "💡", title: "Problem Solver", color: "bg-emerald-100 text-emerald-600" },
    { icon: "🎯", title: "Perfect Score", color: "bg-blue-100 text-blue-600" },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 w-full max-w-[1200px] mx-auto pb-20">
      <input
        type="file"
        ref={avatarInputRef}
        onChange={(e) => handleImageUpload(e, "avatar")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={coverInputRef}
        onChange={(e) => handleImageUpload(e, "coverImage")}
        accept="image/*"
        className="hidden"
      />

      {/* Hero Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Cover Photo */}
        <div 
          className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative bg-cover bg-center"
          style={currentUser?.coverImage ? { backgroundImage: `url(${currentUser.coverImage})` } : {}}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <button 
            onClick={() => coverInputRef.current?.click()}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <FiUpload size={16} /> Edit Cover
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 md:px-10 pb-8 relative">
          {/* Avatar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 relative z-10">
              <div 
                onClick={() => avatarInputRef.current?.click()}
                className="relative group cursor-pointer"
              >
                <img 
                  src={userAvatar} 
                  alt="Avatar" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg bg-white object-cover"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <FiUpload size={24} />
                </div>
              </div>
              <div className="text-center md:text-left mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                <p className="text-gray-500 font-medium mt-1">{userTitle}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/dashboard/settings')} className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-gray-100">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">About Me</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {userBio}
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-gray-400" size={18} /> {userLocation}
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" size={18} /> {userEmail}
              </div>
              <div className="flex items-center gap-3">
                <FiAward className="text-gray-400" size={18} /> Top 5% in Class
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge, idx) => (
            <div key={idx} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm shadow-sm", badge.color)}>
              <span className="text-lg">{badge.icon}</span> {badge.title}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="col-span-full mb-2">
          <h2 className="text-xl font-bold text-gray-900">Your Statistics</h2>
          <p className="text-sm text-gray-500">Only you can see this data</p>
        </div>
        
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-lg font-bold text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Two Column Layout for Lessons & Colleagues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Lessons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Courses</h2>
            <span onClick={() => navigate('/dashboard/courses')} className="text-indigo-600 text-sm font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="flex flex-col gap-4">
            {courses.map((c, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50/50 transition-colors cursor-pointer group border border-transparent hover:border-indigo-100">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-sm", c.color || "bg-indigo-500")}>
                  {c.icon || <FiBook />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{c.title || c.subject}</h4>
                  <p className="text-xs text-gray-500 mt-1">{c.subject}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-indigo-600">{c.progress}%</span>
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1.5">
                    <div className={cn("h-full rounded-full", c.color || "bg-indigo-500")} style={{ width: `${c.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Colleagues / Network */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Network</h2>
            <span onClick={() => navigate('/dashboard/message')} className="text-indigo-600 text-sm font-semibold cursor-pointer hover:underline">Messages</span>
          </div>
          <div className="flex flex-col gap-4">
            {colleagues.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={c.image} alt={c.student} className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{c.student}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{c.subject}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  c.role === "Teacher" ? "bg-amber-100 text-amber-700" :
                  c.role === "Mentor" ? "bg-purple-100 text-purple-700" :
                  "bg-blue-100 text-blue-700"
                )}>
                  {c.role}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Account;
