import React from "react";
import { archivedCourses } from "../../../../../../lib/courseCatalog";
import { motion } from "framer-motion";
import useAuthContext from "../../../../../authentication/AuthContext";
import { toast } from "react-toastify";

function Archived() {
  const { currentUser, updateUserPreferences } = useAuthContext();
  const restoredArchivedCourses =
    currentUser?.preferences?.courses?.restoredArchivedCourses || [];

  const visibleArchivedCourses = archivedCourses.filter(
    (course) => !restoredArchivedCourses.includes(course.id)
  );

  const handleRestoreCourse = async (courseId) => {
    if (restoredArchivedCourses.includes(courseId)) return;

    try {
      const nextRestored = [...restoredArchivedCourses, courseId];
      await updateUserPreferences({
        courses: {
          restoredArchivedCourses: nextRestored,
        },
      });
      toast.success("Course restored successfully.");
    } catch (error) {
      toast.error("Could not restore course.");
    }
  };

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      {visibleArchivedCourses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="bg-white dark:bg-[#151c2c] border border-gray-100 dark:border-[#1e293b] rounded-xl shadow-sm p-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={course.image}
              alt={course.title}
              className="w-20 h-20 object-contain rounded-lg bg-gray-50 dark:bg-[#0b0f19]"
            />
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 inline-block px-2 py-1 rounded-full">
                Archived
              </p>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.subject}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">{course.description}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Archived: {course.archivedOn}</span>
            <span>{course.reason}</span>
          </div>
          <button
            onClick={() => handleRestoreCourse(course.id)}
            className="mt-4 w-full rounded-lg bg-gray-900 dark:bg-indigo-600 text-white py-2 font-medium hover:bg-black dark:hover:bg-indigo-700 transition-colors"
          >
            Restore Course
          </button>
        </motion.div>
      ))}

      {visibleArchivedCourses.length === 0 && (
        <div className="col-span-full bg-white dark:bg-[#151c2c] border border-gray-100 dark:border-[#1e293b] rounded-xl shadow-sm p-6 text-center text-gray-600 dark:text-gray-300">
          No archived courses left. You restored everything.
        </div>
      )}
    </div>
  );
}

export default Archived;
