import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { Link } from "react-router-dom";

const MeetingMemberTab = () => {
  const { userId,getMeetingByMeetingMember } = useContext(AuthContext);
  const [filter, setFilter] = useState("today");
  const [todaysDate, setTodaysDate] = useState("");
  const [meetingData, setMeetingData] = useState({
    total: 0,
    upcoming: 0,
    absent: 0,
  });

  const meetingAsMembers = getMeetingByMeetingMember?.data;

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setTodaysDate(currentDate);
  }, []);

  const fetchMeetingData = async (selectedFilter) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/meeting/status?userId=${userId}&filter=${selectedFilter}`
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
    fetchMeetingData(filter);
  }, [filter]);

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {meetingAsMembers?.map((meeting, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Meeting"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{meeting?.title}</h3>
              <p className="text-sm text-gray-500">
                {meeting?.meetingTime}
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            {/* Members Avatars */}
            <div className="flex -space-x-2">
              <img
                src="https://via.placeholder.com/24"
                className="w-6 h-6 rounded-full border-2 border-white"
                alt="Member 1"
              />
              <img
                src="https://via.placeholder.com/24"
                className="w-6 h-6 rounded-full border-2 border-white"
                alt="Member 2"
              />
              <img
                src="https://via.placeholder.com/24"
                className="w-6 h-6 rounded-full border-2 border-white"
                alt="Member 3"
              />
              <img
                src="https://via.placeholder.com/24"
                className="w-6 h-6 rounded-full border-2 border-white"
                alt="Member 4"
              />
            </div>
            <span className="ml-2 text-gray-500">+4</span>
          </div>
          {meeting?.attendenceLink !== null && (
            <Link
              to={`/attendance?member=${userId}&&meeting=${meeting?.title}&&meetingId=${meeting?._id}&&date=${meeting.meetingTime}`}
            >
              <button className="w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors">
                Update Attendence
              </button>
            </Link>
          )}
          <button className="mt-2 w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors">
            View Details
          </button>
        </div>
      ))}
    </div>
      {/* Date Selector and View Switcher */}
      <div className="flex items-center justify-between shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <span className="text-xl ml-4 text-gray-700">
            Today is <strong>{todaysDate}</strong>
          </span>
        </div>
        <div className="flex  rounded-lg">
          <button
            onClick={() => setFilter("today")}
            className={`px-4 py-2 rounded-l-lg text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] text-xl  ${
              filter === "today"
                ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
                : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
            } `}
          >
            Day
          </button>
          <button
            onClick={() => setFilter("weekly")}
            className={`px-4 py-1 text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] ${
              filter === "weekly"
                ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
                : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
            } `}
          >
            Week
          </button>
          <button
            onClick={() => setFilter("monthly")}
            className={`px-4 py-1 rounded-r-lg text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] ${
              filter === "monthly"
                ? "[background:linear-gradient(-84.24deg,#FF867A,#f7a7a0)]"
                : "[background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
            } `}
          >
            Month
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="py-10 bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] rounded-lg p-4 text-center">
          <h3 className="text-gray-600 text-lg font-semibold border-b-2 border-white pb-2">
            Total
          </h3>
          <p className="text-2xl font-bold pt-2">{meetingData.total}</p>
        </div>
        <div className="py-10 bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] rounded-lg p-4 text-center">
          <h3 className="text-gray-600 text-lg font-semibold border-b-2 border-white pb-2">
            Upcoming
          </h3>
          <p className="text-2xl font-bold pt-2">{meetingData.upcoming}</p>
        </div>
        <div className="py-10 bg-[#E4ECF7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] rounded-lg p-4 text-center">
          <h3 className="text-gray-600 text-lg font-semibold border-b-2 border-white pb-2">
            Absent
          </h3>
          <p className="text-2xl font-bold pt-2">{meetingData.absent}</p>
        </div>
      </div>
    </>
  );
};

export default MeetingMemberTab;
MeetingMemberTab.propTypes = {
  event: PropTypes.string,
};
