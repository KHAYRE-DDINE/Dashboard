import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiPlayCircle, FiBookOpen, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { currentCourses as fallbackCourses } from "../../../../../../lib/courseCatalog";
import { toast } from "react-toastify";
import axios from "../../../../../api/axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Current() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Edit Modal State
  const [editingCourse, setEditingCourse] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editHours, setEditHours] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/courses");
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setCourses(data);
        } else if (isMounted) {
          setCourses(fallbackCourses);
        }
      } catch (error) {
        if (isMounted) setCourses(fallbackCourses);
      }
    };
    fetchCourses();
    return () => { isMounted = false; };
  }, []);

  const subjectFill = {
    Math: "bg-blue-50 text-blue-700",
    Physics: "bg-indigo-50 text-indigo-700",
    Arabic: "bg-emerald-50 text-emerald-700",
    Mathematics: "bg-blue-50 text-blue-700",
    "Arabic Literature": "bg-emerald-50 text-emerald-700"
  };

  const handleOpenEdit = (e, course) => {
    e.stopPropagation();
    setEditingCourse(course);
    setEditSubject(course.title || course.subject || "");
    setEditDesc(course.description || "");
    setEditHours(course.totalHours || 20);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;

    const updated = {
      ...editingCourse,
      subject: editSubject.trim(),
      title: editSubject.trim(),
      description: editDesc.trim(),
      totalHours: parseInt(editHours, 10) || 20
    };

    setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditingCourse(null);
    toast.success(`Course "${updated.subject}" updated!`);

    try {
      await axios.patch(`/courses/${updated.id}`, updated);
    } catch (err) {
      // Offline fallback
    }
  };

  const handleDeleteCourse = async (e, courseId, title) => {
    e.stopPropagation();
    setCourses(prev => prev.filter(c => c.id !== courseId));
    toast.success(`Course "${title || 'Course'}" deleted.`);

    try {
      await axios.delete(`/courses/${courseId}`);
    } catch (err) {
      // Offline fallback
    }
  };

  return (
    <div className="my-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {courses.map((course, idx) => {
          const colorSoft = subjectFill[course.subject] || "bg-indigo-50 text-indigo-700";
          const progress = course.progress || 50;

          return (
            <motion.div
              key={course.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => navigate(`/dashboard/courses/details/${course.id}`)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Header Color Block */}
              <div className={cn("h-28 p-5 flex justify-between items-start relative", colorSoft)}>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                  {course.icon || (course.image ? <img src={course.image} alt={course.title} className="w-8 h-8 object-contain" /> : "📚")}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => handleOpenEdit(e, course)}
                    title="Edit Course"
                    className="p-2 rounded-lg bg-white/80 hover:bg-white text-gray-700 hover:text-indigo-600 transition-colors shadow-sm"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button 
                    onClick={(e) => handleDeleteCourse(e, course.id, course.title || course.subject)}
                    title="Delete Course"
                    className="p-2 rounded-lg bg-white/80 hover:bg-white text-gray-700 hover:text-rose-600 transition-colors shadow-sm"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title || course.subject}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  {/* Meta stats */}
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><FiBookOpen size={14} className="text-indigo-500" /> {course.lessons || 12} lessons</span>
                    <span className="flex items-center gap-1.5"><FiClock size={14} className="text-indigo-500" /> {course.totalHours || 20}h total</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-gray-700">Course Progress</span>
                      <span className="text-xs font-bold text-indigo-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/courses/details/${course.id}`); }}
                    className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FiPlayCircle size={16} /> Open Course Page
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate("/dashboard/assignments"); }}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Assignments
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Course Modal */}
      <AnimatePresence>
        {editingCourse && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 relative"
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Edit Course</h3>
                <button onClick={() => setEditingCourse(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Course Title</label>
                  <input 
                    type="text" 
                    required 
                    value={editSubject} 
                    onChange={(e) => setEditSubject(e.target.value)} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description</label>
                  <textarea 
                    rows="3" 
                    value={editDesc} 
                    onChange={(e) => setEditDesc(e.target.value)} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Total Hours</label>
                  <input 
                    type="number" 
                    value={editHours} 
                    onChange={(e) => setEditHours(e.target.value)} 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setEditingCourse(null)} 
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Save Changes
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

export default Current;
