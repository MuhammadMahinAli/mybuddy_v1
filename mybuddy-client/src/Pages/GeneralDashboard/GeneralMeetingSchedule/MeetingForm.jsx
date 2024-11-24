import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Attendence from "./Attendence";
import { Link } from "react-router-dom";

const MeetingForm = ({ setIsOpenMeeting, getAllProjectByUser, userId }) => {
  const [selectedProject, setSelectedProject] = useState("");

  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isOpenAttendForm, setIsOpenAttendForm] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const handleOpenAttendForm = (meeting) => {
    setSelectedMeeting(meeting); // Store the clicked meeting details
    setIsOpenAttendForm(true); // Open the attendance form
  };

  const [formData, setFormData] = useState({
    projectId: "",
    creator: userId, // Assuming userId is the creator
    meetingMembers: [],
    title: "",
    description: "",
    meetingPlatform: {
      platform: "",
      link: "",
    },
    duration: 30,
    meetingTime: "",
    timeZone: "Asia/Dhaka",
    repeat: "custom",
    weeklyRepeat: 0,
    endDate: "",
    customDays: [],
    attendanceLink: null,
  });

  const handleProjectChange = async (e) => {
    const projectID = e.target.value;
    setSelectedProject(projectID);

    setFormData((prev) => ({
      ...prev,
      projectId: projectID,
    }));

    if (projectID) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/project-join-request/Accepted/teamMemberOf/${projectID}/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error(
            `Error fetching team members: ${response.statusText}`
          );

        const data = await response.json();
        setTeamMembers(data.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    } else {
      setTeamMembers([]);
      setFormData((prev) => ({
        ...prev,
        projectId: "",
      }));
    }
  };

  const handleMemberSelect = (e) => {
    const { value, checked } = e.target;
    setSelectedMembers((prev) =>
      checked ? [...prev, value] : prev.filter((member) => member !== value)
    );

    // Update meetingMembers in formData
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        meetingMembers: [
          ...prev.meetingMembers,
          { memberId: value, attendance: [] },
        ],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        meetingMembers: prev.meetingMembers.filter(
          (member) => member.memberId !== value
        ),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "repeat" && value === "everyday") {
      // Set customDays to all days of the week when repeat is 'everyday'
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        customDays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      }));
    } else if (name === "repeat" && value !== "everyday") {
      // Reset customDays when repeat is not 'everyday'
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        customDays: [],
      }));
    } else if (name === "duration") {
      // Save the duration as an integer
      const numericValue = parseInt(value, 10); // Convert to an integer

      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue, // Save duration as a number
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePlatformChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      meetingPlatform: { ...formData.meetingPlatform, [name]: value },
    });
  };

  useEffect(() => {
    if (formData.meetingTime) {
      const meetingTimeDate = new Date(formData.meetingTime);

      if (isNaN(meetingTimeDate.getTime())) {
        console.error("Invalid meetingTime provided");
        return;
      }

      if (formData.repeat === "do not repeat") {
        // Set endDate same as meetingTime if 'do not repeat'
        setFormData((prev) => ({
          ...prev,
          endDate: formData.meetingTime,
        }));
      } else {
        // Calculate endDate based on weeklyRepeat
        const calculatedEndDate = dayjs(formData.meetingTime)
          .add(formData.weeklyRepeat, "week") // Add the number of weeks
          .toISOString(); // Convert to ISO format (or your preferred format)

        setFormData((prev) => ({
          ...prev,
          endDate: calculatedEndDate,
        }));
      }
    }
  }, [formData.repeat, formData.meetingTime, formData.weeklyRepeat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Get current time and calculate the 40-minute future time limit
  const currentTime = dayjs();
  const minAllowedTime = currentTime.add(40, "minute");

  // Convert meetingTime from the formData to a Day.js object
  const meetingTime = dayjs(formData.meetingTime);

  // Check if meetingTime is in the past or less than 40 minutes from now
  if (!meetingTime.isValid() || meetingTime.isBefore(currentTime)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Meeting Time",
      text: "Meeting time cannot be in the past and time should be at least 40 minutes from the current time.",
    });
    return;
  }

  if (meetingTime.isBefore(minAllowedTime)) {
    Swal.fire({
      icon: "error",
      title: "Meeting Time Too Soon",
      text: "Meeting time should be at least 40 minutes from the current time.",
    });
    return;
  }
    console.log("form", formData);

    const requiredFields = [
      { key: "projectId", label: "Project ID" },
      { key: "title", label: "Meeting Title" },
      { key: "description", label: "Description" },
      { key: "meetingPlatform.platform", label: "Platform" },
      { key: "meetingPlatform.link", label: "Meeting Link" },
      { key: "duration", label: "Duration" },
      { key: "meetingTime", label: "Meeting Time" },
      { key: "endDate", label: "End Date" },
      {key:"weeklyRepeat", label:"Weekly Repeat"}
    ];
  
    // Initial emptyFields array to track empty required fields
    const emptyFields = [];
  
    // Check each required field if it's empty
    requiredFields.forEach(({ key, label }) => {
      const keys = key.split(".");
      let value = formData;
      keys.forEach((k) => {
        value = value[k];
      });
      if (!value) {
        emptyFields.push(label);
      }
    });
  
    // Check if meetingMembers array is empty
    if (formData.meetingMembers.length === 0) {
      emptyFields.push("Select Members");
    }
  
    // Check if customDays array is empty when repeat is not "do not repeat"
    if (formData.repeat !== "dontRepeat" && formData.customDays.length === 0) {
      emptyFields.push("Select Days");
    }
  
    // Show SweetAlert if there are any empty fields
    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: `Please fill in the following fields: ${emptyFields.join(", ")}`
      });
      return; // Stop the function if there are empty fields
    }

    console.log(formData);

    try {
      // Submit form data to the API
      const response = await fetch(
        "http://localhost:3000/api/v1/meeting/create-new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Meeting created successfully:", data);

      
      Swal.fire({
        icon: "success",
        title: "Meeting Created!",
        text: "Your meeting has been successfully created.",
      });
      setIsOpenMeeting(false);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error creating meeting:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create meeting. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0  flex justify-center items-center bg-black/40 bg-opacity-50 w-screen h-screen overflow-y-scroll">
        <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] xl:h-[600px] 3xl:h-[700px] 3xl:w-[800px] overflow-y-scroll cursor-pointer">
          <IoIosCloseCircleOutline
            onClick={() => setIsOpenMeeting(false)}
            className="text-xl float-right"
          />
          <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Create Meeting</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Left Section */}
                <div>
                  {/* project */}
                  <label
                    htmlFor="projectId"
                    className="block text-[16px]  text-gray-700 font-bold"
                  >
                    Project
                  </label>
                  <select
                    id="projectId"
                    name="projectId"
        
                    onChange={handleProjectChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select a project</option>
                    {getAllProjectByUser?.data?.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                  {teamMembers?.length !== 0 && (
                    <>
                      {/* title */}
                      <>
                        <label
                          htmlFor="title"
                          className="block text-[16px]  text-gray-700 font-bold mt-4"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          id="title"
                          placeholder="Meeting Title"
              
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </>
                      {/* description */}
                      <>
                        <label
                          htmlFor="description"
                          className="block text-[16px]  text-gray-700 font-bold mt-4"
                        >
                          Description
                        </label>
                        <input
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          id="description"
                          placeholder="Meeting Description"
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      </>
                      {/* duration */}

                      <div>
                        <label
                          htmlFor="duration"
                          className="text-[16px]  text-gray-700 font-bold"
                        >
                          Duration
                        </label>
                        <select
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
              
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        >
                          <option value={60}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={75}>1 hour 15 minutes</option>
                          <option value={90}>1 hour 30 minutes</option>
                          <option value={105}>1 hour 45 minutes</option>
                          <option value={120}>2 hours</option>

                          <option value={135}>2 hours 15 minutes</option>
                          <option value={150}>2 hours 30 minutes</option>
                          <option value={165}>2 hours 45 minutes</option>
                          <option value={180}>3 hours</option>

                          <option value={180}>3 hours</option>
                          <option value={195}>3 hours 15 minutes</option>
                          <option value={210}>3 hours 30 minutes</option>
                          <option value={225}>3 hour 45 minutes</option>
                          <option value={240}>4 hours</option>
                          <option value={240}>4 hours</option>
                          <option value={255}>4 hours 15 minutes</option>
                          <option value={270}>4 hours 30 minutes</option>
                          <option value={285}>4 hours 45 minutes</option>
                          <option value={300}>5 hours</option>
                        </select>
                      </div>

                      {/* platform & link */}

                      <div className="flex justify-between items-start">
                        <div className="w-6/12 px-2">
                          <label
                            htmlFor="date-time"
                            className="block text-[16px]  text-gray-700 font-bold mt-4"
                          >
                            Platform
                          </label>
                          <select
                            name="platform"
                            value={formData.meetingPlatform.platform}
                            onChange={handlePlatformChange}
                
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          >
                            <option value="">Select a platform</option>
                            <option value="Zoom">Zoom</option>
                            <option value="Google Meet">Google Meet</option>
                            <option value="Webex Meetings">
                              Webex Meetings
                            </option>
                            <option value="Zoho Meetings">Zoho Meetings</option>
                          </select>
                        </div>
                        <div className="w-6/12 px-2">
                          <label
                            htmlFor="link"
                            className="block text-[16px]  text-gray-700 font-bold mt-4"
                          >
                            Link
                          </label>
                          <input
                            type="url"
                            name="link"
                            placeholder="Platform link (e.g., Zoom link)"
                            value={formData.meetingPlatform.link}
                            onChange={handlePlatformChange}
                            id="link"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                      </div>

                      {/* date & repeat */}

                      <div className="flex justify-between items-start">
                        <div className="w-6/12 px-2">
                          <label
                            htmlFor="meetingTime"
                            className="block text-[16px]  text-gray-700 font-bold mt-4"
                          >
                            Set Date & Time
                          </label>
                          <input
                            type="datetime-local"
                            id="meetingTime"
                
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingTime: e.target.value,
                              })
                            }
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="w-6/12 px-2">
                          <label
                            htmlFor="repeat"
                            className="block text-[16px]  text-gray-700 font-bold mt-4"
                          >
                            Repeat
                          </label>
                          <select
                            id="repeat"
                            name="repeat"
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          >
                            <option value="custom">Custom</option>

                            <option value="dontRepeat">Don't Repeat</option>
                            <option value="everyday">Every Day</option>
                          </select>
                        </div>
                      </div>

                      {/* weekly repeat & end date */}

                      <div className="flex justify-between items-start">
                        <div className="w-6/12 px-2">
                          <label
                            htmlFor="weeklyRepeat"
                            className="block text-[16px]  text-gray-700 font-bold mt-4"
                          >
                            Weekly Repeat
                          </label>
                          <input
                            type="number"
                            id="weeklyRepeat"
                            value={formData.weeklyRepeat || "0"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                weeklyRepeat: e.target.value,
                              })
                            }
                            min="0"
                
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>

                        <div className="w-6/12 px-2">
                          <label
                            htmlFor="endDate"
                            className="block text-[16px]  text-gray-700 font-bold mt-4"
                          >
                            End Date
                          </label>
                          <input
                            type="date"
                            id="endDate"
                            value={dayjs(formData.endDate).format("YYYY-MM-DD")} // Format for input
                            readOnly={formData.repeat === "do not repeat"}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Section  */}
                <div>
                  {/* team members */}
                  <label
                    htmlFor="members"
                    className="block text-[16px]  text-gray-700 font-bold"
                  >
                    Select Members
                  </label>

                  {teamMembers?.length === 0 ? (
                    <p>
                      {selectedProject === ""
                        ? "Select a project first"
                        : "No Member working"}
                    </p>
                  ) : (
                    <>
                      {teamMembers.map((member) => (
                        <div
                          key={member?.requestedBy?._id}
                          className="flex items-center mt-2"
                        >
                          <input
                            type="checkbox"
                            id={member?.requestedBy?._id}
                            value={member?.requestedBy?._id}
                            onChange={handleMemberSelect}
                            className="mr-2"
                          />
                          <label htmlFor={member?.requestedBy?._id}>
                            <p className="capitalize">
                              {member?.requestedBy?.name?.firstName}{" "}
                              {member?.requestedBy?.name?.lastName}
                            </p>
                          </label>
                        </div>
                      ))}
                    </>
                  )}

                  {/* day selection */}
                  {formData?.repeat !== "dontRepeat" &&
                    teamMembers?.length !== 0 && (
                      <>
                        <label className="block text-[16px] pb-3  text-gray-700 font-bold mt-4">
                          Select Days
                        </label>
                        {formData.repeat === "custom" ? (
                          <div>
                            {[
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                            ].map((day) => (
                              <div key={day}>
                                <input
                                  type="checkbox"
                                  id={day}
                                  value={day}
                                  checked={
                                    formData.repeat === "everyday" ||
                                    formData.customDays.includes(day)
                                  }
                                  onChange={(e) => {
                                    const { value, checked } = e.target;
                                    const selectedDays = checked
                                      ? [...formData.customDays, value]
                                      : formData.customDays.filter(
                                          (d) => d !== value
                                        );
                                    setFormData({
                                      ...formData,
                                      customDays: selectedDays,
                                    });
                                  }}
                                />
                                <label htmlFor={day} className="pl-3">
                                  {day}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
                            {[
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                            ].map((day) => (
                              <div key={day}>
                                <input
                                  type="checkbox"
                                  id={day}
                                  value={day}
                                  checked
                                
                                />
                                <label className="pl-3" htmlFor={day}>{day}</label>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* old */}
    </>
  );
};

export default MeetingForm;

// import { useContext, useState } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../Context/UserContext";

// const MeetingForm = () => {
//   const { getAllProjectByUser,userId } = useContext(AuthContext);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const handleProjectChange = async (e) => {
//     const projectId = e.target.value;
//     setSelectedProject(projectId);

//     if (projectId) {
//       // Fetch team members based on the selected project
//       try {
//         const response = await fetch(`http://localhost:3000/api/v1/project-join-request/Accepted/teamMemberOf/${projectId}/${userId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error fetching team members: ${response.statusText}`);
//         }

//         const data = await response.json(); // Convert the response to JSON
//         setTeamMembers(data.data); // Assuming the team members are in the 'data' field
//       } catch (error) {
//         console.error('Error fetching team members:', error);
//       }
//     } else {
//       setTeamMembers([]);
//     }
//   };

//   // Handle team member checkbox change
//   const handleMemberSelect = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedMembers([...selectedMembers, value]); // Add member if checked
//     } else {
//       setSelectedMembers(selectedMembers.filter((member) => member !== value)); // Remove member if unchecked
//     }
//   };

//   const projects = getAllProjectByUser?.data;
//   console.log("project", projects);
//   // const [formData, setFormData] = useState({
//   //   projectId: "",
//   //   meetingMembers: [],
//   //   title: "",
//   //   description: "",
//   //   meetingPlatform: {
//   //     platform: "",
//   //     link: "",
//   //   },
//   //   duration: "",
//   //   meetingTime: "",
//   //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get user's current time zone
//   //   repeat: "dontRepeat",
//   //   weeklyRepeat: "",
//   //   endDate: "", // Only for "everyday" and "custom"
//   // });
//   const [formData, setFormData] = useState({
//     projectId: "66e7b19955557bdb2d692820",
//     creator: "66e6d2dac01285d519e32177",
// meetingMembers: [
//   {
//     memberId: "66e6d2dac01285d519e32177",
//     attendance: [],
//   },
// ],
//     title: "Meeting Title",
//     description: "Meeting Description",
//     meetingPlatform: {
//       platform: "Zoom",
//       link: "https://zoom.us/j/123456789",
//     },
//     duration: "1 hour",
//     meetingTime: "",
//     timeZone: "Asia/Dhaka",
//     repeat: "custom",
//     weeklyRepeat: 2,
//     endDate: "2023-03-29T00:00:00.000Z",
//     customDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
//     attendenceLink: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePlatformChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       meetingPlatform: { ...formData.meetingPlatform, [name]: value },
//     });
//   };
//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const handleRepeatChange = (e) => {
//     const { value } = e.target;

//     setFormData((prevState) => ({
//       ...prevState,
//       repeat: value,
//       selectedDays:
//         value === "custom" ? [] : value === "everyday" ? daysOfWeek : [], // For 'custom', empty initially, for 'everyday', all days, for 'dontRepeat', empty
//       weeklyRepeat: value === "custom" ? prevState.weeklyRepeat : "", // Reset weeklyRepeat for non-custom
//       endDate: value === "dontRepeat" ? "" : prevState.endDate, // Clear endDate for 'dontRepeat'
//     }));
//   };

//   const handleDaySelection = (e) => {
//     const { value, checked } = e.target;

//     setFormData((prevState) => {
//       const updatedDays = checked
//         ? [...prevState.selectedDays, value] // Add day to selectedDays if checked
//         : prevState.selectedDays.filter((day) => day !== value); // Remove day if unchecked

//       return {
//         ...prevState,
//         selectedDays: updatedDays,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

// try {
//   // Submit form data to the API
//   const response = await fetch(
//     "http://localhost:3000/api/v1/meeting/create-new",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   const data = await response.json();
//   console.log("Meeting created successfully:", data);

//   // Handle successful submission (e.g., show success message, redirect)
//   Swal.fire({
//     icon: "success",
//     title: "Meeting Created!",
//     text: "Your meeting has been successfully created.",
//   });

//   // Optionally, reset the form or redirect to a new page
//   // setFormData(initialFormData);
//   // navigate('/meetings'); // If you're using react-router
// } catch (error) {
//   console.error("Error creating meeting:", error);
//   // Handle error (e.g., show error message)
//   Swal.fire({
//     icon: "error",
//     title: "Error",
//     text: "Failed to create meeting. Please try again.",
//   });
// }
//   };

//   return (
//     <>
// <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
//   <h1 className="text-2xl font-semibold mb-6">Create Meeting</h1>
//   <div className="grid grid-cols-2 gap-4">
//     {/* Left Section */}
//     <div>
//       {/* project */}
//       <label
//         htmlFor="project"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Project
//       </label>
//       <select
//         id="projectId"
//         name="projectId"
//         required
//         onChange={handleProjectChange}
//         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//       >
//         <option value="">Select a project</option>
//         {projects?.map((project) => (
//           <option key={project._id} value={project._id}>
//             {project.projectName}
//           </option>
//         ))}
//       </select>

//       {/* title */}

//       <label
//         htmlFor="title"
//         className="block text-sm font-medium text-gray-700 mt-4"
//       >
//         Title
//       </label>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleInputChange}
//         id="title"
//         placeholder="Meeting Title"
//         required
//         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//       />

//       {/* description */}

//       <label
//         htmlFor="description"
//         className="block text-sm font-medium text-gray-700 mt-4"
//       >
//         Description
//       </label>
//       <input
//         name="description"
//         value={formData.description}
//         onChange={handleInputChange}
//         id="description"
//         placeholder="Meeting Description"
//         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//       />

//       {/* platform & link */}

//       <div className="flex justify-between items-start">
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="date-time"
//             className="block text-sm font-medium text-gray-700 mt-4"
//           >
//             Platform
//           </label>
//           <select
//             name="platform"
//             value={formData.meetingPlatform.platform}
//             onChange={handlePlatformChange}
// 
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           >
//             <option value="">Select a platform</option>
//             <option value="Zoom">Zoom</option>
//             <option value="Google Meet">Google Meet</option>
//             <option value="Webex Meetings">Webex Meetings</option>
//             <option value="Zoho Meetings">Zoho Meetings</option>
//           </select>
//         </div>
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="link"
//             className="block text-sm font-medium text-gray-700 mt-4"
//           >
//             Link
//           </label>
//           <input
//             type="url"
//             name="link"
//             placeholder="Platform link (e.g., Zoom link)"
//             value={formData.meetingPlatform.link}
//             onChange={handlePlatformChange}
//             id="link"
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           />
//         </div>
//       </div>

//       {/* date & repeat */}

//       <div className="flex justify-between items-start">
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="meetingTime"
//             className="block text-sm font-medium text-gray-700 mt-4"
//           >
//             Set Date & Time
//           </label>
//           <input
//             type="datetime-local"
//             id="meetingTime"
//             required
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           />
//         </div>
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="repeat"
//             className="block text-sm font-medium text-gray-700 mt-4"
//           >
//             Repeat
//           </label>
//           <input
//             type="number"
//             id="repeat"
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           />
//         </div>
//       </div>

//       {/* weekly repeat & end date */}

//       <div className="flex justify-between items-start">
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="weeklyRepeat"
//             className="block text-sm font-medium text-gray-700 mt-4"
//           >
//             Weekly Repeat
//           </label>
//           <input
//             type="number"
//             id="weeklyRepeat"
//             placeholder="Every X weeks"
//             required
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           />
//         </div>
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="endDate"
//             className="block text-sm font-medium text-gray-700 mt-4"
//           >
//             End Date
//           </label>
//           <input
//             type="datetime-local"
//             id="endDate"
//             placeholder="Every X weeks"
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           />
//         </div>
//       </div>
//     </div>

//     {/* Right Section  */}
//     <div>
//       {/* team members */}
//       <label
//         htmlFor="members"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Select Members
//       </label>

//       {teamMembers.map((member) => (
//       <div key={member?.requestedBy?._id} className="flex items-center mt-2">
//         <input
//           type="checkbox"
//           id={member?.requestedBy?._id}
//           value={member?.requestedBy?._id}
//           onChange={handleMemberSelect}
//           className="mr-2"
//         />
//         <label htmlFor={member?.requestedBy?._id}>
//           <p className="capitalize">{member?.requestedBy?.name?.firstName} {member?.requestedBy?.name?.lastName}</p>
//           </label>
//       </div>
//     ))}
//       {/* <div className="flex flex-col">
//         <input
//           type="text"
//           id="members"
//           placeholder="Enter member IDs"
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-2"
//         />
//         <input
//           type="text"
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-2"
//         />
//         <input
//           type="text"
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-2"
//         />
//       </div> */}

//       {/* day selection */}

//       <label className="block text-sm font-medium text-gray-700 mt-4">
//         Select Days
//       </label>
//       <div className="flex flex-col">
//         <label className="inline-flex items-center mt-2">
//           <span className="custom-checkbox"></span>
//           <input type="checkbox" className="pay-input" />
//           <span className="ml-2">Monday</span>
//         </label>
//         <label className="inline-flex items-center mt-2">
//           <input type="checkbox" className="form-checkbox" />
//           <span className="ml-2">Tuesday</span>
//         </label>
//         <label className="inline-flex items-center mt-2">
//           <input type="checkbox" className="form-checkbox" />
//           <span className="ml-2">Wednesday</span>
//         </label>
//         <label className="inline-flex items-center mt-2">
//           <input type="checkbox" className="form-checkbox" />
//           <span className="ml-2">Thursday</span>
//         </label>
//         <label className="inline-flex items-center mt-2">
//           <input type="checkbox" className="form-checkbox" />
//           <span className="ml-2">Friday</span>
//         </label>
//         <label className="inline-flex items-center mt-2">
//           <input type="checkbox" className="form-checkbox" />
//           <span className="ml-2">Saturday</span>
//         </label>
//         <label className="inline-flex items-center mt-2">
//           <input type="checkbox" className="form-checkbox" />
//           <span className="ml-2">Sunday</span>
//         </label>
//       </div>
//     </div>
//   </div>

//   <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//     Save
//   </button>
// </div>

//       {/* update */}
//       <form onSubmit={handleSubmit} className="meeting-form space-y-6">
//         <div>
//           <label>Project ID</label>
//           <input
//             type="text"
//             name="projectId"
//             value={formData.projectId}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Meeting Members</label>
//           <input
//             type="text"
//             name="meetingMembers"
//             onChange={handleInputChange}
//             placeholder="Enter member IDs, comma separated"
//           />
//         </div>

//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div>
//           <div>
//             <label>Meeting Platform</label>
//             <select
//               name="platform"
//               value={formData.meetingPlatform.platform}
//               onChange={handlePlatformChange}
//               required
//             >
//               <option value="">Select a platform</option>
//               <option value="Zoom">Zoom</option>
//               <option value="Google Meet">Google Meet</option>
//               <option value="Webex Meetings">Webex Meetings</option>
//               <option value="Zoho Meetings">Zoho Meetings</option>
//             </select>
//           </div>
//           <input
//             type="url"
//             name="link"
//             placeholder="Platform link (e.g., Zoom link)"
//             value={formData.meetingPlatform.link}
//             onChange={handlePlatformChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Duration</label>
//           <input
//             type="text"
//             name="duration"
//             value={formData.duration}
//             onChange={handleInputChange}
//             placeholder="e.g., 1 hour"
//             required
//           />
//         </div>

//         <div>
//           <label>Meeting Time</label>
//           <input
//             type="datetime-local"
//             name="meetingTime"
//             value={formData.meetingTime}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Repeat</label>
//           <select
//             name="repeat"
//             value={formData.repeat}
//             onChange={handleRepeatChange}
//           >
//             <option value="dontRepeat">Don't Repeat</option>
//             <option value="everyday">Everyday</option>
//             <option value="custom">Custom</option>
//           </select>
//         </div>

//         {formData.repeat === "custom" && (
//           <div>
//             <label>Weekly Repeat (Every X weeks)</label>
//             <input
//               type="number"
//               name="weeklyRepeat"
//               value={formData.weeklyRepeat}
//               onChange={handleInputChange}
//               min="1"
//               required
//             />
//           </div>
//         )}

//         {formData.repeat === "custom" && (
//           <div className="day-selection">
//             <label>Select Days:</label>
//             {daysOfWeek.map((day) => (
//               <div key={day}>
//                 <input
//                   type="checkbox"
//                   id={day}
//                   value={day}
//                   checked={formData?.selectedDays?.includes(day)}
//                   onChange={handleDaySelection}
//                 />
//                 <label htmlFor={day}>{day}</label>
//               </div>
//             ))}
//           </div>
//         )}

//         {(formData.repeat === "everyday" || formData.repeat === "custom") && (
//           <div>
//             <label>End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         )}

//         <button type="submit">Create Meeting</button>
//       </form>
//     </>
//   );
// };

// export default MeetingForm;
// ah, de verdad estoy cansado ,  que te gustaria comer hoy , sobas que estoy ocupado ,  tal vez sea la proxima semana , te sientas en sus prernas y le masajeas la nuca , no agas , me rellaja demasiado, si estoy relajado no voy a poder trabajar , no te gusta que trabaje? comienzas a bajar tus manos por su espalda, debo volver al trabajo estus muy caliente, noona tal vez sera despues,  despues? si, sera despies,  debo trabazor,  haces pucheros,  te ves tan linda cuando haces eso, levantate, intentas sacarle la camisa, metes tu mano en su pantalon, eh dicha que no !, no puedes esperar una semanoa? solo loca, intetas tocar su miembro, no puedes tocarlo, ah, esta prohibido, solo puedes tocar fuera del pantalon, logras sacarle la camison, oye, devuelve eso! porque me haces esto? dimelo, deja de tocarlo, noona, le quitas los pantalones, de verdad urge? deberia castigarte despues de esto, deja de tocarlo ya esta duro, cual es la prisa por hacerllo?ahora que lo pienso ya no e tocado tu cuerpo,  sacas su miembro, dejame , ahora sueltalo

//
//
// <>
//             <label className="block text-sm font-medium text-gray-700 mt-4">
//               Select Days
//             </label>
//             {formData.repeat === "custom" ?
//               <div>
//                 <label>Select Custom Days:</label>
//                 {[
//                   "Sunday",
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ].map((day) => (
//                   <div key={day}>
//                     <input
//                       type="checkbox"
//                       id={day}
//                       value={day}
//                       checked={
//                         formData.repeat === "everyday" ||
//                         formData.customDays.includes(day)
//                       }
//                       onChange={(e) => {
//                         const { value, checked } = e.target;
//                         const selectedDays = checked
//                           ? [...formData.customDays, value]
//                           : formData.customDays.filter((d) => d !== value);
//                         setFormData({ ...formData, customDays: selectedDays });
//                       }}
//                     />
//                     <label htmlFor={day}>{day}</label>
//                   </div>
//                 ))}
//               </div>
//               :
//               <div>
//                 <label>Select Custom Days:</label>
//                 {[
//                   "Sunday",
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ].map((day) => (
//                   <div key={day}>
//                     <input
//                       type="checkbox"
//                       id={day}
//                       value={day}
//                       checked
//                     />
//                     <label htmlFor={day}>{day}</label>
//                   </div>
//                 ))}
//               </div>
//             }
//             </>
