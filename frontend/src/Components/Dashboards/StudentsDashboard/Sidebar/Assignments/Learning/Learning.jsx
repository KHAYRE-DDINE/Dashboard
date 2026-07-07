import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiChevronDown, FiChevronUp, FiBookOpen } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import avatar from "../../../../../../images/avatar.svg";
import avatar14 from "../../../../../../images/pngegg (14).svg";
import avatar16 from "../../../../../../images/pngegg (16).svg";
import avatar19 from "../../../../../../images/pngegg (19).svg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Learning() {
  const [openIds, setOpenIds] = useState([1]); // First item open by default

  const toggleUpdate = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const updates = [
    {
      id: 1,
      title: "How to solve Question 4 on the worksheet?",
      author: "Mohamed Tariq",
      time: "2 hours ago",
      authorAvatar: avatar14,
      content: "I'm stuck on question 4 where we have to find the slope of the line passing through points A(2,3) and B(5,9). Can someone explain the formula?",
      replies: [
        {
          id: 101,
          name: "Mourad Hajji",
          time: "10 hours ago",
          text: "You need to use the slope formula: m = (y2 - y1) / (x2 - x1). In this case, it's (9 - 3) / (5 - 2) = 6 / 3 = 2. So the slope is 2!",
          avatar: avatar19
        }
      ]
    },
    {
      id: 2,
      title: "Tip: Easy way to remember balancing equations",
      author: "Felecia Rower",
      time: "1 day ago",
      authorAvatar: avatar16,
      content: "I just figured out a great trick. Whatever you do to one side of the equation, always immediately write it on the other side before calculating. It saves so many mistakes!",
      replies: [
        {
          id: 201,
          name: "Jamal Monim",
          time: "2 mins ago",
          text: "That's actually super helpful, thanks for sharing!",
          avatar: avatar19
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl py-6">
      
      {/* Header Area */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
          <FiBookOpen size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Peer Learning Updates</h2>
          <p className="text-sm text-gray-500">Ask questions, share tips, and learn together.</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-sm focus:outline-none text-gray-800"
          placeholder="Share a learning tip or ask for help..."
        />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          Post <FiSend size={16} />
        </button>
      </div>

      {/* Updates List */}
      <div className="flex flex-col gap-4">
        {updates.map((update) => {
          const isOpen = openIds.includes(update.id);

          return (
            <motion.div 
              key={update.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Header / Clickable Toggle Area */}
              <div 
                className="p-5 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleUpdate(update.id)}
              >
                <img src={update.authorAvatar} alt="avatar" className="w-10 h-10 rounded-full shadow-sm border border-white" />
                <div className="flex-1">
                  <h4 className="text-base font-bold text-gray-900 leading-snug">{update.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-indigo-600">{update.author}</span>
                    <span className="text-xs text-gray-400">• {update.time}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                  {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </div>
              </div>

              {/* Expandable Content Area */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100 bg-gray-50/50"
                  >
                    <div className="p-5 pl-19"> {/* pl-19 to align with text above */}
                      <p className="text-gray-700 text-sm leading-relaxed bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                        {update.content}
                      </p>
                      
                      {/* Replies */}
                      <div className="flex flex-col gap-4 pl-4 border-l-2 border-indigo-100">
                        {update.replies.map(reply => (
                          <div key={reply.id} className="flex gap-3 items-start">
                            <img src={reply.avatar} alt="avatar" className="w-8 h-8 rounded-full shadow-sm" />
                            <div className="flex-1 bg-white p-3 rounded-xl rounded-tl-sm border border-gray-100 shadow-sm">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-900 text-xs">{reply.name}</span>
                                <span className="text-[11px] font-medium text-gray-400">{reply.time}</span>
                              </div>
                              <p className="text-sm text-gray-600">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                        
                        {/* Reply Input */}
                        <div className="flex gap-3 mt-2 items-center">
                          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full shadow-sm" />
                          <input 
                            type="text" 
                            className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Write a reply..."
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

export default Learning;
