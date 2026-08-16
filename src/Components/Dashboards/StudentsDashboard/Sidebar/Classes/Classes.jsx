import React, { useEffect, useState } from "react";
import "./Classes.css";
import icon from "../../../../../images/logo.svg";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";
import mainLogo from "../../../../../images/logo2.svg";
import { Link } from "react-router-dom";
import mark from "../../../../../images/inter.svg";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import useAuthContext from "../../../../authentication/AuthContext";
import axios from "../../../../api/axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Classes() {
  const { currentUser } = useAuthContext();
  const [classesList, setClassesList] = useState([]);
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);
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
            { id: 1, subject: "arabic", title: "Arabic Grammar & Literature", teacher: "Sara Hassan" },
            { id: 2, subject: "physics", title: "Classical Mechanics & Optics", teacher: "Ahmed Ali" },
            { id: 3, subject: "math", title: "Calculus & Linear Algebra", teacher: "Fatima Noor" }
          ]);
        }
      } catch (e) {
        if (isMounted) {
          setClassesList([
            { id: 1, subject: "arabic", title: "Arabic Grammar & Literature", teacher: "Sara Hassan" },
            { id: 2, subject: "physics", title: "Classical Mechanics & Optics", teacher: "Ahmed Ali" },
            { id: 3, subject: "math", title: "Calculus & Linear Algebra", teacher: "Fatima Noor" }
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
      subject: className.toLowerCase().includes("math") ? "math" : className.toLowerCase().includes("physics") ? "physics" : "arabic",
      title: className.trim(),
      teacher: teacherName.trim() || "Mr. Kamal"
    };

    setClassesList((prev) => [newClass, ...prev]);
    setShowJoinModal(false);
    setClassName("");
    setClassCode("");
    toast.success(`Successfully enrolled in "${newClass.title}"!`);

    try {
      await axios.post("/classes", newClass);
    } catch (e) {
      // Offline fallback
    }
  };

  const subjectFill = {
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="classes flex relative">
      <div className="left">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ left: "30%", rotateY: 0 }}
            animate={{ left: "0%", rotateY: "360deg" }}
            transition={{ duration: 2, delay: 0.2 }}
            className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose"
          >
            classes
          </motion.h1>
          <button 
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <FiPlus size={16} /> Join / Add Class
          </button>
        </div>

        <div className="subjects mb-[40px]">
          <div className="all-subjects flex gap-[0.6rem] flex-wrap">
            {classesList.map((item, id) => (
              <div
                key={item.id || id}
                className="subject cursor-pointer rounded-md border-[1px] border-grayD border-solid"
              >
                <div
                  className={cn(
                    `image-box h-[127px] bg-primary-1001 flex justify-center items-center`,
                    subjectFill[item.subject?.toLowerCase()] || "bg-indigo-100 text-indigo-600"
                  )}
                >
                  <img
                    src={mainLogo}
                    alt="logo"
                    className="w-[50px] h-[50px]"
                  />
                </div>
                <div className="info ">
                  <div className="subject-student">
                    <span className="capitalize text-gray-700">
                      {item.title || item.subject}
                    </span>
                  </div>
                  <div className="student">
                    <h4 className="capitalize text-gray-600">{studentName}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`right-side bg-gray-50 !border-gray-200 py-5 ${
          closeOpenRightSide ? "open" : ""
        }`}
      >
        <span
          className="right-side-button cursor-pointer xl:hidden"
          onClick={() => setCloseOpenRightSide(!closeOpenRightSide)}
        >
          <img
            onClick={() => setCloseOpenRightSide(!closeOpenRightSide)}
            src={mark}
            alt="mark"
          />
        </span>
        <div className="subject right-box rounded-lg border-[1px] border-grayD border-solid bg-white my-[15px] min-h-[230px]">
          <div
            className={`image-box h-[127px] mb-4 flex justify-center items-center bg-purple-200`}
          >
            <img src={mainLogo} alt="logo" className="w-[50px] h-[50px]" />
          </div>
          <div class="h-[152px] p-4 flex-col justify-between items-start gap-4 inline-flex">
            <div class="self-stretch h-[68px] flex-col justify-center items-start gap-2 flex">
              <div class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
                Build right features, the right way
              </div>
              <div class="self-stretch text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
                Prioritize your ideas then easily move them into delivery,
                without losing any details on the way.
              </div>
            </div>
            <div class="w-[230px] my-[10px] justify-start items-center gap-2 inline-flex">
              <div class="px-3 py-2 w-[100%] bg-gray-100 rounded-md justify-center items-center gap-1.5 flex">
                <div class="text-gray-600 text-[0.83rem] font-medium font-['Inter'] leading-tight cursor-pointer">
                  Try is now
                </div>
              </div>
              <div class="px-3 py-2 w-[100%] rounded-md justify-center items-center gap-1.5 flex">
                <div class="text-gray-600 text-sm font-medium font-['Inter'] leading-tight cursor-pointer">
                  Learn more
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upcoming right-box rounded-lg shadow h-[285.24px] flex-col justify-start items-start inline-flex bg-white my-[15px] ">
          <div class="h-11 w-[100%] px-3 py-3 border-b border-gray-200 justify-between items-center inline-flex">
            <div class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
              Upcoming Classes
            </div>
            <div class="text-blue-600 text-sm font-medium font-['Inter'] leading-none">
              View all
            </div>
          </div>
          <div className="content self-stretch h-[217.24px] px-4 py-5 pb-1  flex-col justify-start items-center flex">
            <div className="image mt-3">
              <img
                src={enrolling}
                alt="enrolling"
                className="w-[100px] h-[65.20px]"
              />
            </div>
            <div class="h-10 pt-5 flex-col justify-start items-center inline-flex">
              <h2 class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
                Start Enrolling Classes
              </h2>
            </div>
            <div class="h-[52px] pt-3 flex-col justify-start items-center inline-flex">
              <p class="self-stretch text-center text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
                Make sure that you never miss a class and are always notified
                ahead of time.
              </p>
            </div>
            <div className="h-9 pt-4 relative">
              <Link
                to="more"
                className="text-center after:content-[''] after:absolute after:bottom-[-2px] after:h-[2px] after:w-[100%] after:left-0 after:bg-blue-600 text-blue-600 text-sm font-normal font-['Inter'] underline leading-tight"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
        <div className="alerts right-box rounded-lg shadow h-[285.24px] flex-col justify-start items-start inline-flex bg-white my-[15px] ">
          <div class="h-11 w-[100%] px-3 py-3 border-b border-gray-200 justify-between items-center inline-flex">
            <div class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
              Alerts
            </div>
            <div class="text-blue-600 text-sm font-medium font-['Inter'] leading-none">
              View all
            </div>
          </div>
          <div className="content self-stretch h-[217.24px] px-4 py-5 pb-1  flex-col justify-start items-center flex">
            <div className="image mt-3">
              <img
                src={config}
                alt="config"
                className="w-[100px] h-[65.20px]"
              />
            </div>
            <div class="h-10 pt-5 flex-col justify-start items-center inline-flex">
              <h2 class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
                Configure your alerts
              </h2>
            </div>
            <div class="h-[52px] pt-3 flex-col justify-start items-center inline-flex">
              <p class="self-stretch text-center text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
                Be notified of important events in your class or school to
                ensure you never miss a thing.
              </p>
            </div>
            <div className="h-9 pt-4 relative">
              <Link
                to="more"
                className="text-center after:content-[''] after:absolute after:bottom-[-2px] after:h-[2px] after:w-[100%] after:left-0 after:bg-blue-600 text-blue-600 text-sm font-normal font-['Inter'] underline leading-tight"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Join Class Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 relative"
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Enroll in / Join Class</h3>
                <button onClick={() => setShowJoinModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleJoinClass} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Class Title / Subject</label>
                  <input 
                    type="text" 
                    required 
                    value={className} 
                    onChange={(e) => setClassName(e.target.value)} 
                    placeholder="e.g. Organic Chemistry 101" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Class Code (Optional)</label>
                  <input 
                    type="text" 
                    value={classCode} 
                    onChange={(e) => setClassCode(e.target.value)} 
                    placeholder="e.g. SCH-94812" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Teacher Name</label>
                  <input 
                    type="text" 
                    value={teacherName} 
                    onChange={(e) => setTeacherName(e.target.value)} 
                    placeholder="e.g. Dr. Ahmed Ali" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setShowJoinModal(false)} 
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
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
