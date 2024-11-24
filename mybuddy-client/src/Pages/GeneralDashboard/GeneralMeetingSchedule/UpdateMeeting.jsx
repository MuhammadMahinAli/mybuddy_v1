import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUpdateMeetingInfoMutation } from "../../../features/meeting/meetingApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";


const UpdateMeeting = ({meetingData,setIsOpenUpdateMeeting,setSelectMeeting}) => {
    const [updateMeetingInfo]= useUpdateMeetingInfoMutation()
    // const meetingData = {
    //   meetingPlatform: {
    //     platform: "Zoom",
    //     link: "https://zoom.com",
    //   },
    //   _id: "6737f85ad1b5e3d368295a94",
    //   projectId: {
    //     _id: "66e7b19955557bdb2d692820",
    //     projectName: "My  test",
    //   },
    //   creator: {
    //     _id: "66e6d2dac01285d519e32177",
    //     email: "shadrinmoni15@gmail.com",
    //     name: {
    //       firstName: "Jane",
    //       lastName: "Thompson",
    //       _id: "66ed67c443c00c866e98ec15",
    //     },
    //     profilePic: "",
    //   },
    //   meetingMembers: [
    //     {
    //       memberId: {
    //         _id: "66e6d2dac01285d519e32177",
    //         email: "shadrinmoni15@gmail.com",
    //         name: {
    //           firstName: "Jane",
    //           lastName: "Thompson",
    //           _id: "66ed67c443c00c866e98ec15",
    //         },
    //         profilePic: "",
    //       },
    //     },
    //     {
    //       memberId: {
    //         _id: "668e17dd91cba51e5b7481c3",
    //         email: "nemecay912@cartep.com",
    //         name: {
    //           firstName: "Jhon ",
    //           lastName: "Doe",
    //           _id: "66d1420c28382aba70fc1cfc",
    //         },
    //         profilePic: "",
    //       },
    //     },
    //   ],
    //   title: "Setup",
    //   description: "Setup",
    //   duration: 30,
    //   meetingTime: "2024-11-16T13:45:00.000Z",
    //   timeZone: "Asia/Dhaka",
    //   repeat: "custom",
    //   weeklyRepeat: 1,
    //   endDate: "2024-11-23T13:45:00.000Z",
    //   customDays: ["Sunday"],
    // };
    // State for editable fields
    const [formData, setFormData] = useState({
      title: meetingData?.title || "",
      description: meetingData?.description || "",
      duration: meetingData?.duration || "",
      platform: meetingData?.meetingPlatform?.platform || "",
      link: meetingData?.meetingPlatform?.link || "",
      meetingTime: meetingData?.meetingTime || "",
      timeZone: meetingData?.timeZone || "",
      repeat: meetingData?.repeat || "",
      weeklyRepeat: meetingData?.weeklyRepeat || 0,
      endDate: meetingData?.endDate || "",
      customDays: meetingData?.customDays || [],
    });
  
    // Update form field values
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    useEffect(() => {
      if (formData.meetingTime) {
        const meetingTimeDate = new Date(formData.meetingTime);
  
        if (isNaN(meetingTimeDate.getTime())) {
          console.error("Invalid meetingTime provided");
          return;
        }
  
        if (formData.repeat === "do not repeat") {
          setFormData((prev) => ({
            ...prev,
            endDate: formData.meetingTime,
          }));
        } else {
          // Calculate endDate based on weeklyRepeat
          const calculatedEndDate = dayjs(formData.meetingTime)
            .add(formData.weeklyRepeat, "week") 
            .toISOString(); 
  
          setFormData((prev) => ({
            ...prev,
            endDate: calculatedEndDate,
          }));
        }
      }
    }, [formData.repeat, formData.meetingTime, formData.weeklyRepeat]);
  
    // Handle form submission
    const handleSubmit = async(e) => {
      e.preventDefault();
      const updatedMeetingData = {
        ...meetingData,
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        meetingPlatform: {
          platform: formData.platform,
          link: formData.link,
        },
        meetingTime: formData.meetingTime,
        timeZone: formData.timeZone,
        repeat: formData.repeat,
        weeklyRepeat: formData.weeklyRepeat,
        endDate: formData.endDate,
        customDays: formData.customDays,
      };
  
     
  
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
        { key: "title", label: "Meeting Title" },
        { key: "description", label: "Description" },
        { key: "platform", label: "Platform" },
        { key: "link", label: "Meeting Link" },
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
  
      try {
        
        // Call the update function with selected fund ID and post data
        await updateMeetingInfo({
            id: meetingData?._id, // Ensure the correct ID is passed
            data: updatedMeetingData,
          }).unwrap();
        setIsOpenUpdateMeeting(false);
        setSelectMeeting(null);

        // Show success message
        Swal.fire({
          icon: "success",
          title: " Updated",
          text: `You have successfully updated meeting information.`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Optionally, update the UI without reloading
        // For example, refetch the funds or update the local state
      } catch (error) {
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Failed to Update",
          text: "There was an error.",
        });
        console.error("Error updating status:", error);
      }
  
      
    };
    return (
        <div className="fixed top-0 left-0  flex justify-center items-center bg-black/40 bg-opacity-50 w-screen h-screen overflow-y-scroll">
        <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[700px] xl:h-[600px] 3xl:h-[700px] 3xl:w-[800px] overflow-y-scroll cursor-pointer">
          <IoIosCloseCircleOutline
            onClick={() => setIsOpenUpdateMeeting(false)}
            className="text-xl float-right"
          />
          <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Create Meeting</h1>
            <div>
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
            value={formData.platform}
            onChange={handleInputChange}
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
            className="block text-[16px]  text-gray-700 font-bold mt-4"
          >
            Link
          </label>
          <input
            type="url"
            name="link"
            placeholder="Platform link (e.g., Zoom link)"
            value={formData.link}
            onChange={handleInputChange}
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
            value={formData?.meetingTime}
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
            <option value="custom">Custom</option>{" "}
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
     
      {/* day selection */}
      {formData?.repeat !== "dontRepeat" &&
        meetingData?.meetingMembers?.length !== 0 && (
          <>
            <label className="block text-[16px] pb-3 text-gray-700 font-bold mt-4">
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
                  <div key={day} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={day}
                      value={day}
                      checked={formData.customDays.includes(day)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setFormData((prev) => ({
                          ...prev,
                          customDays: checked
                            ? [...prev.customDays, value]
                            : prev.customDays.filter((d) => d !== value),
                        }));
                      }}
                    />
                    <label htmlFor={day} className="ml-2">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {(() => {
                  // Automatically populate customDays with all days if not "custom"
                  if (
                    formData.repeat !== "custom" &&
                    formData.customDays.length < 7
                  ) {
                    setFormData((prev) => ({
                      ...prev,
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
                  }
                })()}
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
                      readOnly
                    />
                    <label className="pl-3" htmlFor={day}>
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleSubmit}>Update Meeting</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UpdateMeeting;