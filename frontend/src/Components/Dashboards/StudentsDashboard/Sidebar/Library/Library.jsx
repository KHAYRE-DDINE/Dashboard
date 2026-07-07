import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiDownload, FiBookOpen, FiBookmark, FiMoreVertical } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Library() {
  const [activeTab, setActiveTab] = useState("all");

  const libraryItems = [
    {
      id: 1,
      title: "Advanced Physics Vol. 2",
      author: "Dr. Richard Feynman",
      category: "Physics",
      format: "PDF",
      size: "15 MB",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
      color: "bg-indigo-50 text-indigo-700"
    },
    {
      id: 2,
      title: "Mastering Algebra",
      author: "Sarah Johnson",
      category: "Mathematics",
      format: "EPUB",
      size: "4.2 MB",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop",
      color: "bg-blue-50 text-blue-700"
    },
    {
      id: 3,
      title: "Arabic Literature: Golden Age",
      author: "Taha Hussein",
      category: "Arabic",
      format: "PDF",
      size: "8.5 MB",
      image: "https://images.unsplash.com/photo-1585806626601-576a783daec0?q=80&w=600&auto=format&fit=crop",
      color: "bg-emerald-50 text-emerald-700"
    },
    {
      id: 4,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "Computer Science",
      format: "PDF",
      size: "22 MB",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      color: "bg-amber-50 text-amber-700"
    },
    {
      id: 5,
      title: "Modern Chemistry Principles",
      author: "Linus Pauling",
      category: "Chemistry",
      format: "PDF",
      size: "12 MB",
      image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=600&auto=format&fit=crop",
      color: "bg-rose-50 text-rose-700"
    },
    {
      id: 6,
      title: "World History: 20th Century",
      author: "Eric Hobsbawm",
      category: "History",
      format: "EPUB",
      size: "6.8 MB",
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop",
      color: "bg-purple-50 text-purple-700"
    }
  ];

  const categories = ["all", "Physics", "Mathematics", "Arabic", "Computer Science", "History"];

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-8 w-full max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900"
          >
            Digital Library
          </motion.h1>
          <p className="text-gray-500 mt-1 font-medium">Access your textbooks and supplemental reading materials.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search books..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-full sm:w-64"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors shadow-sm whitespace-nowrap",
              activeTab === tab ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {libraryItems.filter(item => activeTab === 'all' || item.category === activeTab).map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer flex flex-col"
          >
            {/* Book Cover Image */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors z-10"></div>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 z-20">
                <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-rose-500 shadow-sm transition-colors">
                  <FiBookmark size={14} />
                </button>
              </div>
            </div>

            {/* Book Info */}
            <div className="p-5 flex flex-col flex-1">
              <div className={cn("inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider w-fit mb-3", item.color)}>
                {item.category}
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 flex-1">{item.author}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900">{item.format}</span>
                  <span className="text-[11px] font-medium text-gray-400">{item.size}</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors">
                    <FiBookOpen size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                    <FiDownload size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}

export default Library;
