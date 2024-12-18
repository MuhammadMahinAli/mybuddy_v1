import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Try = () => {
  const downloadPDF = () => {
    const table = document.getElementById('table-to-pdf');
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      pdf.save('table.pdf');
    });
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Download Table as PDF
      </button>
      <table id="table-to-pdf" className="w-full border-collapse border border-gray-300 bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px)">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Serial No.</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">#01</td>
            <td className="border border-gray-300 px-4 py-2">Jane Thompson</td>
            <td className="border border-gray-300 px-4 py-2">Completed Task</td>
            <td className="border border-gray-300 px-4 py-2">5 Dec 2024</td>
            <td className="border border-gray-300 px-4 py-2 text-green-600">Approved</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">#02</td>
            <td className="border border-gray-300 px-4 py-2">John Doe</td>
            <td className="border border-gray-300 px-4 py-2">In Progress</td>
            <td className="border border-gray-300 px-4 py-2">4 Dec 2024</td>
            <td className="border border-gray-300 px-4 py-2 text-blue-600">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Try;

// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useUpdateMeetingInfoMutation } from "../../features/meeting/meetingApi";

// const Try = () => {
//   const [updateMeetingInfo]= useUpdateMeetingInfoMutation()
//   const meetingData = {
//     meetingPlatform: {
//       platform: "Zoom",
//       link: "https://zoom.com",
//     },
//     _id: "6737f85ad1b5e3d368295a94",
//     projectId: {
//       _id: "66e7b19955557bdb2d692820",
//       projectName: "My  test",
//     },
//     creator: {
//       _id: "66e6d2dac01285d519e32177",
//       email: "shadrinmoni15@gmail.com",
//       name: {
//         firstName: "Jane",
//         lastName: "Thompson",
//         _id: "66ed67c443c00c866e98ec15",
//       },
//       profilePic: "",
//     },
//     meetingMembers: [
//       {
//         memberId: {
//           _id: "66e6d2dac01285d519e32177",
//           email: "shadrinmoni15@gmail.com",
//           name: {
//             firstName: "Jane",
//             lastName: "Thompson",
//             _id: "66ed67c443c00c866e98ec15",
//           },
//           profilePic: "",
//         },
//       },
//       {
//         memberId: {
//           _id: "668e17dd91cba51e5b7481c3",
//           email: "nemecay912@cartep.com",
//           name: {
//             firstName: "Jhon ",
//             lastName: "Doe",
//             _id: "66d1420c28382aba70fc1cfc",
//           },
//           profilePic: "",
//         },
//       },
//     ],
//     title: "Setup",
//     description: "Setup",
//     duration: 30,
//     meetingTime: "2024-11-16T13:45:00.000Z",
//     timeZone: "Asia/Dhaka",
//     repeat: "custom",
//     weeklyRepeat: 1,
//     endDate: "2024-11-23T13:45:00.000Z",
//     customDays: ["Sunday"],
//   };
//   // State for editable fields
//   const [formData, setFormData] = useState({
//     title: meetingData?.title || "",
//     description: meetingData?.description || "",
//     duration: meetingData?.duration || "",
//     platform: meetingData?.meetingPlatform?.platform || "",
//     link: meetingData?.meetingPlatform?.link || "",
//     meetingTime: meetingData?.meetingTime || "",
//     timeZone: meetingData?.timeZone || "",
//     repeat: meetingData?.repeat || "",
//     weeklyRepeat: meetingData?.weeklyRepeat || 0,
//     endDate: meetingData?.endDate || "",
//     customDays: meetingData?.customDays || [],
//   });

//   // Update form field values
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   useEffect(() => {
//     if (formData.meetingTime) {
//       const meetingTimeDate = new Date(formData.meetingTime);

//       if (isNaN(meetingTimeDate.getTime())) {
//         console.error("Invalid meetingTime provided");
//         return;
//       }

//       if (formData.repeat === "do not repeat") {
//         // Set endDate same as meetingTime if 'do not repeat'
//         setFormData((prev) => ({
//           ...prev,
//           endDate: formData.meetingTime,
//         }));
//       } else {
//         // Calculate endDate based on weeklyRepeat
//         const calculatedEndDate = dayjs(formData.meetingTime)
//           .add(formData.weeklyRepeat, "week") // Add the number of weeks
//           .toISOString(); // Convert to ISO format (or your preferred format)

//         setFormData((prev) => ({
//           ...prev,
//           endDate: calculatedEndDate,
//         }));
//       }
//     }
//   }, [formData.repeat, formData.meetingTime, formData.weeklyRepeat]);

//   // Handle form submission
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const updatedMeetingData = {
//       ...meetingData,
//       title: formData.title,
//       description: formData.description,
//       duration: formData.duration,
//       meetingPlatform: {
//         platform: formData.platform,
//         link: formData.link,
//       },
//       meetingTime: formData.meetingTime,
//       timeZone: formData.timeZone,
//       repeat: formData.repeat,
//       weeklyRepeat: formData.weeklyRepeat,
//       endDate: formData.endDate,
//       customDays: formData.customDays,
//     };

   

//      // Get current time and calculate the 40-minute future time limit
//   const currentTime = dayjs();
//   const minAllowedTime = currentTime.add(40, "minute");

//   // Convert meetingTime from the formData to a Day.js object
//   const meetingTime = dayjs(formData.meetingTime);

//   // Check if meetingTime is in the past or less than 40 minutes from now
//   if (!meetingTime.isValid() || meetingTime.isBefore(currentTime)) {
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Meeting Time",
//       text: "Meeting time cannot be in the past and time should be at least 40 minutes from the current time.",
//     });
//     return;
//   }

//   if (meetingTime.isBefore(minAllowedTime)) {
//     Swal.fire({
//       icon: "error",
//       title: "Meeting Time Too Soon",
//       text: "Meeting time should be at least 40 minutes from the current time.",
//     });
//     return;
//   }
//     console.log("form", formData);

//     const requiredFields = [
//       { key: "title", label: "Meeting Title" },
//       { key: "description", label: "Description" },
//       { key: "platform", label: "Platform" },
//       { key: "link", label: "Meeting Link" },
//       { key: "duration", label: "Duration" },
//       { key: "meetingTime", label: "Meeting Time" },
//       { key: "endDate", label: "End Date" },
//       {key:"weeklyRepeat", label:"Weekly Repeat"}
//     ];
  
//     // Initial emptyFields array to track empty required fields
//     const emptyFields = [];
  
//     // Check each required field if it's empty
//     requiredFields.forEach(({ key, label }) => {
//       const keys = key.split(".");
//       let value = formData;
//       keys.forEach((k) => {
//         value = value[k];
//       });
//       if (!value) {
//         emptyFields.push(label);
//       }
//     });
  
 
  
//     // Check if customDays array is empty when repeat is not "do not repeat"
//     if (formData.repeat !== "dontRepeat" && formData.customDays.length === 0) {
//       emptyFields.push("Select Days");
//     }
  
//     // Show SweetAlert if there are any empty fields
//     if (emptyFields.length > 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Form",
//         text: `Please fill in the following fields: ${emptyFields.join(", ")}`
//       });
//       return; // Stop the function if there are empty fields
//     }

//     // Simulate saving or updating the meeting
//     console.log("Updated Meeting Data:", updatedMeetingData,meetingData?._id);

//     await updateMeetingInfo({
//       id: meetingData?._id, // Ensure the correct ID is passed
//       data: updatedMeetingData,
//     }).unwrap();
//   };

//   return (
//     <div>
//       <h2>Update Meeting</h2>

//       {/* Editable Fields */}
//       <>
//         <label
//           htmlFor="title"
//           className="block text-[16px]  text-gray-700 font-bold mt-4"
//         >
//           Title
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           id="title"
//           placeholder="Meeting Title"
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//         />
//       </>

//       {/* description */}
//       <>
//         <label
//           htmlFor="description"
//           className="block text-[16px]  text-gray-700 font-bold mt-4"
//         >
//           Description
//         </label>
//         <input
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           id="description"
//           placeholder="Meeting Description"
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//         />
//       </>

//       {/* duration */}

//       <div>
//         <label
//           htmlFor="duration"
//           className="text-[16px]  text-gray-700 font-bold"
//         >
//           Duration
//         </label>
//         <select
//           id="duration"
//           name="duration"
//           value={formData.duration}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//         >
//           <option value={60}>30 minutes</option>
//           <option value={60}>1 hour</option>
//           <option value={75}>1 hour 15 minutes</option>
//           <option value={90}>1 hour 30 minutes</option>
//           <option value={105}>1 hour 45 minutes</option>
//           <option value={120}>2 hours</option>
//           <option value={135}>2 hours 15 minutes</option>
//           <option value={150}>2 hours 30 minutes</option>
//           <option value={165}>2 hours 45 minutes</option>
//           <option value={180}>3 hours</option>
//           <option value={180}>3 hours</option>
//           <option value={195}>3 hours 15 minutes</option>
//           <option value={210}>3 hours 30 minutes</option>
//           <option value={225}>3 hour 45 minutes</option>
//           <option value={240}>4 hours</option>
//           <option value={240}>4 hours</option>
//           <option value={255}>4 hours 15 minutes</option>
//           <option value={270}>4 hours 30 minutes</option>
//           <option value={285}>4 hours 45 minutes</option>
//           <option value={300}>5 hours</option>
//         </select>
//       </div>

//       {/* platform & link */}

//       <div className="flex justify-between items-start">
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="date-time"
//             className="block text-[16px]  text-gray-700 font-bold mt-4"
//           >
//             Platform
//           </label>
//           <select
//             name="platform"
//             value={formData.platform}
//             onChange={handleInputChange}
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
//             className="block text-[16px]  text-gray-700 font-bold mt-4"
//           >
//             Link
//           </label>
//           <input
//             type="url"
//             name="link"
//             placeholder="Platform link (e.g., Zoom link)"
//             value={formData.link}
//             onChange={handleInputChange}
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
//             className="block text-[16px]  text-gray-700 font-bold mt-4"
//           >
//             Set Date & Time
//           </label>
//           <input
//             type="datetime-local"
//             id="meetingTime"
//             value={formData?.meetingTime}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 meetingTime: e.target.value,
//               })
//             }
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           />
//         </div>
//         <div className="w-6/12 px-2">
//           <label
//             htmlFor="repeat"
//             className="block text-[16px]  text-gray-700 font-bold mt-4"
//           >
//             Repeat
//           </label>
//           <select
//             id="repeat"
//             name="repeat"
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//           >
//             <option value="custom">Custom</option>{" "}
//             <option value="dontRepeat">Don't Repeat</option>
//             <option value="everyday">Every Day</option>
//           </select>
//         </div>

//         {/* weekly repeat & end date */}

//         <div className="flex justify-between items-start">
//           <div className="w-6/12 px-2">
//             <label
//               htmlFor="weeklyRepeat"
//               className="block text-[16px]  text-gray-700 font-bold mt-4"
//             >
//               Weekly Repeat
//             </label>
//             <input
//               type="number"
//               id="weeklyRepeat"
//               value={formData.weeklyRepeat || "0"}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   weeklyRepeat: e.target.value,
//                 })
//               }
//               min="0"
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </div>

//           <div className="w-6/12 px-2">
//             <label
//               htmlFor="endDate"
//               className="block text-[16px]  text-gray-700 font-bold mt-4"
//             >
//               End Date
//             </label>
//             <input
//               type="date"
//               id="endDate"
//               value={dayjs(formData.endDate).format("YYYY-MM-DD")} // Format for input
//               readOnly={formData.repeat === "do not repeat"}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </div>
//         </div>
//       </div>
//       {/* day selection */}
//       {formData?.repeat !== "dontRepeat" &&
//         meetingData?.meetingMembers?.length !== 0 && (
//           <>
//             <label className="block text-[16px] pb-3 text-gray-700 font-bold mt-4">
//               Select Days
//             </label>
//             {formData.repeat === "custom" ? (
//               <div>
//                 {[
//                   "Sunday",
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ].map((day) => (
//                   <div key={day} className="inline-flex items-center mr-4">
//                     <input
//                       type="checkbox"
//                       id={day}
//                       value={day}
//                       checked={formData.customDays.includes(day)}
//                       onChange={(e) => {
//                         const { checked, value } = e.target;
//                         setFormData((prev) => ({
//                           ...prev,
//                           customDays: checked
//                             ? [...prev.customDays, value]
//                             : prev.customDays.filter((d) => d !== value),
//                         }));
//                       }}
//                     />
//                     <label htmlFor={day} className="ml-2">
//                       {day}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>
//                 {(() => {
//                   // Automatically populate customDays with all days if not "custom"
//                   if (
//                     formData.repeat !== "custom" &&
//                     formData.customDays.length < 7
//                   ) {
//                     setFormData((prev) => ({
//                       ...prev,
//                       customDays: [
//                         "Sunday",
//                         "Monday",
//                         "Tuesday",
//                         "Wednesday",
//                         "Thursday",
//                         "Friday",
//                         "Saturday",
//                       ],
//                     }));
//                   }
//                 })()}
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
//                       readOnly
//                     />
//                     <label className="pl-3" htmlFor={day}>
//                       {day}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       <button onClick={handleSubmit}>Update Meeting</button>
//     </div>
//   );
// };

// export default Try;

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import dayjs from "dayjs";

// const Try = () => {

//   const [selectedMembers, setSelectedMembers] = useState([]);

// const meetingData= {
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
//   const [formData, setFormData] = useState({
//     title: meetingData?.title || "",
//     description: meetingData?.description || "",
//     duration: meetingData?.duration || "",
//     platform: meetingData?.meetingPlatform?.platform || "",
//     link: meetingData?.meetingPlatform?.link || "",
//     meetingTime: meetingData?.meetingTime || "",
//     timeZone: meetingData?.timeZone || "",
//     repeat: meetingData?.repeat || "",
//     weeklyRepeat: meetingData?.weeklyRepeat || 0,
//     endDate: meetingData?.endDate || "",
//     customDays: meetingData?.customDays || [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "repeat" && value === "everyday") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         customDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//       }));
//     } else if (name === "repeat" && value !== "everyday") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         customDays: [],
//       }));
//     } else if (name === "duration") {
//       const numericValue = parseInt(value, 10);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: numericValue,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleMemberSelect = (e) => {
//     const { value, checked } = e.target;
//     setSelectedMembers((prev) =>
//       checked ? [...prev, value] : prev.filter((member) => member !== value)
//     );

//     // Update meetingMembers in formData
//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         meetingMembers: [
//           ...prev.meetingMembers,
//           { memberId: value, attendance: [] },
//         ],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         meetingMembers: prev.meetingMembers.filter(
//           (member) => member.memberId !== value
//         ),
//       }));
//     }
//   };

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;

//   //   if (name === "repeat" && value === "everyday") {
//   //     // Set customDays to all days of the week when repeat is 'everyday'
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: value,
//   //       customDays: [
//   //         "Sunday",
//   //         "Monday",
//   //         "Tuesday",
//   //         "Wednesday",
//   //         "Thursday",
//   //         "Friday",
//   //         "Saturday",
//   //       ],
//   //     }));
//   //   } else if (name === "repeat" && value !== "everyday") {
//   //     // Reset customDays when repeat is not 'everyday'
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: value,
//   //       customDays: [],
//   //     }));
//   //   } else if (name === "duration") {
//   //     // Save the duration as an integer
//   //     const numericValue = parseInt(value, 10); // Convert to an integer

//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       [name]: numericValue, // Save duration as a number
//   //     }));
//   //   } else {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: value,
//   //     }));
//   //   }
//   // };

//   const handlePlatformChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       meetingPlatform: { ...formData.meetingPlatform, [name]: value },
//     });
//   };

//   useEffect(() => {
//     if (formData.meetingTime) {
//       const meetingTimeDate = new Date(formData.meetingTime);

//       if (isNaN(meetingTimeDate.getTime())) {
//         console.error("Invalid meetingTime provided");
//         return;
//       }

//       if (formData.repeat === "do not repeat") {
//         // Set endDate same as meetingTime if 'do not repeat'
//         setFormData((prev) => ({
//           ...prev,
//           endDate: formData.meetingTime,
//         }));
//       } else {
//         // Calculate endDate based on weeklyRepeat
//         const calculatedEndDate = dayjs(formData.meetingTime)
//           .add(formData.weeklyRepeat, "week") // Add the number of weeks
//           .toISOString(); // Convert to ISO format (or your preferred format)

//         setFormData((prev) => ({
//           ...prev,
//           endDate: calculatedEndDate,
//         }));
//       }
//     }
//   }, [formData.repeat, formData.meetingTime, formData.weeklyRepeat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get current time and calculate the 40-minute future time limit
//     const currentTime = dayjs();
//     const minAllowedTime = currentTime.add(40, "minute");

//     // Convert meetingTime from the formData to a Day.js object
//     const meetingTime = dayjs(formData.meetingTime);

//     // Check if meetingTime is in the past or less than 40 minutes from now
//     if (!meetingTime.isValid() || meetingTime.isBefore(currentTime)) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Meeting Time",
//         text: "Meeting time cannot be in the past and time should be at least 40 minutes from the current time.",
//       });
//       return;
//     }

//     if (meetingTime.isBefore(minAllowedTime)) {
//       Swal.fire({
//         icon: "error",
//         title: "Meeting Time Too Soon",
//         text: "Meeting time should be at least 40 minutes from the current time.",
//       });
//       return;
//     }
//     console.log("form", formData);

//     const requiredFields = [
//       { key: "projectId", label: "Project ID" },
//       { key: "title", label: "Meeting Title" },
//       { key: "description", label: "Description" },
//       { key: "meetingPlatform.platform", label: "Platform" },
//       { key: "meetingPlatform.link", label: "Meeting Link" },
//       { key: "duration", label: "Duration" },
//       { key: "meetingTime", label: "Meeting Time" },
//       { key: "endDate", label: "End Date" },
//       { key: "weeklyRepeat", label: "Weekly Repeat" },
//     ];

//     // Initial emptyFields array to track empty required fields
//     const emptyFields = [];

//     // Check each required field if it's empty
//     requiredFields.forEach(({ key, label }) => {
//       const keys = key.split(".");
//       let value = formData;
//       keys.forEach((k) => {
//         value = value[k];
//       });
//       if (!value) {
//         emptyFields.push(label);
//       }
//     });

//     // Check if meetingMembers array is empty
//     if (formData.meetingMembers.length === 0) {
//       emptyFields.push("Select Members");
//     }

//     // Check if customDays array is empty when repeat is not "do not repeat"
//     if (formData.repeat !== "dontRepeat" && formData.customDays.length === 0) {
//       emptyFields.push("Select Days");
//     }

//     // Show SweetAlert if there are any empty fields
//     if (emptyFields.length > 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Form",
//         text: `Please fill in the following fields: ${emptyFields.join(", ")}`,
//       });
//       return; // Stop the function if there are empty fields
//     }

//     console.log(formData);

//     // try {
//     //   // Submit form data to the API
//     //   const response = await fetch(
//     //     "https://test-two-22w0.onrender.com/api/v1/meeting/create-new",
//     //     {
//     //       method: "POST",
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //       body: JSON.stringify(formData),
//     //     }
//     //   );

//     //   if (!response.ok) {
//     //     throw new Error("Network response was not ok");
//     //   }

//     //   const data = await response.json();
//     //   console.log("Meeting created successfully:", data);

//     //   Swal.fire({
//     //     icon: "success",
//     //     title: "Meeting Created!",
//     //     text: "Your meeting has been successfully created.",
//     //   });
//     //   setTimeout(() => {
//     //     window.location.reload();
//     //   }, 2500);
//     // } catch (error) {
//     //   console.error("Error creating meeting:", error);

//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Error",
//     //     text: "Failed to create meeting. Please try again.",
//     //   });
//     // }
//   };

//   return (
//     <>
//       <div className="fixed top-0 left-0  flex justify-center items-center bg-black/40 bg-opacity-50 w-screen h-screen overflow-y-scroll">
//         <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] xl:h-[600px] 3xl:h-[700px] 3xl:w-[800px] overflow-y-scroll cursor-pointer">
//           <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
//             <h1 className="text-2xl font-semibold mb-6">Create Meeting</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Left Section */}
//                 <div>
//                   {/* project */}
//                   <label
//                     htmlFor="projectId"
//                     className="block text-[16px]  text-gray-700 font-bold"
//                   >
//                     Project
//                   </label>
//                   <input
//                     value="project name"
//                     readOnly
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                   />

//                   <>
//                     {/* title */}
//                     <>
//                       <label
//                         htmlFor="title"
//                         className="block text-[16px]  text-gray-700 font-bold mt-4"
//                       >
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         id="title"
//                         placeholder="Meeting Title"
//                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                       />
//                     </>
//                     {/* description */}
//                     <>
//                       <label
//                         htmlFor="description"
//                         className="block text-[16px]  text-gray-700 font-bold mt-4"
//                       >
//                         Description
//                       </label>
//                       <input
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         id="description"
//                         placeholder="Meeting Description"
//                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                       />
//                     </>
//                     {/* duration */}

//                     <div>
//                       <label
//                         htmlFor="duration"
//                         className="text-[16px]  text-gray-700 font-bold"
//                       >
//                         Duration
//                       </label>
//                       <select
//                         id="duration"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleInputChange}
//                         className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                       >
//                         <option value={60}>30 minutes</option>
//                         <option value={60}>1 hour</option>
//                         <option value={75}>1 hour 15 minutes</option>
//                         <option value={90}>1 hour 30 minutes</option>
//                         <option value={105}>1 hour 45 minutes</option>
//                         <option value={120}>2 hours</option>

//                         <option value={135}>2 hours 15 minutes</option>
//                         <option value={150}>2 hours 30 minutes</option>
//                         <option value={165}>2 hours 45 minutes</option>
//                         <option value={180}>3 hours</option>

//                         <option value={180}>3 hours</option>
//                         <option value={195}>3 hours 15 minutes</option>
//                         <option value={210}>3 hours 30 minutes</option>
//                         <option value={225}>3 hour 45 minutes</option>
//                         <option value={240}>4 hours</option>
//                         <option value={240}>4 hours</option>
//                         <option value={255}>4 hours 15 minutes</option>
//                         <option value={270}>4 hours 30 minutes</option>
//                         <option value={285}>4 hours 45 minutes</option>
//                         <option value={300}>5 hours</option>
//                       </select>
//                     </div>

//                     {/* platform & link */}

//                     <div className="flex justify-between items-start">
//                       <div className="w-6/12 px-2">
//                         <label
//                           htmlFor="date-time"
//                           className="block text-[16px]  text-gray-700 font-bold mt-4"
//                         >
//                           Platform
//                         </label>
//                         <select
//                           name="platform"
//                           value={formData.platform}
//                           onChange={handlePlatformChange}
//                           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                         >
//                           <option value="">Select a platform</option>
//                           <option value="Zoom">Zoom</option>
//                           <option value="Google Meet">Google Meet</option>
//                           <option value="Webex Meetings">Webex Meetings</option>
//                           <option value="Zoho Meetings">Zoho Meetings</option>
//                         </select>
//                       </div>
//                       <div className="w-6/12 px-2">
//                         <label
//                           htmlFor="link"
//                           className="block text-[16px]  text-gray-700 font-bold mt-4"
//                         >
//                           Link
//                         </label>
//                         <input
//                           type="url"
//                           name="link"
//                           placeholder="Platform link (e.g., Zoom link)"
//                           value={formData.link}
//                           onChange={handlePlatformChange}
//                           id="link"
//                           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                         />
//                       </div>
//                     </div>

//                     {/* date & repeat */}

//                     <div className="flex justify-between items-start">
//                       <div className="w-6/12 px-2">
//                         <label
//                           htmlFor="meetingTime"
//                           className="block text-[16px]  text-gray-700 font-bold mt-4"
//                         >
//                           Set Date & Time
//                         </label>
//                         <input
//                           type="datetime-local"
//                           id="meetingTime"
//                           value={formData?.meetingTime}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               meetingTime: e.target.value,
//                             })
//                           }
//                           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                         />
//                       </div>
//                       <div className="w-6/12 px-2">
//                         <label
//                           htmlFor="repeat"
//                           className="block text-[16px]  text-gray-700 font-bold mt-4"
//                         >
//                           Repeat
//                         </label>
//                         <select
//                           id="repeat"
//                           name="repeat"
//                           onChange={handleInputChange}
//                           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                         >
//                           <option value="custom">Custom</option>

//                           <option value="dontRepeat">Don't Repeat</option>
//                           <option value="everyday">Every Day</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* weekly repeat & end date */}

//                     <div className="flex justify-between items-start">
//                       <div className="w-6/12 px-2">
//                         <label
//                           htmlFor="weeklyRepeat"
//                           className="block text-[16px]  text-gray-700 font-bold mt-4"
//                         >
//                           Weekly Repeat
//                         </label>
//                         <input
//                           type="number"
//                           id="weeklyRepeat"
//                           value={formData.weeklyRepeat || "0"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               weeklyRepeat: e.target.value,
//                             })
//                           }
//                           min="0"
//                           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                         />
//                       </div>

//                       <div className="w-6/12 px-2">
//                         <label
//                           htmlFor="endDate"
//                           className="block text-[16px]  text-gray-700 font-bold mt-4"
//                         >
//                           End Date
//                         </label>
//                         <input
//                           type="date"
//                           id="endDate"
//                           value={dayjs(formData.endDate).format("YYYY-MM-DD")} // Format for input
//                           readOnly={formData.repeat === "do not repeat"}
//                           className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                         />
//                       </div>
//                     </div>
//                   </>
//                 </div>

//                 {/* Right Section  */}
//                 <div>
//                   {/* team members */}
//                   <label
//                     htmlFor="members"
//                     className="block text-[16px]  text-gray-700 font-bold"
//                   >
//                     Select Members
//                   </label>

//                     <>
//                       {meetingData?.meetingMembers.map((member) => (
//                         <div
//                           key={member?.memberId?._id}
//                           className="flex items-center mt-2"
//                         >
//                           <input
//                             type="checkbox"
//                             id={member?.memberId?._id}
//                             value={member?.memberId?._id}
//                             onChange={handleMemberSelect}
//                             className="mr-2"
//                           />
//                           <label htmlFor={member?.memberId?._id}>
//                             <p className="capitalize">
//                               {member?.memberId?.name?.firstName}{" "}
//                               {member?.memberId?.name?.lastName}
//                             </p>
//                           </label>
//                         </div>
//                       ))}
//                     </>

//                   {/* day selection */}
//                   {formData?.repeat !== "dontRepeat" &&
//                     meetingData?.meetingMembers?.length !== 0 && (
//                       <>
//                         <label className="block text-[16px] pb-3  text-gray-700 font-bold mt-4">
//                           Select Days
//                         </label>
//                         {formData.repeat === "custom" ? (
//                           <div>
//                             {[
//                               "Sunday",
//                               "Monday",
//                               "Tuesday",
//                               "Wednesday",
//                               "Thursday",
//                               "Friday",
//                               "Saturday",
//                             ].map((day) => (
//                               <div key={day}>
//                                 <input
//                                   type="checkbox"
//                                   id={day}
//                                   value={day}
//                                   checked={
//                                     formData.repeat === "everyday" ||
//                                     formData.customDays.includes(day)
//                                   }
//                                   onChange={(e) => {
//                                     const { value, checked } = e.target;
//                                     const selectedDays = checked
//                                       ? [...formData.customDays, value]
//                                       : formData.customDays.filter(
//                                           (d) => d !== value
//                                         );
//                                     setFormData({
//                                       ...formData,
//                                       customDays: selectedDays,
//                                     });
//                                   }}
//                                 />
//                                 <label htmlFor={day} className="pl-3">
//                                   {day}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div>
//                             {[
//                               "Sunday",
//                               "Monday",
//                               "Tuesday",
//                               "Wednesday",
//                               "Thursday",
//                               "Friday",
//                               "Saturday",
//                             ].map((day) => (
//                               <div key={day}>
//                                 <input
//                                   type="checkbox"
//                                   id={day}
//                                   value={day}
//                                   checked
//                                 />
//                                 <label className="pl-3" htmlFor={day}>
//                                   {day}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </>
//                     )}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

//export default Try;

// import { useState } from "react";;
// import { fileUpload } from "../../utils/cloudinary";

// const Try = () => {
//   const [images ,setImages] = useState([])
//   const [loading, setLoading] = useState({
//     imageOne: false,
//     imageTwo: false,
//     imageThree: false,
//   });
//   const [previewImage, setPreviewImage] = useState({
//     imageOne: "",
//     imageTwo: "",
//     imageThree: "",
//   });

//   const handlePreviewImage = async (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const name = e.target.name;
//       setLoading({
//         ...loading,
//         [name]: true,
//       });
//       const files = e.target.files;
//       try {
//         const urls = await Promise.all(Array.from(files).map(async (file) => {
//           const imageUrl = await fileUpload(file); // Upload file to Cloudinary
//           return imageUrl;
//         }));
//         setImages([...images, ...urls]);
//         setLoading({
//           imageOne: false,
//           imageTwo: false,
//           imageThree: false,
//         });
//         setPreviewImage({ ...previewImage, [name]: URL.createObjectURL(files[0]) });
//       } catch (error) {
//         console.error("Error uploading images:", error);
//       }
//     }
//   };

//   console.log('image', images);

//   return (
//     <div className="flex flex-col space-y-5 md:space-y-0 font-medium gray600">
//     <div>
//       <label className="text-[16px] md:text-xl capitalize font-bold">images (up to 3)</label>
//     </div>
//     <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//       {/* image one   */}
//       <div className="relative pt-2">
//         {previewImage.imageOne  ? (
//           <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100  custom-shadow">
//             <img className="object-cover h-full rounded-md" src={previewImage.imageOne} alt="" />
//           </div>
//         ) : (
//           <label required htmlFor="image-one" className="">
//             <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow">
//               {loading.imageOne ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
//                   <img src="/upload.svg" className="h-3 lg:h-5" />
//                   <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a photo or</p>
//                   <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
//                 </div>
//               )}
//             </div>
//           </label>
//         )}{" "}
//         <input
//           className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                         focus:outline-none  bg-white text-gray-900 hidden"
//           type="file"
//           name="imageOne"
//           id="image-one"
//           onChange={handlePreviewImage}
//           accept="image/*"
//           required
//         />
//       </div>
//       {/* image two */}
//       <div className="relative ">
//         {previewImage.imageTwo ? (
//           <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
//             <img className="object-cover h-full rounded-md" src={previewImage.imageTwo} alt="" />
//           </div>
//         ) : (
//           <label required htmlFor="image-two" className="">
//             <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//               {loading.imageTwo ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">

//                 </div>
//               )}
//             </div>
//           </label>
//         )}{" "}
//         <input
//           className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                         focus:outline-none  bg-white text-gray-900 hidden"
//           type="file"
//           name="imageTwo"
//           id="image-two"
//           onChange={handlePreviewImage}
//           accept="image/*"
//           required
//         />
//       </div>
//       {/* image three */}
//       <div className="relative">
//         {previewImage.imageThree  ? (
//           <div className="flex justify-center items-center bg-red-500 rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px] box-border border-2 border-gray-100 custom-shadow">
//             <img className="object-cover h-full rounded-md" src={previewImage.imageThree} alt="" />
//           </div>
//         ) : (
//           <label required htmlFor="image-three" className="">
//             <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//               {loading.imageThree ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">

//                 </div>
//               )}
//             </div>
//           </label>
//         )}{" "}
//         <input
//           className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                         focus:outline-none  bg-white text-gray-900 hidden"
//           type="file"
//           name="imageThree"
//           id="image-three"
//           onChange={handlePreviewImage}
//           accept="image/*"
//           required
//         />
//       </div>
//     </div>
//   </div>
//   );
// };

// export default Try;

//----------------------------------- docx start -------------------------------------//

// import { useState } from "react";
// import pdf from "../../assets/home/pdf-icon.png";
// import docx from "../../assets/pdf-logo3.png";
// import { rawFileUpload } from "../../utils/cloudinaryForRaw";

// const Try = () => {
//   const [documents, setDocuments] = useState([])
// const [loading, setLoading] = useState({
//   imageOne: false,
//   imageTwo: false,
//   imageThree: false,
// });
// const [previewImage, setPreviewImage] = useState({
//   imageOne: "",
//   imageTwo: "",
//   imageThree: "",
// });

// const handlePreviewImage = async (e) => {
//   if (e.target.files && e.target.files.length > 0) {
//     const name = e.target.name;
//     setLoading({ ...loading, [name]: true });

//     const file = e.target.files[0];

//     try {
//       // Upload the PDF to Cloudinary
//       const uploadedUrl = await rawFileUpload(file, "raw");

//       if (uploadedUrl) {
//         console.log("Uploaded docx URL:", uploadedUrl);

//         // Update state with the uploaded file URL
//         setDocuments((prevDoc) => [...prevDoc, uploadedUrl]);

//         // Show a preview (using a placeholder like PDF logo)
//         setPreviewImage((prevPreviewImage) => ({
//           ...prevPreviewImage,
//           [name]: uploadedUrl, // URL is saved here
//         }));
//       }
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//     } finally {
//       setLoading({ ...loading, [name]: false });
//     }
//   }
// };

//   console.log('docx', documents);

//   return (
// <div>
// <div className="flex flex-col space-y-5 md:space-y-0  font-medium gray600">
//     <div className="">
//       <label className="text-[16px] md:text-xl capitalize font-bold">Document (up to 2)</label>
//     </div>
//     <div className="pt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10 lg:space-x-11 xl:space-x-8 2xl:space-x-16 3xl:space-x-12 4xl:space-x-28 ">
//       {/* doc one  */}
//       <div className="relative ">
//         {previewImage.imageOne !== "" ? (
//           <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
//             <img className="h-20 lg:h-28 xl:h-32 3xl:h-36  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-5/12 rounded-md" src={docx} alt="" />
//           </div>
//         ) : (
//           <label required htmlFor="doc-one" className="">
//             <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//               {loading.imageOne ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
//                  <img src={pdf} className="h-8 lg:h-10" />
//                   <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a docx or</p>
//                   <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
//                 </div>
//               )}
//             </div>
//           </label>
//         )}{" "}
//         <input
//           className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                         focus:outline-none  bg-white text-gray-900 hidden"
//           type="file"
//           accept=".docx"
//           name="imageOne"
//           id="doc-one"
//           onChange={handlePreviewImage}
//           required
//         />
//       </div>
//       {/* doc two  */}
//       <div className="relative ">
//         {previewImage.imageTwo !== "" ? (
//         <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
//         <img className="h-20 lg:h-28 xl:h-32 3xl:h-40  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-6/12 rounded-md" src={docx} alt="" />
//       </div>
//         ) : (
//           <label required htmlFor="doc-two" className="">
//             <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
//               {loading.imageTwo ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">

//                 </div>
//               )}
//             </div>
//           </label>
//         )}{" "}
//         <input
//           className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
//                                                         focus:outline-none  bg-white text-gray-900 hidden"
//           type="file"
//           accept=".docx"
//           name="imageTwo"
//           id="doc-two"
//           onChange={handlePreviewImage}
//           required
//         />
//       </div>

//     </div>
//   </div>
// </div>
//   );
// };

// export default Try;

//----------------------------------- Docx end -------------------------------------//

//----------------------------------- pdf start -------------------------------------//

// import { useState } from "react";
// import pdf from "../../assets/home/pdf-icon.png";
// import pdfLogo from "../../assets/pdf-logo3.png";
// import { rawFileUpload } from "../../utils/cloudinaryForRaw";

// const Try = () => {
//   const [pdfFiles, setPdfFiles] = useState([])
// const [loading, setLoading] = useState({
//   imageOne: false,
//   imageTwo: false,
//   imageThree: false,
// });
// const [previewImage, setPreviewImage] = useState({
//   imageOne: "",
//   imageTwo: "",
//   imageThree: "",
// });

// const handlePreviewImage = async (e) => {
//   if (e.target.files && e.target.files.length > 0) {
//     const name = e.target.name;
//     setLoading({ ...loading, [name]: true });

//     const file = e.target.files[0];

//     try {
//       // Upload the PDF to Cloudinary
//       const uploadedUrl = await rawFileUpload(file, "raw");

//       if (uploadedUrl) {
//         console.log("Uploaded PDF URL:", uploadedUrl);

//         // Update state with the uploaded file URL
//         setPdfFiles((prevDoc) => [...prevDoc, uploadedUrl]);

//         // Show a preview (using a placeholder like PDF logo)
//         setPreviewImage((prevPreviewImage) => ({
//           ...prevPreviewImage,
//           [name]: uploadedUrl, // URL is saved here
//         }));
//       }
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//     } finally {
//       setLoading({ ...loading, [name]: false });
//     }
//   }
// };

// console.log('pdf', pdfFiles);

//   return (
// <div>
//   <div className="flex flex-col space-y-5 md:space-y-0 font-medium gray600">
//     <div>
//       <label className="text-[16px] md:text-xl capitalize font-bold">PDF (up to 2)</label>
//     </div>
//     <div className="pt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10">
//       {/* PDF one */}
//       <div className="relative">
//         {previewImage.imageOne ? (
//           <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] box-border border-2 border-gray-100 custom-shadow">
//             <img className="h-24 w-6/12 rounded-md" src={pdfLogo} alt="PDF preview" />
//           </div>
//         ) : (
//           <label htmlFor="pdf-one">
//             <div className="rounded-lg h-[110px] w-[200px] box-border border-2 border-gray-100 custom-shadow bg-white">
//               {loading.imageOne ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center">
//                   <img src={pdf} className="h-8" alt="Upload PDF" />
//                   <p className="text-[10px] font-normal capitalize">Drag & drop a PDF or</p>
//                   <p className="text-[10px] font-medium capitalize text-blue-500">browse</p>
//                 </div>
//               )}
//             </div>
//           </label>
//         )}
//         <input
//           className="hidden"
//           type="file"
//           accept=".pdf"
//           name="imageOne"
//           id="pdf-one"
//           onChange={handlePreviewImage}
//         />
//       </div>
//       <div className="relative">
//         {previewImage.imageTwo ? (
//           <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] box-border border-2 border-gray-100 custom-shadow">
//             <img className="h-24 w-6/12 rounded-md" src={pdfLogo} alt="PDF preview" />
//           </div>
//         ) : (
//           <label htmlFor="pdf-two">
//             <div className="rounded-lg h-[110px] w-[200px] box-border border-2 border-gray-100 custom-shadow bg-white">
//               {loading.imageTwo ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div className="flex flex-col justify-center items-center">
//                   <img src={pdf} className="h-8" alt="Upload PDF" />
//                   <p className="text-[10px] font-normal capitalize">Drag & drop a PDF or</p>
//                   <p className="text-[10px] font-medium capitalize text-blue-500">browse</p>
//                 </div>
//               )}
//             </div>
//           </label>
//         )}
//         <input
//           className="hidden"
//           type="file"
//           accept=".pdf"
//           name="imageTwo"
//           id="pdf-two"
//           onChange={handlePreviewImage}
//         />
//       </div>

//     </div>
//   </div>
// </div>
//   );
// };

// export default Try;

//----------------------------------- pdf end -------------------------------------//

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

// const Try = () => {
//   const [pdfFile, setPdfFile] = useState(null); // State for PDF file
//   const [docxFile, setDocxFile] = useState(null); // State for DOCX file
//   const [uploading, setUploading] = useState(false); // State for upload status
//   const [uploadResult, setUploadResult] = useState({}); // State for upload result

//   const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dhxjnryqk/raw/upload";
//   const uploadPreset = "awer24s"; // Optional (defined in Cloudinary)

//   const handlePdfUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setPdfFile(file);
//     } else {
//       alert("Please upload a valid PDF file!");
//     }
//   };

//   const handleDocxUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.name.endsWith(".docx")) {
//       setDocxFile(file);
//     } else {
//       alert("Please upload a valid DOCX file!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!pdfFile && !docxFile) {
//       alert("Please upload at least one file!");
//       return;
//     }

//     setUploading(true);

//     try {
//       // Function to handle file upload to Cloudinary
//       const uploadToCloudinary = async (file) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", uploadPreset); // Optional preset
//         formData.append("resource_type", "raw");

//         const response = await axios.post(cloudinaryUrl, formData);
//         return response.data; // Cloudinary response with file URL
//       };

//       const results = {};

//       if (pdfFile) {
//         results.pdf = await uploadToCloudinary(pdfFile);
//         console.log("PDF Uploaded Data:", results.pdf); // Log PDF details
//       }

//       if (docxFile) {
//         results.docx = await uploadToCloudinary(docxFile);
//       }

//       setUploadResult(results);
//       alert("Files uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Failed to upload files. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };
//   //---------------

//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (window.LazyLoad) {
//       const lazyLoadInstance = new window.LazyLoad({
//         elements_selector: ".lazy",
//       });

//       return () => {
//         lazyLoadInstance.destroy();
//       };
//     }
//   }, []);
//   const fileUrl =
//     "https://res.cloudinary.com/dhxjnryqk/raw/upload/v1732067739/s4e83dfjrxrkw9s3jw7g.pdf";
//   return (
//     <div>
//       <h2>Upload Files to Cloudinary</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="pdfUpload">Upload PDF File:</label>
//           <input
//             type="file"
//             id="pdfUpload"
//             accept="application/pdf"
//             onChange={handlePdfUpload}
//           />
//         </div>

//         <div>
//           <label htmlFor="docxUpload">Upload DOCX File:</label>
//           <input
//             type="file"
//             id="docxUpload"
//             accept=".docx"
//             onChange={handleDocxUpload}
//           />
//         </div>

//         <button type="submit" disabled={uploading}>
//           {uploading ? "Uploading..." : "Submit"}
//         </button>
//       </form>

//       {uploadResult.pdf && (
//         <div>
//           <h3>PDF File Uploaded:</h3>
//           <a
//             href={uploadResult.pdf.secure_url}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             View PDF
//           </a>
//         </div>
//       )}
//       {uploadResult.pdf && (
//         <a
//           href={`${uploadResult.pdf.secure_url}`}
//           target="_blank"
//           download
//           rel="noopener noreferrer"
//         >
//           Download PDF
//         </a>
//       )}

//       {uploadResult.docx && (
//         <div>
//           <h3>DOCX File Uploaded:</h3>
//           <a
//             href={uploadResult.docx.secure_url}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             View DOCX
//           </a>
//         </div>
//       )}
//       <div style={{ height: "500px", width: "100%" }}>
//         <h2>View PDF</h2>
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//           <Viewer fileUrl={fileUrl} />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default Try;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { IoIosSearch } from "react-icons/io";
// import { AiOutlineReload } from "react-icons/ai";
// import Loading from "../Loading/Loading";
// import {
//   FaTwitter,
//   FaInstagram,
//   FaGithub,
//   FaLinkedin,
//   FaCodepen,
//   FaDev,
// } from "react-icons/fa";

// const Try = () => {
//   const [projects, setProjects] = useState([]);
//   const [uniqueId, setUniqueId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch projects with pagination or uniqueId filter
//   const fetchProjects = async (page = 1, uniqueIdFilter = "") => {
//     setLoading(true); // Set loading to true when fetching data
//     try {
//       const response = await axios.get(
//         `https://test-two-22w0.onrender.com/api/v1/member/getAllMember`,
//         {
//           params: {
//             page,
//             limit: 6,
//             uniqueId: uniqueIdFilter,
//           },
//         }
//       );
//       const data = response.data.data;

//       console.log("dd", data);

//       setProjects(data.users || []);
//       setCurrentPage(data.currentPage || 1);
//       setTotalPages(data.totalPages || 1);

//       // Set isFiltered to true if uniqueIdFilter is applied, else false
//       setIsFiltered(!!uniqueIdFilter);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data.message ===
//           "No project matched with the provided uniqueId."
//       ) {
//         setProjects([]); // No match found 01768320134
//       }
//     }
//     setLoading(false); // Set loading to false when data is fetched 01620702021
//   };

//   // Initial fetch of projects
//   useEffect(() => {
//     fetchProjects(currentPage);
//   }, [currentPage]);

//   // Handle uniqueId filter
//   const handleFilter = () => {
//     fetchProjects(1, uniqueId);
//   };

//   // Reset to original paginated view
//   const handleReset = () => {
//     setUniqueId("");
//     setIsFiltered(false);
//     fetchProjects(1); // Fetch initial 6 projects
//   };

//   return (
//     <div>
//       <div>
//         <div className="w-5/12 flex justify-center items-center relative md:w-8/12 xl:w-7/12 2xl:w-6/12 3xl:w-7/12 mb-4">
//           <input
//             type="text"
//             placeholder="Search"
//             value={uniqueId}
//             onChange={(e) => setUniqueId(e.target.value)}
//             className="w-full h-9 md:h-10 lg:h-12 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
//           />
//           <IoIosSearch
//             onClick={handleFilter}
//             className="text-2xl absolute right-8 cursor-pointer"
//           />
//           {isFiltered && (
//             <AiOutlineReload
//               onClick={handleReset}
//               className="text-2xl absolute right-1 cursor-pointer"
//             />
//           )}
//         </div>
//         {loading ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {projects.length > 0 ? (
//               projects.map((p, i) => (
//                 <div key={i}>
//                   <div className="my-10 bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
//                     {/* Profile Image */}
//                     <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-yellow-300 -mt-16">
//                       <img
//                         src="https://via.placeholder.com/100" // Replace this URL with the actual image URL
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* Name and Role */}
//                     <h2 className="text-2xl font-semibold mt-4">
//                       {p.name.firstName} {p.name.lastName}
//                     </h2>
//                     <p className="text-purple-600 font-medium">{p.role}</p>

//                     {/* Bio */}
//                     <p className="text-gray-600 mt-2 text-sm">
//                       {p.about
//                         ? p.about.slice(0, 30) + "..."
//                         : `Nothing to show about ${p.name.firstName} ${p.name.lastName}`}
//                     </p>

//                     {/* Email Button */}
//                     <button className="bg-purple-700 text-white py-2 px-4 rounded-lg mt-4">
//                       {p.email}
//                     </button>

//                     {/* Social Icons */}
//                     <div className="flex justify-center space-x-4 mt-4 text-purple-600 text-xl">
//                       <a href="#">
//                         <FaTwitter />
//                       </a>
//                       <a href="#">
//                         <FaInstagram />
//                       </a>
//                       <a href="#">
//                         <FaGithub />
//                       </a>
//                       <a href="#">
//                         <FaLinkedin />
//                       </a>
//                       <a href="#">
//                         <FaCodepen />
//                       </a>
//                       <a href="#">
//                         <FaDev />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="col-span-full text-center">
//                 No project matched with the provided uniqueId.
//               </p>
//             )}
//           </div>
//         )}

//         {!isFiltered && (
//           <div className="pagination flex justify-center mt-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Try;

//------------------------------------------- Project ---------------------------------//

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { IoIosSearch } from "react-icons/io";
// import { AiOutlineReload } from "react-icons/ai";
// import Loading from "../Loading/Loading";
// import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaCodepen, FaDev } from 'react-icons/fa';

// const Try = () => {
//   const [projects, setProjects] = useState([]);
//   const [uniqueId, setUniqueId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch projects with pagination or uniqueId filter
//   const fetchProjects = async (page = 1, uniqueIdFilter = "") => {
//     setLoading(true); // Set loading to true when fetching data
//     try {
//       const response = await axios.get(
//         `https://test-two-22w0.onrender.com/api/v1/project/getAllProject`,
//         {
//           params: {
//             page,
//             limit: 6,
//             uniqueId: uniqueIdFilter,
//           },
//         }
//       );
//       const data = response.data.data;

//       console.log("dd", data);

//       setProjects(data.projects || []);
//       setCurrentPage(data.currentPage || 1);
//       setTotalPages(data.totalPages || 1);

//       // Set isFiltered to true if uniqueIdFilter is applied, else false
//       setIsFiltered(!!uniqueIdFilter);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data.message ===
//           "No project matched with the provided uniqueId."
//       ) {
//         setProjects([]); // No match found
//       }
//     }
//     setLoading(false); // Set loading to false when data is fetched
//   };

//   // Initial fetch of projects
//   useEffect(() => {
//     fetchProjects(currentPage);
//   }, [currentPage]);

//   // Handle uniqueId filter
//   const handleFilter = () => {
//     fetchProjects(1, uniqueId);
//   };

//   // Reset to original paginated view
//   const handleReset = () => {
//     setUniqueId("");
//     setIsFiltered(false);
//     fetchProjects(1); // Fetch initial 6 projects
//   };

//   return (
//     <div>

//     <div className="flex justify-center items-center min-h-screen bg-purple-100">
//       <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
//         {/* Profile Image */}
//         <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-yellow-300 -mt-16">
//           <img
//             src="https://via.placeholder.com/100" // Replace this URL with the actual image URL
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Name and Role */}
//         <h2 className="text-2xl font-semibold mt-4">Joeylene Rivera</h2>
//         <p className="text-purple-600 font-medium">Web Developer</p>

//         {/* Bio */}
//         <p className="text-gray-600 mt-2 text-sm">
//           A kiddo who uses Bootstrap and Laravel in web development. Currently playing around with design via Figma.
//         </p>

//         {/* Email Button */}
//         <button className="bg-purple-700 text-white py-2 px-4 rounded-lg mt-4">
//           joeylenerivera@gmail.com
//         </button>

//         {/* Social Icons */}
//         <div className="flex justify-center space-x-4 mt-4 text-purple-600 text-xl">
//           <a href="#"><FaTwitter /></a>
//           <a href="#"><FaInstagram /></a>
//           <a href="#"><FaGithub /></a>
//           <a href="#"><FaLinkedin /></a>
//           <a href="#"><FaCodepen /></a>
//           <a href="#"><FaDev /></a>
//         </div>
//       </div>
//     </div>

//       <div>
//         <div className="w-5/12 flex justify-center items-center relative md:w-8/12 xl:w-7/12 2xl:w-6/12 3xl:w-7/12 mb-4">
//           <input
//             type="text"
//             placeholder="Search"
//             value={uniqueId}
//             onChange={(e) => setUniqueId(e.target.value)}
//             className="w-full h-9 md:h-10 lg:h-12 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
//           />
//           <IoIosSearch
//             onClick={handleFilter}
//             className="text-2xl absolute right-8 cursor-pointer"
//           />
//           {isFiltered && (
//             <AiOutlineReload
//               onClick={handleReset}
//               className="text-2xl absolute right-1 cursor-pointer"
//             />
//           )}
//         </div>
//         {loading ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {projects.length > 0 ? (
//               projects.map((p, i) => (
//                 <div key={i}>
//                   <div
//                     className={`pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-lg overflow-hidden`}
//                   >
//                     <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
//                       <img
//                         src={p.images[0]}
//                         alt="Project"
//                         className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
//                       />
//                     </div>
//                     <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3 md:px-5 lg:py-3 space-y-1 lg:space-y-1">
//                       <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold pt-2 ssm:py-0">
//                         {p.projectName.length > 15
//                           ? `${p.projectName.slice(0, 7)}...`
//                           : p.projectName}
//                       </p>
//                       <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-0">
//                         {p.projectName}
//                       </p>
//                       <div
//                         className="ssm:hidden pb-3"
//                         dangerouslySetInnerHTML={{
//                           __html: `${p.description.slice(0, 100)}${
//                             p.description.length > 100 ? "..." : ""
//                           }`,
//                         }}
//                       />
//                       <div
//                         className="hidden ssm:block md:hidden pb-3"
//                         dangerouslySetInnerHTML={{
//                           __html: p.description.slice(0, 130),
//                         }}
//                       />
//                       <div
//                         className="hidden md:block pb-3"
//                         dangerouslySetInnerHTML={{
//                           __html: p.description.slice(0, 100),
//                         }}
//                       />
//                       <button className="w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]">
//                         <Link to={`/dashboard/details/${p._id}`}>
//                           View More
//                         </Link>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="col-span-full text-center">
//                 No project matched with the provided uniqueId.
//               </p>
//             )}
//           </div>
//         )}

//         {!isFiltered && (
//           <div className="pagination flex justify-center mt-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Try;

{
  /* <div className="fixed top-0 left-0 lg:left-20 flex justify-center items-center bg-black/5 bg-opacity-50 w-screen h-screen overflow-y-scroll">
                      <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] 3xl:w-[800px] cursor-pointer">
                      <IoIosCloseCircleOutline
                          onClick={() => setIsPayModalOpen(false)}
                          className="text-xl float-right"
                        /> 
                        <div className="flex flex-col py-7">
                          <h2 className="text-xl lg:text-2xl font-bold mb-6">
                            Enter an amount for funding
                          </h2>

                        Radio Buttons for selecting funding type 
                          <div className="mb-6 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="donation"
                                  checked={selectedOption === "donation"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Donation</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="buyStack"
                                  checked={selectedOption === "buyStack"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Buy Stack</p>
                            </div>
                          </div>

                         Conditionally render based on selected option 
                          {selectedOption === "donation" ? (
                            <>
                              <input
                                //value={amount}
                                type="number"
                                // onChange={(e) =>
                                //   setAmount(parseFloat(e.target.value) || "")
                                // }
                                className="payment-input w-[200px] lg:w-[400px] mb-6"
                                placeholder="Enter Amount"
                              />
                              <button
                                // onClick={() => handlePayment(selectedProject)}
                                // disabled={loading}
                                className="fancy w-44"
                              >
                                <span className="top-key"></span>
                                <span className="text">
                                  {" pay"}
                                 {loading ? "Processing..." : "Pay Now"}
                                </span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                              </button>
                            </>
                          ) : (
                            <p className="text-2xl font-semibold py-3">
                              Coming Soon
                            </p>
                          )}
                        </div>
                      </div>
b                    </div> */
}

// const Try = () => {
//   const meetingData = {
//     _id: {
//       $oid: "670e0669f773c8df141b3f95",
//     },
//     projectId: {
//       $oid: "66e7b19955557bdb2d692820",
//     },
//     creator:  {
//       "_id": "66e6d2dac01285d519e32177",
//       "email": "shadrinmoni15@gmail.com",
//       "name": {
//       "firstName": "Jane",
//       "lastName": "Thompson",
//       "_id": "66ed67c443c00c866e98ec15"
//       },
//       "phoneNumber": "+124123235",
//       "phoneNumberPrivacy": false,
//       "address": "",
//       "addressPrivacy": false,
//       "country": "",
//       "role": "Full Stack Developer",
//       "profilePic": "",
//       "coverPic": "",
//       "about": "",
//       "emailVerified": true,
//       "createdAt": "2024-09-15T12:28:10.268Z",
//       "updatedAt": "2024-09-20T12:17:08.630Z",
//       "__v": 0,
//       "resetPasswordExpires": "2024-09-16T02:33:28.899Z",
//       "resetPasswordToken": "6dabde36f286cd52913ce2988086c80777d930b1dc0451600ca66dd9b8280b34"
//       },
//     meetingMembers: [
//       {
//         memberId: {
//           _id: "66de8586fa97180c4f05844f",
//           email: "mahintahmid2024@gmail.com",
//           name: {
//             firstName: "mahin",
//             lastName: "tahmid",
//             _id: "66fc6a6229ec316d1474d629",
//           },
//           profilePic:
//             "https://res.cloudinary.com/dv51da0o9/image/upload/v1725859341/fv470fyaktfhahparjdq.jpg",
//         },
//         attendance: [
//           {
//             meetingDate: "2024-10-06T06:30:00.000Z",
//             isAttend: false,
//             _id: "6702276349b7bc65dc3fc71b",
//           },
//         ],
//         _id: "6702267d49b7bc65dc3fc714",
//       },
//       {
//         memberId: {
//           _id: "66de8586fa97180c4f05844f",
//           email: "mahintahmid2024@gmail.com",
//           name: {
//             firstName: "Farin",
//             lastName: "tahmid",
//             _id: "66fc6a6229ec316d1474d629",
//           },
//           profilePic:
//             "https://res.cloudinary.com/dv51da0o9/image/upload/v1725859341/fv470fyaktfhahparjdq.jpg",
//         },
//         attendance: [
//           {
//             meetingDate: "2024-10-06T06:30:00.000Z",
//             isAttend: false,
//             _id: "6702276349b7bc65dc3fc71b",
//           },
//         ],
//         _id: "6702267d49b7bc65dc3fc714",
//       },
//     ],
//     title: "Test",
//     description: "Test description",
//     meetingPlatform: {
//       platform: "Zoom",
//       link: "https://zoom.com",
//     },
//     duration: 0,
//     meetingTime: {
//       $date: "2024-10-15T06:39:00.000Z",
//     },
//     timeZone: "Asia/Dhaka",
//     repeat: "everyday",
//     weeklyRepeat: 1,
//     endDate: {
//       $date: "2024-10-22T06:39:00.000Z",
//     },
//     customDays: [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     attendenceLink: null,
//     createdAt: {
//       $date: "2024-10-15T06:06:33.200Z",
//     },
//     updatedAt: {
//       $date: "2024-10-15T06:44:38.514Z",
//     },
//     __v: 0,
//   };

//   // Function to format the date
//   function formatDate(dateString, formatType) {
//     const date = new Date(dateString);

//     if (formatType === "date") {
//       const options = { day: "numeric", month: "short", year: "numeric" };
//       return date.toLocaleDateString("en-GB", options);
//     }

//     if (formatType === "time") {
//       const options = { hour: "numeric", minute: "numeric", hour12: true };
//       return date.toLocaleTimeString("en-GB", options);
//     }

//     if (formatType === "monthDayYear") {
//       const options = { day: "numeric", month: "short", year: "numeric" };
//       return date.toLocaleDateString("en-GB", options).replace(/\s/, ", ");
//     }
//   }

//   // Formatting Start Time (e.g., 10:00 AM)
//   const formattedStartTime = formatDate(meetingData.meetingTime.$date, "time");

//   // Formatting Start Date (e.g., 15 Oct, 2024)
//   const formattedStartDate = formatDate(
//     meetingData.meetingTime.$date,
//     "monthDayYear"
//   );

//   // Formatting End Date (e.g., 22 Oct, 2024)
//   const formattedEndDate = formatDate(
//     meetingData.endDate.$date,
//     "monthDayYear"
//   );

//   // Example Output
//   console.log(formattedStartTime); // "10:00 AM"
//   console.log(formattedStartDate); // "15 Oct, 2024"
//   console.log(formattedEndDate); // "22 Oct, 2024"

//   const bgColors = [
//     "#fff3c4",
//     "#e0ebf6",
//     "#d0cddd",
//     "#d0eafd",
//     "#d0cddd",
//     "#e0ffd2",
//     "#fddac2",
//     "#b0d3e8",
//   ];

//   return (
//     <div>
//       <div className="max-w-lg mx-auto bg-white border border-gray-300 shadow-md p-6 rounded-lg">
//         {/* Creator and Role */}
//         <div className="flex space-x-2 items-center mb-4">
//         <img
//                   src={
//                     meetingData.creator.profilePic
//                       ? meetingData.creator.profilePic
//                       : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                   }
//                   loading="lazy"
//                   alt={meetingData.creator.name?.firstName}
//                   className="h-12 w-12 rounded-full ml-2"
//                 />
//           <div>
//             <h2 className="text-lg font-semibold">{meetingData.creator.name?.firstName}  {meetingData.creator.name?.lastName}</h2>
//             <p className="text-sm text-gray-600">{meetingData.creator.role}</p>
//           </div>
//         </div>

//         {/* Meeting Details */}
//         <div className="mb-4">
//           <h3 className="text-lg font-bold">{meetingData.title}</h3>
//           <p className="text-lg text-gray-700">{meetingData.description}</p>
//         </div>

//         {/* Time & Schedule */}
//         <div className="mb-4">
//           <p className="text-lg text-gray-600">
//             Meeting will start from{" "}
//             <span className="font-bold">{formattedStartDate}</span>, and End
//             on <span className="font-bold">{formattedEndDate}</span>, on
//             every{" "}
//             <span className="font-bold">
//               {meetingData.customDays.join(", ")}
//             </span>

//           </p>

//           <p className="mt-4 font-bold text-lg ">
//             Start Time :{" "}
//             <span className="font-normal uppercase">{formattedStartTime}</span>
//           </p>
//         </div>

//         {/* Invited Members */}
//         <div className="mb-4">
//           <h4 className="font-bold text-lg">Invited Members:</h4>
//           <div className="grid grid-cols-2 gap-2 mt-2">
//             {meetingData.meetingMembers.map((item, index) => (
//               <div
//                 key={item?.memberId?.profilePic}
//                 style={{ backgroundColor: bgColors[index] }}
//                 className="flex  items-center px-3 py-2 rounded-lg shadow-lg  "
//               >
//                 <img
//                   src={
//                     item?.memberId?.profilePic
//                       ? item?.memberId?.profilePic
//                       : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                   }
//                   loading="lazy"
//                   alt={item?.memberId?.name?.firstName}
//                   className="h-9 w-9 rounded-full ml-2"
//                 />
//                 <div className="text-lg md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
//                   {item?.memberId?.name?.firstName}{" "}
//                   {item?.memberId?.name?.lastName}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Update Button */}
//         <div className="flex justify-center">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//             Update Attendance
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Try;
