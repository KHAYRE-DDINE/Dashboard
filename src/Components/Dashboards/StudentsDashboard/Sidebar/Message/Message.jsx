import React, { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FiSearch, FiSend, FiMic, FiPaperclip, FiPhone, FiVideo, FiMoreVertical, FiCheck, FiCheckCircle } from "react-icons/fi";

import avatar from "../../../../../images/avatar.svg";
import avatar9 from "../../../../../images/pngegg (9).svg";
import avatar22 from "../../../../../images/pngegg (22).svg";
import avatar19 from "../../../../../images/pngegg (19).svg";
import avatar16 from "../../../../../images/pngegg (16).svg";
import avatar14 from "../../../../../images/pngegg (14).svg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Message() {
  const [activeContactId, setActiveContactId] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const contacts = [
    { id: 1, name: "Khalid Al Walid", avatar: avatar9, lastMsg: "Good morning to you all!", time: "20m", unread: 2, online: true },
    { id: 2, name: "Amal Hamdalah", avatar: avatar22, lastMsg: "Yes, the document I sent you contains all.", time: "1h", unread: 0, online: true },
    { id: 3, name: "Jamal Monim", avatar: avatar19, lastMsg: "I'll mention this issue to Mr. Kamal.", time: "2h", unread: 0, online: false },
    { id: 4, name: "Felecia Rower", avatar: avatar16, lastMsg: "I hope you have a great day. Good morning!", time: "1d", unread: 0, online: false },
    { id: 5, name: "Calvin Moore", avatar: avatar14, lastMsg: "If it takes long you can mail inbox user.", time: "1d", unread: 0, online: true },
  ];

  const chatHistory = [
    { id: 1, sender: "me", text: "Man, that logarithms lesson was something else! I'm still trying to wrap my head around the whole concept.", time: "10:02 AM" },
    { id: 2, sender: "other", text: "Yeah, me too. I kind of get the basic idea of it being the inverse of exponents, but those properties and rules are killing me!", time: "10:05 AM" },
    { id: 3, sender: "me", text: "Right? Like, the product rule, quotient rule, and power rule. I keep mixing them up!", time: "10:06 AM" },
    { id: 4, sender: "other", text: "I know! And don't even get me started on the change of base formula. I'm pretty sure my brain is about to explode.", time: "10:10 AM" },
    { id: 5, sender: "me", text: "We should probably ask Mr. Kamal for some extra help during office hours tomorrow.", time: "10:12 AM" },
  ];

  const activeContact = contacts.find(c => c.id === activeContactId);

  return (
    <div className="flex h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto p-4 lg:p-6 gap-6">
      
      {/* Left Sidebar (Contacts) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-80 lg:w-96 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col hidden md:flex"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveContactId(contact.id)}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors",
                activeContactId === contact.id ? "bg-indigo-50" : "hover:bg-gray-50"
              )}
            >
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" />
                {contact.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{contact.name}</h3>
                  <span className={cn("text-xs font-medium", activeContactId === contact.id ? "text-indigo-600" : "text-gray-400")}>
                    {contact.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={cn("text-sm truncate", contact.unread > 0 ? "font-semibold text-gray-800" : "text-gray-500")}>
                    {contact.lastMsg}
                  </p>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 bg-indigo-600 text-white text-xs font-bold flex items-center justify-center rounded-full ml-2 shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative"
      >
        {/* Chat Header */}
        <div className="h-20 border-b border-gray-100 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md z-10 relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeContact.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200" />
              {activeContact.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{activeContact.name}</h2>
              <p className="text-xs font-medium text-emerald-500">{activeContact.online ? "Online" : "Offline"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiPhone size={18} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiVideo size={18} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiSearch size={18} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiMoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFF] flex flex-col gap-6">
          <div className="text-center my-2">
            <span className="bg-gray-200/50 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">Today</span>
          </div>

          {chatHistory.map((msg, idx) => {
            const isMe = msg.sender === "me";
            return (
              <div key={msg.id} className={cn("flex gap-3 max-w-[80%]", isMe ? "self-end flex-row-reverse" : "self-start")}>
                <img src={isMe ? avatar : activeContact.avatar} alt="avatar" className="w-8 h-8 rounded-full shadow-sm mt-auto" />
                <div className={cn("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
                  <div 
                    className={cn(
                      "px-5 py-3 shadow-sm relative",
                      isMe 
                        ? "bg-indigo-600 text-white rounded-2xl rounded-br-sm" 
                        : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm"
                    )}
                  >
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[11px] font-medium text-gray-400">{msg.time}</span>
                    {isMe && <FiCheckCircle size={12} className="text-indigo-500" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white shrink-0">
              <FiPaperclip size={20} />
            </button>
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message here..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800"
            />
            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white shrink-0">
              <FiMic size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition-colors shrink-0">
              <FiSend size={18} />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Message;
