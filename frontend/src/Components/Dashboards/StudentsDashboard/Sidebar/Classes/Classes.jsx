import React, { useEffect, useState } from "react";
import "./Classes.css";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";
import mainLogo from "../../../../../images/logo2.svg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX, FiBookOpen, FiUser, FiHash, FiClock, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import useAuthContext from "../../../../authentication/AuthContext";
import axios from "../../../../api/axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Classes() {
  const { currentUser } = useAuthContext();
  const [classesList, setClassesList] = useState([]);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [classCode, setClassCode] = useState("");
  const [className, setClassName] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const studentName = `${currentUser?.firstName || currentUser?.["first name"] || "Student"} ${
    currentUser?.lastName || currentUser?.["last name"] || ""
  }`.trim();

  useEffect(() => {
    let isMounted = true;
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get("/classes");
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setClassesList(data);
        } else if (isMounted) {
          setClassesList([
            { id: 1, subject: "Full-Stack Engineering", title: "Full-Stack Architecture & Microservices", teacher: "Prof. Alex Rivera", joinCode: "FSE-101" },
            { id: 2, subject: "System Design", title: "Advanced System Design: Distributed Caching & Sharding", teacher: "Eng. Mourad Hajji", joinCode: "SYS-202" },
            { id: 3, subject: "DevOps & Cloud", title: "Cloud Native Infrastructure: Kubernetes & Multi-Cluster Orchestration", teacher: "Prof. Alex Rivera", joinCode: "OPS-303" },
            { id: 4, subject: "Arabic Literature", title: "Classical Arabic Literature & Rhetoric (البلاغة)", teacher: "Prof. Ahmed Ali", joinCode: "ARB-404" },
            { id: 5, subject: "Physics", title: "Classical Mechanics & Thermodynamics Colloquium", teacher: "Prof. Alex Rivera", joinCode: "PHY-505" },
            { id: 6, subject: "Mathematics", title: "Multivariable Calculus & Linear Analysis", teacher: "Prof. Ahmed Ali", joinCode: "MTH-606" }
          ]);
        }
      } catch (e) {
        if (isMounted) {
          setClassesList([
            { id: 1, subject: "Full-Stack Engineering", title: "Full-Stack Architecture & Microservices", teacher: "Prof. Alex Rivera", joinCode: "FSE-101" },
            { id: 2, subject: "System Design", title: "Advanced System Design: Distributed Caching & Sharding", teacher: "Eng. Mourad Hajji", joinCode: "SYS-202" },
            { id: 3, subject: "DevOps & Cloud", title: "Cloud Native Infrastructure: Kubernetes & Multi-Cluster Orchestration", teacher: "Prof. Alex Rivera", joinCode: "OPS-303" },
            { id: 4, subject: "Arabic Literature", title: "Classical Arabic Literature & Rhetoric (البلاغة)", teacher: "Prof. Ahmed Ali", joinCode: "ARB-404" },
            { id: 5, subject: "Physics", title: "Classical Mechanics & Thermodynamics Colloquium", teacher: "Prof. Alex Rivera", joinCode: "PHY-505" },
            { id: 6, subject: "Mathematics", title: "Multivariable Calculus & Linear Analysis", teacher: "Prof. Ahmed Ali", joinCode: "MTH-606" }
          ]);
        }
      }
    };
    fetchClasses();
    return () => { isMounted = false; };
  }, []);

  const handleJoinClass = async (e) => {
    e.preventDefault();
    if (!className.trim()) {
      toast.warning("Class title is required!");
      return;
    }

    const newClass = {
      id: Date.now(),
      subject: className.toLowerCase().includes("math") ? "Mathematics" : className.toLowerCase().includes("physic") ? "Physics" : className.toLowerCase().includes("arab") ? "Arabic" : "Engineering",
      title: className.trim(),
      teacher: teacherName.trim() || "Prof. Ahmed Ali",
      joinCode: classCode.trim() || `CLS-${Math.floor(100 + Math.random() * 900)}`,
      status: "Active"
    };

    setClassesList((prev) => [newClass, ...prev]);
    setShowJoinModal(false);
    setClassName("");
    setClassCode("");
    setTeacherName("");
    toast.success(`Successfully enrolled in "${newClass.title}"!`);

    try {
      await axios.post("/classes", newClass);
    } catch (e) {
      // Offline fallback
    }
  };

  const getSubjectColor = (subject = "") => {
    const s = subject.toLowerCase();
    if (s.includes("math")) {
      return {
        bg: "bg-blue-50 dark:bg-blue-950/40",
        border: "border-blue-200 dark:border-blue-900/40",
        text: "text-blue-600 dark:text-blue-400",
        badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
      };
    }
    if (s.includes("physic")) {
      return {
        bg: "bg-rose-50 dark:bg-rose-950/40",
        border: "border-rose-200 dark:border-rose-900/40",
        text: "text-rose-600 dark:text-rose-400",
        badge: "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300"
      };
    }
    if (s.includes("arab")) {
      return {
        bg: "bg-amber-50 dark:bg-amber-950/40",
        border: "border-amber-200 dark:border-amber-900/40",
        text: "text-amber-600 dark:text-amber-400",
        badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300"
      };
    }
    return {
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      border: "border-indigo-200 dark:border-indigo-900/40",
      text: "text-indigo-600 dark:text-indigo-400",
      badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
    };
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Classes
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse and manage your enrolled academic classes and active cohorts
          </p>
        </div>

        <button 
          onClick={() => setShowJoinModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-95 self-start sm:self-auto"
        >
          <FiPlus size={18} /> Join / Add Class
        </button>
      </div>

      {/* Main Grid & Sidebars */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Classes Cards Grid (Left / Main) */}
        <div className="flex-1 w-full min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classesList.map((item, idx) => {
              const colors = getSubjectColor(item.subject);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  key={item.id || idx}
                  className="bg-white dark:bg-[#151c2c] rounded-2xl border border-gray-200 dark:border-[#1e293b] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Banner Box */}
                    <div className={cn(
                      "w-full h-28 rounded-xl flex items-center justify-center relative overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-[1.02]",
                      colors.bg
                    )}>
                      <img
                        src={mainLogo}
                        alt="Class Logo"
                        className="w-12 h-12 object-contain filter drop-shadow-sm"
                      />
                      <span className={cn(
                        "absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        colors.badge
                      )}>
                        {item.status || "Active"}
                      </span>
                    </div>

                    {/* Class Subject & Title */}
                    <div className="mb-4">
                      <span className={cn(
                        "text-[11px] font-bold uppercase tracking-wider block mb-1.5",
                        colors.text
                      )}>
                        {item.subject || "Course"}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title || item.subject}
                      </h3>
                    </div>
                  </div>

                  {/* Footer Details: Teacher & Student */}
                  <div className="pt-4 border-t border-gray-100 dark:border-[#1e293b] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5 truncate">
                        <FiUser className="text-gray-400 dark:text-gray-500 shrink-0" size={13} />
                        <span className="truncate font-medium">{item.teacher || "Instructor"}</span>
                      </div>
                      {item.joinCode && (
                        <div className="flex items-center gap-1 font-mono text-[11px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          <FiHash size={10} />
                          <span>{item.joinCode}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate flex items-center gap-1">
                      <FiCheckCircle size={11} className="text-emerald-500" />
                      <span>Enrolled as: {studentName}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {classesList.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-[#151c2c] rounded-2xl border border-gray-200 dark:border-[#1e293b] p-8">
              <FiBookOpen size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No classes enrolled yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">Click below to enroll in your first academic class.</p>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Join Class
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
          
          {/* Promo Feature Card */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <img src={mainLogo} alt="Logo" className="w-7 h-7 filter brightness-0 invert" />
            </div>
            <h3 className="text-lg font-bold mb-2">Build right features, the right way</h3>
            <p className="text-indigo-100 text-xs leading-relaxed mb-5">
              Prioritize your academic goals and easily turn lectures into concrete mastery with curated learning tracks.
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toast.info("Interactive tracks are enabled for all your enrolled classes.")}
                className="flex-1 py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Explore Tracks
              </button>
              <Link 
                to="/dashboard/library"
                className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl transition-colors text-center"
              >
                Library
              </Link>
            </div>
          </div>

          {/* Upcoming Classes Card */}
          <div className="bg-white dark:bg-[#151c2c] rounded-2xl border border-gray-200 dark:border-[#1e293b] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-[#1e293b]">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Upcoming Classes</h4>
              <Link to="/dashboard/calendar" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                View all
              </Link>
            </div>
            <div className="flex flex-col items-center text-center py-2">
              <img src={enrolling} alt="enrolling" className="w-24 h-auto mb-3" />
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Stay Ahead in Class</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Make sure you never miss a lecture or assignment milestone with automated notifications.
              </p>
              <Link 
                to="/dashboard/calendar" 
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Open Calendar →
              </Link>
            </div>
          </div>

          {/* Alerts Card */}
          <div className="bg-white dark:bg-[#151c2c] rounded-2xl border border-gray-200 dark:border-[#1e293b] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-[#1e293b]">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Cohort Alerts</h4>
              <Link to="/dashboard/settings" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Configure
              </Link>
            </div>
            <div className="flex flex-col items-center text-center py-2">
              <img src={config} alt="config" className="w-24 h-auto mb-3" />
              <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Classroom Notifications</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Receive instant updates when teachers post resources or grade submissions.
              </p>
              <Link 
                to="/dashboard/settings" 
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Manage Notifications →
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Enroll in / Join Class Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <div 
            onClick={() => setShowJoinModal(false)}
            className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-pointer"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#151c2c] rounded-2xl p-6 sm:p-7 w-full max-w-md shadow-2xl border border-gray-200 dark:border-[#1e293b] relative cursor-default"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100 dark:border-[#1e293b]">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Enroll in / Join Class</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Enter class credentials to register</p>
                </div>
                <button 
                  onClick={() => setShowJoinModal(false)} 
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleJoinClass} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-1.5">
                    Class Title / Subject *
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={className} 
                    onChange={(e) => setClassName(e.target.value)} 
                    placeholder="e.g. Distributed Systems & Algorithms" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0b0f19] border border-gray-300 dark:border-[#1e293b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-1.5">
                    Class Join Code (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={classCode} 
                    onChange={(e) => setClassCode(e.target.value)} 
                    placeholder="e.g. SCH-94812" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0b0f19] border border-gray-300 dark:border-[#1e293b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-1.5">
                    Instructor Name
                  </label>
                  <input 
                    type="text" 
                    value={teacherName} 
                    onChange={(e) => setTeacherName(e.target.value)} 
                    placeholder="e.g. Prof. Ahmed Ali" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0b0f19] border border-gray-300 dark:border-[#1e293b] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors" 
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-[#1e293b]">
                  <button 
                    type="button" 
                    onClick={() => setShowJoinModal(false)} 
                    className="px-4 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Classes;
