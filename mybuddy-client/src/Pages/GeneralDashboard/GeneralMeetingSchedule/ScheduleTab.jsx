import SmallCalender from "./SmallCalender";
import dash from "../../../assets/dashboard1.png";
import { useState } from "react";
import { CiClock2 } from "react-icons/ci";


const ScheduleTab = () => {
  const [openCalender, setOpenCalender] = useState(false);
  const projects = [
    {
      title: "Design Startup Pro",
      des: "9 Members Going",
      img: dash,
      users: [
        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",
      ],
    },
    {
      title: "Design Startup Pro",
      des: "9 Members Going",
      img: dash,
      users: [
        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",
      ],
    },
    {
      title: "Design Startup Pro",
      des: "9 Members Going",
      img: dash,
      users: [
        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",

        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",
      ],
    },
  ];
  const status = [
    {
      _id: 1,
      title: "Total",
      status: "10 Meetings",
    },
    {
      _id: 2,
      title: "Upcoming",
      status: "20 Meetings",
    },
    {
      _id: 3,
      title: "Absent",
      status: "5 Meetings",
    },
  ];
  return (
    <div className="py-5 md:pb-12">
       <h1 className="gray600 text-[20px] lg:text-[28px] font-bold uppercase pb-5 md:pb-7">
       todays-6 meetings
      </h1>
      {/* top */}
      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-3 justify-between md:items-center">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`p-3 lg:p-5 space-y-1 flex flex-col justify-start rounded-[25px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden`}
          >
            <div className="flex justify-between items-start md:items-center space-x-1 lg:space-x-3 py-1 md:py-2">
              <div className="rounded-full h-9 w-10 xl:h-14 xl:w-14 bg-white">
                <img src={p.img} className="h-8 xl:h-14" />
              </div>
              <div className="space-y-2">
                <p className="text-[14px] xl:text-xl font-semibold">
                  {p.title}
                </p>
                <div className="flex justify-start md:items-center space-x-1">
                  <CiClock2 className="text-[11px] lg:text-lg" />
                  <p className="text-[11px] lg:text-sm">10.00 AM To 11.00 AM</p>
                </div>
              </div>
            </div>

            <div className="text-[11px] lg:text-sm border-t-2 py-2 md:py-2">
              <div className="flex items-start justify-between">
                <p className="font-medium">{p.des}</p>
                <p className="font-medium text-red-500">2 Pending</p>
              </div>

              <div className="flex items-center -space-x-2 xl:-space-x-3 py-3 lg:py-4">
                {p.users.map((member, i) => (
                  <img
                    key={i}
                    src={member}
                    className="h-8 w-8 md:h-9 md:w-9 lg:h-8 lg:w-8 xl:h-9 xl:w-10 2xl:h-10 2xl:w-10  rounded-full border-2 border-white"
                  />
                ))}
                <p className="text-blue-600 text-[15px] lg:text-[18px] font-semibold uppercase pl-3 lg:pl-4">
                  +4
                </p>
              </div>
            </div>
            <button className="py-1 w-full font-bold rounded-[10px] bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              View Details
            </button>
          </div>
        ))}
        
      </div>
      <div className="w-full flex justify-center items-center pt-3">
        <img src="/more2.svg" className="h-16 md:h-20  top-32 " />
      </div>
      {/* bottom */}
      <div className="py-5 md:py-9 xl:py-14 relative">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 rounded-[15px] p-5 xl:p-3 bg-[#dde3ea] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset]">
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
          <div className="w-11/12 md:w-4/12 flex items-center justify-between h-9 bg-blue-200  shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] rounded-lg border border-[#e7e4e4]">
            <p className="text-[14px] md:text-[17px] font-semibold border-r-4  w-4/12 text-center">
              Day
            </p>
            <p className="text-[14px] md:text-[17px] font-semibold border-r-4 w-4/12 text-center">
              Week
            </p>
            <p className="text-[14px] md:text-[17px] font-semibold w-4/12 text-center">
              Month
            </p>
          </div>
        </div>

        <div className="mx-2 -mt-1  px-3 pb-4 pt-5 md:px-5 md:pb-6 md:pt-8 flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-3 lg:space-x-5 justify-between md:items-center">
          {status.map((p, i) => (
            <div
              key={i}
              className={`md:w-4/12 h-28 md:h-32 lg:h-36 2xl:h-44 p-3 lg:p-5 space-y-4 flex flex-col justify-center rounded-[25px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden`}
            >
              <p className="text-[17px] lg:text-[19px] xl:text-[21px] 3xl:text-[28px]  font-bold text-center border-b pb-3">
                {p.title}
              </p>
              <p className="text-[15px] lg:text-[17px] xl:text-[19px] 3xl:text-[23px] font-normal text-center">
                {p.status}
              </p>
            </div>
          ))}
          {/* <SmallCalender /> */}
        </div>
        <div className="absolute top-20 md:top-24 xl:top-28  left-0 md:left-5">
          {openCalender && <SmallCalender />}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTab;
