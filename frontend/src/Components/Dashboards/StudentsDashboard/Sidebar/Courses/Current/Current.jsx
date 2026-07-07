import React from "react";
import { useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { currentCourses } from "../../../../../../lib/courseCatalog";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Current() {
  const navigate = useNavigate();

  const subjectFill = {
    Math: "bg-blue-100 text-blue-700",
    Physics: "bg-red-100 text-red-700",
    Arabic: "bg-yellow-100 text-yellow-700",
  };

  return (
    <React.Fragment>
      <div className="my-10 px-1 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {currentCourses.map((course, id) => (
            <motion.div
              initial={{
                left: id % 2 === 0 ? 100 : -100,
              }}
              whileInView={{
                left: 0,
              }}
              transition={{ duration: 1, delay: 0.2 }}
              key={course.id}
              className="subject relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={cn(
                  "image-box h-[170px] p-4 flex items-center justify-center",
                  subjectFill[course.subject]
                )}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full rounded-xl object-cover shadow-sm"
                />
              </div>
              <div className="info p-5 space-y-4">
                <div className="space-y-2">
                  <div className="subject-student text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    {course.subject}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-6">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-xs font-medium text-gray-600">
                  <span>{course.lessons} lessons</span>
                  <span>{course.totalHours}h total</span>
                </div>

                <div className="text-sm font-semibold text-indigo-600">
                  Next: {course.nextAssignment}
                </div>

                <div className="buttons flex gap-3">
                  <button
                    onClick={() => navigate("/dashboard/assignments")}
                    className="continue flex-1 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-primary-100 transition-colors hover:bg-primary-700"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/assignments")}
                    className="assignment flex-1 rounded-xl bg-colorGray-100 px-4 py-3 text-sm font-semibold text-colorGray-600 transition-colors hover:bg-colorGray-200"
                  >
                    Assignments
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Current;
