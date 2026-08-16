import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FiSearch, FiSend, FiMic, FiPaperclip, FiPhone, FiVideo, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";

import defaultAvatar from "../../../../../images/avatar.svg";
import avatar9 from "../../../../../images/pngegg (9).svg";
import avatar22 from "../../../../../images/pngegg (22).svg";
import avatar19 from "../../../../../images/pngegg (19).svg";
import avatar16 from "../../../../../images/pngegg (16).svg";
import avatar14 from "../../../../../images/pngegg (14).svg";
import useAuthContext from "../../../../authentication/AuthContext";
import axios from "../../../../api/axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Message() {
  const { currentUser } = useAuthContext();
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const userAvatar = currentUser?.avatar || defaultAvatar;

  const [activeContactId, setActiveContactId] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [contacts, setContacts] = useState([
    { id: 1, name: "Khalid Al Walid", avatar: avatar9, lastMsg: "Good morning to you all!", time: "20m", unread: 2, online: true },
    { id: 2, name: "Amal Hamdalah", avatar: avatar22, lastMsg: "Yes, the document I sent you contains all.", time: "1h", unread: 0, online: true },
    { id: 3, name: "Jamal Monim", avatar: avatar19, lastMsg: "I'll mention this issue to Mr. Kamal.", time: "2h", unread: 0, online: false },
    { id: 4, name: "Felecia Rower", avatar: avatar16, lastMsg: "I hope you have a great day. Good morning!", time: "1d", unread: 0, online: false },
    { id: 5, name: "Calvin Moore", avatar: avatar14, lastMsg: "If it takes long you can mail inbox user.", time: "1d", unread: 0, online: true },
  ]);

  const [chats, setChats] = useState({
    1: [
      { id: 101, sender: "me", text: "Man, that logarithms lesson was something else! I'm still trying to wrap my head around the whole concept.", time: "10:02 AM" },
      { id: 102, sender: "other", text: "Yeah, me too. I kind of get the basic idea of it being the inverse of exponents, but those properties and rules are killing me!", time: "10:05 AM" },
      { id: 103, sender: "me", text: "Right? Like, the product rule, quotient rule, and power rule. I keep mixing them up!", time: "10:06 AM" },
      { id: 104, sender: "other", text: "I know! And don't even get me started on the change of base formula.", time: "10:10 AM" },
      { id: 105, sender: "me", text: "We should probably ask Mr. Kamal for some extra help during office hours tomorrow.", time: "10:12 AM" },
    ],
    2: [
      { id: 201, sender: "other", text: "Yes, the document I sent you contains all.", time: "11:30 AM" }
    ],
    3: [
      { id: 301, sender: "other", text: "I'll mention this issue to Mr. Kamal.", time: "09:15 AM" }
    ],
    4: [
      { id: 401, sender: "other", text: "I hope you have a great day. Good morning!", time: "Yesterday" }
    ],
    5: [
      { id: 501, sender: "other", text: "If it takes long you can mail inbox user.", time: "Yesterday" }
    ]
  });

  useEffect(() => {
    let isMounted = true;
    const fetchApiMessages = async () => {
      try {
        const { data } = await axios.get("/messages");
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Group API messages by contactId
          setChats(prev => {
            const updated = { ...prev };
            data.forEach(m => {
              const cId = m.contactId || 1;
              if (!updated[cId]) updated[cId] = [];
              if (!updated[cId].some(msg => msg.id === m.id)) {
                updated[cId].push({
                  id: m.id,
                  sender: m.sender || "me",
                  text: m.lastMessage || m.text || "",
                  time: m.time || "Just now"
                });
              }
            });
            return updated;
          });
        }
      } catch (err) {
        // Fallback silently
      }
    };
    fetchApiMessages();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeContactId]);

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];
  const activeChatHistory = chats[activeContactId] || [];

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!messageInput.trim()) return;

    const text = messageInput.trim();
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMsg]
    }));

    setContacts((prev) =>
      prev.map((c) => (c.id === activeContactId ? { ...c, lastMsg: text, time: "Just now" } : c))
    );

    setMessageInput("");

    try {
      await axios.post("/messages", {
        id: newMsg.id,
        contactId: activeContactId,
        sender: "me",
        lastMessage: text,
        time: newMsg.time
      });
    } catch (err) {
      // Offline fallback
    }
  };

  const handleAttachment = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const attachmentMsg = {
      id: Date.now(),
      sender: "me",
      text: `📎 Attachment: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), attachmentMsg]
    }));

    setContacts((prev) =>
      prev.map((c) => (c.id === activeContactId ? { ...c, lastMsg: `Sent file: ${file.name}`, time: "Just now" } : c))
    );

    toast.success(`File "${file.name}" attached to chat & saved permanently!`);

    try {
      await axios.post("/messages", {
        id: attachmentMsg.id,
        contactId: activeContactId,
        sender: "me",
        lastMessage: `Sent file: ${file.name}`,
        time: attachmentMsg.time
      });
    } catch (err) {
      // Offline fallback
    }
  };

  const handleDeleteSingleMessage = async (msgId) => {
    setChats(prev => ({
      ...prev,
      [activeContactId]: (prev[activeContactId] || []).filter(m => m.id !== msgId)
    }));
    toast.success("Message deleted.");

    try {
      await axios.delete(`/messages/${msgId}`);
    } catch (err) {
      // Offline fallback
    }
  };

  const handleDeleteEntireChat = () => {
    setChats(prev => ({
      ...prev,
      [activeContactId]: []
    }));
    setContacts(prev => prev.map(c => c.id === activeContactId ? { ...c, lastMsg: "No messages yet" } : c));
    toast.success(`Conversation with ${activeContact.name} cleared.`);
  };

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-[calc(100vh-80px)] w-full max-w-[1600px] mx-auto p-4 lg:p-6 gap-6">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleAttachment} 
        className="hidden" 
      />

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {filteredContacts.map((contact) => (
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
              <img src={activeContact.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
              {activeContact.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{activeContact.name}</h2>
              <p className="text-xs font-medium text-emerald-500">{activeContact.online ? "Online" : "Offline"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button title="Audio Call" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiPhone size={18} />
            </button>
            <button title="Video Call" className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <FiVideo size={18} />
            </button>
            <button 
              onClick={handleDeleteEntireChat}
              title="Delete Entire Chat History" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFF] flex flex-col gap-6">
          <div className="text-center my-2">
            <span className="bg-gray-200/50 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">Today</span>
          </div>

          {activeChatHistory.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <div key={msg.id} className={cn("flex gap-3 max-w-[80%] group relative", isMe ? "self-end flex-row-reverse" : "self-start")}>
                <img src={isMe ? userAvatar : activeContact.avatar} alt="avatar" className="w-8 h-8 rounded-full shadow-sm mt-auto object-cover" />
                <div className={cn("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
                  <div 
                    className={cn(
                      "px-5 py-3 shadow-sm relative group/bubble",
                      isMe 
                        ? "bg-indigo-600 text-white rounded-2xl rounded-br-sm" 
                        : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm"
                    )}
                  >
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                    <button 
                      onClick={() => handleDeleteSingleMessage(msg.id)}
                      title="Delete message"
                      className="absolute top-2 right-2 opacity-0 group-hover/bubble:opacity-100 text-xs p-1 rounded-md bg-black/30 text-white hover:bg-rose-600 transition-all"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[11px] font-medium text-gray-400">{msg.time}</span>
                    {isMe && <FiCheckCircle size={12} className="text-indigo-500" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white shrink-0"
            >
              <FiPaperclip size={20} />
            </button>
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message here..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-800"
            />
            <button 
              type="button"
              onClick={() => toast.info("Voice message recording starting...")}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors rounded-xl hover:bg-white shrink-0"
            >
              <FiMic size={20} />
            </button>
            <button 
              type="submit"
              className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition-colors shrink-0"
            >
              <FiSend size={18} />
            </button>
          </div>
        </form>

      </motion.div>
    </div>
  );
}

export default Message;
