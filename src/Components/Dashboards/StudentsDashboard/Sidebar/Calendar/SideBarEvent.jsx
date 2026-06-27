import { useState } from "react";
import { FiX, FiCalendar, FiClock, FiType, FiAlignLeft } from "react-icons/fi";
import moment from "moment";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function SideBarEvent({ addEvent, showAddEventSide, setShowAddEventSide }) {
  const [Event, setEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    colorTitle: "#4F46E5", // Default Indigo
    colorDescription: "#EEF2FF", // Default light indigo
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Event.title || !Event.date || !Event.startTime || !Event.endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      title: Event.title,
      start: moment(Event.date)
        .set({
          hour: parseInt(Event.startTime.split(":")[0]),
          minute: parseInt(Event.startTime.split(":")[1]),
        })
        .toDate(),
      end: moment(Event.date)
        .set({
          hour: parseInt(Event.endTime.split(":")[0]),
          minute: parseInt(Event.endTime.split(":")[1]),
        })
        .toDate(),
      color: Event.colorTitle,
      colorDescription: Event.description, // using this for description text
    };

    addEvent(newEvent);
    // Reset form after submit
    setEvent({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      colorTitle: "#4F46E5",
      colorDescription: "#EEF2FF",
      description: "",
    });
  };

  return (
    <>
      {/* Overlay Background */}
      <div 
        className={cn(
          "fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          showAddEventSide ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setShowAddEventSide(false)}
      />

      {/* Slide-out Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl border-l border-gray-100 z-50 flex flex-col transition-transform duration-300 ease-in-out",
          showAddEventSide ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-20 bg-gradient-to-r from-indigo-600 to-blue-500 px-6 flex justify-between items-center text-white shadow-sm">
          <div>
            <h2 className="text-xl font-bold">Add New Event</h2>
            <p className="text-indigo-100 text-xs font-medium mt-0.5">Schedule a class or meeting</p>
          </div>
          <button 
            onClick={() => setShowAddEventSide(false)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 custom-scrollbar">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                <FiType className="text-indigo-500" /> Event Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Mathematics Midterm"
                value={Event.title}
                onChange={(e) => setEvent({ ...Event, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                <FiAlignLeft className="text-indigo-500" /> Description
              </label>
              <textarea
                id="description"
                placeholder="Brief description of the event..."
                value={Event.description}
                onChange={(e) => setEvent({ ...Event, description: e.target.value })}
                rows="3"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                <FiCalendar className="text-indigo-500" /> Date
              </label>
              <input
                type="date"
                id="date"
                value={Event.date ? moment(Event.date).format("YYYY-MM-DD") : ""}
                onChange={(e) => setEvent({ ...Event, date: new Date(e.target.value) })}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm text-gray-700"
                required
              />
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start" className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                  <FiClock className="text-indigo-500" /> Start Time
                </label>
                <input
                  type="time"
                  id="start"
                  value={Event.startTime}
                  onChange={(e) => setEvent({ ...Event, startTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm text-gray-700"
                  required
                />
              </div>
              <div>
                <label htmlFor="end" className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                  <FiClock className="text-indigo-500" /> End Time
                </label>
                <input
                  type="time"
                  id="end"
                  value={Event.endTime}
                  onChange={(e) => setEvent({ ...Event, endTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
              <div>
                <label htmlFor="color-title" className="block text-sm font-bold text-gray-700 mb-1.5">
                  Event Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="color-title"
                    value={Event.colorTitle}
                    onChange={(e) => setEvent({ ...Event, colorTitle: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-xs font-mono text-gray-500 uppercase">{Event.colorTitle}</span>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-100 flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => setShowAddEventSide(false)}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Add Event
          </button>
        </div>

      </div>
    </>
  );
}

export default SideBarEvent;
