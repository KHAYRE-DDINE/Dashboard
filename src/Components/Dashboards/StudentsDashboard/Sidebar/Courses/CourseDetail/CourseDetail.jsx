import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPlayCircle, FiCheckCircle, FiSend, FiMessageSquare, FiClock, FiBookOpen } from "react-icons/fi";
import useAuthContext from "../../../../../authentication/AuthContext";
import defaultAvatar from "../../../../../../images/avatar.svg";
import { toast } from "react-toastify";
import axios from "../../../../../api/axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const fallbackCoursesList = [
  {
    id: "1",
    subject: "Arabic Literature",
    title: "Arabic Literature Basics",
    description: "Arabic is a beautiful language, like a treasure chest filled with secrets!",
    progress: 67,
    totalHours: 24,
    lessonsList: [
      { id: 101, title: "Lesson 1: Fundamentals & Overview", duration: "12:30", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 102, title: "Lesson 2: Core Practical Examples", duration: "18:45", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 103, title: "Lesson 3: Advanced Problem Solving", duration: "24:10", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  },
  {
    id: "2",
    subject: "Physics",
    title: "Physics & Kinematics",
    description: "Physics is like being a superhero, figuring out how everything moves.",
    progress: 30,
    totalHours: 40,
    lessonsList: [
      { id: 201, title: "Lesson 1: Introduction to Vectors & Motion", duration: "15:00", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 202, title: "Lesson 2: Newton's Laws of Motion", duration: "22:10", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  },
  {
    id: "3",
    subject: "Mathematics",
    title: "Algebra 101",
    description: "Math is the language of the universe, helping us decode hidden patterns.",
    progress: 90,
    totalHours: 60,
    lessonsList: [
      { id: 301, title: "Lesson 1: Linear Equations & Graphs", duration: "10:15", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 302, title: "Lesson 2: Quadratic Equations", duration: "25:30", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  }
];

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const userAvatar = currentUser?.avatar || defaultAvatar;
  const userName = `${currentUser?.firstName || currentUser?.["first name"] || "Student"} ${
    currentUser?.lastName || currentUser?.["last name"] || ""
  }`.trim();

  const [course, setCourse] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, name: "Amal Hamdalah", time: "1 hour ago", text: "Great video lesson! Clarified linear equations completely.", avatar: defaultAvatar }
  ]);

  useEffect(() => {
    let isMounted = true;
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/courses/${id}`);
        if (isMounted && data) {
          setCourse({
            ...data,
            lessonsList: data.lessonsList || [
              { id: 101, title: "Lesson 1: Fundamentals & Overview", duration: "12:30", completed: true, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
              { id: 102, title: "Lesson 2: Core Practical Examples", duration: "18:45", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
              { id: 103, title: "Lesson 3: Advanced Problem Solving", duration: "24:10", completed: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
            ]
          });
          return;
        }
      } catch (e) {
        // Fallback to local match
      }

      const match = fallbackCoursesList.find(c => String(c.id) === String(id)) || fallbackCoursesList[0];
      if (isMounted) setCourse(match);
    };

    fetchCourse();
    return () => { isMounted = false; };
  }, [id]);

  if (!course) {
    return <div className="p-8 text-center text-gray-500 font-bold">Loading course details...</div>;
  }

  const currentLesson = course.lessonsList[activeLessonIndex] || course.lessonsList[0];

  const handleToggleComplete = (lessonId) => {
    const updatedLessons = course.lessonsList.map(l => 
      l.id === lessonId ? { ...l, completed: !l.completed } : l
    );

    const completedCount = updatedLessons.filter(l => l.completed).length;
    const newProgress = Math.round((completedCount / updatedLessons.length) * 100);

    const updatedCourse = {
      ...course,
      progress: newProgress,
      lessonsList: updatedLessons
    };

    setCourse(updatedCourse);
    toast.success(`Lesson status updated! Course progress is now ${newProgress}%.`);

    try {
      axios.patch(`/courses/${course.id}`, { progress: newProgress });
    } catch (e) {
      // Offline fallback
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: userName,
      time: "Just now",
      text: commentText.trim(),
      avatar: userAvatar
    };

    setComments(prev => [...prev, newComment]);
    setCommentText("");
    toast.success("Comment posted!");
  };

  return (
    <div className="my-6 flex flex-col gap-6 w-full max-w-[1600px] mx-auto p-4 lg:p-8">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors shadow-sm"
          >
            <FiArrowLeft size={18} /> Back
          </button>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{course.subject}</span>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{course.title || course.subject}</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1.5"><FiBookOpen size={16} className="text-indigo-500" /> {course.lessonsList.length} Lessons</span>
            <span className="flex items-center gap-1.5"><FiClock size={16} className="text-indigo-500" /> {course.totalHours || 20}h Total</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 font-medium">Progress</span>
            <span className="text-base font-bold text-indigo-600">{course.progress}%</span>
          </div>
          <div className="w-36 bg-gray-100 rounded-full h-3">
            <div className="bg-indigo-600 h-3 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Video Player & Comments */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Video Player */}
          <div className="bg-black rounded-3xl overflow-hidden shadow-xl aspect-video relative">
            <video 
              controls 
              className="w-full h-full object-cover"
              src={currentLesson?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
            />
          </div>

          {/* Lesson Action Bar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{currentLesson?.title}</h3>
              <p className="text-xs text-gray-500 mt-1">Duration: {currentLesson?.duration} • Lesson {activeLessonIndex + 1} of {course.lessonsList.length}</p>
            </div>

            <button
              onClick={() => handleToggleComplete(currentLesson?.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm",
                currentLesson?.completed 
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              <FiCheckCircle size={18} />
              {currentLesson?.completed ? "Completed" : "Mark as Complete"}
            </button>
          </div>

          {/* Lesson Comments */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <FiMessageSquare className="text-indigo-600" />
              Lesson Discussion & Questions
            </h4>

            <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <img src={c.avatar} alt="avatar" className="w-10 h-10 rounded-full shadow-sm object-cover" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-gray-900">{c.name}</span>
                      <span className="text-xs text-gray-400">{c.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-3 items-center">
              <img src={userAvatar} alt="user" className="w-10 h-10 rounded-full shadow-sm object-cover" />
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave a comment or question..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
                <FiSend size={16} /> Post
              </button>
            </form>
          </div>
        </div>

        {/* Right: Lesson Playlist */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 h-fit">
          <h3 className="font-bold text-gray-900 text-lg pb-3 border-b border-gray-100">
            Course Playlist ({course.lessonsList.length} Lessons)
          </h3>

          <div className="flex flex-col gap-3">
            {course.lessonsList.map((lesson, idx) => (
              <div
                key={lesson.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={cn(
                  "p-4 rounded-xl cursor-pointer border transition-all flex items-center justify-between",
                  activeLessonIndex === idx 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-900 font-bold shadow-sm"
                    : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <FiPlayCircle size={18} className={activeLessonIndex === idx ? "text-indigo-600" : "text-gray-400"} />
                  <div>
                    <p className="text-sm leading-snug">{lesson.title}</p>
                    <span className="text-xs text-gray-400 font-normal">{lesson.duration}</span>
                  </div>
                </div>

                {lesson.completed && (
                  <FiCheckCircle className="text-emerald-500 shrink-0" size={18} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
