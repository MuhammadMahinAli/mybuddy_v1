/* eslint-disable react/prop-types */

import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MeetingDetailsPage = ({ meetingDat, setSelectedMeeting }) => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const { meetingMembers } = meetingDat;
  // Function to format the date
  console.log("meeting", meetingDat);
  // Extract unique meeting dates and attendance data

  // Helper function to format dates
  const formatDated = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString)
      .toLocaleDateString("en-US", options)
      .replace(",", "");
  };

  const getMeetingData = () => {
    const meetingDataMap = new Map();

    meetingMembers.forEach((member) => {
      member.attendance.forEach((attendance) => {
        const formattedDate = formatDated(attendance.meetingDate);
        if (!meetingDataMap.has(formattedDate)) {
          meetingDataMap.set(formattedDate, []);
        }
        if (attendance.isAttend) {
          meetingDataMap
            .get(formattedDate)
            .push(
              `${member.memberId.name.firstName} ${member.memberId.name.lastName}`
            );
        }
      });
    });

    return Array.from(meetingDataMap, ([date, attendees]) => ({
      date,
      attendees,
    }));
  };
  const meetingData = getMeetingData();
  function formatDate(dateString, formatType) {
    const date = new Date(dateString); // Ensure dateString is a valid ISO format

    if (isNaN(date.getTime())) {
      console.error("Invalid Date:", dateString);
      return "Invalid Date";
    }

    if (formatType === "date") {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    }

    if (formatType === "time") {
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return date.toLocaleTimeString("en-GB", options);
    }

    if (formatType === "monthDayYear") {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options).replace(/\s/, ", ");
    }
  }

  // Formatting Start Time (e.g., 10:00 AM)
  const formattedStartTime = formatDate(meetingDat?.meetingTime, "time");

  // Formatting Start Date (e.g., 15 Oct, 2024)
  const formattedStartDate = formatDate(
    meetingDat?.meetingTime,
    "monthDayYear"
  );

  // Formatting End Date (e.g., 22 Oct, 2024)
  const formattedEndDate = formatDate(meetingDat?.endDate, "monthDayYear");

  // Example Output
  console.log(formattedStartTime);
  console.log(formattedStartDate);
  console.log(formattedEndDate);

  const bgColors = [
    "#fff3c4",
    "#e0ebf6",
    "#d0cddd",
    "#d0eafd",
    "#d0cddd",
    "#e0ffd2",
    "#fddac2",
    "#b0d3e8",
  ];

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll">
      <div className=" w-[700px] mx-auto bg-white border border-gray-300 shadow-md p-6 rounded-lg">
        <IoIosCloseCircleOutline
          onClick={() => setSelectedMeeting(null)}
          className="text-xl float-right"
        />
        {/* Creator and Role */}
        <div className="flex space-x-2 items-center mb-4">
          <img
            src={
              meetingDat?.creator.profilePic
                ? meetingDat?.creator.profilePic
                : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
            }
            loading="lazy"
            alt={meetingDat?.creator.name?.firstName}
            className="h-12 w-12 rounded-full ml-2"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {meetingDat?.creator.name?.firstName}{" "}
              {meetingDat?.creator.name?.lastName}
            </h2>
            <p className="text-sm text-gray-600">{meetingDat?.creator.role}</p>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="mb-4">
          <h3 className="text-lg font-bold capitalize">{meetingDat?.title}</h3>
          <p className="text-lg text-gray-700 capitalize">
            {meetingDat?.description}
          </p>
        </div>

        {/* Time & Schedule */}
        <div className="mb-4">
          <p className="text-lg text-gray-600">
            Your presence is requested! Our first meeting is on{" "}
            <span className="font-bold">{formattedStartDate}</span>, continuing
            every{" "}
            <span className="font-bold">
              {meetingDat?.customDays.join(" and ")}
            </span>{" "}
            until <span className="font-bold">{formattedEndDate}</span>. Make
            sure to be on time—{" "}
            <span className="font-bold uppercase">{formattedStartTime}</span>{" "}
            sharp.{" "}
            <span>
              {" "}
              You will get a reminder before 30 minutes of every meeting via
              email.
            </span>
          </p>
        </div>

        {/* Invited Members */}
        <div className="mb-4">
          <h4 className="font-bold text-lg text-gray-600">Invited Members:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            {meetingDat?.meetingMembers.map((item, index) => (
              <div
                key={item?.memberId?.profilePic}
                style={{ backgroundColor: bgColors[index % bgColors.length] }}
                className="flex md:justify-center items-center px-3 py-2 rounded-lg shadow-lg  "
              >
                <img
                  src={
                    item?.memberId?.profilePic
                      ? item?.memberId?.profilePic
                      : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                  }
                  loading="lazy"
                  alt={item?.memberId?.name?.firstName}
                  className="h-9 w-9 rounded-full ml-2"
                />
                <div className="text-lg md:text-[18px] py-1 px-3 rounded-md font-bold capitalize">
                  {item?.memberId?.name?.firstName}{" "}
                  {item?.memberId?.name?.lastName}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className="my-3">
          <h4 className="font-bold text-lg text-gray-600">Attendence:</h4>
          {meetingData?.map(({ date, attendees }) => (
            <>
              <li
                key={date}
                className="text-gray-700 text-[17px] capitalize pl-3 pt-2"
              >
                <strong>{date}:</strong>{" "}
                {attendees?.length > 0
                  ? attendees.join(", ")
                  : "No one attended"}
              </li>
            </>
          ))}
        </ul>

        {/* Update Button       http://localhost:5173/attendance?otp=241930&meetingId=67274fa0e0b950bcffb9235f&date=2024-11-03 */}
        {meetingDat?.attendenceLink !== null && (
          <div className="flex justify-center">
            {meetingDat?.creator._id !== userId && (
              <Link
                to={`http://localhost:5173/attendance?meeting=${meetingDat?.title}&meetingId=${meetingDat?._id}&date=${meetingDat?.meetingTime}`}
                className="px-3 py-2 font-bold text-white [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] rounded-lg shadow hover:bg-green-500 transition-colors"
              >
                Update Attendance
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
