import React, { useRef, useState } from 'react';
import { useUpdateProjectTodoMutation } from '../../../features/fund/fundApi';
import { PiShareFatLight } from "react-icons/pi";
import { AiOutlineExpandAlt, AiOutlineFilePdf } from "react-icons/ai";
import { GoClock } from "react-icons/go";
import { FiCheckSquare, FiEdit3 } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import "react-quill/dist/quill.snow.css"; 
import Quill from '../../Try/Quill';
import { rawFileUpload } from '../../../utils/cloudinaryForRaw';


const UpdateProjectTodo = ({selectedTodo,closeSlideBox,statusStyles, formData, setFormData,elapsedTime, setElapsedTime,selectedProjectTodo}) => {

  const [updateProjectTodo] = useUpdateProjectTodoMutation();
  const [isRunning, setIsRunning] = useState(false);

  const [timerStart, setTimerStart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpenCheckbox, setIsOpenCheckbox] = useState(false);
  const fileInputRef = useRef(null);

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

      // ---------------- sliding box
      // const [formData, setFormData] = useState(selectedTodo || {});
  

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

      //----------- Add new checklist item
      const handleAddChecklistItem = () => {
        const newItem = { id: Date.now(), text: "Add new item", checked: false };
    
        setFormData((prev) => ({
          ...prev,
          checklist: Array.isArray(prev.checklist)
            ? [newItem, ...prev.checklist]
            : [newItem],
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
                attachments: Array.isArray(prev.attachments)
                  ? [...prev.attachments, newAttachment]
                  : [newAttachment],
              }));
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
  
        console.log(projectId, todoId, selectedProjectTodo);
    
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
    return (
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
                {formData?.timer > 0 && (
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
            <Quill
              formData={selectedTodo}
              handleTodoDesciption={handleTodoDesciption}
            />

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
                          (formData?.checklist?.filter(
                            (item) => item.checked
                          ).length /
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
            <button
              onClick={handleSubmit}
              className="w-full bg-gray-200 py-2 rounded-md"
            >
              Update
            </button>
          </>
        )}
      </div>
    );
};

export default UpdateProjectTodo;