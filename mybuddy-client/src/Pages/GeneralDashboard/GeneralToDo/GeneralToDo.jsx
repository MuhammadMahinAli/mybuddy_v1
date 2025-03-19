// import { useContext, useRef, useState } from "react";
// import { AiOutlineExpandAlt, AiOutlineFilePdf } from "react-icons/ai";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { FiCheckSquare, FiEdit3 } from "react-icons/fi";
// import { GoClock } from "react-icons/go";
// import { GrAttachment } from "react-icons/gr";
// import {
//   IoIosArrowBack,
//   IoIosArrowDown,
//   IoIosArrowForward,
//   IoIosArrowUp,
// } from "react-icons/io";
// import { IoCalendarOutline } from "react-icons/io5";
// import { PiShareFatLight } from "react-icons/pi";
// import Quill from "../../Try/Quill";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { rawFileUpload } from "../../../utils/cloudinaryForRaw";
// import { AuthContext } from "../../../Context/UserContext";
// import { useGetAllProjectTodoByUserQuery } from "../../../features/fund/fundApi";

// const GeneralToDo = () => {
//   const { userId } = useContext(AuthContext);
//   const { data: getAllProjectTodoByUser } =
//     useGetAllProjectTodoByUserQuery(userId);
//   const [isOpen, setIsOpen] = useState(false);
// const [loading, setLoading] = useState(false);
// const [isOpenCheckbox, setIsOpenCheckbox] = useState(false);
// const [selectedDate, setSelectedDate] = useState(new Date());
// const fileInputRef = useRef(null);

//   const todoData = getAllProjectTodoByUser?.data;
//   console.log(todoData);

//   function getDaysLeft(endDateString) {
//     const endDate = new Date(endDateString);
//     const today = new Date();

//     // Reset time to midnight for accurate comparison
//     today.setHours(0, 0, 0, 0);
//     endDate.setHours(0, 0, 0, 0);

//     // Calculate difference in days
//     const diffTime = endDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays > 0) {
//       return `${diffDays} day${diffDays > 1 ? "s" : ""} `;
//     } else if (diffDays === 0) {
//       return "Last day!";
//     } else {
//       return "Time's up!";
//     }
//   }

//   const statusStyles = {
//     "give-up": "bg-red-100 text-red-600 border-red-300",
//     done: "bg-yellow-100 text-yellow-700 border-yellow-300",
//     confuse: "bg-blue-100 text-blue-600 border-blue-300",
//     boring: "bg-gray-200 text-gray-600 border-gray-400",
//     working: "bg-green-100 text-green-700 border-green-300",
//     pending: "bg-yellow-200 text-yellow-800 border-yellow-400",
//   };

// const handleButtonClick = () => {
//   if (fileInputRef.current) {
//     fileInputRef.current.click(); // Programmatically trigger file input
//   }
// };

// // Format date as "Wednesday, 29 January"
// const formattedDate = selectedDate.toLocaleDateString("en-US", {
//   weekday: "long",
//   day: "numeric",
//   month: "long",
// });

// // Function to handle month navigation
// const changeMonth = (direction) => {
//   const newDate = new Date(selectedDate);
//   newDate.setMonth(selectedDate.getMonth() + direction);
//   setSelectedDate(newDate);
// };

// // ---------------- sliding box
// const [formData, setFormData] = useState({
//   title: "Untitled document",
//   description: "",
//   checklist: [], // Checklist items
//   attachments: [],
// });

// // Update title
// const handleTitleChange = (e) => {
//   setFormData((prev) => ({ ...prev, title: e.target.value }));
// };

// const handleTodoDesciption = (description) => {
//   setFormData((prevState) => ({
//     ...prevState,
//     description: description,
//   }));

//   console.log("description", description);
// };
// // State for checklist items
// const [checklistItems, setChecklistItems] = useState([
//   { id: 1, text: "lorem ipsum", checked: false },
//   { id: 2, text: "lorem-ipsum", checked: true },
// ]);

// // Add new checklist item
// const handleAddChecklistItem = () => {
//   const newItem = { id: Date.now(), text: "Add new item", checked: false };
//   setFormData((prev) => ({
//     ...prev,
//     checklist: [newItem, ...prev.checklist],
//   }));
// };

// // Toggle checklist item checked state
// const handleToggleChecklist = (id) => {
//   setFormData((prev) => ({
//     ...prev,
//     checklist: prev.checklist.map((item) =>
//       item.id === id ? { ...item, checked: !item.checked } : item
//     ),
//   }));
// };

// // Remove checklist item
// const handleRemoveChecklistItem = (id) => {
//   setFormData((prev) => ({
//     ...prev,
//     checklist: prev.checklist.filter((item) => item.id !== id),
//   }));
// };

// const handlePreviewPdf = async (e) => {
//   if (e.target.files && e.target.files.length > 0) {
//     const name = e.target.name;
//     setLoading((prev) => ({ ...prev, [name]: true }));

//     const file = e.target.files[0];

//     try {
//       // Upload PDF to Cloudinary
//       const uploadedUrl = await rawFileUpload(file, "raw");

//       if (uploadedUrl) {
//         console.log("Uploaded PDF URL:", uploadedUrl);

//         // Create an attachment object
//         const newAttachment = {
//           id: Date.now(),
//           fileName: file.name,
//           uploadedAt: new Date().toLocaleString(),
//           fileType: file.type,
//           fileUrl: uploadedUrl,
//         };

//         // Update formData with the new attachment
//         setFormData((prev) => ({
//           ...prev,
//           attachments: [...prev.attachments, newAttachment],
//         }));
//       }
//     } catch (error) {
//       console.error("Error uploading PDF:", error);
//     } finally {
//       setLoading((prev) => ({ ...prev, [name]: false }));
//     }
//   }
// };

// // Remove an attachment
// const handleRemoveAttachment = (id) => {
//   setFormData((prev) => ({
//     ...prev,
//     attachments: prev.attachments.filter((att) => att.id !== id),
//   }));
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const updatedFormData = {
//     ...formData,
//     listedBy: userId,
//   };

//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/v1/todo/add-new",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFormData), // Convert formData to JSON
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Success:", data);
//     alert("Data submitted successfully!");
//   } catch (error) {
//     console.error("Error submitting data:", error);
//     alert("Failed to submit data.");
//   }
// };

//   return (
//     <>
//       <div className="relative">
//         {/* primary content */}
// <div className="w-full  mx-auto p-4 space-y-4 bg-blue-50 min-h-screen">
//   {/* Header / Date Navigation */}
//   <div className="flex items-center space-x-3">
//     <div className="flex items-center space-x-0 border rounded-md">
//       <button
//         type="button"
//         onClick={() => changeMonth(-1)}
//         className="rounded-l-md border-r px-2 py-1 bg-white hover:bg-gray-100"
//       >
//         <IoIosArrowBack />
//       </button>

//       {/* Calendar Picker */}
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         dateFormat="dd/MM/yyyy"
//         className="hidden" // Hide default input
//         id="date-picker"
//       />
//       <button
//         type="button"
//         className="border-r px-2 py-1 bg-white hover:bg-gray-100"
//         onClick={() => document.getElementById("date-picker").click()}
//       >
//         <IoCalendarOutline />
//       </button>

//       <button
//         type="button"
//         onClick={() => changeMonth(1)}
//         className="rounded-r-md px-2 py-1 bg-white hover:bg-gray-100"
//       >
//         <IoIosArrowForward />
//       </button>
//     </div>

//     {/* Display Selected Date */}
//     <div className="text-gray-700 font-medium">{formattedDate}</div>

//     {/* Return to Today Button */}
//     <button
//       type="button"
//       className="text-blue-600 hover:underline"
//       onClick={() => setSelectedDate(new Date())}
//     >
//       Return To Today
//     </button>
//   </div>

//   {/* Input for new to-do */}
//   <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-2">
//     <span role="img" aria-label="pencil" className="text-gray-500">
//       <FiEdit3 />
//     </span>
//     <input
//       type="text"
//       placeholder="Write The Title Of Your To-Do"
//       className="flex-grow px-2 py-1 focus:outline-none"
//     />
//     <button
//       type="button"
//       onClick={() => setIsOpen(true)}
//       className="bg-blue-500 text-white rounded px-3 py-1 text-xl hover:bg-blue-600"
//     >
//       +
//     </button>
//   </div>

//           {/* Existing to-do item */}
//           <div className="bg-white rounded-lg shadow p-4">
//             {/* Title row */}
//             {todoData?.map((todo, i) => (
//               <div   onClick={() => setIsOpen(true)} key={i}>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <button type="button" className="text-gray-500">
//                       <IoIosArrowForward />
//                     </button>
//                     <span className="font-semibold text-xl text-gray-800">
//                       {todo?.projectName}
//                     </span>
//                   </div>
//                   <div

//                     className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded flex items-center space-x-2"
//                   >
//                     <GoClock />
//                     <span>{getDaysLeft(todo?.projectEndDate)} left</span>
//                   </div>
//                 </div>
//                 <div className="space-y-3 py-3">
//                   {todo?.todos?.map((t) => (
//                     <div
//                       key={t.title}
//                       className="flex justify-between items-center space-x-2 px-5 py-3 bg-[#f9fafb] rounded-xl"
//                     >
//                       <div className="flex items-start space-x-2">
//                         <button type="button" className="text-gray-500">
//                           <IoIosArrowForward />
//                         </button>
//                         <div className="flex flex-col">
//                           <span className="font-semibold text-gray-800">
//                             {t.title}
//                           </span>
//                           <span className="font-medium text-sm  text-gray-800">
//                             {getDaysLeft(t.endDate)}
//                           </span>
//                         </div>
//                       </div>

//                       <button
//                         className={`px-4 py-1 rounded-full border text-sm font-medium capitalize ${
//                           statusStyles[t.status] ||
//                           "bg-gray-300 text-gray-700 border-gray-500"
//                         }`}
//                       >
//                         {t.status}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             {/* Days left */}
//           </div>
//         </div>

//         {/* Sliding Box */}
//         <div
//           className={`fixed top-0 right-0 h-screen max-h-screen w-[800px] bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
//             isOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className=" bg-white rounded-lg shadow-md p-4 space-y-4">
//             {/* Top bar with placeholders for "Share" and "Expand" */}
//             <div className="flex justify-between items-center text-gray-500 text-sm">
//               <div className="flex items-center space-x-5">
//                 <button className="hover:underline flex items-center space-x-1">
//                   <PiShareFatLight className="text-xl" />
//                   <p>Share</p>
//                 </button>

//                 <button className="hover:underline flex items-center space-x-1">
//                   <AiOutlineExpandAlt className="text-xl" />
//                   <p>Expand</p>
//                 </button>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="focus:outline-none text-gray-400"
//               >
//                 {/* 'X' button placeholder to close */}✕
//               </button>
//             </div>

//             {/* Title Row */}
//             <div className="flex items-center space-x-2">
//               <button className="text-gray-500 focus:outline-none text-lg">
//                 {/* Expand/collapse arrow icon placeholder */}
//                 <IoIosArrowUp />
//               </button>
//               <input
//                 type="text"
//                 value={formData?.title}
//                 onChange={handleTitleChange}
//                 className="text-2xl font-bold text-gray-800 w-full bg-transparent focus:outline-none"
//               />
//             </div>

//             {/* Status & Date Row */}
//             <div className="flex items-center space-x-2">
//               {/* Status dropdown placeholder */}
//               <div className="relative">
//                 <button className="bg-green-100 text-green-700 px-3 py-1 rounded-md focus:outline-none flex items-center space-x-1">
//                   <span>Working</span>
//                   {/* Down arrow icon */}
//                   <IoIosArrowDown />
//                 </button>
//               </div>
//               {/* Date label */}

//               <div className="text-gray-500 text-sm  flex items-center space-x-2">
//                 <GoClock className="text-xl" />
//                 <span> July 10–14</span>
//               </div>
//             </div>

// {/* Time Spent Bar */}
// <div className="flex items-center justify-between bg-[linear-gradient(to_right,_#EFF4FA_0%,_#B4D9F6_8%,_#D6B6F9_90%)] rounded-md p-3 text-gray-600">
//   <div className="flex items-center space-x-2">
//     {/* Play icon placeholder 8.46> 3.12 */}
//     <span className="text-xl text-white bg-[#D6B6F9] px-2 rounded-md">
//       ▶
//     </span>
//     <span>Time Spent On This Project</span>
//   </div>
//   <div className="text-xl font-bold">12:45:00</div>
// </div>

//             {/* Editor Section */}
//             <div>
//               {/* Editor toolbar (placeholders) */}
//               <Quill
//                 formData={formData}
//                 handleTodoDesciption={handleTodoDesciption}
//               />
//             </div>

// {/* Buttons Row */}
// <div className="flex space-x-4">
//   <button
//     onClick={() => setIsOpenCheckbox(true)}
//     className="flex items-center space-x-2 bg-blue-100 text-blue-700 border border-blue-700 px-4 py-2 rounded-md hover:bg-blue-200"
//   >
//     <FiCheckSquare className="text-xl" />
//     <p>Create checklist</p>
//   </button>

//   <button
//     type="button"
//     onClick={handleButtonClick}
//     className="flex items-center space-x-2 bg-orange-100 text-orange-600 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-200"
//   >
//     <GrAttachment className="text-xl" />
//     <p>Add Attachment</p>
//   </button>

//   <input
//     ref={fileInputRef}
//     className="hidden"
//     type="file"
//     accept=".pdf"
//     id="attachment"
//     onChange={(e) => handlePreviewPdf(e)}
//   />
// </div>

// {/* Checklist Section */}
// {isOpenCheckbox && (
//   <div className="space-y-2">
//     <div className="flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <IoIosArrowDown onClick={() => setIsOpenCheckbox(false)} />

//         <h3 className="text-lg font-semibold text-gray-700">
//           Checklist{" "}
//           {formData?.checklist.filter((item) => item.checked).length}
//           /{formData?.checklist.length}
//         </h3>
//       </div>
//     </div>

//     {/* Progress Bar */}
//     <div className="flex justify-between items-center">
//       <div className="bg-blue-100 h-2 rounded relative w-11/12">
//         <div
//           className="bg-blue-500 h-2 rounded absolute left-0 top-0 transition-all duration-500"
//           style={{
//             width: `${
//               formData?.checklist.length > 0
//                 ? Math.round(
//                     (formData?.checklist.filter(
//                       (item) => item.checked
//                     ).length /
//                       formData?.checklist.length) *
//                       100
//                   )
//                 : 0
//             }%`,
//           }}
//         />
//       </div>
//       <span className="text-sm text-gray-600">
//         {formData?.checklist.length > 0
//           ? Math.round(
//               (formData?.checklist.filter((item) => item.checked)
//                 .length /
//                 formData?.checklist.length) *
//                 100
//             )
//           : 0}
//         %
//       </span>
//     </div>

//     {/* Checklist Items */}
//     <div className="space-y-4">
//       {formData?.checklist.map((item) => (
//         <div
//           key={item.id}
//           className="flex items-center space-x-2 p-3 bg-[#E5E5E5] rounded-xl border"
//         >
//           <input
//             type="checkbox"
//             checked={item.checked}
//             onChange={() => handleToggleChecklist(item.id)}
//             className="form-checkbox h-4 w-4 text-blue-600"
//           />
//           {item.checked ? (
//             <del className="flex-grow text-gray-600">
//               {item.text}
//             </del>
//           ) : (
//             <input
//               type="text"
//               value={item.text}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   checklist: prev.checklist.map((curr) =>
//                     curr.id === item.id
//                       ? { ...curr, text: e.target.value }
//                       : curr
//                   ),
//                 }))
//               }
//               className="bg-transparent flex-grow outline-none"
//             />
//           )}

//           <button
//             onClick={() => handleRemoveChecklistItem(item.id)}
//             className="text-red-600 hover:text-red-800 ml-auto"
//           >
//             <FaRegTrashAlt />
//           </button>
//         </div>
//       ))}

//       {/* "Add new item" button */}
//       <div
//         onClick={handleAddChecklistItem}
//         className="flex items-center space-x-2 p-2 bg-[#E5E5E5] rounded-xl border cursor-pointer"
//       >
//         <p className="border px-2 rounded-md border-gray-400">+</p>
//         <p className="flex-grow capitalize">Add new item</p>
//       </div>
//       <div
//         className="hidden md:block pb-3"
//         dangerouslySetInnerHTML={{
//           __html: `${formData?.description}
//                 `,
//         }}
//       />
//     </div>
//   </div>
// )}

// {/* Attachments Section */}
// <div className="space-y-2">
//   <div className="flex items-center space-x-3">
//     <IoIosArrowDown />
//     <h3 className="text-lg font-semibold text-gray-700">
//       Attachments
//     </h3>
//   </div>

//   <div className="flex flex-col items-center justify-between space-y-4 bg-gray-50 p-2 rounded w-full">
//     {/* Attachment icon placeholder */}

//     {formData?.attachments.length > 0 ? (
//       formData?.attachments.map((attachment) => (
//         <div
//           key={attachment.id}
//           className="flex items-center justify-between bg-gray-50 p-2 rounded border w-full"
//         >
//           <div className="flex items-center space-x-2">
//             <div className="bg-blue-100 rounded-md p-2">
//               <AiOutlineFilePdf className="text-3xl" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm text-gray-800">
//                 {attachment.fileName}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {attachment.uploadedAt}
//               </span>
//             </div>
//           </div>
//           <button
//             onClick={() => handleRemoveAttachment(attachment.id)}
//             className="text-red-600 hover:text-red-800 ml-auto"
//           >
//             <FaRegTrashAlt />
//           </button>
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-500 text-sm">
//         No attachments uploaded
//       </p>
//     )}
//   </div>
//             </div>
//             <button onClick={handleSubmit}>Submit</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GeneralToDo;
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineExpandAlt, AiOutlineFilePdf } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiCheckSquare, FiEdit3 } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import Quill from "../../Try/Quill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { rawFileUpload } from "../../../utils/cloudinaryForRaw";
import { AuthContext } from "../../../Context/UserContext";
import { useGetAllProjectTodoByUserQuery, useUpdateProjectTodoMutation } from "../../../features/fund/fundApi";
import Swal from "sweetalert2";

const GeneralToDo = () => {
  const { userId } = useContext(AuthContext);
  const { data: getAllProjectTodoByUser } =
    useGetAllProjectTodoByUserQuery(userId);
  const [updateProjectTodo]  = useUpdateProjectTodoMutation();
  const [loading, setLoading] = useState(false);
  const [isOpenCheckbox, setIsOpenCheckbox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectTodo, setSelectedProjectTodo] = useState(null); // Store selected todo item
  const [selectedTodo, setSelectedTodo] = useState(null); // Store selected todo item
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStart, setTimerStart] = useState(null);

  const todoData = getAllProjectTodoByUser?.data || [];

  const openSlideBox = (i) =>{
    setIsOpen(true)
    setSelectedProjectTodo(i)
  }
  const closeSlideBox = (i) =>{
    setIsOpen(false)
    setSelectedProjectTodo(null)
  }

  //----------- day left claculation
  function getDaysLeft(endDateString) {
    const endDate = new Date(endDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
    if (diffDays === 0) return "Last day!";
    return "Time's up!";
  }

  //----------- button design
  const statusStyles = {
    working: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-yellow-200 text-yellow-800 border-yellow-400",
    giveup: "bg-red-100 text-red-600 border-red-300",
    done: "bg-yellow-100 text-yellow-500 border-yellow-300",
    confuse: "bg-blue-100 text-blue-600 border-blue-300",
    boring: "bg-gray-200 text-gray-600 border-gray-400",
  };

  //----------- open Slider for a Specific Todo**
  const handleOpenTodo = (todo,id) => {
    setSelectedTodo(todo); // Store selected todo item
    setIsOpen(true);
setSelectedProjectTodo(id)
  };

  //----------- get day range
  function getDateRange(startDateString, endDateString) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const startDay = startDate.getDate(); // Extract day
    const endDay = endDate.getDate(); // Extract day

    const startMonth = startDate.toLocaleDateString("en-US", {
      month: "short",
    }); // Short month name
    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });

    // If both dates are in the same month -> "8-15 Jun"
    if (startMonth === endMonth) {
      return `${startDay}-${endDay} ${startMonth}`;
    }

    // If dates are in different months -> "15 May - 1 Jun"
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger file input
    }
  };

  //----------- Format date as "Wednesday, 29 January"
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  //----------- Function to handle month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  // ---------------- sliding box
 // const [formData, setFormData] = useState(selectedTodo || {});
 const [formData, setFormData] = useState({
  title: selectedTodo?.title || "Untitled document",
  description:selectedTodo?.description || "",
  checklist: selectedTodo?.checklist || [], 
  attachments: selectedTodo?.attachments || [],
  timer: selectedTodo?.timer || null,
  status: selectedTodo?.status || ""
});

  useEffect(() => {
    setFormData(selectedTodo);
    setElapsedTime(selectedTodo?.timer || 0);
  }, [selectedTodo]);

  //----------- Update title
  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  //----------- description
  const handleTodoDesciption = (description) => {
    setFormData((prevState) => ({
      ...prevState,
      description: description,
    }));

    console.log("description", description);
  };
  //----------- State for checklist items
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "lorem ipsum", checked: false },
    { id: 2, text: "lorem-ipsum", checked: true },
  ]);

  //----------- Add new checklist item
  const handleAddChecklistItem = () => {
    const newItem = { id: Date.now(), text: "Add new item", checked: false };
  
    setFormData((prev) => ({
      ...prev,
      checklist: Array.isArray(prev.checklist) ? [newItem, ...prev.checklist] : [newItem],
    }));
  };
  

  //----------- Toggle checklist item checked state
  const handleToggleChecklist = (id) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  //----------- Remove checklist item
  const handleRemoveChecklistItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((item) => item.id !== id),
    }));
  };

  //----------- upload pdf
  const handlePreviewPdf = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.name;
      setLoading((prev) => ({ ...prev, [name]: true }));

      const file = e.target.files[0];

      try {
        // Upload PDF to Cloudinary
        const uploadedUrl = await rawFileUpload(file, "raw");

        if (uploadedUrl) {
          console.log("Uploaded PDF URL:", uploadedUrl);

          // Create an attachment object
          const newAttachment = {
            id: Date.now(),
            fileName: file.name,
            uploadedAt: new Date().toLocaleString(),
            fileType: file.type,
            fileUrl: uploadedUrl,
          };

          // Update formData with the new attachment
          setFormData((prev) => ({
            ...prev,
            attachments: Array.isArray(prev.attachments) ? [...prev.attachments, newAttachment] : [newAttachment],
          }))
        }
      } catch (error) {
        console.error("Error uploading PDF:", error);
      } finally {
        setLoading((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  //----------- Remove an attachment
  const handleRemoveAttachment = (id) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }));
  };

  // Function to start/stop timer
  const handleTimerToggle = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setTimerStart(Date.now() - elapsedTime * 1000); // Preserve elapsed time
      setIsRunning(true);
    }
  };

  // Reset timer
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const newTime = Math.floor((Date.now() - timerStart) / 1000);
        setFormData((prev) => ({ ...prev, timer: newTime }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerStart]);

  // Convert seconds to HH:MM:SS format
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoId = selectedTodo?._id;
    const projectId = selectedProjectTodo;
  
    try {
      const result = await updateProjectTodo({
        todoId,
        projectId,
        data: formData,
      });
  
      console.log("Updated Todo:", result);
  
      // ✅ Show Success Alert
      if (result?.data?.success) {
        Swal.fire({
          title: "Success!",
          text: "Todo updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating Todo:", error);
  
      // ❌ Show Error Alert
      Swal.fire({
        title: "Error!",
        text: "Failed to update the Todo. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  useEffect(() => {
    if (selectedTodo?.checklist && Array.isArray(selectedTodo.checklist)) {
      setFormData((prev) => ({
        ...prev,
        checklist: selectedTodo.checklist,
      }));
    }
  }, [selectedTodo]);
  
  console.log(formData?.checklist );
  return (
    <>
      <div className="relative">
        {/* Primary Content */}
        <div className="w-full  mx-auto p-4 space-y-4 bg-blue-50">
          {/* Header / Date Navigation */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-0 border rounded-md">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="rounded-l-md border-r px-2 py-1 bg-white hover:bg-gray-100"
              >
                <IoIosArrowBack />
              </button>

              {/* Calendar Picker */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="hidden" // Hide default input
                id="date-picker"
              />
              <button
                type="button"
                className="border-r px-2 py-1 bg-white hover:bg-gray-100"
                onClick={() => document.getElementById("date-picker").click()}
              >
                <IoCalendarOutline />
              </button>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="rounded-r-md px-2 py-1 bg-white hover:bg-gray-100"
              >
                <IoIosArrowForward />
              </button>
            </div>

            {/* Display Selected Date */}
            <div className="text-gray-700 font-medium">{formattedDate}</div>

            {/* Return to Today Button */}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setSelectedDate(new Date())}
            >
              Return To Today
            </button>
          </div>

          {/* Input for new to-do */}
          <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-2">
            <span role="img" aria-label="pencil" className="text-gray-500">
              <FiEdit3 />
            </span>
            <input
              type="text"
              placeholder="Write The Title Of Your To-Do"
              className="flex-grow px-2 py-1 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 text-white rounded px-3 py-1 text-xl hover:bg-blue-600"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-full mx-auto p-4 space-y-4 bg-blue-50 min-h-screen">
          {/* Existing To-Do List */}
          <div className="bg-white rounded-lg shadow p-4">
            {todoData.map((project, projectIndex) => (
              <div key={projectIndex}>
                {/* Project Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button type="button" className="text-gray-500">
                      <IoIosArrowForward />
                    </button>
                    <span className="font-semibold text-xl text-gray-800">
                      {project?.projectName}
                    </span>
                  </div>
                  <div className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded flex items-center space-x-2">
                    <GoClock />
                    <span>{getDaysLeft(project?.projectEndDate)}</span>
                  </div>
                </div>

                {/* Todos List */}
                <div className="space-y-3 py-3">
                  {project?.todos?.map((todo) => (
                    <div
                      key={todo._id}
                      className="flex justify-between items-center space-x-2 px-5 py-3 bg-[#f9fafb] rounded-xl cursor-pointer"
                      onClick={() => handleOpenTodo(todo,project?._id)} // Open slider for this todo
                    >
                      <div className="flex items-start space-x-2">
                        <button type="button" className="text-gray-500">
                          <IoIosArrowForward />
                        </button>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800">
                            {todo.title}
                          </span>
                          <span className="font-medium text-sm text-gray-800">
                            {getDaysLeft(todo.endDate)}
                          </span>
                        </div>
                      </div>

                      <button
                        className={`px-4 py-1 rounded-full border text-sm font-medium capitalize ${
                          statusStyles[todo.status] ||
                          "bg-gray-300 text-gray-700 border-gray-500"
                        }`}
                      >
                        {todo.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sliding Box (Shows Selected Todo) */}
        <div
          className={`fixed top-0 right-0 h-screen w-[800px] bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-gray-500 text-sm">
              <div className="flex items-center space-x-5">
                <button className="hover:underline flex items-center space-x-1">
                  <PiShareFatLight className="text-xl" />
                  <p>Share</p>
                </button>
                <button className="hover:underline flex items-center space-x-1">
                  <AiOutlineExpandAlt className="text-xl" />
                  <p>Expand</p>
                </button>
              </div>
              <button
                onClick={closeSlideBox}
                className="focus:outline-none text-gray-400"
              >
                ✕
              </button>
            </div>

            {/* Title Input */}
            {selectedTodo && (
              <>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-500 focus:outline-none text-lg">
                    <IoIosArrowUp />
                  </button>
                  <input
                    type="text"
                    value={formData?.title}
                    onChange={handleTitleChange}
                    className="text-2xl font-bold text-gray-800 w-full bg-transparent focus:outline-none"
                  />
                </div>

                {/* Status & Date */}
                <div className="flex items-center space-x-2">
                  {/* <button
                    className={`px-3 py-1 capitalize rounded-md focus:outline-none flex items-center space-x-1 ${
                      statusStyles[selectedTodo.status] ||
                      "bg-gray-300 text-gray-700 border-gray-500"
                    }`}
                  >
                    <span>{selectedTodo.status}</span>
                    <IoIosArrowDown />
                  </button> */}
                  <div className="flex items-center space-x-2">
          <select
            name="status"
            value={formData?.status}
            onChange={handleStatusChange}
            className={`px-3 py-1 capitalize rounded-md focus:outline-none flex items-center space-x-1 ${
              statusStyles[selectedTodo?.status] ||
              "bg-gray-300 text-gray-700 border-gray-500"
            }`}
          >
            <option value="working">Working</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="giveup">Give Up</option>
            <option value="boring">Boring</option>
            <option value="confuse">Confuse</option>
          </select>
        </div>
                  <div className="text-gray-500 text-sm flex items-center space-x-2">
                    <GoClock className="text-xl" />
                    <span>
                      {getDateRange(
                        selectedTodo.startDate,
                        selectedTodo.endDate
                      )}
                    </span>
                  </div>
                </div>

                {/* Time Spent Bar */}
                <div className="flex items-center justify-between relative bg-[linear-gradient(to_right,_#EFF4FA_0%,_#B4D9F6_8%,_#D6B6F9_90%)] rounded-md p-3 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleTimerToggle}
                      className="text-xl text-white bg-[#D6B6F9] px-3 py-1 rounded-md"
                    >
                      {isRunning ? "■" : "▶"} {/* Play/Stop Icon */}
                    </button>
                    <span>{isRunning ? "Running..." : "Start Timer"}</span>
                  </div>
                  <div className="text-xl font-bold flex items-center space-x-4">
                    {formData?.timer> 0 && (
                      <button
                        onClick={handleReset}
                        className="text-red-600 text-sm font-bold"
                      >
                        Reset
                      </button>
                    )}
                       <p>{formatTime(formData?.timer)}</p>
                  </div>
                </div>
                {/* Description Editor */}
                <Quill formData={selectedTodo} handleTodoDesciption={handleTodoDesciption} />

                {/* Buttons Row */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsOpenCheckbox(true)}
                    className="flex items-center space-x-2 bg-blue-100 text-blue-700 border border-blue-700 px-4 py-2 rounded-md hover:bg-blue-200"
                  >
                    <FiCheckSquare className="text-xl" />
                    <p>Create checklist</p>
                  </button>

                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="flex items-center space-x-2 bg-orange-100 text-orange-600 border border-orange-500 px-4 py-2 rounded-md hover:bg-orange-200"
                  >
                    <GrAttachment className="text-xl" />
                    <p>Add Attachment</p>
                  </button>

                  <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    accept=".pdf"
                    id="attachment"
                    onChange={(e) => handlePreviewPdf(e)}
                  />
                </div>

                {/* Checklist Section */}
                {formData?.checklist?.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IoIosArrowDown
                          onClick={() => setIsOpenCheckbox(false)}
                        />

                        <h3 className="text-lg font-semibold text-gray-700">
                          Checklist{" "}
                          {
                            formData?.checklist?.filter((item) => item.checked)
                              .length
                          }
                          /{formData?.checklist?.length}
                        </h3>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex justify-between items-center">
                      <div className="bg-blue-100 h-2 rounded relative w-11/12">
                        <div
                          className="bg-blue-500 h-2 rounded absolute left-0 top-0 transition-all duration-500"
                          style={{
                            width: `${
                              formData?.checklist?.length > 0
                                ? Math.round(
                                    (formData?.checklist?.filter(
                                      (item) => item.checked
                                    ).length /
                                      formData?.checklist?.length) *
                                      100
                                  )
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {formData?.checklist?.length > 0
                          ? Math.round(
                              (formData?.checklist?.filter((item) => item.checked)
                                .length /
                                formData?.checklist?.length) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-4">
                      {formData?.checklist?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2 p-3 bg-[#E5E5E5] rounded-xl border"
                        >
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleToggleChecklist(item.id)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          {item.checked ? (
                            <del className="flex-grow text-gray-600">
                              {item.text}
                            </del>
                          ) : (
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  checklist: prev?.checklist?.map((curr) =>
                                    curr.id === item.id
                                      ? { ...curr, text: e.target.value }
                                      : curr
                                  ),
                                }))
                              }
                              className="bg-transparent flex-grow outline-none"
                            />
                          )}

                          <button
                            onClick={() => handleRemoveChecklistItem(item.id)}
                            className="text-red-600 hover:text-red-800 ml-auto"
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      ))}

                      {/* "Add new item" button */}
                      <div
                        onClick={handleAddChecklistItem}
                        className="flex items-center space-x-2 p-2 bg-[#E5E5E5] rounded-xl border cursor-pointer"
                      >
                        <p className="border px-2 rounded-md border-gray-400">
                          +
                        </p>
                        <p className="flex-grow capitalize">Add new item</p>
                      </div>
                      <div
                        className="hidden md:block pb-3"
                        dangerouslySetInnerHTML={{
                          __html: `${formData?.description}
                            `,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Attachments Section */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <IoIosArrowDown />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Attachments
                    </h3>
                  </div>

                  <div className="flex flex-col items-center justify-between space-y-4 bg-gray-50 p-2 rounded w-full">
                    {/* Attachment icon placeholder */}

                    {formData?.attachments?.length > 0 ? (
                      formData?.attachments?.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded border w-full"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-100 rounded-md p-2">
                              <AiOutlineFilePdf className="text-3xl" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-800">
                                {attachment.fileName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {attachment.uploadedAt}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleRemoveAttachment(attachment.id)
                            }
                            className="text-red-600 hover:text-red-800 ml-auto"
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No attachments uploaded
                      </p>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                <button onClick={handleSubmit} className="w-full bg-gray-200 py-2 rounded-md">
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralToDo;
