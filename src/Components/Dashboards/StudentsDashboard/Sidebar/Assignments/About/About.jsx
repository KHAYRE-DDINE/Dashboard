import React from "react";
import { FiSend, FiMessageSquare, FiClock } from "react-icons/fi";
import avatar from "../../../../../../images/avatar.svg";
import avatar19 from "../../../../../../images/pngegg (19).svg";
import avatar22 from "../../../../../../images/pngegg (22).svg";

function About() {
  const comments = [
    {
      id: 1,
      name: "Khalid Al Walid",
      time: "2 hours ago",
      text: "Hello teacher, what specific chapters do we have to revise for this upcoming unit test?",
      avatar: avatar,
    },
    {
      id: 2,
      name: "Amal Hamdalah",
      time: "45 mins ago",
      text: "Make sure to focus on chapter 3 and the review questions at the end of chapter 4. The teacher mentioned it in the last lecture.",
      avatar: avatar22,
    }
  ];

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
              <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full border border-gray-200 shadow-sm" />
              <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900 text-sm">{comment.name}</span>
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <FiClock size={12} /> {comment.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{comment.text}</p>
                <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-gray-400">
                  <button className="hover:text-indigo-600 transition-colors">Reply</button>
                  <span>•</span>
                  <button className="hover:text-indigo-600 transition-colors">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Input */}
        <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full shadow-sm" />
          <input
            type="text"
            className="flex-1 bg-transparent border-none text-sm focus:outline-none text-gray-800"
            placeholder="Ask a question or share a thought..."
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
            Send <FiSend size={16} />
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default About;
