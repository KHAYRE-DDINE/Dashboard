import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiExternalLink, FiFileText, FiVideo, FiLink } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Resources() {
  const [resources] = useState([
    {
      id: 1,
      type: "pdf",
      title: "Algebraic Formulas Cheat Sheet",
      subject: "Mathematics",
      description: "A comprehensive guide to all the essential algebraic formulas you'll need for this unit.",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=600&auto=format&fit=crop",
      size: "2.4 MB",
      date: "Aug 15, 2026",
    },
    {
      id: 2,
      type: "video",
      title: "Introduction to Kinematics",
      subject: "Physics",
      description: "A recorded lecture explaining the fundamentals of motion, velocity, and acceleration.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
      size: "145 MB",
      date: "Aug 16, 2026",
    },
    {
      id: 3,
      type: "link",
      title: "Arabic Calligraphy History",
      subject: "Arabic Literature",
      description: "An external interactive article detailing the evolution of Arabic scripts over centuries.",
      image: "https://images.unsplash.com/photo-1585806626601-576a783daec0?q=80&w=600&auto=format&fit=crop",
      size: "External Link",
      date: "Aug 18, 2026",
    },
    {
      id: 4,
      type: "pdf",
      title: "JavaScript Basics Handout",
      subject: "Programming",
      description: "Printable handout covering variables, loops, and basic DOM manipulation.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
      size: "1.8 MB",
      date: "Aug 20, 2026",
    },
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case "pdf": return <FiFileText className="text-rose-500" />;
      case "video": return <FiVideo className="text-blue-500" />;
      case "link": return <FiLink className="text-emerald-500" />;
      default: return <FiFileText className="text-gray-500" />;
    }
  };

  return (
    <div className="py-6 w-full max-w-5xl">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Shared Resources</h2>
          <p className="text-gray-500 text-sm mt-1">Study materials provided by your teachers for this assignment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={res.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
              <img 
                src={res.image} 
                alt={res.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm font-semibold text-xs text-gray-800">
                {getTypeIcon(res.type)}
                <span className="uppercase tracking-wider">{res.type}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">{res.subject}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{res.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                {res.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-900">{res.size}</span>
                  <span className="text-[11px] font-medium text-gray-400">Added {res.date}</span>
                </div>
                
                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-white transition-colors shadow-sm group-hover:scale-110">
                  {res.type === 'link' ? <FiExternalLink size={18} /> : <FiDownload size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
