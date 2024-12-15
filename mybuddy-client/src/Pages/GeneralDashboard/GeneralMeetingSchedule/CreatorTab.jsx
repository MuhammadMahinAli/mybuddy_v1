import { useContext, useState } from "react";
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
  const [deleteMeeting]=useDeleteMeetingMutation();
  const { getAllProjectByUser, userId, getAllMeetingByCreator } =
    useContext(AuthContext);
  // Store only one selected meeting
  const meetingAsMembers = getAllMeetingByCreator?.data;

  const toggleUpdateMeeting = (meetingData) => {
    setSelectMeeting(meetingData);
    setIsOpenUpdateMeeting(true);
  };
  const toggleOption = (meetingData) => {
    setSelectMeeting(meetingData);
    setIsOpenOption(!isOpenOption);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = moment(dateTimeString);
    return dateTime.format("hh:mm A");
  };

  const formatDate = (isoDateString) => {
    const date = moment(isoDateString);
    return date.format("DD MMMM YYYY");
  };

  const handleDeleteMeeting = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete it ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMeeting(id).unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "This meeting has been deleted.",
              "success"
            );
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2500);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue to delete meeting.",
              "error"
            );
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
            className={`text-sm xl:text-lg px-2 md:px-4 py-2 text-white rounded-lg shadow [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] font-bold hover:bg-green-500 transition-colors`}
          >
            Create Meeting
          </button>
        </div>

        {/* Meeting Cards Section  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {meetingAsMembers?.map((meeting, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <button
                onClick={() => toggleOption(meeting)}
                className="float-right"
              >
                <HiOutlineDotsVertical />
              </button>
              {isOpenOption &&
                selectMeeting &&
                selectMeeting?._id === meeting?._id && (
                  <ul className="absolute bg-white rounded-md text-center  right-4 top-8 shadow-xl w-28">
                    <li
                      onClick={() => toggleUpdateMeeting(meeting)}
                      className="hover:bg-gray-100 py-1  cursor-pointer flex items-center pl-5 space-x-2"
                    >
                      {" "}
                      <span>
                        <FaRegPenToSquare className="text-gray-500" />
                      </span>{" "}
                      <span className=""> Edit</span>
                    </li>
                    <li onClick={()=>handleDeleteMeeting(meeting?._id)} className="hover:bg-gray-100 py-1  cursor-pointer flex items-center pl-5 space-x-2">
                      {" "}
                      <span>
                        <FaRegTrashCan className="text-gray-500" />
                      </span>{" "}
                      <span className=""> Delete</span>
                    </li>
                  </ul>
                )}

              <div className="flex items-start mb-2">
                <img
                  src={
                    meeting?.creator?.profilePic
                      ? meeting?.creator?.profilePic
                      : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
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
                        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
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
      </div>

      {/* Conditionally render selected meeting's details outside of the loop */}
      {selectedMeeting && (
        <MeetingDetailsPage
          userId={userId}
          meetingDat={selectedMeeting}
          setSelectedMeeting={setSelectedMeeting}
        />
      )}

      {isOpenMeeting && (
        <MeetingForm
          setIsOpenMeeting={setIsOpenMeeting}
          getAllProjectByUser={getAllProjectByUser}
          userId={userId}
        />
      )}

      {isOpenUpdateMeeting && selectMeeting && (
        <UpdateMeeting
          meetingData={selectMeeting}
          setSelectMeeting={setSelectMeeting}
          setIsOpenUpdateMeeting={setIsOpenUpdateMeeting}
        />
      )}
    </>
  );
};

export default CreatorTab;

// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Context/UserContext";
// import MeetingForm from "./MeetingForm";
// import moment from "moment";
// import MeetingDetailsPage from "./MeetingDetailsPage";

// const CreatorTab = () => {
//   const [isOpenMeeting, setIsOpenMeeting] = useState(false);
//   const { getAllProjectByUser, userId, getAllMeetingByCreator } =
//     useContext(AuthContext);
// const [selectedMeetings, setSelectedMeetings] = useState(null)
//   const meetingAsMembers = getAllMeetingByCreator?.data;

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = moment(dateTimeString);
//     return dateTime.format("hh:mm A");
//   };

//   const formatDate = (isoDateString) => {
//     const date = moment(isoDateString);
//     return date.format("DD MMMM YYYY");
//   };

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
//             <div key={index} className="bg-white shadow-md rounded-lg p-4">
//               <div className="flex items-start mb-2 ">
//                 <img
//                   src={
//                     meeting?.creator?.profilePic
//                       ? meeting?.creator?.profilePic
//                       : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                   }
//                   alt="Meeting"
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div className="ml-4 ">
//                   <h3 className="text-lg font-semibold capitalize">
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
//                         "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                       }
//                       className="w-7 h-7 rounded-full border-2 border-white"
//                       alt={`Member ${memberIndex + 1}`}
//                     />
//                   ))}
//                 </div>
//                 {meeting?.meetingAsMembers?.length > 4 && (
//                   <span className="ml-2 text-gray-500">
//                     {" "}
//                     <span>+</span> {meeting?.meetingMembers?.length}{" "}
//                   </span>
//                 )}
//               </div>
//               <button onClick={() => setSelectedMeetings(meeting)}  className="w-full py-2 text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors">
//                 View Details
//               </button>
//               {
//                 selectedMeetings !== null &&
//                 <MeetingDetailsPage meetingDat={selectedMeetings} />
//               }

//             </div>
//           ))}
//         </div>
//       </div>

//       {isOpenMeeting === true && (
//         <MeetingForm
//           setIsOpenMeeting={setIsOpenMeeting}
//           getAllProjectByUser={getAllProjectByUser}
//           userId={userId}
//         />
//       )}
//     </>
//   );
// };

// export default CreatorTab;
