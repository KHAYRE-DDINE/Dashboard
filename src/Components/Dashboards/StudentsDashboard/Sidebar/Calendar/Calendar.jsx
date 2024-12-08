import React, { useCallback, useContext, useMemo, useState } from "react";
import "./Calendar.css";
import { Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MOCK_EVENTS } from "./event";
import EnglishCalendar from "./EnglishCalendar";
import ArabicCalendar from "./ArabicCalendar";
import { LanguageContext } from "../../../../../App";

<<<<<<< HEAD

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

=======
function Calender() {
  const [view, setView] = useState(Views.DAY);
  const [date, setDate] = useState(moment("2022-10-10"));
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
  const events = MOCK_EVENTS.map((e) => {
    return {
      title: e.title,
      start: new Date(e.start),
      end: new Date(e.end),
      colorTitle: e.colorTitle,
      colorDescription: e.colorDescription,
    };
  });

<<<<<<< HEAD
  const [Events, setEvents] = useState([...events]);

  const addEvent = (newEvent) => {
    setEvents([...Events, newEvent]);
    setShowAddEventSide(false);
  };

=======
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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

  const language = useContext(LanguageContext);

  return (
    <div className="calender">
      {language === "english" ? (
        <EnglishCalendar
          onTodayClick={onTodayClick}
          handleSelectedDates={handleSelectedDates}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          setView={setView}
          dateText={dateText}
          date={date}
<<<<<<< HEAD
          events={Events}
          view={view}
          setEvent={setEvent}
          Event={Event}
          addEvent={addEvent}
          showAddEventSide={showAddEventSide}
          setShowAddEventSide={setShowAddEventSide}
=======
          events={events}
          view={view}
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
        />
      ) : (
        <ArabicCalendar
          onTodayClick={onTodayClick}
          handleSelectedDates={handleSelectedDates}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          setView={setView}
          dateText={dateText}
          events={events}
          view={view}
          date={date}
        />
      )}
    </div>
  );
}

export default Calender;
