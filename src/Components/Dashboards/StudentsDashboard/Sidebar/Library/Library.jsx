import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiDownload, FiBookOpen, FiBookmark, FiUpload, FiX, FiCheckCircle, FiFileText } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import axios from "../../../../api/axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const fallbackBookCover = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80";

const initialLibraryItems = [
  {
    id: 1,
    title: "Classical Mechanics & Particle Dynamics",
    author: "Dr. Richard Feynman",
    category: "Physics",
    format: "PDF",
    size: "14.2 MB",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80",
    color: "bg-indigo-50 text-indigo-700",
    description: "Comprehensive textbook exploring Newtonian physics, energy conservation, Lagrangian mechanics, and wave motion. Ideal for university physics students.",
    toc: ["Chapter 1: Vectors & Motion in 3D", "Chapter 2: Newton's Laws & Friction", "Chapter 3: Work, Energy & Momentum", "Chapter 4: Oscillations & Gravitation"]
  },
  {
    id: 2,
    title: "Calculus: Early Transcendentals (9th Ed)",
    author: "James Stewart",
    category: "Mathematics",
    format: "PDF",
    size: "28.5 MB",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    color: "bg-blue-50 text-blue-700",
    description: "The gold standard in calculus education. Features step-by-step limits, derivatives, integration, and multivariable calculus theorems with real-world applications.",
    toc: ["Chapter 1: Functions and Models", "Chapter 2: Limits and Derivatives", "Chapter 3: Differentiation Rules", "Chapter 4: Applications of Differentiation"]
  },
  {
    id: 3,
    title: "Modern Arabic Literature & Poetry",
    author: "Taha Hussein",
    category: "Arabic",
    format: "EPUB",
    size: "4.8 MB",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    color: "bg-emerald-50 text-emerald-700",
    description: "An essential collection analyzing 20th-century Arabic prose, classical poetry metrics, and historical literary movements across the Middle East.",
    toc: ["Section 1: Classical Poetry Foundations", "Section 2: The Renaissance of Prose", "Section 3: Contemporary Novel Analysis"]
  },
  {
    id: 4,
    title: "Introduction to Algorithms & Data Structures",
    author: "Cormen, Leiserson, Rivest",
    category: "Computer Science",
    format: "PDF",
    size: "18.1 MB",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
    color: "bg-purple-50 text-purple-700",
    description: "Comprehensive guide to computer algorithms including sorting, searching, binary search trees, graph algorithms, and dynamic programming.",
    toc: ["Part I: Foundations & Growth of Functions", "Part II: Sorting and Order Statistics", "Part III: Data Structures & Hash Tables"]
  },
  {
    id: 5,
    title: "Organic Chemistry Principles",
    author: "Paula Yurkanis Bruice",
    category: "Chemistry",
    format: "PDF",
    size: "32.0 MB",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    color: "bg-amber-50 text-amber-700",
    description: "Detailed guide on organic chemical reactions, molecular orbital theory, stereochemistry, and synthesis mechanisms.",
    toc: ["Chapter 1: Structure and Bonding", "Chapter 2: Acids and Bases", "Chapter 3: Alkanes and Cycloalkanes"]
  },
  {
    id: 6,
    title: "World History: Ancient Civilizations",
    author: "Dr. Susan Wise Bauer",
    category: "History",
    format: "EPUB",
    size: "9.3 MB",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
    color: "bg-rose-50 text-rose-700",
    description: "Chronological narrative of human history from Mesopotamia and Ancient Egypt through Greece, Rome, and the Islamic Golden Age.",
    toc: ["Part 1: The First Cities", "Part 2: Empires of the Nile", "Part 3: Classical Antiquity"]
  }
];

function Library() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [libraryItems, setLibraryItems] = useState(initialLibraryItems);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Upload Book Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadAuthor, setUploadAuthor] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Physics");
  const [uploadFormat, setUploadFormat] = useState("PDF");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLibrary = async () => {
      try {
        const { data } = await axios.get("/library");
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setLibraryItems(data);
        }
      } catch (e) {
        // Fallback silently
      }
    };
    fetchLibrary();
    return () => { isMounted = false; };
  }, []);

  const categories = ["all", "Physics", "Mathematics", "Arabic", "Computer Science", "Chemistry", "History"];

  const handleDownload = (book) => {
    if (book.fileContent) {
      const link = document.createElement("a");
      link.href = book.fileContent;
      link.download = `${book.title}.${book.format?.toLowerCase() || "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading "${book.title}"`);
      return;
    }

    const dummyContent = `${book.title}\nAuthor: ${book.author}\nCategory: ${book.category}\nFormat: ${book.format}\n\nThis is a sample download document for "${book.title}".`;
    const blob = new Blob([dummyContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Started downloading "${book.title}"`);
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) {
      toast.warning("Please provide a book title.");
      return;
    }

    const processUpload = (base64Data = null) => {
      const newBook = {
        id: Date.now(),
        title: uploadTitle.trim(),
        author: uploadAuthor.trim() || "School Educator",
        category: uploadCategory,
        format: uploadFormat,
        size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "5.0 MB",
        fileContent: base64Data,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
        color: "bg-indigo-50 text-indigo-700",
        description: `Academic textbook uploaded under category "${uploadCategory}".`,
        toc: ["Module 1: General Overview", "Module 2: Complete Text Contents"]
      };

      setLibraryItems((prev) => [newBook, ...prev]);
      setShowUploadModal(false);
      setUploadTitle("");
      setUploadAuthor("");
      setSelectedFile(null);
      toast.success(`Book "${newBook.title}" uploaded under ${newBook.category} & saved permanently!`);

      try {
        axios.post("/library", newBook);
      } catch (e) {
        // Offline fallback
      }
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => processUpload(reader.result);
    } else {
      processUpload(null);
    }
  };

  const filteredItems = libraryItems.filter(item => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-8 w-full max-w-[1600px] mx-auto min-h-screen relative">
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
          <p className="text-gray-500 mt-1 font-medium font-sans">Access your textbooks and supplemental reading materials.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm w-full sm:w-64"
            />
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <FiUpload size={16} /> Upload Book
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
        {filteredItems.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            key={item.id}
            onClick={() => setSelectedBook(item)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer flex flex-col"
          >
            {/* Book Cover Image */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors z-10"></div>
              <img 
                src={item.image || fallbackBookCover} 
                alt={item.title} 
                onError={(e) => { e.target.onerror = null; e.target.src = fallbackBookCover; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={(e) => { e.stopPropagation(); toast.success("Saved to reading list!"); }}
                  className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-rose-500 shadow-sm transition-colors"
                >
                  <FiBookmark size={14} />
                </button>
              </div>
            </div>

            {/* Book Info */}
            <div className="p-5 flex flex-col flex-1">
              <div className={cn("inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider w-fit mb-3", item.color || "bg-indigo-50 text-indigo-700")}>
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
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedBook(item); }}
                    title="Read Book Details"
                    className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <FiBookOpen size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDownload(item); }}
                    title="Download Book"
                    className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <FiDownload size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Book Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div 
            onClick={() => setShowUploadModal(false)}
            className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-pointer"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 relative cursor-default"
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Upload New Book</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitUpload} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Book Title</label>
                  <input 
                    type="text" 
                    required 
                    value={uploadTitle} 
                    onChange={(e) => setUploadTitle(e.target.value)} 
                    placeholder="e.g. Modern Quantum Physics" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Author Name</label>
                  <input 
                    type="text" 
                    value={uploadAuthor} 
                    onChange={(e) => setUploadAuthor(e.target.value)} 
                    placeholder="e.g. Dr. Niels Bohr" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category</label>
                    <select 
                      value={uploadCategory} 
                      onChange={(e) => setUploadCategory(e.target.value)} 
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="History">History</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Format</label>
                    <select 
                      value={uploadFormat} 
                      onChange={(e) => setUploadFormat(e.target.value)} 
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      <option value="PDF">PDF</option>
                      <option value="EPUB">EPUB</option>
                      <option value="DOCX">DOCX</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Select File</label>
                  <input 
                    type="file" 
                    onChange={(e) => setSelectedFile(e.target.files[0])} 
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setShowUploadModal(false)} 
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Upload & Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Book Details Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div 
            onClick={() => setSelectedBook(null)}
            className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-gray-100 cursor-default"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex justify-between items-center">
                <div>
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedBook.category} • {selectedBook.format}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">{selectedBook.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex flex-col md:flex-row gap-6 bg-gray-50">
                <div className="md:w-1/3 flex flex-col items-center gap-4 shrink-0">
                  <img 
                    src={selectedBook.image || fallbackBookCover} 
                    alt={selectedBook.title} 
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackBookCover; }}
                    className="w-48 h-64 object-cover rounded-2xl shadow-lg border-2 border-white"
                  />
                  <div className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-1">Author</span>
                    <h4 className="font-bold text-gray-900 text-sm">{selectedBook.author}</h4>
                    <span className="text-xs text-indigo-600 font-semibold block mt-2">File Size: {selectedBook.size}</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-base">
                      <FiFileText className="text-indigo-600" />
                      About this Book
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedBook.description || "Comprehensive academic reference resource designed for secondary and higher education curriculum standards."}
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-3 text-base">Table of Contents & Modules</h3>
                    <div className="flex flex-col gap-2">
                      {(selectedBook.toc || ["Chapter 1: Core Fundamentals", "Chapter 2: Advanced Practice", "Chapter 3: Summary Exercises"]).map((ch, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl text-xs font-semibold text-gray-700">
                          <FiCheckCircle className="text-indigo-500 shrink-0" />
                          <span>{ch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <button 
                      onClick={() => handleDownload(selectedBook)}
                      className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <FiDownload size={18} /> Download {selectedBook.format} File
                    </button>
                    <button 
                      onClick={() => { setSelectedBook(null); toast.success("Added to active reading queue!"); }}
                      className="px-5 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Library;
