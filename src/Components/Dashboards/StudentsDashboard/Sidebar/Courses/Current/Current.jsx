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
      <div className=" my-10">
        <div className="all-subjects flex gap-[0.9rem] flex-wrap">
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
              className="subject relative rounded-lg border-[1px] border-gray-100 border-solid bg-white overflow-hidden"
            >
              <div
                className={cn(
                  "image-box h-[127px] flex justify-center items-center",
                  subjectFill[course.subject]
                )}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-[100px] h-[70px] object-contain"
                />
              </div>
              <div className="info ">
                <div>
                  <div className="subject-student">
                    <span className="capitalize text-gray-700">
                      {course.subject}
                    </span>
                  </div>
                  <div className="description">
                    <h4 className="capitalize text-gray-700">
                      {course.description}
                    </h4>
                  </div>
                  <div className="px-[15px] pb-2 text-xs text-gray-500 flex justify-between">
                    <span>{course.lessons} lessons</span>
                    <span>{course.totalHours}h total</span>
                  </div>
                  <div className="px-[15px] pb-3 text-xs text-indigo-600 font-medium">
                    {course.nextAssignment}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => navigate("/dashboard/assignments")}
                    className="continue text-primary-100 bg-primary-600"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/assignments")}
                    className="assignment bg-colorGray-100 text-colorGray-600"
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
