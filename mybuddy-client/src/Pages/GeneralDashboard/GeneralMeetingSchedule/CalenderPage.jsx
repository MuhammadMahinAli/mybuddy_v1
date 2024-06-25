import moment from "moment";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calender.css";
import PropTypes from "prop-types";

import "react-calendar/dist/Calendar.css";
//import SmallCalender from "./SmallCalender";
const localizer = momentLocalizer(moment);

const CalenderPage = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const events = datas?.map((event) => {
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });

  const handleSelectSlot = (slotInfo) => {
    const clickedTime = moment(slotInfo.start).format("LT"); // LT format gives hours and minutes
    alert(`You clicked on ${clickedTime}`);
  };

  const CustomEvent = ({ event }) => (
    <div>
      <div className="t">{event?.title}</div>
      <div className="t">{event?.description}</div>
    </div>
  );

  return (
    <div>
      <Calendar
        className="custom-event"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.color,
              borderRadius: "15px",
              boxShadow:
                "0px 4px 4px rgba(255, 255, 255, 0.25), -2px -2px 20px 5px rgba(255, 255, 255, 0.5), -10px -10px 55px 26px rgba(255, 255, 255, 0.2), 17px 17px 38px rgba(0, 0, 0, 0.31)",
              fontSize: "15px",
              border: "0px",
            },
          };
        }}
        components={{
          event: CustomEvent,
        }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(e)=>alert(e.title)}
        defaultView="day"
        slotDuration={60}
      />
    </div>
  );
};

export default CalenderPage;
CalenderPage.propTypes = {
  event: PropTypes.object,
};