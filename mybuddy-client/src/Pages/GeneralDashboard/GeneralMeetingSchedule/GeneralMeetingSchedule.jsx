

const GeneralMeetingSchedule = () => {

  return (
    <div
    data-aos="fade-left"
    data-aos-duration="1200"
    className="flex flex-col-reverse md:flex-row justify-between   lg:space-x-6 items-start md:items-center lg:py-10 gray500 mr-4"
  >
    <h1 className="text-3xl font-semibold">Coming Soon ...</h1>
  </div>
  );
};

export default GeneralMeetingSchedule;
// import { useState } from "react";
// import ScheduleTab from "./ScheduleTab";
// import TimelineTab from "./TimelineTab";

// const GeneralMeetingSchedule = () => {
//   const [openTimelineTab, setOpenTimelineTab] = useState(true);
//   const [openScheduleTab, setOpenScheduleTab] = useState(false);
//   const toggleTimelineTab = () => {
//     setTimeout(() => {
//       setOpenTimelineTab(true);
//       setOpenScheduleTab(false); 
//     }, 500);
//   };
//   const toggleScheduleTab = () => {
//     setTimeout(() => {
//       setOpenScheduleTab(true);
//       setOpenTimelineTab(false);
//     }, 500);
//   };
//   return (
//     <div className="text-gray-700 min-h-screen">
//       <h1 className="gray600 text-[20px] lg:text-[28px] font-bold uppercase">
//         {openScheduleTab ? "Meeting Schedule" : "Timeline"}
//       </h1>
//       <div className="py-5">
//         <ul className="flex justify-center items-center space-x-3 p-2 md:p-3 rounded-xl bg-[#9ec9e2] shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] cursor-pointer duration-200  backdrop-filter:blur(20px); w-52">
//           <li
//             className={`transition-colors  ease-in-out cursor-pointer hover:bg-[#e7edf2] p-2 rounded-xl font-semibold ${
//               openTimelineTab === true ? "bg-[#e7edf2]" : " bg-transparent"
//             }`}
//             onClick={toggleTimelineTab}
//           >
//             <h1 className="text-[17px] md:text-lg font-semibold inline-block capitalize">
//               timeline
//             </h1>
//           </li>
//           <li
//             className={`transition-colors ease-in-out cursor-pointer hover:bg-[#e7edf2] p-2 rounded-xl font-semibold ${
//               openScheduleTab === true ? "bg-[#e7edf2]" : " bg-transparent"
//             }`}
//             onClick={toggleScheduleTab}
//           >
//             <h1 className="text-[17px] md:text-lg font-semibold inline-block capitalize">
//               schedule
//             </h1>
//           </li>
//         </ul>
//       </div> 
//       {openTimelineTab && <TimelineTab />}
//       {openScheduleTab && <ScheduleTab />}
//     </div>
//   );
// };

// export default GeneralMeetingSchedule;
