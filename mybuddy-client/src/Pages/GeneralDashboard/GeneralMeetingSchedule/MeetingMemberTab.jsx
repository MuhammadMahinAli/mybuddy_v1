import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import moment from "moment";
import MeetingDetailsPage from "./MeetingDetailsPage";

const MeetingMemberTab = () => {
  const { userId } = useContext(AuthContext);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [filterType, setFilterType] = useState("Monthly");
  const [subFilter, setSubFilter] = useState("all");
  const [meetings, setMeetings] = useState([]);

  const fetchMeetings = async () => {
    try {
      console.log(userId);
      const response = await fetch(
        `http://localhost:3000/api/v1/meeting/getMeetingByMeetingMember/${userId}?filterType=${filterType}&subFilter=${subFilter}`
      );
      const data = await response.json();
      if (data.success) {
        setMeetings(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [filterType, subFilter]);

  console.log(meetings);

  const formatDateTime = (dateTimeString) =>
    moment(dateTimeString).format("hh:mm A");
  const formatDate = (isoDateString) =>
    moment(isoDateString).format("DD MMMM YYYY");

  return (
    <div className="px-5">
      <h2 className="xl:text-2xl font-bold text-gray-700 my-6">
        You need to attend {meetings.length} meetings
      </h2>
      <div className="mb-4 flex space-x-4">
        {/* Filter Type Dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded outline-none"
        >
          <option value="Today">Today</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        {/* Subfilter Dropdown */}
        <select
          value={subFilter}
          onChange={(e) => setSubFilter(e.target.value)}
          className="px-4 py-2 border rounded outline-none"
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="attend">Attend</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {meetings?.length > 0 ? (
        
        meetings?.map((meeting, index) => (
          <>
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-start mb-2">
                <img
                  src={
                    meeting?.creator?.profilePic
                      ? meeting?.creator?.profilePic
                      : "https://i.ibb.co.com/FKKD4mT/opp.png"
                  }
                  alt="Meeting"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold capitalize lg:hidden">
                    {meeting?.title?.length > 7
                      ? meeting?.title.slice(0, 7) + "..."
                      : meeting?.title}
                  </h3>
                  <h3 className="hidden text-lg font-semibold capitalize lg:block ">
                    {meeting?.title}
                  </h3>
                  <span className="text-base">
                    {formatDate(meeting.meetingTime)}
                  </span>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(meeting.meetingTime)} to{" "}
                    {formatDateTime(
                      moment(meeting.meetingTime).add(meeting.duration * 60000)
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {/* Members Avatars */}
                <div className="flex -space-x-2">
                  {meeting?.meetingMembers.map((member, memberIndex) => (
                    <img
                      key={`${memberIndex}`}
                      src={
                        member?.memberId?.profilePic ||
                        "https://i.ibb.co.com/FKKD4mT/opp.png"
                      }
                      className="w-7 h-7 rounded-full border-2 border-white"
                      alt={`Member ${memberIndex + 1}`}
                    />
                  ))}
                </div>
                {meeting?.meetingAsMembers?.length > 4 && (
                  <span className="ml-2 text-gray-500">
                    <span>+</span> {meeting?.meetingMembers?.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedMeeting(meeting)} // Set only the clicked meeting
                className="w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors"
              >
                View Details
              </button>
            </div>
          </>
        ))
      ) : (
        <div className="col-span-full text-center">
          <p className="text-lg font-semibold text-gray-700">
            No meetings available.
          </p>
        </div>
      )}
      </div>

      {selectedMeeting && (
        <MeetingDetailsPage
          meetingDat={selectedMeeting}
          setSelectedMeeting={setSelectedMeeting}
        />
      )}
    </div>
  );
};

export default MeetingMemberTab;

MeetingMemberTab.propTypes = {
  event: PropTypes.string,
};

// import PropTypes from "prop-types";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../Context/UserContext";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import MeetingDetailsPage from "./MeetingDetailsPage";

// const MeetingMemberTab = () => {
//   const { userId,getMeetingByMeetingMember } = useContext(AuthContext);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);
//   const [filter, setFilter] = useState("today");
//   const [todaysDate, setTodaysDate] = useState("");
//   const [meetingData, setMeetingData] = useState({
//     total: 0,
//     upcoming: 0,
//     absent: 0,
//   });

//   const meetingAsMembers = getMeetingByMeetingMember?.data;

//   useEffect(() => {
//     const currentDate = new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     setTodaysDate(currentDate);
//   }, []);

//   const fetchMeetingData = async (selectedFilter) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/v1/meeting/status?userId=${userId}&filter=${selectedFilter}`
//       );
//       const data = await response.json();
//       setMeetingData({
//         total: data.totalMeetings,
//         upcoming: data.upcomingMeetings,
//         absent: data.absentMeetings,
//       });
//     } catch (error) {
//       console.error("Error fetching meeting data:", error);
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = moment(dateTimeString);
//     return dateTime.format("hh:mm A");
//   };

//   const formatDate = (isoDateString) => {
//     const date = moment(isoDateString);
//     return date.format("DD MMMM YYYY");
//   };

//   useEffect(() => {
//     fetchMeetingData(filter);
//   }, [filter]);

//   return (
//     <div className="px-5">
//        <h2 className="xl:text-2xl font-bold text-gray-700 my-6">
//             YOU NEED TO ATTEND {meetingAsMembers?.length} MEETINGS
//           </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

//           {meetingAsMembers?.map((meeting, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-4">
//               <div className="flex items-start mb-2">
//                 <img
//                   src={
//                     meeting?.creator?.profilePic
//                       ? meeting?.creator?.profilePic
//                       : "https://i.ibb.co.com/FKKD4mT/opp.png"
//                   }
//                   alt="Meeting"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-semibold capitalize lg:hidden">
//                     {meeting?.title?.length > 7 ? meeting?.title.slice(0,7)  + "..." :  meeting?.title}
//                   </h3>
//                   <h3 className="hidden text-lg font-semibold capitalize lg:block ">
//                     {meeting?.title}
//                   </h3>
//                   <span className="text-base">
//                     {formatDate(meeting.meetingTime)}
//                   </span>
//                   <p className="text-sm text-gray-500">
//                     {formatDateTime(meeting.meetingTime)} to{" "}
//                     {formatDateTime(
//                       moment(meeting.meetingTime).add(meeting.duration * 60000)
//                     )}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center mb-4">
//                 {/* Members Avatars */}
//                 <div className="flex -space-x-2">
//                   {meeting?.meetingMembers.map((member, memberIndex) => (
//                     <img
//                       key={`${memberIndex}`}
//                       src={
//                         member?.memberId?.profilePic ||
//                         "https://i.ibb.co.com/FKKD4mT/opp.png"
//                       }
//                       className="w-7 h-7 rounded-full border-2 border-white"
//                       alt={`Member ${memberIndex + 1}`}
//                     />
//                   ))}
//                 </div>
//                 {meeting?.meetingAsMembers?.length > 4 && (
//                   <span className="ml-2 text-gray-500">
//                     <span>+</span> {meeting?.meetingMembers?.length}
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={() => setSelectedMeeting(meeting)} // Set only the clicked meeting
//                 className="w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}

//     </div>

//     {selectedMeeting && (
//         <MeetingDetailsPage meetingDat={selectedMeeting} setSelectedMeeting={setSelectedMeeting} />
//       )}

//     </div>
//   );
// };

// export default MeetingMemberTab;
// MeetingMemberTab.propTypes = {
//   event: PropTypes.string,
// };