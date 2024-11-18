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

const localizer = momentLocalizer(moment);

function ArabicCalendar({
  onTodayClick,
  dateText,
  handleSelectedDates,
  onNextClick,
  events,
  onPrevClick,
  view,
  setView,
  date,
}) {
  return (
    <div className="calender-box">
      <div className="title">
        <h2>Your tests</h2>
      </div>
      <div className="filter flex items-center">
        <div className="hidden md:flex search-input relative">
          <CiSearch />
          <input
            type="search"
            name="search"
            className=""
            placeholder="Search something..."
          />
        </div>{" "}
        <div className="select">
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
          <select name="teacher">
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
      </div>{" "}
      <div className="right-side-bar flex absolute right-0">
        <Flex gap={4}>
          <Flex>
            <Flex
              pl={4}
              pr={4}
              color="#ccc"
              alignItems={"center"}
              justifyContent="center"
            >
              <Text fontSize={"medium"}>{dateText}</Text>
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
            className="bg-grayD mx-2 w-[85px] rounded-md"
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
          <div className="select relative">
            <RiToolsFill className="absolute left-[10px]" />
            <select className="select pl-7">
              <option value="Views.DAY">options</option>
              <option value="Views.DAY">day</option>
              <option value="Views.WEEK">week</option>
              <option value="Views.MONTH">month</option>
            </select>
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
        onSelectEvent={(e) => handleSelectedDates(e)}
        toolbar={false}
        date={date}
        view={view}
        onView={setView}
      />
    </div>
  );
}

export default ArabicCalendar;
