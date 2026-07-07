import React, { useState } from "react";
import "./Help.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbHelp,
  TbMessageCircle,
  TbBook,
  TbVideo,
  TbChevronDown,
  TbSearch,
  TbBrandDiscord,
  TbMail,
  TbPhone,
  TbStar,
  TbCheck,
  TbArrowRight,
} from "react-icons/tb";

const faqs = [
  {
    id: 1,
    question: "How do I enroll in a new course?",
    answer:
      "Navigate to the Courses section from the sidebar, browse available courses, and click the 'Enroll' button on any course card. You'll be immediately added to the course and can start learning.",
  },
  {
    id: 2,
    question: "How can I track my assignment progress?",
    answer:
      "Visit the Assignments page to see all your pending, in-progress, and completed assignments. Each assignment shows a progress bar and due date to keep you on track.",
  },
  {
    id: 3,
    question: "Can I download course materials for offline use?",
    answer:
      "Yes! On any course page, click the download icon next to lessons or resources. Downloaded materials will be available in your Library section for offline access.",
  },
  {
    id: 4,
    question: "How do I contact my instructor?",
    answer:
      "You can message your instructor directly through the Messages section. Select your course conversation or start a new message with your instructor's name.",
  },
  {
    id: 5,
    question: "How do I change my account settings?",
    answer:
      "Click on your profile avatar in the top right header or navigate to Settings from the sidebar. You can update your personal information, notifications, and security settings there.",
  },
  {
    id: 6,
    question: "What happens if I miss a class session?",
    answer:
      "All live sessions are recorded and available in your course library within 24 hours. You can watch the recording at your own pace and still submit any activities.",
  },
];

const guides = [
  {
    icon: <TbBook size={22} />,
    title: "Getting Started Guide",
    desc: "Learn the basics of navigating your dashboard and setting up your profile.",
    color: "from-blue-500 to-indigo-600",
    badge: "Beginner",
  },
  {
    icon: <TbVideo size={22} />,
    title: "Video Tutorials",
    desc: "Step-by-step video walkthroughs for all major platform features.",
    color: "from-purple-500 to-pink-600",
    badge: "All Levels",
  },
  {
    icon: <TbMessageCircle size={22} />,
    title: "Community Forum",
    desc: "Join thousands of learners, ask questions, and share your knowledge.",
    color: "from-emerald-500 to-teal-600",
    badge: "Community",
  },
  {
    icon: <TbBrandDiscord size={22} />,
    title: "Live Chat Support",
    desc: "Connect with our support team in real time for urgent questions.",
    color: "from-orange-500 to-rose-600",
    badge: "24/7",
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="faq-item border border-gray-100 rounded-xl overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-800 text-sm pr-4">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-blue-500 flex-shrink-0"
        >
          <TbChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Help() {
  const [search, setSearchQuery] = useState("");
  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="help-page min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="help-hero relative rounded-2xl overflow-hidden p-8 mb-8 text-white"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #3B4A78 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TbHelp size={26} />
            </div>
            <span className="text-blue-200 font-medium text-sm uppercase tracking-wider">
              Help Center
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">How can we help you?</h1>
          <p className="text-blue-100 mb-6 text-sm leading-relaxed">
            Search our knowledge base or browse the guides below to find
            answers fast.
          </p>
          <div className="relative max-w-md">
            <TbSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-800 text-sm outline-none border-none shadow-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Guides */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {guides.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
              className="guide-card bg-white rounded-xl p-5 cursor-pointer border border-gray-100 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center text-white mb-4`}
              >
                {g.icon}
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {g.badge}
              </span>
              <h3 className="font-semibold text-gray-800 mt-2 mb-1 text-sm">
                {g.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                {g.desc}
              </p>
              <div className="flex items-center gap-1 text-blue-500 text-xs font-medium">
                Learn more <TbArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <span className="text-xs text-gray-500">
            {filtered.length} results
          </span>
        </div>
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((faq) => <FAQItem key={faq.id} faq={faq} />)
          ) : (
            <div className="text-center py-10 text-gray-400">
              <TbSearch size={36} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No results found for "{search}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <TbMail size={22} />,
            title: "Email Support",
            desc: "support@alrihla.com",
            sub: "Response within 24h",
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            icon: <TbPhone size={22} />,
            title: "Phone Support",
            desc: "+1 (800) 555-0123",
            sub: "Mon–Fri, 9am–6pm",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            icon: <TbStar size={22} />,
            title: "Priority Support",
            desc: "Premium members",
            sub: "24/7 dedicated line",
            color: "text-orange-500",
            bg: "bg-orange-50",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-4"
          >
            <div
              className={`w-10 h-10 ${item.bg} ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              {item.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {item.title}
              </p>
              <p className="text-sm text-gray-700 mt-0.5">{item.desc}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Help;
