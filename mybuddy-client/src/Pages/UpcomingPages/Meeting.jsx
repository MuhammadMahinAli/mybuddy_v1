import  { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

const Meeting = () => {
  const {userId} = useContext( AuthContext)
  const [filter, setFilter] = useState("today");
  const [meetingData, setMeetingData] = useState({ total: 0, upcoming: 0, absent: 0 });

  const fetchMeetingData = async (selectedFilter) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/meeting/status?userId=${userId}&filter=${selectedFilter}`);
      const data = await response.json();
      setMeetingData({
        total: data.totalMeetings,
        upcoming: data.upcomingMeetings,
        absent: data.absentMeetings,
      });
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  };

  useEffect(() => {
    fetchMeetingData(filter);
  }, [filter]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center justify-between w-7/12 shadow-md rounded-lg p-4 mb-6 mt-20">
        <div className="flex items-center">
          <span className="ml-4 text-gray-700">29-04 Feb, 2024 (0h 00m)</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setFilter("today")} className={`px-4 py-1 text-sm ${filter === "today" ? "bg-green-400 text-white" : "bg-gray-200"} rounded-lg`}>Day</button>
          <button onClick={() => setFilter("weekly")} className={`px-4 py-1 text-sm ${filter === "weekly" ? "bg-green-400 text-white" : "bg-gray-200"} rounded-lg`}>Week</button>
          <button onClick={() => setFilter("monthly")} className={`px-4 py-1 text-sm ${filter === "monthly" ? "bg-green-400 text-white" : "bg-gray-200"} rounded-lg`}>Month</button>
        </div>
      </div>

      <div className="flex space-x-8 pt-20">
        <div className="border-2 p-20 space-y-3 rounded-xl shadow">
          <h1 className="text-center text-2xl font-semibold">Total</h1>
          <p className="text-center text-lg">{meetingData.total} Meeting</p>
        </div>
        <div className="border-2 p-20 space-y-3 rounded-xl shadow">
          <h1 className="text-center text-2xl font-semibold">Upcoming</h1>
          <p className="text-center text-lg">{meetingData.upcoming} Meeting</p>
        </div>
        <div className="border-2 p-20 space-y-3 rounded-xl shadow">
          <h1 className="text-center text-2xl font-semibold">Absent</h1>
          <p className="text-center text-lg">{meetingData.absent} Meeting</p>
        </div>
      </div>
    </div>
  );
};

export default Meeting;

// import { useSelector } from 'react-redux';

// const Meeting = () => {
//     const theme = useSelector((state) => state.theme.theme);
//   return (
//     <div
//       className={`${
//         theme !== "light" &&
//         "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
//       }`}
//     >
//       <div
//         className={`${
//           theme === "light"
//             ? "bg-white m-5"
//             : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
//         } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] grid h-screen place-content-center`}
//       >
//         <h1
//           className={`${
//             theme === "light" ? "text-gray-600" : "text-white"
//           } uppercase tracking-widest  xl:text-3xl`}
//         >
//           COMING SOON
//         </h1>
//       </div>
//     </div>

//     );
// };

// export default Meeting;
