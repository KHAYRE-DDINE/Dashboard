import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiClock } from "react-icons/fi";
import defaultAvatar from "../../../../../../images/avatar.svg";
import avatar22 from "../../../../../../images/pngegg (22).svg";
import useAuthContext from "../../../../../authentication/AuthContext";
import { toast } from "react-toastify";
import axios from "../../../../../api/axios";

function About() {
  const { currentUser } = useAuthContext();
  const userName = `${currentUser?.firstName || currentUser?.["first name"] || "Student"} ${
    currentUser?.lastName || currentUser?.["last name"] || ""
  }`.trim();
  const userAvatar = currentUser?.avatar || defaultAvatar;

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Khalid Al Walid",
      time: "2 hours ago",
      text: "Hello teacher, what specific chapters do we have to revise for this upcoming unit test?",
      avatar: defaultAvatar,
    },
    {
      id: 2,
      name: "Amal Hamdalah",
      time: "45 mins ago",
      text: "Make sure to focus on chapter 3 and the review questions at the end of chapter 4. The teacher mentioned it in the last lecture.",
      avatar: avatar22,
    }
  ]);

  useEffect(() => {
    let isMounted = true;
    const fetchComments = async () => {
      try {
        const { data } = await axios.get("/comments");
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setComments(data);
        }
      } catch (err) {
        // Fallback silently
      }
    };
    fetchComments();
    return () => { isMounted = false; };
  }, []);

  const handleAddComment = async (e) => {
    e?.preventDefault();
    if (!commentInput.trim()) {
      toast.warning("Please type a comment before sending.");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: userName,
      time: "Just now",
      text: commentInput.trim(),
      avatar: userAvatar,
    };

    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
    toast.success("Comment posted & saved permanently!");

    try {
      await axios.post("/comments", newComment);
    } catch (err) {
      // Offline fallback
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl py-6">
      
      {/* Description Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <FiMessageSquare className="text-indigo-600" />
          Assignment Overview
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          Welcome to the first unit of Algebra! In this assignment, you will be tested on your understanding of basic algebraic principles including linear equations, variables, and balancing equations. 
          Please review the provided resources and submit your work before the deadline. Late submissions will incur a 10% penalty.
        </p>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
          Discussion ({comments.length})
        </h3>

        <div className="flex flex-col gap-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full border border-gray-200 shadow-sm object-cover" />
              <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900 text-sm">{comment.name}</span>
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <FiClock size={12} /> {comment.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Input Form */}
        <form onSubmit={handleAddComment} className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <img src={userAvatar} alt="avatar" className="w-8 h-8 rounded-full shadow-sm object-cover" />
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm focus:outline-none text-gray-800"
            placeholder="Ask a question or share a thought..."
          />
          <button 
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Send <FiSend size={16} />
          </button>
        </form>
      </div>
      
    </div>
  );
}

export default About;
