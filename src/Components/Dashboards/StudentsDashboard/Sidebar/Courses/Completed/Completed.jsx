import React from "react";
import { completedCourses } from "../../../../../../lib/courseCatalog";
import { motion } from "framer-motion";
import useAuthContext from "../../../../../authentication/AuthContext";
import { toast } from "react-toastify";

function Completed() {
  const { currentUser, updateUserPreferences } = useAuthContext();

  const downloadedCertificates =
    currentUser?.preferences?.courses?.downloadedCertificates || [];

  const handleCertificateDownload = async (course) => {
    const existing = downloadedCertificates.find((item) => item.courseId === course.id);
    if (existing) {
      toast.info("Certificate already downloaded.");
      return;
    }

    try {
      const certificateText = [
        "Course Completion Certificate",
        `Student: ${currentUser?.firstName || "Student"} ${currentUser?.lastName || ""}`.trim(),
        `Course: ${course.title}`,
        `Subject: ${course.subject}`,
        `Final Grade: ${course.grade}`,
        `Completed On: ${course.completedOn}`,
        `Issued At: ${new Date().toISOString()}`,
      ].join("\n");

      const blob = new Blob([certificateText], { type: "text/plain;charset=utf-8" });
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${course.title.replace(/\s+/g, "-").toLowerCase()}-certificate.txt`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);

      const nextDownloaded = [
        ...downloadedCertificates,
        { courseId: course.id, downloadedAt: new Date().toISOString() },
      ];

      await updateUserPreferences({
        courses: {
          downloadedCertificates: nextDownloaded,
        },
      });

      toast.success("Certificate downloaded and saved.");
    } catch (error) {
      toast.error("Could not save certificate status.");
    }
  };

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      {completedCourses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="bg-white border border-gray-100 rounded-xl shadow-sm p-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={course.image}
              alt={course.title}
              className="w-20 h-20 object-contain rounded-lg bg-gray-50"
            />
            <div className="flex-1">
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 inline-block px-2 py-1 rounded-full">
                Completed
              </p>
              <h3 className="text-base font-bold text-gray-900 mt-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{course.subject}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">{course.description}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Final Grade: <strong className="text-gray-900">{course.grade}</strong></span>
            <span>Finished: {course.completedOn}</span>
          </div>
          {course.certificateReady && (
            <button
              onClick={() => handleCertificateDownload(course)}
              className="mt-4 w-full rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={downloadedCertificates.some((item) => item.courseId === course.id)}
            >
              {downloadedCertificates.some((item) => item.courseId === course.id)
                ? "Certificate Downloaded"
                : "Download Certificate"}
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default Completed;
