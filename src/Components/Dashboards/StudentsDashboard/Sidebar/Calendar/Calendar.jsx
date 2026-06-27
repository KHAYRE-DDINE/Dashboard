import React, { useCallback, useMemo, useState } from "react";
import { Views, Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { motion } from "framer-motion";
import { FiSearch, FiChevronLeft, FiChevronRight, FiPlus, FiFilter } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"; // We will inject modern calendar styles here

import { MOCK_EVENTS } from "./event";
import SideBarEvent from "./SideBarEvent";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const localizer = momentLocalizer(moment);

function EventT({ event }) {
  return (
    <div className="p-1 text-xs font-medium">
      <strong className="block truncate">{event.title}</strong>
      {event.description && <span className="block truncate opacity-80">{event.description}</span>}
    </div>
  );
}

function Calender() {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(moment("2022-10-10").toDate());
  const [showAddEventSide, setShowAddEventSide] = useState(false);

  const initialEvents = MOCK_EVENTS.map((e) => ({
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
    color: e.colorTitle || "#4F46E5", // Default to indigo if no color
    description: e.colorDescription,
  }));

  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowAddEventSide(false);
  };

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date).startOf("week");
      const to = moment(date).endOf("week");
      return `${from.format("MMM DD")} - ${to.format("MMM DD, YYYY")}`;
    }
    if (view === Views.MONTH) return moment(date).format("MMMM YYYY");
  }, [view, date]);

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) setDate(moment(date).subtract(1, "d").toDate());
    else if (view === Views.WEEK) setDate(moment(date).subtract(1, "w").toDate());
    else setDate(moment(date).subtract(1, "M").toDate());
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) setDate(moment(date).add(1, "d").toDate());
    else if (view === Views.WEEK) setDate(moment(date).add(1, "w").toDate());
    else setDate(moment(date).add(1, "M").toDate());
  }, [view, date]);

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, []);

  const handleSelectedDates = (info) => {
    const title = prompt("What's the name of the new event?");
    if (title) {
      const newEvent = {
        title,
        start: new Date(info.start),
        end: new Date(info.end),
        color: "#10B981", // Emerald for new manual events
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 w-full max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
      
      <SideBarEvent
        addEvent={addEvent}
        showAddEventSide={showAddEventSide}
        setShowAddEventSide={setShowAddEventSide}
      />

      {/* Header / Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        
        {/* Left Side: Title & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900"
          >
            Calendar
          </motion.h1>

          <div className="flex items-center gap-2">
            <button onClick={onTodayClick} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors">
              Today
            </button>
            <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button onClick={onPrevClick} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors shadow-sm-hover">
                <FiChevronLeft size={18} />
              </button>
              <span className="min-w-[140px] text-center text-sm font-bold text-gray-800">
                {dateText}
              </span>
              <button onClick={onNextClick} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors shadow-sm-hover">
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Search, Views, Add Event */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all"
            />
          </div>

          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
            {['month', 'week', 'day'].map((v) => (
              <button
                key={v}
                onClick={() => setView(Views[v.toUpperCase()])}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors",
                  view === Views[v.toUpperCase()] ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddEventSide(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <FiPlus size={16} /> <span className="hidden sm:inline">Add Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 min-h-[600px] bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="modern-calendar"
          eventPropGetter={(event) => {
            return {
              style: {
                backgroundColor: event.color || "#4F46E5",
                borderRadius: "6px",
                border: "none",
                opacity: 0.9,
                color: "white",
                display: "block",
              },
            };
          }}
          components={{ event: EventT }}
          selectable
          onSelectSlot={handleSelectedDates}
          toolbar={false} // We built our own custom toolbar above!
          date={date}
          view={view}
          onNavigate={(newDate) => setDate(newDate)}
          onView={(newView) => setView(newView)}
        />
      </motion.div>
    </div>
  );
}

export default Calender;
