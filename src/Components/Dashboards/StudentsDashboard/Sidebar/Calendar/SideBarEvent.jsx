import { useState } from "react";
import { IoClose } from "react-icons/io5";
import moment from "moment";

function SideBarEvent({ addEvent, showAddEventSide, setShowAddEventSide }) {
  const [Event, setEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    colorTitle: "",
    colorDescription: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: Event.title,
      start: moment(Event.date)
        .set({
          hour: Event.startTime.split(":")[0],
          minute: Event.startTime.split(":")[1],
        })
        .toDate(),
      end: moment(Event.date)
        .set({
          hour: Event.endTime.split(":")[0],
          minute: Event.endTime.split(":")[1],
        })
        .toDate(),
      colorTitle: Event.colorTitle,
      colorDescription: Event.colorDescription,
    };

    addEvent(newEvent);
  };
  console.log(Event);
  return (
    <div
      className={`event-side-bar ${
        !showAddEventSide ? "!right-[-100%]" : "!right-[0]"
      }`}
    >
      <div className="head flex justify-between items-center">
        <h1>Add event</h1>
        <IoClose
          size={23}
          cursor={"pointer"}
          onClick={() => setShowAddEventSide(false)}
        />
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Event Title"
            value={Event.title}
            onChange={(e) => setEvent({ ...Event, title: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={Event.description}
            onChange={(e) =>
              setEvent({ ...Event, description: e.target.value })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="date">start time</label>
          <input
            type="date"
            name=" date"
            id="date"
            value={Event.date}
            onChange={(e) =>
              setEvent({ ...Event, date: new Date(e.target.value) })
            }
          />
        </fieldset>
        <fieldset>
          <div>
            <label htmlFor="start">start time</label>
            <input
              type="time"
              name="start time"
              id="start"
              value={Event.startTime}
              onChange={(e) =>
                setEvent({ ...Event, startTime: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="end">end time</label>
            <input
              type="time"
              name="end time"
              id="end"
              value={Event.endTime}
              onChange={(e) => setEvent({ ...Event, endTime: e.target.value })}
            />
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor="color-title">color of title box</label>
          <input
            type="color"
            name="color-title"
            id="color-title"
            placeholder="Choose color of title"
            value={Event.colorTitle}
            onChange={(e) => setEvent({ ...Event, colorTitle: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="color-description">color of description box</label>
          <input
            type="color"
            name="color-description"
            id="color-description"
            placeholder="Choose color of description"
            value={Event.colorDescription}
            onChange={(e) =>
              setEvent({ ...Event, colorDescription: e.target.value })
            }
          />
        </fieldset>
        <fieldset>
          <input type="submit" value="Add Event" />
        </fieldset>
      </form>
    </div>
  );
}

export default SideBarEvent;
