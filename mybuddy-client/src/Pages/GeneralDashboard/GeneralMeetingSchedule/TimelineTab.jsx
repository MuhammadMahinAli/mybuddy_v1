import moment from "moment";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calender.css";
import PropTypes from "prop-types";
import "react-calendar/dist/Calendar.css";
import SmallCalender from "./SmallCalender";
//import SmallCalender from "./SmallCalender";
const localizer = momentLocalizer(moment);

const TimelineTab = () => {
  const [datas, setDatas] = useState([]);
  const [openCalender, setOpenCalender] = useState(false);
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

  const handleSelectSlot = () => {
    // LT format gives hours and minutes
    alert(`You clicked on `);
  };

  const CustomEvent = ({ event }) => (
    <div>
      <div className="text-[18px]">{event?.title}</div>
    </div>
  );

  return (
    <>
      <div className=" flex flex-col md:flex-row justify-between items-center space-y-0 md:space-y-0 rounded-[15px] pt-5 md:pt-0 md:pl-4 xl:py-0 bg-[#dde3ea] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset]">
        <div className="flex flex-col md:flex-row  items-center space-y-3 md:space-y-0 md:space-x-3 xl:w-5/12">
          <div className="flex justify-center items-center bg-blue-200 w-16 py-1 shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] rounded-lg border border-[#e7e4e4]">
            <div
              onClick={() => setOpenCalender(!openCalender)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img src="/calender.svg" className="h-5" />
              <img src="/down-arrow.svg" className="h-3" />
            </div>
          </div>
          <p className="text-[17px] font-">
            {new Intl.DateTimeFormat(navigator.language, {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date())}
          </p>
        </div>
        <div className="cursor-pointer h-20">
          <img src="/new-meeting2.svg" className="" />
        </div>
      </div>
      <div className="relative  scrollbar-hidden py-5">
        <Calendar
          className="custom-event rbc-calender scrollbar-hide"
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
          defaultView="day"
          views={["day", "week", "month"]}
          onSelectSlot={handleSelectSlot}
          slotDuration={60}
        />
        {/* SmallCalender */}
        <div className="absolute -top-3  md:left-5">
          {openCalender && <SmallCalender />}
        </div>
      </div>
    </>
  );
};

export default TimelineTab;
TimelineTab.propTypes = {
  event: PropTypes.string,
};
