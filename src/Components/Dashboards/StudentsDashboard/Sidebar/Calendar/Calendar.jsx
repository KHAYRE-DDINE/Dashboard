import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Views, Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { motion } from "framer-motion";
import { FiSearch, FiChevronLeft, FiChevronRight, FiPlus, FiFilter } from "react-icons/fi";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"; // We will inject modern calendar styles here

import { MOCK_EVENTS } from "./event";
import SideBarEvent from "./SideBarEvent";
import axios from "../../../../api/axios";

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
  const userId = useMemo(() => localStorage.getItem("user"), []);
  const [view, setView] = useState(Views.MONTH);
  const [showAddEventSide, setShowAddEventSide] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const defaultEvents = useMemo(() => MOCK_EVENTS.map((e) => ({
    id: e.id || crypto.randomUUID(),
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
    color: e.colorTitle || "#4F46E5", // Default to indigo if no color
    description: e.description || "",
  })), []);

  const [date, setDate] = useState(() => {
    const fallback = moment("2026-06-10");
    const hasJuneEvents = defaultEvents.some((event) =>
      moment(event.start).isSame(fallback, "month")
    );

    if (hasJuneEvents) {
      return fallback.toDate();
    }

    return defaultEvents[0]?.start ? moment(defaultEvents[0].start).toDate() : fallback.toDate();
  });

  const [events, setEvents] = useState(defaultEvents);

  const monthHasEvents = useCallback((candidateDate, items) => {
    return items.some((event) => moment(event.start).isSame(candidateDate, "month"));
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const startOfWeek = moment(date).startOf("week");
    const endOfWeek = moment(date).endOf("week");
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");

    return events.filter((event) => {
      const eventMoment = moment(event.start);
      const isIn2026 = eventMoment.year() === 2026;
      if (!isIn2026) return false;

      const matchesSearch =
        !normalizedSearch ||
        event.title?.toLowerCase().includes(normalizedSearch) ||
        event.description?.toLowerCase().includes(normalizedSearch);

      if (!matchesSearch) return false;

      if (activeFilter === "today") {
        return eventMoment.isSame(moment(date), "day");
      }

      if (activeFilter === "week") {
        return eventMoment.isBetween(startOfWeek, endOfWeek, undefined, "[]");
      }

      if (activeFilter === "month") {
        return eventMoment.isBetween(startOfMonth, endOfMonth, undefined, "[]");
      }

      if (activeFilter === "with-description") {
        return Boolean(event.description?.trim());
      }

      return true;
    });
  }, [events, searchQuery, activeFilter, date]);

  const visibleRangeEvents = useMemo(() => {
    if (view === Views.DAY) {
      return filteredEvents.filter((event) => moment(event.start).isSame(moment(date), "day"));
    }

    if (view === Views.WEEK) {
      const startOfWeek = moment(date).startOf("week");
      const endOfWeek = moment(date).endOf("week");
      return filteredEvents.filter((event) =>
        moment(event.start).isBetween(startOfWeek, endOfWeek, undefined, "[]")
      );
    }

    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    return filteredEvents.filter((event) =>
      moment(event.start).isBetween(startOfMonth, endOfMonth, undefined, "[]")
    );
  }, [filteredEvents, view, date]);

  const jumpToNextEvent = useCallback(() => {
    if (!filteredEvents.length) {
      return;
    }

    const sorted = [...filteredEvents].sort(
      (left, right) => new Date(left.start).getTime() - new Date(right.start).getTime()
    );
    setDate(moment(sorted[0].start).toDate());
  }, [filteredEvents]);

  const serializeEvents = useCallback((items) => {
    return items.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
      color: event.color || "#4F46E5",
      description: event.description || "",
    }));
  }, []);

  const saveEvents = useCallback(async (nextEvents) => {
    setEvents(nextEvents);

    if (!userId) {
      return;
    }

    try {
      const { data: user } = await axios.get(`/users/${userId}`);
      const preferences = user?.preferences || {};

      await axios.patch(`/users/${userId}`, {
        preferences: {
          ...preferences,
          calendarEvents: serializeEvents(nextEvents),
        },
      });
    } catch (error) {
      toast.error("Could not save calendar changes.");
    }
  }, [serializeEvents, userId]);

  useEffect(() => {
    let isMounted = true;

    const loadSavedEvents = async () => {
      if (!userId) {
        return;
      }

      try {
        const { data: user } = await axios.get(`/users/${userId}`);
        const storedEvents = user?.preferences?.calendarEvents;

        if (!isMounted || !Array.isArray(storedEvents) || !storedEvents.length) {
          return;
        }

        const normalized = storedEvents
          .map((event) => ({
            id: event.id || crypto.randomUUID(),
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            color: event.color || "#4F46E5",
            description: event.description || "",
          }))
          .filter((event) => {
            const startMoment = moment(event.start);
            const endMoment = moment(event.end);
            return (
              startMoment.isValid() &&
              endMoment.isValid() &&
              startMoment.year() === 2026 &&
              endMoment.year() === 2026
            );
          });

        if (normalized.length) {
          setEvents(normalized);

          setDate((prevDate) => {
            if (monthHasEvents(prevDate, normalized)) {
              return prevDate;
            }
            return moment(normalized[0].start).toDate();
          });

          return;
        }

        setEvents(defaultEvents);
        setDate((prevDate) => {
          if (monthHasEvents(prevDate, defaultEvents)) {
            return prevDate;
          }
          return defaultEvents[0]?.start
            ? moment(defaultEvents[0].start).toDate()
            : prevDate;
        });
      } catch (error) {
        toast.error("Could not load saved calendar events.");
      }
    };

    loadSavedEvents();

    return () => {
      isMounted = false;
    };
  }, [defaultEvents, monthHasEvents, userId]);

  const addEvent = async (newEvent) => {
    const startYear = moment(newEvent.start).year();
    const endYear = moment(newEvent.end).year();

    if (startYear !== 2026 || endYear !== 2026) {
      toast.warning("Only 2026 events are allowed in this calendar.");
      return;
    }

    const eventWithId = {
      ...newEvent,
      id: newEvent.id || crypto.randomUUID(),
    };

    await saveEvents([...events, eventWithId]);
    setShowAddEventSide(false);
  };

  const removeEvent = async (eventId) => {
    await saveEvents(events.filter((event) => event.id !== eventId));
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

  const handleSelectedDates = async (info) => {
    if (moment(info.start).year() !== 2026 || moment(info.end).year() !== 2026) {
      toast.warning("Please select a slot inside year 2026.");
      return;
    }

    const title = prompt("What's the name of the new event?");
    if (title) {
      const newEvent = {
        id: crypto.randomUUID(),
        title,
        start: new Date(info.start),
        end: new Date(info.end),
        color: "#10B981", // Emerald for new manual events
        description: "",
      };
      await saveEvents([...events, newEvent]);
    }
  };

  const onSelectEvent = async (event) => {
    const shouldDelete = window.confirm(`Delete \"${event.title}\" from your calendar?`);
    if (!shouldDelete) {
      return;
    }

    await removeEvent(event.id);
    toast.success("Event removed.");
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all"
            />
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <FiFilter className="text-gray-500" size={16} />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="today">Selected Day</option>
              <option value="week">Selected Week</option>
              <option value="month">Selected Month</option>
              <option value="with-description">With Description</option>
            </select>
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
          events={filteredEvents}
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
          onSelectEvent={onSelectEvent}
          toolbar={false} // We built our own custom toolbar above!
          date={date}
          view={view}
          onNavigate={(newDate) => setDate(newDate)}
          onView={(newView) => setView(newView)}
        />

        <div className="pt-5 border-t border-gray-100 mt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Events in this {view}
          </h3>

          {visibleRangeEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {visibleRangeEvents
                .slice()
                .sort((left, right) => new Date(left.start).getTime() - new Date(right.start).getTime())
                .map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                  >
                    <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {moment(event.start).format("ddd, MMM D, YYYY - HH:mm")} to {moment(event.end).format("HH:mm")}
                    </p>
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{event.description}</p>
                    )}
                  </div>
                ))}
            </div>
          )}

          {visibleRangeEvents.length === 0 && filteredEvents.length > 0 && (
            <div className="text-sm text-amber-700 font-medium">
              No events in this {view}.
              <button
                type="button"
                onClick={jumpToNextEvent}
                className="ml-1 text-indigo-600 hover:underline"
              >
                Jump to next event month
              </button>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-sm text-gray-500">
              No 2026 events match your current search/filter.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Calender;
