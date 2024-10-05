import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/UserContext";

const MeetingForm = () => {
  const { getAllProjectByUser,userId } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);


  const handleProjectChange = async (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
  
    if (projectId) {
      // Fetch team members based on the selected project
      try {
        const response = await fetch(`http://localhost:3000/api/v1/project-join-request/Accepted/teamMemberOf/${projectId}/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching team members: ${response.statusText}`);
        }
  
        const data = await response.json(); // Convert the response to JSON
        setTeamMembers(data.data); // Assuming the team members are in the 'data' field
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    } else {
      setTeamMembers([]);
    }
  };
  
  // Handle team member checkbox change
  const handleMemberSelect = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedMembers([...selectedMembers, value]); // Add member if checked
    } else {
      setSelectedMembers(selectedMembers.filter((member) => member !== value)); // Remove member if unchecked
    }
  };
  
  const projects = getAllProjectByUser?.data;
  console.log("project", projects);
  // const [formData, setFormData] = useState({
  //   projectId: "",
  //   meetingMembers: [],
  //   title: "",
  //   description: "",
  //   meetingPlatform: {
  //     platform: "",
  //     link: "",
  //   },
  //   duration: "",
  //   meetingTime: "",
  //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get user's current time zone
  //   repeat: "don't repeat",
  //   weeklyRepeat: "",
  //   endDate: "", // Only for "everyday" and "custom"
  // });
  const [formData, setFormData] = useState({
    projectId: "66e7b19955557bdb2d692820",
    creator: "66e6d2dac01285d519e32177",
    meetingMembers: [
      {
        memberId: "66e6d2dac01285d519e32177",
        attendance: [],
      },
    ],
    title: "Meeting Title",
    description: "Meeting Description",
    meetingPlatform: {
      platform: "Zoom",
      link: "https://zoom.us/j/123456789",
    },
    duration: "1 hour",
    meetingTime: "",
    timeZone: "Asia/Dhaka",
    repeat: "custom",
    weeklyRepeat: 2,
    endDate: "2023-03-29T00:00:00.000Z",
    customDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    attendenceLink: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlatformChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      meetingPlatform: { ...formData.meetingPlatform, [name]: value },
    });
  };
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleRepeatChange = (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      repeat: value,
      selectedDays:
        value === "custom" ? [] : value === "everyday" ? daysOfWeek : [], // For 'custom', empty initially, for 'everyday', all days, for 'don't repeat', empty
      weeklyRepeat: value === "custom" ? prevState.weeklyRepeat : "", // Reset weeklyRepeat for non-custom
      endDate: value === "don't repeat" ? "" : prevState.endDate, // Clear endDate for 'don't repeat'
    }));
  };

  const handleDaySelection = (e) => {
    const { value, checked } = e.target;

    setFormData((prevState) => {
      const updatedDays = checked
        ? [...prevState.selectedDays, value] // Add day to selectedDays if checked
        : prevState.selectedDays.filter((day) => day !== value); // Remove day if unchecked

      return {
        ...prevState,
        selectedDays: updatedDays,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Handle successful submission (e.g., show success message, redirect)
      Swal.fire({
        icon: "success",
        title: "Meeting Created!",
        text: "Your meeting has been successfully created.",
      });

      // Optionally, reset the form or redirect to a new page
      // setFormData(initialFormData);
      // navigate('/meetings'); // If you're using react-router
    } catch (error) {
      console.error("Error creating meeting:", error);
      // Handle error (e.g., show error message)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create meeting. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Create Meeting</h1>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Section */}
          <div>
            {/* project */}
            <label
              htmlFor="project"
              className="block text-sm font-medium text-gray-700"
            >
              Project
            </label>
            <select
              id="projectId"
              name="projectId"
              required
              onChange={handleProjectChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select a project</option>
              {projects?.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.projectName}
                </option>
              ))}
            </select>

            {/* title */}

            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mt-4"
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
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />

            {/* description */}

            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mt-4"
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

            {/* platform & link */}

            <div className="flex justify-between items-start">
              <div className="w-6/12 px-2">
                <label
                  htmlFor="date-time"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Platform
                </label>
                <select
                  name="platform"
                  value={formData.meetingPlatform.platform}
                  onChange={handlePlatformChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select a platform</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Webex Meetings">Webex Meetings</option>
                  <option value="Zoho Meetings">Zoho Meetings</option>
                </select>
              </div>
              <div className="w-6/12 px-2">
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mt-4"
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
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Set Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="meetingTime"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="w-6/12 px-2">
                <label
                  htmlFor="repeat"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Repeat
                </label>
                <input
                  type="number"
                  id="repeat"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>

            {/* weekly repeat & end date */}

            <div className="flex justify-between items-start">
              <div className="w-6/12 px-2">
                <label
                  htmlFor="weeklyRepeat"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Weekly Repeat
                </label>
                <input
                  type="number"
                  id="weeklyRepeat"
                  placeholder="Every X weeks"
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="w-6/12 px-2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  End Date
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  placeholder="Every X weeks"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Section  */}
          <div>
            {/* team members */}
            <label
              htmlFor="members"
              className="block text-sm font-medium text-gray-700"
            >
              Select Members
            </label>

            {teamMembers.map((member) => (
            <div key={member?.requestedBy?._id} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={member?.requestedBy?._id}
                value={member?.requestedBy?._id}
                onChange={handleMemberSelect}
                className="mr-2"
              />
              <label htmlFor={member?.requestedBy?._id}>
                <p className="capitalize">{member?.requestedBy?.name?.firstName} {member?.requestedBy?.name?.lastName}</p>
                </label>
            </div>
          ))}
            {/* <div className="flex flex-col">
              <input
                type="text"
                id="members"
                placeholder="Enter member IDs"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-2"
              />
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-2"
              />
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full mb-2"
              />
            </div> */}

            {/* day selection */}

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Select Days
            </label>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <span className="custom-checkbox"></span>
                <input type="checkbox" className="pay-input" />
                <span className="ml-2">Monday</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Tuesday</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Wednesday</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Thursday</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Friday</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Saturday</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Sunday</span>
              </label>
            </div>
          </div>
        </div>

        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save
        </button>
      </div>

      {/* update */}
      <form onSubmit={handleSubmit} className="meeting-form space-y-6">
        <div>
          <label>Project ID</label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Meeting Members</label>
          <input
            type="text"
            name="meetingMembers"
            onChange={handleInputChange}
            placeholder="Enter member IDs, comma separated"
          />
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <div>
            <label>Meeting Platform</label>
            <select
              name="platform"
              value={formData.meetingPlatform.platform}
              onChange={handlePlatformChange}
              required
            >
              <option value="">Select a platform</option>
              <option value="Zoom">Zoom</option>
              <option value="Google Meet">Google Meet</option>
              <option value="Webex Meetings">Webex Meetings</option>
              <option value="Zoho Meetings">Zoho Meetings</option>
            </select>
          </div>
          <input
            type="url"
            name="link"
            placeholder="Platform link (e.g., Zoom link)"
            value={formData.meetingPlatform.link}
            onChange={handlePlatformChange}
            required
          />
        </div>

        <div>
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 1 hour"
            required
          />
        </div>

        <div>
          <label>Meeting Time</label>
          <input
            type="datetime-local"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Repeat</label>
          <select
            name="repeat"
            value={formData.repeat}
            onChange={handleRepeatChange}
          >
            <option value="don't repeat">Don't Repeat</option>
            <option value="everyday">Everyday</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {formData.repeat === "custom" && (
          <div>
            <label>Weekly Repeat (Every X weeks)</label>
            <input
              type="number"
              name="weeklyRepeat"
              value={formData.weeklyRepeat}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
        )}

        {formData.repeat === "custom" && (
          <div className="day-selection">
            <label>Select Days:</label>
            {daysOfWeek.map((day) => (
              <div key={day}>
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  checked={formData?.selectedDays?.includes(day)}
                  onChange={handleDaySelection}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
        )}

        {(formData.repeat === "everyday" || formData.repeat === "custom") && (
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit">Create Meeting</button>
      </form>
    </>
  );
};

export default MeetingForm;
// ah, de verdad estoy cansado ,  que te gustaria comer hoy , sobas que estoy ocupado ,  tal vez sea la proxima semana , te sientas en sus prernas y le masajeas la nuca , no agas , me rellaja demasiado, si estoy relajado no voy a poder trabajar , no te gusta que trabaje? comienzas a bajar tus manos por su espalda, debo volver al trabajo estus muy caliente, noona tal vez sera despues,  despues? si, sera despies,  debo trabazor,  haces pucheros,  te ves tan linda cuando haces eso, levantate, intentas sacarle la camisa, metes tu mano en su pantalon, eh dicha que no !, no puedes esperar una semanoa? solo loca, intetas tocar su miembro, no puedes tocarlo, ah, esta prohibido, solo puedes tocar fuera del pantalon, logras sacarle la camison, oye, devuelve eso! porque me haces esto? dimelo, deja de tocarlo, noona, le quitas los pantalones, de verdad urge? deberia castigarte despues de esto, deja de tocarlo ya esta duro, cual es la prisa por hacerllo?ahora que lo pienso ya no e tocado tu cuerpo,  sacas su miembro, dejame , ahora sueltalo
