import React, { useCallback, useContext, useMemo, useState } from "react";
import "./Calendar.css";
import { Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MOCK_EVENTS } from "./event";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { RiToolsFill } from "react-icons/ri";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Button } from "@headlessui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import SideBarEvent from "./SideBarEvent";
import { motion } from "framer-motion";

function EventT({ event }) {
  return (
    <div>
      <strong>{event.title}</strong>
      <div>{event.description}</div>
    </div>
  );
}

function Calender() {
  const [view, setView] = useState(Views.DAY);
  const [date, setDate] = useState(moment("2022-10-10"));
  const [showAddEventSide, setShowAddEventSide] = useState(false);
  const [Event, setEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    colorTitle: "",
    colorDescription: "",
  });
  const localizer = momentLocalizer(moment);

  const events = MOCK_EVENTS.map((e) => {
    return {
      title: e.title,
      start: new Date(e.start),
      end: new Date(e.end),
      colorTitle: e.colorTitle,
      colorDescription: e.colorDescription,
    };
  });

  const [Events, setEvents] = useState([...events]);

  const addEvent = (newEvent) => {
    setEvents([...Events, newEvent]);
    setShowAddEventSide(false);
  };

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`;
    }
    if (view === Views.MONTH) {
      return moment(date).format("MMMM YYYY");
    }
  }, [view, date]);

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).subtract(1, "w").toDate());
    } else {
      setDate(moment(date).subtract(1, "M").toDate());
    }
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).add(1, "w").toDate());
    } else {
      setDate(moment(date).add(1, "M").toDate());
    }
  }, [view, date]);

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, []);

  const handleSelectedDates = (info) => {
    alert("selected " + info.startStr + " to " + info.endStr);
    const title = prompt("What's the name of the title");
    console.log(info);
    if (title != null) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr,
      };
      const data = [...this.state.events, newEvent];
      this.setState({ events: data });
      console.log("here", data);
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="calender">
      <div className="calender-box">
        <div className="title">
          <motion.h2
            initial={{ left: "30%", rotateY: 0 }}
            animate={{ left: "0%", rotateY: "360deg" }}
            transition={{ duration: 2, delay: 0.2 }}
            className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose"
          >
            Your tests
          </motion.h2>
        </div>
        <SideBarEvent
          addEvent={addEvent}
          showAddEventSide={showAddEventSide}
          setShowAddEventSide={setShowAddEventSide}
        />
        <div className="toolbar flex flex-wrap justify-between items-center gap-4">
          <div className="filter flex items-center">
            <div className="hidden md:flex search-input relative">
              <CiSearch />
              <input
                type="search"
                name="search"
                className=""
                placeholder="Search something..."
              />
            </div>
            <div className="select ">
              {" "}
              <select name="type">
                <option value="type">type</option>
                <option value="math">math</option>
                <option value="math">physic</option>
                <option value="math">arabic</option>
              </select>
              <HiChevronDown />
            </div>
            <div className="select">
              {" "}
              <select name="teacher ">
                <option value="teacher">teacher</option>
                <option value="math">math</option>
                <option value="math">physic</option>
                <option value="math">arabic</option>
              </select>
              <HiChevronDown />
            </div>
            <div className="select">
              <select name="test">
                <option value="test">test</option>
                <option value="math">math</option>
                <option value="math">physic</option>
                <option value="math">arabic</option>
              </select>
              <HiChevronDown />
            </div>
          </div>
          <div className="right-side-bar flex ">
            <Flex gap={4}>
              <Flex>
                <Flex
                  pl={4}
                  pr={4}
                  color="#374151"
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <Text fontSize={"12px"}>{dateText}</Text>
                </Flex>
                <IconButton
                  aria-label="Previous"
                  icon={<HiChevronLeft />}
                  onClick={onPrevClick}
                />
                <IconButton
                  aria-label="Next"
                  icon={<HiChevronRight />}
                  onClick={onNextClick}
                />
              </Flex>
              <Button
                className="bg-[#F3F4F6] mx-2 w-[85px] rounded-md text-[#4B5563]"
                onClick={onTodayClick}
              >
                Today
              </Button>
            </Flex>
            <div className="choose">
              <div className="d-w-m">
                <select
                  className="select"
                  onChange={(e) => setView(e.target.value)}
                >
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </select>
                <HiChevronDown />
              </div>
              <div
                onClick={() => setShowAddEventSide(true)}
                className="btn relative rounded-md bg-[#F3F4F6] w-[85px] h-[40px] flex items-center justify-center"
              >
                <button className="text-[#1a1a1aad] capitalize text-[12px] font-[inter] font-[500]">
                  add event
                </button>
              </div>
            </div>
          </div>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "600px" }}
          eventPropGetter={(event) => {
            return {
              style: {
                backgroundColor: event.color,
              },
            };
          }}
          components={{ event: EventT }}
          onSelectEvent={(e) => handleSelectedDates(e)}
          toolbar={false}
          date={date}
          view={view}
          onView={setView}
        />
      </div>
    </div>
  );
}

export default Calender;
