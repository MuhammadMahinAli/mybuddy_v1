import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { useSelector } from "react-redux";

const Meeting = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { userId } = useContext(AuthContext);
  const [filter, setFilter] = useState("today");
  const [todaysDate, setTodaysDate] = useState("");
  const [meetingData, setMeetingData] = useState({
    total: 0,
    upcoming: 0,
    absent: 0,
  });

  const fetchMeetingData = async (selectedFilter) => {
    try {
      const response = await fetch(
        `https://test-two-22w0.onrender.com/api/v1/meeting/status?userId=${userId}&filter=${selectedFilter}`
      );
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
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setTodaysDate(currentDate);
  }, []);

  useEffect(() => {
    fetchMeetingData(filter);
  }, [filter]);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="pt-20 pb-10  w-9/12 md:w-11/12 lg:w-9/12">
          <div
            className={`${
              theme !== "light" &&
              "relative p-[2px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
            }`}
          >
            <div
              className={`flex flex-col md:flex-row  items-center justify-between space-y-3 md:space-y-0 ${
                theme === "light"
                  ? "shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]"
                  : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover shadow-[-2px_-3px_6px_rgba(0,_0,_0,_0.7),_4px_4px_6px_rgba(0,_0,_0,_0.5)]"
              } rounded-lg p-4 `}
            >
              <div className="flex  items-center">
                <span
                  className={`${
                    theme === "light" ? "text-gray-700" : "text-white"
                  } text-center md:text-start text-xl ml-4  dark:text-gray-300`}
                >
                  Today is <strong>{todaysDate}</strong>
                </span>
              </div>
             
              <ul className="flex justify-between items-center w-[200px] md:w-[300px]">
                {/* Media Tab */}
                <li
                  onClick={() => setFilter("today")}
                  className={`relative flex items-center justify-center space-x-2 py-4 w-full text-center font-medium cursor-pointer ${
                    theme === "dark"
                      ? filter === "today"
                        ? "border-b-2 border-2 border-[#4EEBFF]"
                        : "border-r-0 border-2 border-white"
                      : filter === "today"
                      ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
                      : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
                  } rounded-l-md `}
                >
                  <p
                    className={`text-[14px] md:text-[18px] ${
                      theme === "light"
                        ? filter === "today"
                          ? "text-[#fff]"
                          : "text-white"
                        : filter === "today"
                        ? "bg-gradient-to-r from-[#4EEBFF] via-[#AA62F9] to-[#F857FF] text-transparent bg-clip-text"
                        : "text-white"
                    }`}
                  >
                    Day
                  </p>
                </li>

                {/* Project Tab */}
                <li
                  onClick={() => setFilter("weekly")}
                  className={`relative flex items-center justify-center space-x-2 py-4 w-full text-center font-medium cursor-pointer ${
                    theme === "dark"
                      ? filter === "weekly"
                        ? "border-b-2 border-2 border-[#AA62F9]" 
                        : "border-2 border-white"
                      : filter === "weekly"
                      ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
                      : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
                  }`}
                >
                  <p
                    className={`text-[14px] md:text-[18px] ${
                      theme === "light"
                        ? filter === "weekly"
                          ? "text-[#fff]"
                          : "text-white"
                        : filter === "weekly"
                        ? "bg-gradient-to-r from-[#4EEBFF] via-[#AA62F9] to-[#F857FF] text-transparent bg-clip-text"
                        : "text-white"
                    }`}
                  >
                    Week
                  </p>
                </li>

                {/* Article Tab */}
                <li
                  onClick={() => setFilter("monthly")}
                  className={`relative flex items-center justify-center space-x-2 py-4 w-full text-center font-medium cursor-pointer ${
                    theme === "dark"
                      ? filter === "monthly"
                        ? "border-b-2 border-2 border-[#F857FF]"  
                        : "border-l-0 border-2 border-white"
                      : filter === "monthly"
                      ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
                      : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
                  } rounded-r-md`}
                >
                  <p
                    className={`text-[14px] md:text-[18px] ${
                      theme === "light"
                        ? filter === "monthly"
                          ? "text-[#fff]"
                          : "text-white"
                        : filter === "monthly"
                        ? "bg-gradient-to-r from-[#4EEBFF] via-[#AA62F9] to-[#F857FF] text-transparent bg-clip-text"
                        : "text-white"
                    } `}
                  >
                    Month
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {["total", "upcoming", "absent"].map((type) => (
              <div
                key={type}
                className={`${
                  theme !== "light" &&
                  "relative p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
                }`}
              >
                <div
                  key={type}
                  className={`py-10 ${
                    theme === "light"
                      ? "bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                      : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover text-gray-100"
                  }  rounded-lg p-4 text-center`}
                >
                  <h3 className="text-lg font-semibold border-b-2 border-white pb-2">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </h3>
                  <p className="text-2xl font-bold pt-2">{meetingData[type]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Theme Version
  <div
    className={`${
      theme !== "light" &&
      "relative p-[1px] bg-gradient-to-r from-[#4EEBFF] via-[#AA62F9] to-[#F857FF] rounded-[10px] h-[490px]"
    }`}
  >
    <div
      className={`${
        theme === "light"
          ? "bg-white relative"
          : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
      } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] w-full h-[488px]`}
    ></div>
  </div> */}
      </div>
    </>
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

//  <div className=" flex items-center justify-center">
//       <div className="pt-20 w-9/12">
//
//         <div className=" flex items-center justify-between shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] rounded-lg p-4 mb-6">
//           <div className="flex items-center">
//             <span className="text-xl ml-4 text-gray-700">
//               Today is <strong>{todaysDate}</strong>
//             </span>
//           </div>
//           <div className="flex  rounded-lg">
//             <button
//               onClick={() => setFilter("today")}
//               className={`px-4 py-2 rounded-l-lg text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] text-xl  ${
//                 filter === "today"
//                   ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
//                   : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
//               } `}
//             >
//               Day
//             </button>
//             <button
//               onClick={() => setFilter("weekly")}
//               className={`px-4 py-1 text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] ${
//                 filter === "weekly"
//                   ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
//                   : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
//               } `}
//             >
//               Week
//             </button>
//             <button
//               onClick={() => setFilter("monthly")}
//               className={`px-4 py-1 rounded-r-lg text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] ${
//                 filter === "monthly"
//                   ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
//                   : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
//               } `}
//             >
//               Month
//             </button>
//           </div>
//         </div>

//
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="py-10 bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] rounded-lg p-4 text-center">
//             <h3 className="text-gray-600 text-lg font-semibold border-b-2 border-white pb-2">
//               Total
//             </h3>
//             <p className="text-2xl font-bold pt-2">{meetingData.total}</p>
//           </div>
//           <div className="py-10 bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] rounded-lg p-4 text-center">
//             <h3 className="text-gray-600 text-lg font-semibold border-b-2 border-white pb-2">
//               Upcoming
//             </h3>
//             <p className="text-2xl font-bold pt-2">{meetingData.upcoming}</p>
//           </div>
//           <div className="py-10 bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] rounded-lg p-4 text-center">
//             <h3 className="text-gray-600 text-lg font-semibold border-b-2 border-white pb-2">
//               Absent
//             </h3>
//             <p className="text-2xl font-bold pt-2">{meetingData.absent}</p>
//           </div>
//         </div>
//       </div>

// {/* for dark version */}
// <div
// className={`${
//   theme !== "light" &&
//   "relative p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px] h-[490px]"
// }`}//
//>
// <div
//   className={`${
//     theme === "light"
//       ? "bg-white  relative"
//       : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
//   } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] w-[270px] xs:w-[280px] sm:w-[350px] md:w-[600px] lg:w-[500px] xl:w-[670px] 2xl:w-[750px] 3xl:w-[800px] h-[488px] 3xl:ml-[1px] `}
// ></div>
// </div>
// </div>
