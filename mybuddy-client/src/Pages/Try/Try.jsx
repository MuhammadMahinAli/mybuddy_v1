import { useRef, useState } from "react";
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
import Quill from "./Quill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { rawFileUpload } from "../../utils/cloudinaryForRaw";

const Try = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading , setLoading] = useState(false);
  const [isOpenCheckbox, setIsOpenCheckbox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger file input
    }
  };

  // Format date as "Wednesday, 29 January"
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Function to handle month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  // ---------------- sliding box
  const [formData, setFormData] = useState({
    title: "Untitled document",
    description: "",
    checklist: [], // Checklist items
    attachments: [ ],
  });

  // Update title
  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleTodoDesciption = (description) => {
    setFormData((prevState) => ({
      ...prevState,
      description: description,
    }));

    console.log("description", description);
  };
  // State for checklist items
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "lorem ipsum", checked: false },
    { id: 2, text: "lorem-ipsum", checked: true },
  ]);

  // Add new checklist item
  const handleAddChecklistItem = () => {
    const newItem = { id: Date.now(), text: "Add new item", checked: false };
    setFormData((prev) => ({
      ...prev,
      checklist: [newItem, ...prev.checklist],
    }));
  };

  // Toggle checklist item checked state
  const handleToggleChecklist = (id) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  // Remove checklist item
  const handleRemoveChecklistItem = (id) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((item) => item.id !== id),
    }));
  };

  // Handle file attachment upload
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const newAttachment = {
  //       id: Date.now(),
  //       fileName: file.name,
  //       uploadedAt: new Date().toLocaleString(),
  //       fileType: file.type,
  //     };
      // setFormData((prev) => ({
      //   ...prev,
      //   attachments: [...prev.attachments, newAttachment],
      // }));
  //   }
  // };
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
            attachments: [...prev.attachments, newAttachment],
          }));
        }
      } catch (error) {
        console.error("Error uploading PDF:", error);
      } finally {
        setLoading((prev) => ({ ...prev, [name]: false }));
      }
    }
  };


  
  // Remove an attachment
  const handleRemoveAttachment = (id) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }));
  };
  



  // Count completed items for progress bar
  // const completedCount = checklistItems.filter((item) => item.checked).length;
  // const totalItems = checklistItems.length;
  // const progressPercent =
  //   totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <>
      <div className="relative">
        {/* primary content */}
        <div className="w-full max-w-xl mx-auto p-4 space-y-4 bg-blue-50 min-h-screen">
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

          {/* Existing to-do item */}
          <div className="bg-white rounded-lg shadow p-4">
            {/* Title row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button type="button" className="text-gray-500">
                  <IoIosArrowForward />
                </button>
                <span className="font-medium text-gray-800">Title</span>
              </div>
              <div
                onClick={() => setIsOpen(true)}
                className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded flex items-center space-x-2"
              >
                <p> To-Do</p>
                <IoIosArrowDown />
              </div>
            </div>

            {/* Days left */}
            <div className="text-gray-500 text-sm mt-2 flex items-center space-x-2">
              <GoClock />
              <span>10 days left</span>
            </div>
          </div>
        </div>

        {/* Sliding Box */}
        <div
          className={`fixed top-0 right-0 h-screen max-h-screen w-[800px] bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className=" bg-white rounded-lg shadow-md p-4 space-y-4">
            {/* Top bar with placeholders for "Share" and "Expand" */}
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
                onClick={() => setIsOpen(false)}
                className="focus:outline-none text-gray-400"
              >
                {/* 'X' button placeholder to close */}✕
              </button>
            </div>

            {/* Title Row */}
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 focus:outline-none text-lg">
                {/* Expand/collapse arrow icon placeholder */}
                <IoIosArrowUp />
              </button>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="text-2xl font-bold text-gray-800 w-full bg-transparent focus:outline-none"
              />
            </div>

            {/* Status & Date Row */}
            <div className="flex items-center space-x-2">
              {/* Status dropdown placeholder */}
              <div className="relative">
                <button className="bg-green-100 text-green-700 px-3 py-1 rounded-md focus:outline-none flex items-center space-x-1">
                  <span>Working</span>
                  {/* Down arrow icon */}
                  <IoIosArrowDown />
                </button>
              </div>
              {/* Date label */}

              <div className="text-gray-500 text-sm  flex items-center space-x-2">
                <GoClock className="text-xl" />
                <span> July 10–14</span>
              </div>
            </div>

            {/* Time Spent Bar */}
            <div className="flex items-center justify-between bg-[linear-gradient(to_right,_#EFF4FA_0%,_#B4D9F6_8%,_#D6B6F9_90%)] rounded-md p-3 text-gray-600">
              <div className="flex items-center space-x-2">
                {/* Play icon placeholder 8.46> 3.12 */}
                <span className="text-xl text-white bg-[#D6B6F9] px-2 rounded-md">
                  ▶
                </span>
                <span>Time Spent On This Project</span>
              </div>
              <div className="text-xl font-bold">12:45:00</div>
            </div>

            {/* Editor Section */}
            <div>
              {/* Editor toolbar (placeholders) */}
              <Quill
                formData={formData}
                handleTodoDesciption={handleTodoDesciption}
              />
            </div>

            {/* Buttons Row */}
            <div className="flex space-x-4">
              <button onClick={()=>setIsOpenCheckbox(true)} className="flex items-center space-x-2 bg-blue-100 text-blue-700 border border-blue-700 px-4 py-2 rounded-md hover:bg-blue-200">
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
             {
              isOpenCheckbox &&
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IoIosArrowDown onClick={()=>setIsOpenCheckbox(false)} />

                  <h3 className="text-lg font-semibold text-gray-700">
                    Checklist{" "}
                    {formData.checklist.filter((item) => item.checked).length}/
                    {formData.checklist.length}
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
                        formData.checklist.length > 0
                          ? Math.round(
                              (formData.checklist.filter((item) => item.checked)
                                .length /
                                formData.checklist.length) *
                                100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {formData.checklist.length > 0
                    ? Math.round(
                        (formData.checklist.filter((item) => item.checked)
                          .length /
                          formData.checklist.length) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>

              {/* Checklist Items */}
              <div className="space-y-4">
                {formData.checklist.map((item) => (
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
                      <del className="flex-grow text-gray-600">{item.text}</del>
                    ) : (
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            checklist: prev.checklist.map((curr) =>
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
                  <p className="border px-2 rounded-md border-gray-400">+</p>
                  <p className="flex-grow capitalize">Add new item</p>
                </div>
                <div
                  className="hidden md:block pb-3"
                  dangerouslySetInnerHTML={{
                    __html: `${formData.description}
                            `,
                  }}
                />
              </div>
            </div>
            }

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

                  {formData.attachments.length > 0 ? (
                    formData.attachments.map((attachment) => (
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
                      onClick={() => handleRemoveAttachment(attachment.id)}
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

           
          </div>
        </div>
      </div>
    </>
  );
};

export default Try;
//-----------------------------------text edit

// const editorRef = useRef(null);
// const [content, setContent] = useState(""); // Will store HTML content

// // Apply formatting to the selected text inside the editor
// const applyFormat = (format) => {
//   if (!editorRef.current) return;
//   editorRef.current.focus();

//   const selection = window.getSelection();
//   if (!selection.rangeCount) return;
//   const range = selection.getRangeAt(0);
//   const selectedText = range.toString();
//   if (!selectedText) return;

//   let html = "";
//   if (format === "h1") {
//     html = `<span style="font-size:24px;">${selectedText}</span>`;
//   } else if (format === "h2") {
//     html = `<span style="font-size:20px;">${selectedText}</span>`;
//   } else if (format === "h3") {
//     html = `<span style="font-size:16px;">${selectedText}</span>`;
//   } else if (format === "b") {
//     html = `<strong>${selectedText}</strong>`;
//   } else if (format === "i") {
//     html = `<em>${selectedText}</em>`;
//   } else if (format === "u") {
//     html = `<u>${selectedText}</u>`;
//   } else if (format === "link") {
//     const url = prompt("Enter a URL:");
//     if (!url) return;
//     html = `<a href="${url}" target="_blank">${selectedText}</a>`;
//   } else {
//     return;
//   }

//   // Replace the selected text with our formatted HTML.
//   document.execCommand("insertHTML", false, html);
//   // Update state with the new HTML content
//   setContent(editorRef.current.innerHTML);
// };

// // Whenever the user types or pastes, update content
// const handleInput = () => {
//   if (editorRef.current) {
//     setContent(editorRef.current.innerHTML);
//   }
// };

// const editorRef = useRef(null);
// const [content, setContent] = useState("");

// const handleInput = () => {
//   if (editorRef.current) {
//     setContent(editorRef.current.innerHTML);
//   }
// };

// const applyFormat = (format) => {
//   if (!editorRef.current) return;
//   editorRef.current.focus();

//   // Ensure styles apply as inline CSS (preserving multiple styles)
//   document.execCommand("styleWithCSS", false, true);

//   switch (format) {
//     /* ------------------ HEADINGS WITH CUSTOM SIZES ------------------ */
//     case "h1":
//     case "h2":
//     case "h3": {
//       // Step 1: Use fontSize=7 to get largest built-in size
//       document.execCommand("fontSize", false, "7");

//       // Step 2: Decide custom px size
//       let size = 16;
//       if (format === "h1") size = 24;
//       if (format === "h2") size = 20;
//       if (format === "h3") size = 16; // default anyway

//       // Step 3: Replace <font size="7"> with <span style="font-size:XXpx">
//       const editorEl = editorRef.current;
//       const fonts = editorEl.querySelectorAll('font[size="7"]');
//       fonts.forEach((fontEl) => {
//         const span = document.createElement("span");
//         span.style.fontSize = `${size}px`;
//         // Move all child nodes from <font> to <span>
//         while (fontEl.firstChild) {
//           span.appendChild(fontEl.firstChild);
//         }
//         fontEl.replaceWith(span);
//       });
//       break;
//     }

//     /* ------------------ BASIC STYLES ------------------ */
//     case "bold":
//       document.execCommand("bold", false, null);
//       break;
//     case "italic":
//       document.execCommand("italic", false, null);
//       break;
//     case "underline":
//       document.execCommand("underline", false, null);
//       break;
//     case "strike":
//       document.execCommand("strikeThrough", false, null);
//       break;

//     /* ------------------ LINKS ------------------ */
//     case "link": {
//       const url = prompt("Enter a URL:");
//       if (url) {
//         document.execCommand("createLink", false, url);
//       }
//       break;
//     }

//     /* ------------------ LISTS ------------------ */
//     case "ul":
//       document.execCommand("insertUnorderedList", false, null);
//       break;
//     case "ol":
//       document.execCommand("insertOrderedList", false, null);
//       break;

//     /* ------------------ ALIGNMENT ------------------ */
//     case "alignLeft":
//       document.execCommand("justifyLeft", false, null);
//       break;
//     case "alignCenter":
//       document.execCommand("justifyCenter", false, null);
//       break;
//     case "alignRight":
//       document.execCommand("justifyRight", false, null);
//       break;

//     /* ------------------ CHECKBOX ------------------ */
//     case "checkbox": {
//       // Insert a single checkbox at cursor
//       // or replace selected text with a "label + checkbox"
//       const selection = window.getSelection();
//       if (!selection.rangeCount) break;
//       const selectedText = selection.toString();
//       let html = `<input type="checkbox" />`;
//       if (selectedText) {
//         html = `<label style="margin-right:4px;"><input type="checkbox" /> ${selectedText}</label>`;
//       }
//       document.execCommand("insertHTML", false, html);
//       break;
//     }

//     /* ------------------ IMAGE ------------------ */
//     case "image": {
//       const imageUrl = prompt("Enter the image URL:");
//       if (imageUrl) {
//         document.execCommand("insertImage", false, imageUrl);
//       }
//       break;
//     }

//     /* ------------------ REMOVE FORMAT ------------------ */
//     case "removeFormat":
//       // Removes all formatting (bold, italic, spans, fonts, etc.) from selection
//       document.execCommand("removeFormat", false, null);
//       break;

//     default:
//       break;
//   }

//   // Update content state after applying
//   setContent(editorRef.current.innerHTML);
// };

{
  /* <div className="space-y-4 p-4 max-w-xl mx-auto">
      
      <div className="flex space-x-2 text-gray-500 mb-2">
        <button onClick={() => applyFormat("h1")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H1
        </button>
        <button onClick={() => applyFormat("h2")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H2
        </button>
        <button onClick={() => applyFormat("h3")} className="hover:bg-gray-100 px-2 py-1 rounded">
          H3
        </button>
        <button onClick={() => applyFormat("b")} className="hover:bg-gray-100 px-2 py-1 rounded">
          B
        </button>
        <button onClick={() => applyFormat("i")} className="hover:bg-gray-100 px-2 py-1 rounded">
          I
        </button>
        <button onClick={() => applyFormat("u")} className="hover:bg-gray-100 px-2 py-1 rounded">
          U
        </button>
        <button onClick={() => applyFormat("link")} className="hover:bg-gray-100 px-2 py-1 rounded">
          🔗
        </button>
      </div>

    
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none min-h-[100px]"
      >
        Write your text here...
      </div>

   
      <div className="p-4 border border-gray-200 rounded">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div> */
}

// import { useEffect, useState, useContext } from "react";
// import AboutTab from "../Feed/AboutTab";
// import ProjectTab from "../Feed/ProjectTab";
// import SkillTab from "../Feed/SkillTab";
// import SocialTab from "../Feed/SocialTab";
// // import MobileNavbar from "../../common/MobileNavbar/MobileNavbar";
// // import TabletNavbar from "../TabletNavbar/TabletNavbar";
// import { useSelector } from "react-redux";
// import feedWhiteBorder from "../../assets/home/feed-w-b.png";
// import feedDarkBorder from "../../assets/home/feed-d-b.png";
// import { AuthContext } from "../../Context/UserContext";
// import { apiFetch } from "../../utils/apiFetch";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import Loading from "../Loading/Loading";
// import axios from "axios";
// import MobileNavbar from "../../common/MobileNavbar/MobileNavbar";
// import TabletNavbar from "../TabletNavbar/TabletNavbar";
// import { MdOutlineEmail } from "react-icons/md";
// import {
//   FaRegArrowAltCircleLeft,
//   FaRegArrowAltCircleRight,
// } from "react-icons/fa";

// const Try = () => {
//   const [activeTab, setActiveTab] = useState({});
//   const [userData, setUserData] = useState({});
//   const [users, setUsers] = useState([]);
//   //const [allUsers, setAllUsers] = useState([]);
//   const theme = useSelector((state) => state.theme.theme);
//   const { getAllUsers, user, createNewRequest, getAllStatusFriendRequest } =
//     useContext(AuthContext);
//   const requestedId = user?._id;
//   const roles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "MERN Stack Developer",
//     "UI/UX Designer",
//     "Project Manager",
//     "DevOps Engineer",
//     "Full Stack Developer",
//     "Data Scientist",
//     "Machine Learning Engineer",
//     "Mobile App Developer",
//     "Game Developer",
//     "Cloud Engineer",
//     "Cybersecurity Specialist",
//     "Blockchain Developer",
//     "Software Architect",
//     "Quality Assurance Engineer",
//     "System Administrator",
//     "AI Researcher",
//     "Database Administrator",
//     "Technical Support Specialist",
//     "Embedded Systems Developer",
//     "Product Manager",
//     "Business Analyst",
//     "Solutions Architect",
//     "Security Analyst",
//     "Network Engineer",
//     "IT Consultant",
//     "E-commerce Specialist",
//     "IT Support Technician",
//     "SEO Specialist",
//     "Digital Marketing Specialist",
//     "Content Creator",
//     "Graphic Designer",
//     "Hardware Engineer",
//     "Big Data Engineer",
//     "IoT Developer",
//     "Game Designer",
//     "Video Editor",
//     "Technical Writer",
//     "IT Manager",
//   ];
//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//     setCurrentPage(1); // Reset to first page when changing filters
//   };

//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [isFiltered, setIsFiltered] = useState(false);

//   const fetchUsers = async (page = 1, roleFilter = "") => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-two-22w0.onrender.com/api/v1/member/getAll`,
//         {
//           params: {
//             page,
//             limit: 6,
//             role: roleFilter,
//           },
//         }
//       );

//       const data = response.data.data;

//       console.log("data", data, roleFilter);

//       setUsers(data || []);
//       setCurrentPage(response.data?.data?.currentPage || 1);
//       setTotalPages(response.data?.data?.totalPages || 1);

//       setIsFiltered(!!roleFilter);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setUsers([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers(currentPage, selectedRole);
//   }, [currentPage, selectedRole]);

//   // Shuffle users list
//   const getShuffledUsers = (userList) => {
//     if (!userList || userList.length === 0) return [];

//     const shuffled = [...userList].sort(() => 0.5 - Math.random());
//     return shuffled;
//   };

//   // Automatically fetch and shuffle users on component mount
//   useEffect(() => {
//     const fetchAndShuffleUsers = async () => {
//       await fetchUsers(currentPage, selectedRole); // Fetch users from API
//       setUsers((prevUsers) => getShuffledUsers(prevUsers)); // Shuffle users
//     };

//     fetchAndShuffleUsers();
//   }, []); // Runs only on initial page load

//   const toggleTab = async (userId, tab) => {
//     setActiveTab((prevState) => ({
//       ...prevState,
//       [userId]: tab,
//     }));

//     if (!userData[userId]?.[tab]) {
//       await fetchData(userId, tab);
//     }
//   };

//   console.log("datas", users.length);

//   const fetchData = async (userId, tab) => {
//     if (!userId || !tab) return;

//     try {
//       let data;
//       switch (tab) {
//         case "description":
//           data = await apiFetch(
//             `https://test-two-22w0.onrender.com/api/v1/member/getUserById/${userId}`,
//             "GET"
//           );
//           setUserData((prevState) => ({
//             ...prevState,
//             [userId]: {
//               ...prevState[userId],
//               description: data?.data ?? {},
//             },
//           }));
//           break;
//         case "skill":
//           data = await apiFetch(
//             `https://test-two-22w0.onrender.com/api/v1/skill/getUserSkillById/${userId}`,
//             "GET"
//           );
//           setUserData((prevState) => ({
//             ...prevState,
//             [userId]: {
//               ...prevState[userId],
//               skill: data?.data ?? [],
//             },
//           }));
//           break;
//         case "project":
//           data = await apiFetch(
//             `https://test-two-22w0.onrender.com/api/v1/project/getUserProjectById/${userId}`,
//             "GET"
//           );
//           setUserData((prevState) => ({
//             ...prevState,
//             [userId]: {
//               ...prevState[userId],
//               project: data?.data ?? [],
//             },
//           }));
//           break;
//         case "social":
//           data = await apiFetch(
//             `https://test-two-22w0.onrender.com/api/v1/socialInfo/getSocialInfoByUser/${userId}`,
//             "GET"
//           );
//           setUserData((prevState) => ({
//             ...prevState,
//             [userId]: {
//               ...prevState[userId],
//               social: data?.data ?? [],
//             },
//           }));
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   useEffect(() => {
//     const defaultTabs = {};
//     users?.forEach((user) => {
//       defaultTabs[user?._id] = "description";
//     });
//     setActiveTab(defaultTabs);
//   }, [users]);

//   const sentFriendRequest = (user) => {
//     const datas = {
//       requestedBy: requestedId,
//       requestedTo: user?._id,
//       status: "Pending",
//     };
//     createNewRequest(datas).unwrap();
//     Swal.fire({
//       icon: "success",
//       title: "Well done !",
//       text: "You've sent friend request successfully.",
//     });
//     setTimeout(() => {
//       window.location.reload();
//     }, 2500);
//   };
//   // Function to get friend status based on `requestedId`
//   // const friendId = userData?._id;

//   // Function to get the friend request status
//   const getFriendStatus = (friendId) => {
//     const friend = getAllStatusFriendRequest?.data?.find(
//       (frnd) =>
//         frnd?.requestedBy?._id === friendId ||
//         frnd?.requestedTo?._id === friendId
//     );

//     return friend
//       ? { status: friend.status, friend }
//       : { status: "No friend request found.", friend: null };
//   };

//   console.log(getAllUsers?.data);

//   return (
//     <>
//       {/* Role Filter */}
//       <div className="my-4 ml-5 mr-2 md:ml-10 xl:ml-14 3xl:ml-16">
//         <select
//           id="role"
//           value={selectedRole}
//           onChange={handleRoleChange}
//           className="w-full ssm:w-60 outline-none px-4 py-2 border rounded-lg text-gray-700"
//         >
//           <option value="">All Researchers</option>
//           {roles.map((role) => (
//             <option key={role} value={role}>
//               {role}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="space-y-4">
//         {users?.map((user) => {
//           // Get friend status for each user
//           const { status, friend } = getFriendStatus(user?._id);
//           const buttonText =
//             status === "Accepted"
//               ? "Friend"
//               : status === "Pending"
//               ? "Request Sent"
//               : status === "Rejected"
//               ? "Rejected"
//               : "Send Request";

//           return (
//             <div
//               key={user?._id}
//               className={`${
//                 theme !== "light" &&
//                 "p-[1px] ml-5 md:ml-10 xl:ml-14 3xl:ml-16 w-11/12 bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[20px]"
//               }`}
//             >
//               <div
//                 className={`${
//                   theme === "light"
//                     ? "bg-[#fff]  ml-5 md:ml-10 xl:ml-14 3xl:ml-16 shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray w-11/12"
//                     : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:mr-[1px] w-12/12"
//                 }  text-graish p-3 xl:p-5 rounded-[20px]`}
//               >
//                 {/* User details and buttons */}
//                 <div className="lg:flex hidden flex-col lg:flex-row justify-between items-center md:space-y-4 lg:space-y-0">
//                   {/* Left */}
//                   <div className="flex justify-between items-center space-x-3">
//                     <div className="relative">
//                       <img
//                         src={
//                           user?.profilePic
//                             ? user?.profilePic
//                             : "https://i.ibb.co.com/FKKD4mT/opp.png"
//                         }
//                         loading="lazy"
//                         alt=""
//                         className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 rounded-full p-1"
//                       />
//                       <img
//                         className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 absolute top-0  md:right-0"
//                         src={
//                           theme === "light" ? feedDarkBorder : feedWhiteBorder
//                         }
//                         loading="lazy"
//                         alt="dashedborder"
//                       />
//                     </div>

//                     {/* Description Button */}
//                     {theme === "light" ? (
//                       <div
//                         onClick={() => toggleTab(user?._id, "description")}
//                         className={`${
//                           activeTab[user?._id] === "description"
//                             ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                             : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                         }  cursor-pointer rounded-[27px] bg-[#d0f5fe] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                       >
//                         <p className="graish lg:text-sm xl:text-lg font-semibold">
//                           Description
//                         </p>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => toggleTab(user?._id, "description")}
//                         className="relative flex flex-col items-center py-2"
//                       >
//                         {activeTab[user?._id] === "description" && (
//                           <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
//                         )}
//                         <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)] box-border">
//                           Description
//                         </p>
//                       </div>
//                     )}

//                     {/* Skill Button */}
//                     {theme === "light" ? (
//                       <div
//                         onClick={() => toggleTab(user?._id, "skill")}
//                         className={`${
//                           activeTab[user?._id] === "skill"
//                             ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                             : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                         }  cursor-pointer rounded-[27px] bg-[#fde4f7] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                       >
//                         <p className="graish lg:text-sm xl:text-lg font-semibold">
//                           All Skills
//                         </p>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => toggleTab(user?._id, "skill")}
//                         className="relative flex flex-col items-center py-2"
//                       >
//                         {activeTab[user?._id] === "skill" && (
//                           <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
//                         )}
//                         <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)]  box-border">
//                           All Skills
//                         </p>
//                       </div>
//                     )}

//                     {/* Projects Button */}
//                     {theme === "light" ? (
//                       <div
//                         onClick={() => toggleTab(user?._id, "project")}
//                         className={`${
//                           activeTab[user?._id] === "project"
//                             ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                             : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                         }  cursor-pointer rounded-[27px] bg-[#fdeed4] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                       >
//                         <p className="graish lg:text-sm xl:text-lg font-semibold">
//                           Projects
//                         </p>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => toggleTab(user?._id, "project")}
//                         className="relative flex flex-col items-center py-2"
//                       >
//                         {activeTab[user?._id] === "project" && (
//                           <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#FFCB33,_0px_0px_15px_#FFCB33,_0px_0px_30px_#FFCB33,_0px_0px_60px_#FFCB33] rounded-3xs bg-[#FFCB33] rounded-t-xl blur-[12px]" />
//                         )}
//                         <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
//                           Projects
//                         </p>
//                       </div>
//                     )}

//                     {/* Social Button */}
//                     {theme === "light" ? (
//                       <div
//                         onClick={() => toggleTab(user?._id, "social")}
//                         className={`${
//                           activeTab[user?._id] === "social"
//                             ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                             : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                         }  cursor-pointer rounded-[27px] bg-[#caf79a73] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                       >
//                         <p className="graish lg:text-sm xl:text-lg font-semibold">
//                           Social Media
//                         </p>
//                       </div>
//                     ) : (
//                       <div
//                         onClick={() => toggleTab(user?._id, "social")}
//                         className="relative flex flex-col items-center py-2"
//                       >
//                         {activeTab[user?._id] === "social" && (
//                           <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#4EEBFF,_0px_0px_15px_#4EEBFF,_0px_0px_30px_#4EEBFF,_0px_0px_60px_#4EEBFF] rounded-3xs bg-[#4EEBFF] rounded-t-xl blur-[12px]" />
//                         )}
//                         <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
//                           Social Media
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {/* Right */}
//                   <div className="flex justify-between items-center space-x-3">
//                     <Link to={`/user/profile/${user?._id}`}>
//                       {theme === "light" ? (
//                         <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
//                           <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
//                             Profile
//                           </button>
//                         </div>
//                       ) : (
//                         <p className="cursor-pointer text-sm lg:text-[14px] font-medium rounded-[15px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
//                           profile
//                         </p>
//                       )}
//                     </Link>

//                     {/* Friend request button */}
//                     {theme === "light" ? (
//                       buttonText === "Send Request" ? (
//                         <button
//                           onClick={() => sentFriendRequest(user)}
//                           className="lg:text-sm xl:text-lg rounded-[13px] font-semibold px-3 py-2 xl:px-4 xl:py-2 bg-gradient-to-l from-[#2adba4] to-[#69f9cc] text-white"
//                         >
//                           {buttonText}
//                         </button>
//                       ) : (
//                         <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
//                           <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
//                             {buttonText}
//                           </button>
//                         </div>
//                       )
//                     ) : (
//                       <button
//                         onClick={
//                           buttonText === "Send Request"
//                             ? () => sentFriendRequest(user)
//                             : undefined
//                         }
//                         className="friendRequestBtn"
//                       >
//                         <p>{buttonText}</p>
//                       </button>
//                     )}

//                     <div
//                       className={`${
//                         theme === "light"
//                           ? "bg-red-200"
//                           : "border border-[#9370DB]"
//                       } rounded-[11px] px-3 py-2 xl:px-3 xl:py-2 flex justify-center items-center`}
//                     >
//                       <svg
//                         width="24"
//                         height="24"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                       >
//                         <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
//                       </svg>
//                       {/* <FaRegHeart className="text-2xl font-semibold text-red-500 bg-white cursor-pointer" /> */}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile and Tablet navbar components */}
//                 <div className="lg:hidden flex justify-between items-center py-1">
//                   <MobileNavbar
//                     toggleTab={toggleTab}
//                     user={user}
//                     activeTab={activeTab}
//                     theme={theme}
//                     sentFriendRequest={sentFriendRequest}
//                   />
//                 </div>
//                 <div className="hidden md:flex md:justify-between md:items-center lg:py-1">
//                   <TabletNavbar
//                     toggleTab={toggleTab}
//                     user={user}
//                     activeTab={activeTab}
//                     theme={theme}
//                     sentFriendRequest={sentFriendRequest}
//                   />
//                 </div>

//                 {/* Tabs content rendering */}
//                 {activeTab[user?._id] === "description" && (
//                   <AboutTab theme={theme} user={user} />
//                 )}
//                 {activeTab[user?._id] === "skill" && (
//                   <SkillTab
//                     user={user}
//                     theme={theme}
//                     skills={userData[user?._id]?.skill || []}
//                   />
//                 )}
//                 {activeTab[user?._id] === "project" && (
//                   <ProjectTab
//                     user={user}
//                     theme={theme}
//                     projects={userData[user?._id]?.project || []}
//                   />
//                 )}
//                 {activeTab[user?._id] === "social" && (
//                   <SocialTab
//                     user={user}
//                     theme={theme}
//                     socialInfos={userData[user?._id]?.social || []}
//                   />
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         {loading === true && <Loading />}
//         {users?.length === 0 && loading === false && (
//           <div className="xl:text-[20px] text-center text-gray-500 pt-10 xl:pt-20 capitalize">No researchers found</div>
//         )}
//         {users?.length > 10 && loading === false && (
//           <div className="mt-6 flex justify-center items-center space-x-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2  rounded-lg mx-2"
//             >
//               <FaRegArrowAltCircleLeft className="text-2xl text-gray-700" />
//             </button>

//             <span className="text-lg font-medium">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-4 py-2  rounded-lg mx-2"
//             >
//               <FaRegArrowAltCircleRight className="text-2xl text-gray-700" />
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Try;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Try = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [isFiltered, setIsFiltered] = useState(false);

//   const roles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "MERN Stack Developer",
//     "UI/UX Designer",
//     "Project Manager",
//     "DevOps Engineer",
//   ]; // Add as many roles as needed

//   const fetchUsers = async (page = 1, roleFilter = "") => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://test-two-22w0.onrender.com/api/v1/member/getAll`,
//         {
//           params: {
//             page,
//             limit: 6,
//             role: roleFilter,
//           },
//         }
//       );

//       const data = response.data.data;

//       console.log("data",data,roleFilter);

//       setUsers(data || []);
//       setCurrentPage(response.data?.data?.currentPage || 1);
//       setTotalPages(response.data?.data?.totalPages || 1);

//       setIsFiltered(!!roleFilter);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setUsers([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers(currentPage, selectedRole);
//   }, [currentPage, selectedRole]);

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//     setCurrentPage(1); // Reset to first page when changing filters
//   };

//   console.log(users);
//   const allUsers = users?.users;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-4">Member List</h1>

//       {/* Role Filter */}
//       <div className="mb-4">
//         <label
//           htmlFor="role"
//           className="block text-lg font-medium text-gray-700 mb-2"
//         >
//           Filter by Role
//         </label>
//         <select
//           id="role"
//           value={selectedRole}
//           onChange={handleRoleChange}
//           className="w-full px-4 py-2 border rounded-lg text-gray-700"
//         >
//           <option value="">All Roles</option>
//           {roles.map((role) => (
//             <option key={role} value={role}>
//               {role}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* User List */}
//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : users?.length === 0 ? (
//         <div className="text-center text-gray-500">No members found</div>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {users?.map((user) => (
//             <li
//               key={user._id}
//               className="p-4 border rounded-lg shadow hover:shadow-lg"
//             >
//               <h3 className="text-xl font-semibold">{`${user.name.firstName} ${user.name.lastName}`}</h3>
//               <p className="text-gray-600">{user.role}</p>
//               <p className="text-gray-500">{user.email}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center items-center space-x-4">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 border rounded-lg ${
//             currentPage === 1
//               ? "bg-gray-200 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           Previous
//         </button>
//         <span className="text-lg font-medium">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 border rounded-lg ${
//             currentPage === totalPages
//               ? "bg-gray-200 cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Try;

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css/navigation";

// const Try = () => {
//     const images = [
//     "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
//     "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//     "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
//     "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   ];
//   return (
//     <div>
//        <div className="w-[100px] h-[180px] xs:w-[280px] xs:h-[240px] md:h-[350px] md:w-[400px] xl:w-[400px] 3xl:h-[300px] md:pt-5">
//       <Swiper
//         navigation={true}
//         modules={[Navigation]}

//         className="mySwiper"
//       >
//         {images?.map((im, i) => (
//           <SwiperSlide className="" key={i}>
//             <img
//               src={im}
//               className="object-center w-[100px] h-[180px] xs:w-[280px] xs:h-[240px] md:h-[300px] md:w-[390px] xl:w-[400px] 3xl:h-[300px] rounded-[10px]"
//               loading="lazy" alt="hero"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//     </div>
//   );
// };

// export default Try;

// import { useState } from "react";
// import { fileUpload } from "../../utils/cloudinary";
// import { BsPlusCircle } from "react-icons/bs";
// import { FaRegTrashAlt } from "react-icons/fa";

// const Try = () => {
//   const [images, setImages] = useState([]);
//   const [primaryImage, setPrimaryImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = async (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setLoading(true);

//       try {
//         const imageUrl = await fileUpload(file);
//         setImages((prev) => [...prev, imageUrl]);
//         if (!primaryImage) setPrimaryImage(imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handlePrimaryImageChange = (image) => {
//     setPrimaryImage(image); // Update primary image
//   };

//   const handleDeleteImage = (imageToDelete) => {
//     setImages(images.filter((image) => image !== imageToDelete));
//     if (primaryImage === imageToDelete) {
//       setPrimaryImage(images.find((image) => image !== imageToDelete) || null);
//     }
//   };

//   console.log("k", images);

//   return (
//     <div className="flex justify-center items-center border-4 p-2 lg:p-4">
//       {/* Primary Image Section */}
//       <div className="w-full lg:w-10/12  relative pt-2 lg:mb-4">
//         {primaryImage ? (
//           <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 sm:space-y-7 lg:space-y-0 ">
//             <div className="w-full md:w-7/12 lg:w-8/12 xl:w-9/12 py-2 md:py-8 bg-gray-100 h-[350px] md:h-[400px] xl:h-[500px] rounded-2xl">
//               {images?.length !== 0 && (
//                 <div className="p-2 lg:p-3 md:hidden flex items-end justify-end space-x-4">
//                   <label htmlFor="image-upload">
//                     <BsPlusCircle className="text-[20px] cursor-pointer hover:text-blue-500 text-gray-600" />
//                   </label>
//                   <FaRegTrashAlt
//                     className="text-[20px] text-gray-600 hover:text-red-500 cursor-pointer"
//                     onClick={() => handleDeleteImage(primaryImage)}
//                   />
//                 </div>
//               )}
//               <img
//                 className="px-3 lg:px-0 w-full h-[290px] md:h-[350px] lg:h-full object-contain rounded-3xl"
//                 src={primaryImage}
//                 alt="Primary"
//               />
//             </div>
//             <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-3 xl:grid-cols-2 3xl:grid-cols-2 gap-3  max-h-[500px] lg:h-auto overflow-x-auto">
//               {images.map((image, index) => (
//                 <div
//                   key={index}
//                   className={` cursor-pointer border-2 p-1 rounded-md ${
//                     image === primaryImage
//                       ? "border-blue-500"
//                       : "border-gray-200"
//                   }`}
//                   onClick={() => handlePrimaryImageChange(image)}
//                 >
//                   <img
//                     className="h-16 w-16 xl:h-[100px] xl:w-[100px] object-cover rounded-md"
//                     src={image}
//                     alt={`Thumbnail ${index}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col  justify-center items-center py-5 space-y-2  rounded-lg  w-full border-2 border-gray-100">
//             <img
//               src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-25537.jpg"
//               className="w-80"
//             />
//             <p className="text-xl">Select image from your device</p>
//             <label
//               htmlFor="image-upload"
//               className="px-6 py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
//             >
//               {loading ? "Uploading..." : "Select An Image"}
//             </label>
//           </div>
//         )}
//         {images?.length !== 0 && (
//           <div className="pt-7 hidden md:flex  space-x-4">
//             <label htmlFor="image-upload">
//               <BsPlusCircle className="text-[30px] cursor-pointer hover:text-blue-500 text-gray-600" />
//             </label>
//             <FaRegTrashAlt
//               className="text-[30px] text-gray-600 hover:text-red-500 cursor-pointer"
//               onClick={() => handleDeleteImage(primaryImage)}
//             />
//           </div>
//         )}
//       </div>

//       <input
//         id="image-upload"
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleImageUpload}
//       />

//     </div>
//   );
// };

// export default Try;

// import { useState } from "react";
// import { fileUpload } from "../../utils/cloudinary";

// const Try = () => {
//   const [images, setImages] = useState([]);
//   const [previewImage, setPreviewImage] = useState({
//     imageOne: "",
//     imageTwo: "",
//     imageThree: "",
//   });
//   const [loading, setLoading] = useState({
//     imageOne: false,
//     imageTwo: false,
//     imageThree: false,
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
//         const urls = await Promise.all(
//           Array.from(files).map(async (file) => {
//             const imageUrl = await fileUpload(file); // Upload file to Cloudinary
//             return imageUrl;
//           })
//         );
//         setImages([...images, ...urls]);
//         setLoading({
//           imageOne: false,
//           imageTwo: false,
//           imageThree: false,
//         });
//         setPreviewImage({
//           ...previewImage,
//           [name]: URL.createObjectURL(files[0]),
//         });
//       } catch (error) {
//         console.error("Error uploading images:", error);
//       }
//     }
//   };

//   return (
//     <div className="border">
//       <div className="relative pt-2">
//         {previewImage.imageOne ? (
//           <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100">
//             <img
//               className="object-cover h-full rounded-md"
//               src={previewImage.imageOne}
//               alt=""
//             />
//           </div>
//         ) : (
//           <label required htmlFor="image-one" className="">
//             <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none">
//               {loading.imageOne ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 <div>
//                   <p>select an image</p>
//                   <label required htmlFor="image-one">
//                     <button className="my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]">
//                       upload an image
//                     </button>
//                   </label>
//                 </div>
//               )}
//             </div>
//           </label>
//         )}{" "}
//         <input
//           className="px-3 py-2 rounded-lg shadow-sm border border-none w-full focus:outline-none bg-white text-gray-900 hidden"
//           type="file"
//           name="imageOne"
//           id="image-one"
//           onChange={handlePreviewImage}
//           accept="image/*"
//           required
//         />
//       </div>
//     </div>
//   );
// };

// export default Try;

//--------------------------------------- post view ------------------------------------//
// const Try = () => {
//   const images = [
//     "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
//     "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//     "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
//     "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
//   ];
//   return (
//     <>
//     <div className="w-[500px] bg-red-400">
//       {/* 2 image */}
//     {/* {images.length === 2 && (
//       <div className="grid grid-cols-2">
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Image ${index + 1}`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//         ))}
//       </div>
//     )} */}

//       {/* 3 image */}
//     {/* {images.length === 3 && (
//       <div className="grid grid-cols-2">

//           <img
//             src={images[0]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//      <div className="grid grid-rows-2">
//      <img
//             src={images[1]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//            <img
//             src={images[2]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//      </div>
//       </div>
//     )}
//     {images.length === 4 && (
//   <div className="grid grid-cols-12 gap-2">

//     <div className="col-span-8">
//       <img
//         src={images[0]}
//         alt={`Image`}
//         className="w-full h-full object-cover rounded-lg shadow-lg"
//       />
//     </div>

//     <div className="col-span-4 grid grid-rows-3 gap-2">
//       <img
//         src={images[1]}
//         alt={`Image`}
//         className="w-full h-full object-cover rounded-lg shadow-lg"
//       />
//       <img
//         src={images[2]}
//         alt={`Image`}
//         className="w-full h-full object-cover rounded-lg shadow-lg"
//       />
//       <img
//         src={images[3]}
//         alt={`Image`}
//         className="w-full h-full object-cover rounded-lg shadow-lg"
//       />
//     </div>
//   </div>
// )} */}
//       {/* 4 image */}
//     {/* {images.length === 4 && (
//       <div className="grid grid-cols-2">

//           <img
//             src={images[0]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//      <div className="grid grid-rows-2">
//      <img
//             src={images[1]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//            <img
//             src={images[2]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//            <img
//             src={images[3]}
//             alt={`Image`}
//             className="w-12/12 h-full object-cover rounded-lg shadow-lg"
//           />
//      </div>
//       </div>
//     )} */}
//     </div>
//       {/* 1 image */}
//     {/* <img className="w-full max-h-full object-cover rounded-lg" src={images[0]} loading="lazy" alt="Post" /> */}

//   </>
//   );
// };

// export default Try;

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import * as XLSX from "xlsx";
// import { useState } from "react";

// const Try = () => {  const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   const tableData = [
//     {
//       _id: "60d0fe4f5311236168a109ca",
//       commitBy: {
//         _id: "60d0fe4f5311236168a109ca",
//         name: {
//           firstName: "User",
//           lastName: "Name",
//         },
//         profilePic: "https://i.ibb.co.com/Dpq7yYh/print-1309087-159.jpg",
//         role: "Developer",
//       },
//       project: "60d0fe4f5311236168a109cb",
//       message: "Initial commit with project setup.",
//       media: ["screenshot1.png", "diagram1.svg"],
//       externalLink: "https://example.com/initial-setup",
//       status: "Approved",
//       declineMessage: null,
//       createdAt: "2024-12-12T02:58:01.878+00:00",
//       completedTask: {
//         task: "Set up project repository",
//         subTask: ["Initialize Git", "Create README.md"],
//       },
//     },
//     {
//       _id: "60d0fe4f5311236168a109ca",
//       commitBy: {
//         _id: "60d0fe4f5311236168a109cc",
//         name: {
//           firstName: "User",
//           lastName: "Name",
//         },
//         profilePic: "https://i.ibb.co.com/Dpq7yYh/print-1309087-159.jpg",
//         role: "Developer",
//       },
//       project: "60d0fe4f5311236168a109cd",
//       message: "Added user authentication module.",
//       media: ["auth_flowchart.png"],
//       externalLink: "https://example.com/auth-module",
//       status: "Pending",
//       declineMessage: null,
//       createdAt: "2024-12-12T02:58:01.878+00:00",
//       completedTask: {
//         task: "Implement authentication",
//         subTask: ["Design login page", "Set up OAuth"],
//       },
//     },
//     {
//       _id: "60d0fe4f5311236168a109ca",
//       commitBy: {
//         _id: "60d0fe4f5311236168a109ce",
//         name: {
//           firstName: "User",
//           lastName: "Name",
//         },
//         profilePic: "https://i.ibb.co.com/Dpq7yYh/print-1309087-159.jpg",
//         role: "Developer",
//       },
//       project: "60d0fe4f5311236168a109cf",
//       message: "Fixed bugs in payment processing.",
//       media: [],
//       externalLink: null,
//       status: "Approved",
//       declineMessage: null,
//       createdAt: "2024-12-12T02:58:01.878+00:00",
//       completedTask: {
//         task: "Debug payment module",
//       },
//     },
//     {
//       _id: "60d0fe4f5311236168a109ca",
//       commitBy: {
//         _id: "60d0fe4f5311236168a109d0",
//         name: {
//           firstName: "User",
//           lastName: "Name",
//         },
//         profilePic: "https://i.ibb.co.com/Dpq7yYh/print-1309087-159.jpg",
//         role: "Developer",
//       },
//       project: "60d0fe4f5311236168a109d1",
//       message: "Updated UI for dashboard.",
//       media: ["https://dashboard_mockup.jpg", "https://dashboard_mockup.jpg"],
//       externalLink: "https://example.com/dashboard-update",
//       status: "Declined",
//       declineMessage: "UI does not match design specifications.",
//       createdAt: "2024-12-12T02:58:01.878+00:00",
//       completedTask: {
//         task: "Revamp dashboard UI",
//       },
//     },
//     {
//       _id: "60d0fe4f5311236168a109ca",
//       commitBy: {
//         _id: "60d0fe4f5311236168a109d2",
//         name: {
//           firstName: "User",
//           lastName: "Name",
//         },
//         profilePic: "https://i.ibb.co.com/Dpq7yYh/print-1309087-159.jpg",
//         role: "Developer",
//       },
//       project: "60d0fe4f5311236168a109d3",
//       message: "Integrated third-party analytics.",
//       media: ["analytics_setup_guide.pdf"],
//       externalLink: "https://example.com/analytics-integration",
//       status: "Pending",
//       declineMessage: null,
//       createdAt: "2024-12-12T02:58:01.878+00:00",
//       completedTask: {
//         subTask: ["Select analytics provider", "Embed tracking code"],
//       },
//     },
//     {
//       _id: "60d0fe4f5311236168a109ca",
//       commitBy: {
//         _id: "60d0fe4f5311236168a109d4",
//         name: {
//           firstName: "User",
//           lastName: "Name",
//         },
//         profilePic: "https://i.ibb.co.com/Dpq7yYh/print-1309087-159.jpg",
//         role: "Developer",
//       },
//       project: "60d0fe4f5311236168a109d5",
//       message: "Refactored codebase for performance improvements.",
//       media: [],
//       externalLink: null,
//       status: "Approved",
//       declineMessage: null,
//       createdAt: "2024-12-12T02:58:01.878+00:00",
//       completedTask: {
//         subTask: ["Remove redundant code", "Enhance algorithm efficiency"],
//       },
//     },
//   ];

//   const handleDownload = () => {
//     // Process and flatten the data for Excel
//     const processedData = currentTableData.map((item) => {
//       return {
//         "Commit ID": item._id,
//         "Commit By ID": item.commitBy._id,
//         "Commit By Name": `${item.commitBy.name.firstName} ${item.commitBy.name.lastName}`,
//         "Commit By Role": item.commitBy.role || "Not mentioned",
//         "Commit By Profile Picture": item.commitBy.profilePic || "Not Available",
//         "Project ID": item.project,
//        "Message": item.message,
//        "Media": item.media.length ? item.media.join(", ") : "N/A",
//         "External Link": item.externalLink || "N/A",
//         "Status": item.status || "N/A",
//         "Decline Message": item.declineMessage || "N/A",
//         "Created At": new Date(item.createdAt).toLocaleString(),
//         "Completed Task": item.completedTask?.task || "No Task",
//         "Completed SubTasks": item.completedTask?.subTask?.length
//           ? item.completedTask.subTask.join(", ")
//           : "No SubTasks",
//       };
//     });

//     // Convert the processed data to a worksheet
//     const worksheet = XLSX.utils.json_to_sheet(processedData);

//     // Create a workbook and append the worksheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Commits");

//     // Write the workbook and trigger the download
//     XLSX.writeFile(workbook, "commits.xlsx");
//   };
//     // Calculate the data for the current page
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentTableData = tableData.slice(indexOfFirstItem, indexOfLastItem);

//     // Total pages
//     const totalPages = Math.ceil(tableData.length / itemsPerPage);

//     // Handle next page
//     const handleNext = () => {
//       if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     // Handle previous page
//     const handlePrevious = () => {
//       if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//   return (
//     <div>
//       <button
//         onClick={handleDownload}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
//       >
//         Download
//       </button>
//       <>
//         {/* table head */}
//         <div className="min-w-[900px] md:min-w-[900px]  py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl">
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-[120px] border-r border-[#C8CBD3]">
//             Serial No.
//           </div>
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-3/12 border-r border-[#C8CBD3]">
//             Name
//           </div>
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-3/12 border-r border-[#C8CBD3]">
//             Message
//           </div>
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-1/12 border-r border-[#C8CBD3]">
//             Media
//           </div>
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-1/12 border-r border-[#C8CBD3]">
//             Link
//           </div>
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12 border-r border-[#C8CBD3]">
//             Date
//           </div>
//           <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12">
//             Action
//           </div>
//         </div>
//         {/* table data */}
//         {currentTableData?.map((commit, i) => (
//           <div
//             key={i}
//             className="min-w-[900px] md:min-w-[900px] py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl"
//           >
//             <div className="text-[13px] md:text-[16px] capitalize text-center w-[120px] border-r border-[#C8CBD3]">
//               #{commit?._id?.slice(-4)}
//             </div>
//             <div className="flex items-centertext-[14px] md:text-[16px] capitalize w-3/12 border-r border-[#C8CBD3]">
//               <img
//                 src={
//                   commit?.commitBy?.profilePic
//                     ? commit?.commitBy?.profilePic
//                     : "https://i.ibb.co.com/FKKD4mT/opp.png"
//                 }
//                 alt="Profile"
//                 className="h-8 xl:w-10 w-8 xl:h-10 rounded-full mr-3"
//               />
//               <div>
//                 <div className="font-semibold text-gray-800 text-[14px] lg:text-[15px]">
//                   {commit?.commitBy?.name?.firstName}{" "}
//                   <span>{commit?.commitBy?.name?.lastName}</span>
//                 </div>
//                 <div className=" text-gray-500 text-[13px] lg:text-[13px]">
//                   {commit?.commitBy?.role}
//                 </div>
//               </div>
//             </div>
//             <div
//               // onClick={() =>
//               //   handleCommitMessage(commit?.message, commit?.completedTask)
//               // }
//               className="cursor-pointer text-[13px] md:text-[16px] capitalize text-center w-3/12 border-r border-[#C8CBD3] px-2"
//             >
//               {commit?.message.slice(0, 20)}...
//             </div>
//             <div
//               // onClick={() => handleEmptyMedia(commit?.media)}
//               className="flex justify-center w-1/12 border-r border-[#C8CBD3]"
//             >
//               <svg
//                 width="28"
//                 height="28"
//                 viewBox="0 0 28 28"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M1.52673 13.8911C1.52673 8.11433 1.52673 5.22594 3.32135 3.43134C5.11596 1.63672 8.00435 1.63672 13.7811 1.63672C19.5578 1.63672 22.4463 1.63672 24.2409 3.43134C26.0355 5.22594 26.0355 8.11433 26.0355 13.8911C26.0355 19.6678 26.0355 22.5563 24.2409 24.3509C22.4463 26.1455 19.5578 26.1455 13.7811 26.1455C8.00435 26.1455 5.11596 26.1455 3.32135 24.3509C1.52673 22.5563 1.52673 19.6678 1.52673 13.8911Z"
//                   stroke="#2ABFFF"
//                   strokeWidth="2"
//                 />
//                 <path
//                   d="M18.6829 11.4403C20.0365 11.4403 21.1338 10.343 21.1338 8.98945C21.1338 7.63587 20.0365 6.53857 18.6829 6.53857C17.3293 6.53857 16.232 7.63587 16.232 8.98945C16.232 10.343 17.3293 11.4403 18.6829 11.4403Z"
//                   stroke="#2ABFFF"
//                   strokeWidth="2"
//                 />
//                 <path
//                   d="M1.52673 14.5046L3.6732 12.6265C4.78991 11.6495 6.47295 11.7055 7.52218 12.7547L12.779 18.0115C13.6211 18.8537 14.9468 18.9685 15.9212 18.2836L16.2867 18.0269C17.6888 17.0414 19.5859 17.1556 20.8599 18.3022L24.8101 21.8573"
//                   stroke="#2ABFFF"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//             <div
//               // onClick={() => handleEmptyExternalLink(commit?.externalLink)}
//               className="flex justify-center w-1/12 border-r border-[#C8CBD3]"
//             >
//               <svg
//                 width="25"
//                 height="26"
//                 viewBox="0 0 25 26"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M23.6068 9.54492V1.93555M23.6068 1.93555H16.4008M23.6068 1.93555L13.9988 12.0814M10.3959 4.47201H7.7537C5.73585 4.47201 4.72692 4.47201 3.95621 4.88669C3.27826 5.25146 2.72708 5.8335 2.38165 6.5494C1.98895 7.36326 1.98895 8.42868 1.98895 10.5595V18.6762C1.98895 20.8071 1.98895 21.8724 2.38165 22.6863C2.72708 23.4022 3.27826 23.9842 3.95621 24.349C4.72692 24.7637 5.73585 24.7637 7.7537 24.7637H15.44C17.4579 24.7637 18.4668 24.7637 19.2376 24.349C19.9155 23.9842 20.4667 23.4022 20.8121 22.6863C21.2048 21.8724 21.2048 20.8071 21.2048 18.6762V15.8861"
//                   stroke="#2B68FF"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <div className="text-[13px] md:text-[16px] capitalize text-center w-2/12 border-r border-[#C8CBD3]">
//               {commit?.createdAt}
//             </div>
//             <div className="text-[13px] md:text-[16px] capitalize text-center w-2/12 flex justify-center items-center">
//               Pending
//             </div>
//           </div>
//         ))}
//       </>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center mt-4">
//         <button
//           className="px-4 py-2 bg-gray-300 rounded-md mr-2"
//           onClick={handlePrevious}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="px-4">{currentPage} / {totalPages}</span>
//         <button
//           className="px-4 py-2 bg-gray-300 rounded-md ml-2"
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//       {/* <table>
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Commit Id</th>
//             <th className="border border-gray-300 px-4 py-2">Project Id</th>
//             <th className="border border-gray-300 px-4 py-2">Message</th>
//             <th className="border border-gray-300 px-4 py-2">Media</th>
//             <th className="border border-gray-300 px-4 py-2">Link</th>
//             <th className="border border-gray-300 px-4 py-2">
//               Declined Message
//             </th>
//             <th className="border border-gray-300 px-4 py-2">Completed Task</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((data) => (
//             <tr key={data?.Name}>
//               <td>{data.commitBy.slice(0, 8)}</td>
//               <td>{data.project.slice(0, 8)}</td>
//               <td>{data.message.slice(0, 8)}</td>
//               <td>{data.media}</td>
//               <td>{data.externalLink}</td>
//               <td>{data.declineMessage}</td>
//               <td>
//                 {data.completedTask.task && (
//                   <span>Task: {data.completedTask.task}</span>
//                 )}
//                 {data.completedTask.subTask && (
//                   <span>
//                     {" "}
//                     {data.completedTask.subTask.map((pa) => (
//                       <p key={pa}>Sub Task: {pa}</p>
//                     ))}
//                   </span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>
//   );
// };

// export default Try;

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
//  a9 3c 5b f5 2c cc 12
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

//const handleDownload = ()=>{
//
//  // Extract headers and convert them to uppercase
//const headers = Object.keys(tableData[0]).map(header => header.toUpperCase());
//
//// Determine the maximum length of data in each column for alignment
//const columnWidths = headers.map((header, index) => {
//  const maxDataLength = Math.max(
//    ...tableData.map(row => String(Object.values(row)[index]).length)
//  );
//  return Math.max(header.length, maxDataLength);
//});
//
//// Create the header row with padding for alignment
//const headerRow = headers
//  .map((header, index) => header.padEnd(columnWidths[index]))
//  .join(' | ');
//
//// Create the separator row
//const separatorRow = columnWidths.map(width => '-'.repeat(width)).join('-|-');
//
//// Create the data rows with padding for alignment
//const dataRows = tableData.map(row =>
//  Object.values(row)
//    .map((value, index) => String(value).padEnd(columnWidths[index]))
//    .join(' | ')
//);
//
//// Combine all parts into the final file content with borders
//const fileContent = [
//  separatorRow, // Top border
//  headerRow,
//  separatorRow, // Separator between headers and data
//  // ...dataRows,
//  separatorRow, // Bottom border
//  ...dataRows.map(row => `${row}\n${separatorRow}`), // Add border after each row
//].join('\n');
//
//// Create a Blob object
//const blob = new Blob([fileContent], { type: 'text/plain' });
//
//// Create a link element
//const link = document.createElement('a');
//link.href = URL.createObjectURL(blob);
//link.download = 'tableData.txt';
//
//// Append the link to the body
//document.body.appendChild(link);
//
//// Programmatically click the link to trigger the download
//link.click();
//
//// Remove the link from the document
//document.body.removeChild(link);
//
//
//}

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
//                       : "https://i.ibb.co.com/FKKD4mT/opp.png"
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
//                       : "https://i.ibb.co.com/FKKD4mT/opp.png"
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
