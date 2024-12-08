import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { RiToolsFill } from "react-icons/ri";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Button } from "@headlessui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
<<<<<<< HEAD
import SideBarEvent from "./SideBarEvent";

const localizer = momentLocalizer(moment);

function Event({ event }) {
  return (
    <div>
      <strong>{event.title}</strong>
      <div>{event.description}</div>
    </div>
  );
}

=======

const localizer = momentLocalizer(moment);

>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
function EnglishCalendar({
  onTodayClick,
  dateText,
  handleSelectedDates,
  onNextClick,
  events,
  onPrevClick,
  view,
  setView,
  date,
<<<<<<< HEAD
  addEvent,
  showAddEventSide,
  setShowAddEventSide,
=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
}) {
  return (
    <div className="calender-box">
      <div className="title">
        <h2>Your tests</h2>
      </div>
<<<<<<< HEAD
      <SideBarEvent
        addEvent={addEvent}
        showAddEventSide={showAddEventSide}
        setShowAddEventSide={setShowAddEventSide}
      />
=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
          </div>
=======
          </div>{" "}
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
        </div>
=======
        </div>{" "}
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
            <div
              onClick={() => setShowAddEventSide(true)}
              className="btn relative rounded-md bg-[#F3F4F6] w-[85px] h-[40px] flex items-center justify-center"
            >
              <button className="text-[#1a1a1aad] capitalize text-[12px] font-[inter] font-[500]">
                add event
              </button>
=======
            <div className="select relative">
              <RiToolsFill className="absolute left-[10px]" />
              <select className="select pl-7">
                <option value="Views.DAY">options</option>
                <option value="Views.DAY">day</option>
                <option value="Views.WEEK">week</option>
                <option value="Views.MONTH">month</option>
              </select>
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
        components={{ event: Event }}
=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
        onSelectEvent={(e) => handleSelectedDates(e)}
        toolbar={false}
        date={date}
        view={view}
        onView={setView}
      />
    </div>
  );
}

export default EnglishCalendar;
