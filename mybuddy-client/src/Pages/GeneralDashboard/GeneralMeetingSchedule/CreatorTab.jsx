import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Context/UserContext";
import MeetingForm from "./MeetingForm";
import moment from "moment";
import MeetingDetailsPage from "./MeetingDetailsPage";
import { HiOutlineDotsVertical } from "react-icons/hi";
import UpdateMeeting from "./UpdateMeeting";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useDeleteMeetingMutation } from "../../../features/meeting/meetingApi";

const CreatorTab = () => {
  const [isOpenMeeting, setIsOpenMeeting] = useState(false);
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectMeeting, setSelectMeeting] = useState(null);
  const [isOpenUpdateMeeting, setIsOpenUpdateMeeting] = useState(false);
  const [deleteMeeting] = useDeleteMeetingMutation();
  const {  getAllProjectByUser, userId } =
    useContext(AuthContext);
    const [filter, setFilter] = useState("Monthly"); // Default filter
    const [subFilter, setSubFilter] = useState("all"); // Default subfilter
    const [meetingCounts, setMeetingCounts] = useState({
      upcoming: 0,
      attend: 0,
      absent: 0,
    });
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  const [getAllMeetingByCreator, setGetAllMeetingByCreator] = useState([]);

  const fetchMeetings = async () => {
    try {
      const response = await fetch(
        `https://test-two-22w0.onrender.com/api/v1/meeting/getAllMeetingOf/${userId}?filterType=${filter}&subFilter=${subFilter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }

      const data = await response.json();
      setGetAllMeetingByCreator(data?.data || []);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [filter, subFilter]);


  //console.log("pop",getAllMeetingByCreator);

  const formatDateTime = (dateTimeString) => {
    const dateTime = moment(dateTimeString);
    return dateTime.format("hh:mm A");
  };

  const formatDate = (isoDateString) => {
    const date = moment(isoDateString);
    return date.format("DD MMMM YYYY");
  };
  const toggleOptionMenu = (meetingId) => {
    setIsOpenOption(isOpenOption === meetingId ? null : meetingId);
  };
  // State for filters and subfilters


  const meetingAsMembers = getAllMeetingByCreator;

  useEffect(() => {
    const filterMeetings = () => {
      const currentDate = moment();
      let filtered = meetingAsMembers;

      if (filter === "Today") {
        filtered = filtered?.filter((meeting) =>
          moment(meeting.meetingTime).isSame(currentDate, "day")
        );
      } else if (filter === "Weekly") {
        filtered = filtered?.filter((meeting) =>
          moment(meeting.meetingTime).isBetween(
            currentDate.clone().startOf("week"),
            currentDate.clone().endOf("week"),
            "day",
            "[]"
          )
        );
      } else if (filter === "Monthly") {
        filtered = filtered?.filter((meeting) =>
          moment(meeting.meetingTime).isSame(currentDate, "month")
        );
      }

      if (subFilter === "upcoming") {
        filtered = filtered?.filter((meeting) =>
          moment(meeting.meetingTime).isAfter(currentDate)
        );
      } else if (subFilter === "attend") {
        filtered = filtered?.filter((meeting) =>
          meeting.meetingMembers.some(
            (member) =>
              member.attendance?.some((a) => a.isAttend) &&
              member.memberId === meeting.creator
          )
        );
      } else if (subFilter === "absent") {
        filtered = filtered?.filter((meeting) =>
          meeting.meetingMembers.some(
            (member) =>
              member.attendance?.some((a) => !a.isAttend) &&
              member.memberId === meeting.creator
          )
        );
      }

      setFilteredMeetings(filtered);

      // Update counts
      const upcomingCount = filtered?.filter((meeting) =>
        moment(meeting.meetingTime).isAfter(currentDate)
      ).length;
      const attendCount = filtered?.filter((meeting) =>
        meeting.meetingMembers.some(
          (member) =>
            member.attendance?.some((a) => a.isAttend) &&
            member.memberId === meeting.creator
        )
      ).length;
      const absentCount = filtered?.filter((meeting) =>
        meeting.meetingMembers.some(
          (member) =>
            member.attendance?.some((a) => !a.isAttend) &&
            member.memberId === meeting.creator
        )
      ).length;

      setMeetingCounts({
        upcoming: upcomingCount,
        attend: attendCount,
        absent: absentCount,
      });
    };

    filterMeetings();
  }, [filter, subFilter, meetingAsMembers]);

  console.log(filteredMeetings);

  const toggleUpdateMeeting = (meetingData) => {
    setSelectMeeting(meetingData);
    setIsOpenUpdateMeeting(true);
  };

  const toggleOption = (meetingData) => {
    setSelectMeeting(meetingData);
    setIsOpenOption(!isOpenOption);
  };

  const handleDeleteMeeting = (id) => {
    Swal.fire({
      title: "Are you sure to delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMeeting(id)
          .unwrap()
          .then(() => {
            setGetAllMeetingByCreator((prevMeetings) =>
              prevMeetings.filter((meeting) => meeting._id !== id)
            );
            Swal.fire("Deleted!", "This meeting has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the meeting.", "error");
          });
      }
    });
  };

  return (
    <>
      <div className="bg-gray-100 md:p-6">
        {/* Title Section */}
        <div className="flex justify-between items-start lg:items-center py-2 mb-6">
          <h2 className="xl:text-2xl font-bold text-gray-700 ">
            YOU'VE CREATED {meetingAsMembers?.length} MEETINGS
          </h2>
          <button
            onClick={() => setIsOpenMeeting(true)}
            className="text-sm xl:text-lg px-2 md:px-4 py-2 text-white rounded-lg shadow [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] font-bold hover:bg-green-500 transition-colors"
          >
            Create Meeting
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex space-x-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded border outline-none border-gray-300"
          >
            <option value="Today">Today</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <select
            value={subFilter}
            onChange={(e) => setSubFilter(e.target.value)}
            className="px-4 py-2 rounded border outline-none border-gray-300"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            {/* <option value="absent">Absent</option>
            <option value="attend">Attend</option> */}
          </select>
        </div>
        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeetings && filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting, index) => (
              <>
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 relative"
                >
                  {/* Options Menu */}
                  <button
                    onClick={() => toggleOptionMenu(meeting._id)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <HiOutlineDotsVertical />
                  </button>
                  {isOpenOption === meeting._id && (
                    <ul className="absolute bg-white rounded-md shadow-md top-10 right-4">
                      <li
                        onClick={() => toggleUpdateMeeting(meeting)}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      >
                        <FaRegPenToSquare />
                        <span>Edit</span>
                      </li>
                      <li
                        onClick={() => handleDeleteMeeting(meeting._id)}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      >
                        <FaRegTrashCan />
                        <span>Delete</span>
                      </li>
                    </ul>
                  )}

                  <div className="flex items-start mb-2 ">
                    <img
                      src={
                        meeting?.creator?.profilePic
                          ? meeting?.creator?.profilePic
                          : "https://i.ibb.co.com/FKKD4mT/opp.png"
                      }
                      alt="Meeting"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4 ">
                      <h3 className="text-lg font-semibold capitalize">
                        {meeting?.title}
                      </h3>
                      <span className="text-base">
                        {formatDate(meeting.meetingTime)}
                      </span>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(meeting.meetingTime)} to{" "}
                        {formatDateTime(
                          moment(meeting.meetingTime).add(
                            meeting.duration * 60000
                          )
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
                        {" "}
                        <span>+</span> {meeting?.meetingMembers?.length}{" "}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedMeeting(meeting)}
                    className="w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors"
                  >
                    View Details
                  </button>
                  {selectedMeeting !== null && (
                    <MeetingDetailsPage
                      meetingDat={selectedMeeting}
                      setSelectedMeeting={setSelectedMeeting}
                    />
                  )}
                  {isOpenMeeting === true && (
                    <MeetingForm
                      setIsOpenMeeting={setIsOpenMeeting}
                      getAllProjectByUser={getAllProjectByUser}
                      userId={userId}
                    />
                  )}
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
        {isOpenUpdateMeeting && selectMeeting && (
          <UpdateMeeting
            meetingData={selectMeeting}
            setSelectMeeting={setSelectMeeting}
            setIsOpenUpdateMeeting={setIsOpenUpdateMeeting}
          />
        )}
      </div>
    </>
  );
};

export default CreatorTab;

//-----------------------------------------------------------------------------------------------

// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Context/UserContext";
// import MeetingForm from "./MeetingForm";
// import moment from "moment";
// import MeetingDetailsPage from "./MeetingDetailsPage";

// const CreatorTab = () => {
//   const [isOpenMeeting, setIsOpenMeeting] = useState(false);
// const { getAllProjectByUser, userId, getAllMeetingByCreator } =
//   useContext(AuthContext);
// const [selectedMeetings, setSelectedMeetings] = useState(null)
//   const meetingAsMembers = getAllMeetingByCreator?.data;

// const formatDateTime = (dateTimeString) => {
//   const dateTime = moment(dateTimeString);
//   return dateTime.format("hh:mm A");
// };

// const formatDate = (isoDateString) => {
//   const date = moment(isoDateString);
//   return date.format("DD MMMM YYYY");
// };

//   // const formatDuration = (durationInSeconds) => {
//   //   const hours = Math.floor(durationInSeconds / 3600);
//   //   const minutes = Math.floor((durationInSeconds % 3600) / 60);
//   //   return `${hours}h ${minutes}m`;
//   // };
//   //console.log(meetingAsMembers[0]?.creator?.profilePic);

//   return (
//     <>
//       <div className="bg-gray-100 p-6">
//         {/* Title Section */}
//         <div className="flex justify-between items-center py-2">
//           <h2 className="text-2xl font-bold text-gray-700 mb-6">
//             YOU'VE CREATED {meetingAsMembers?.length} MEETINGS
//           </h2>
//           <button
//             onClick={() => setIsOpenMeeting(true)}
//             className={`px-4 py-2 text-white  rounded-lg shadow [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] text-lg font-bold hover:bg-green-500 transition-colors`}
//           >
//             Create Meeting
//           </button>
//         </div>

//         {/* Meeting Cards Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           {meetingAsMembers?.map((meeting, index) => (
// <div key={index} className="bg-white shadow-md rounded-lg p-4">
//   <div className="flex items-start mb-2 ">
//     <img
//       src={
//         meeting?.creator?.profilePic
//           ? meeting?.creator?.profilePic
//           : "https://i.ibb.co.com/FKKD4mT/opp.png"
//       }
//       alt="Meeting"
//       className="w-10 h-10 rounded-full"
//     />
//     <div className="ml-4 ">
//       <h3 className="text-lg font-semibold capitalize">
//         {meeting?.title}
//       </h3>
//       <span className="text-base">
//         {formatDate(meeting.meetingTime)}
//       </span>
//       <p className="text-sm text-gray-500">
//         {formatDateTime(meeting.meetingTime)} to{" "}
//         {formatDateTime(
//           moment(meeting.meetingTime).add(meeting.duration * 60000)
//         )}
//       </p>
//     </div>
//   </div>

//   <div className="flex items-center mb-4">
//     {/* Members Avatars */}
//     <div className="flex -space-x-2">
//       {meeting?.meetingMembers.map((member, memberIndex) => (
//         <img
//           key={`${memberIndex}`}
//           src={
//             member?.memberId?.profilePic ||
//             "https://i.ibb.co.com/FKKD4mT/opp.png"
//           }
//           className="w-7 h-7 rounded-full border-2 border-white"
//           alt={`Member ${memberIndex + 1}`}
//         />
//       ))}
//     </div>
//     {meeting?.meetingAsMembers?.length > 4 && (
//       <span className="ml-2 text-gray-500">
//         {" "}
//         <span>+</span> {meeting?.meetingMembers?.length}{" "}
//       </span>
//     )}
//   </div>
//   <button onClick={() => setSelectedMeetings(meeting)}  className="w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors">
//     View Details
//   </button>
//   {
//     selectedMeetings !== null &&
//     <MeetingDetailsPage meetingDat={selectedMeetings} />
//   }

// </div>
//           ))}
//         </div>
//       </div>

// {isOpenMeeting === true && (
//   <MeetingForm
//     setIsOpenMeeting={setIsOpenMeeting}
//     getAllProjectByUser={getAllProjectByUser}
//     userId={userId}
//   />
// )}
//     </>
//   );
// };

// export default CreatorTab;
