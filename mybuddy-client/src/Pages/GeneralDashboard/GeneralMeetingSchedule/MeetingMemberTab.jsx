import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import moment from "moment";
import { Link } from "react-router-dom";
import MeetingDetailsPage from "./MeetingDetailsPage";

const MeetingMemberTab = () => {
  const { userId,getMeetingByMeetingMember } = useContext(AuthContext);
  const [selectedMeeting, setSelectedMeeting] = useState(null); 
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

  const formatDateTime = (dateTimeString) => {
    const dateTime = moment(dateTimeString);
    return dateTime.format("hh:mm A");
  };

  const formatDate = (isoDateString) => {
    const date = moment(isoDateString);
    return date.format("DD MMMM YYYY");
  };

  useEffect(() => {
    fetchMeetingData(filter);
  }, [filter]);

  return (
    <div className="px-5"> 
       <h2 className="xl:text-2xl font-bold text-gray-700 my-6">
            YOU NEED TO ATTEND {meetingAsMembers?.length} MEETINGS
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
     
          {meetingAsMembers?.map((meeting, index) => (
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
                    {meeting?.title?.length > 7 ? meeting?.title.slice(0,7)  + "..." :  meeting?.title}
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
          ))}
   
    </div>

    {selectedMeeting && (
        <MeetingDetailsPage meetingDat={selectedMeeting} setSelectedMeeting={setSelectedMeeting} />
      )}
      
    </div>
  );
};

export default MeetingMemberTab;
MeetingMemberTab.propTypes = {
  event: PropTypes.string,
};
