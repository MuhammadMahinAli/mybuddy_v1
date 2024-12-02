/* eslint-disable react/prop-types */

import { FaRegEdit } from "react-icons/fa";
import AddNewTask from "../AddNewTask";
import UpdateProjectForm from "../UpdateProjectForm";
import { LuTrash2 } from "react-icons/lu";
import youtube from "../../../../assets/dashboardpd/ytube.svg";
import gdrive from "../../../../assets/projectDetail/drive.png";
import pdf from "../../../../assets/dashboardpd/pdf.svg";
import docx from "../../../../assets/dashboardpd/document.svg";
import ProjectDescription from "../../../ProjectDetails/ProjectDescription";
import ExpandDescription from "../ExpandDescription";
import ImageSliders from "../ImageSliders/ImageSliders";
import { useState } from "react";
import OpenPdf from "../../../FindProject/OpenPdf";
import OpenDocx from "../../../FindProject/OpenDocx";
import { useUpdateProjectMemberRequestMutation } from "../../../../features/project/projectApi";
import Swal from "sweetalert2";

const OverviewTab = ({
  ProjectInfo,
  openUpdateModal,
  closeProjectUpdateModal,
  formatDate,
  tasks,
  openAddTaskModal,
  openProjectUpdateModal,
  closeAddTaskModal,
  deleteProjectById,
  filteredMyself,
  projectOwner,
  userId,
}) => {
  const {
    description,
    category,
    discord,
    whatsApp,
    user,
    startDate,
    endDate,
    videoUrl,
    images,
    pdfFiles,
    documents,
    uniqueId,
    _id,
    isMemberRequestAccept,
  } = ProjectInfo;
  const [showPdfList, setShowPdfList] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [updateProjectMemberRequest] = useUpdateProjectMemberRequestMutation();
  const togglePdf = () => {
    setShowPdfList(!showPdfList);
    setShowDocuments(false);
  };
  const toggleDocx = () => {
    setShowPdfList(false);
    setShowDocuments(!showDocuments);
  };
  const userName = user?.name?.firstName + " " + user?.name?.lastName;
  const userEmail = user?.email;
  const userProfilePic = user?.profilePic
    ? user?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";
  const formattedDate = formatDate(user?.createdAt);
  const projectDeadline = formatDate(startDate) + " -" + formatDate(endDate);
  const projectFirstImage = images[0]
    ? images[0]
    : "https://img.freepik.com/free-vector/hand-drawn-no-photo-sign_23-2149278212.jpg";
  const projectSecoundImage = images[1]
    ? images[1]
    : "https://img.freepik.com/free-vector/hand-drawn-no-photo-sign_23-2149278212.jpg";
  const projectLastImage = images[2]
    ? images[2]
    : "https://img.freepik.com/free-vector/hand-drawn-no-photo-sign_23-2149278212.jpg";

  const [isChecked, setIsChecked] = useState(isMemberRequestAccept);

  const projectId = uniqueId ? uniqueId : "project Id";

  // const handleToggle = (project) => {
  //   const newStatus = !isChecked;

  //   // Now update the state
  //   setIsChecked(newStatus);

  //   // Log the correct new status
  //   console.log("New Status:", newStatus);

  //   // Use the new status in your logic/API call
  //   console.log({
  //     id: project?._id,
  //     isChecked: newStatus

  //   });
  //   updateProjectMemberRequest({
  //     id:project?._id,
  //     data: { isChecked: newStatus },
  //   })
  // };

  const handleToggle = (project) => {
    const newStatus = !isChecked;

    // Define the confirmation message based on the new status
    const confirmationText = newStatus
      ? "Are you sure you want to **allow users to send project join requests** for this project? This will enable others to request to join."
      : "Are you sure you want to **stop accepting project join requests** for this project? Users will no longer be able to send requests to join.";

    // Show SweetAlert with the confirmation message
    Swal.fire({
      title: "Confirm Action",
      text: confirmationText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with updating the status
        setIsChecked(newStatus);

        // Call your API logic here
        updateProjectMemberRequest({
          id: project?._id,
          data: { isChecked: newStatus },
        });

        // Optionally, show a success message
        Swal.fire(
          "Updated!",
          `The project is now ${
            newStatus ? "accepting" : "not accepting"
          } join requests.`,
          "success"
        );
      }
    });
  };
  console.log(isChecked);
  return (
    <div>
      <div className="mt-7 space-y-2 pb-6 rounded-[20px] md:rounded-[15px] relative bg-[#e4ecf7]  shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]">
        {/* profile */}
        <div className="flex flex-col items-center md:flex-row md:items-start lg:w-11/12 lg:pt-8   bg-skyblue p-2 overflow-hidden">
          {/* left */}
          <div className="md:w-[200px] lg:w-4/12 flex flex-col justify-center items-center space-y-1 py-2">
            <img
              className="h-[60px] w-[60px] lg:h-[68px] lg:w-[68px] border-4 border-[#dad8d8] rounded-full"
              src={userProfilePic}
              alt=""
            />
            <p className="md:text-[16px] lg:text-[18px] graish font-bold pt-3">
              Project Owner
            </p>
            <p className="md:text-[14px] lg:text-[17px] graish font-medium capitalize">
              {userName}
            </p>
            <p className="md:text-[13px] lg:text-[16px] graish font-medium">
              Member since -{formattedDate}{" "}
            </p>
            <p className="md:text-[13px] lg:text-[16px] graish font-medium">
              {userEmail}
            </p>
          </div>

          {/* right */}
          <div className="md:w-8/12  lg:w-8/12 space-y-1 md:space-y-4 lg:py-4 md:p-3 pt-5 md:pt-0">
            <p className="hidden md:block graish text-[17px]">Overview</p>
            <ul className="flex flex-col md:flex-row justify-between md:items-center w-full space-y-1 md:space-y-0">
              <li className="flex flex-row md:flex-col space-x-1 md:space-x-0">
                <p className="graish font-bold md:text-[14px] lg:text-lg">
                  Duration:
                </p>
                <p className="graish md:text-[13px] lg:text-[16px] md:pt-[3px]">
                  {projectDeadline}
                </p>
              </li>
              <li className="flex flex-row md:flex-col space-x-1 md:space-x-0">
                <p className="graish font-bold md:text-[14px] lg:text-lg">
                  Category:
                </p>
                <p className="graish md:text-[13px] lg:text-[16px] md:pt-[3px] capitalize">
                  {category}
                </p>
              </li>
              <li className="flex flex-row md:flex-col space-x-1 md:space-x-0">
                <p className="graish font-bold md:text-[14px] lg:text-lg">
                  Disdord:
                </p>
                <p className="graish md:text-[13px] lg:text-[16px] md:pt-[3px]">
                  {discord}
                </p>
              </li>
            </ul>
            <ul className="flex space-x-36 items-center w-full space-y-1 md:space-y-0">
              <li className="flex flex-row md:flex-col space-x-1 md:space-x-0">
                <p className="graish font-bold md:text-[14px] lg:text-lg">
                  WhatsApp:
                </p>
                <p className="graish md:text-[13px] lg:text-[16px] md:pt-[3px]">
                  {whatsApp}
                </p>
              </li>
              <li className="flex flex-row md:flex-col space-x-1 md:space-x-0">
                <p className="graish font-bold md:text-[14px] lg:text-lg">
                  Project Id:
                </p>
                <p className="graish md:text-[13px] lg:text-[16px] md:pt-[3px]">
                  {projectId}
                </p>
              </li>
            </ul>
            <div>
              <p className="graish font-bold md:text-[14px] lg:text-lg">
                Description:
              </p>
              <ExpandDescription description={description} />
            </div>
          </div>
        </div>
        {/* documents */}
        <div className=" flex flex-col md:flex-row justify-between items-center md:items-start lg:w-11/12 space-y-5 md:space-y-0">
          <ul className="flex justify-center items-center  px-4  space-x-4 md:w-4/12">
            <li className=" ">
              <a href={videoUrl} target="blank">
                <img
                  className="w-[44px] md:w-12 p-2 md:p-2 rounded-lg bg-[#e9f2f9]"
                  src={videoUrl.includes("drive_link") ? gdrive : youtube}
                />
              </a>
              {/* <img
                className="w-12 p-2  rounded-lg bg-[#e9f2f9]"
                src={youtube}
                alt=""
              /> */}
            </li>
            <li className="relative">
              <img
                onClick={togglePdf}
                className="w-[34px] md:w-10 p-1 md:p-2  rounded-lg bg-[#e9f2f9]"
                src={pdf}
                alt=""
              />
              {showPdfList && (
                <div className="absolute top-10 left-2 md:left-72 lg:left-10  xl:top-12 xl:left-1 z-40 md:z-0">
                  <OpenPdf
                    pdfFiles={pdfFiles}
                    showPdfList={showPdfList}
                    setShowPdfList={setShowPdfList}
                  />
                </div>
              )}
            </li>

            <li className="relative">
              <img
                onClick={toggleDocx}
                className="w-[32px] md:w-10 p-1 md:p-2  rounded-lg bg-[#e9f2f9]"
                src={docx}
                alt=""
              />
              {showDocuments && (
                <div className="absolute -left-4 ssm:left-2 md:left-1 lg:left-2 xl:top-12 xl:left-2 z-40 md:z-0">
                  <OpenDocx
                    documents={documents}
                    showDocuments={showDocuments}
                    setShowDocuments={setShowDocuments}
                  />
                </div>
              )}
            </li>
          </ul>

          <ImageSliders images={images} />
          <ul className="hidden md:flex justify-between items-center space-x-4 md:w-8/12 md:px-5 lg:px-3">
            <li className="">
              <img
                className="h-24 w-32 lg:h-36 lg:w-40 rounded-lg"
                src={projectFirstImage}
                alt=""
              />
            </li>
            <li className="">
              <img
                className="h-24 w-32 lg:h-36 lg:w-40 rounded-lg object-center"
                src={projectSecoundImage}
                alt=""
              />
            </li>
            <li className="">
              <img
                className="h-24 w-32 lg:h-36 lg:w-40 rounded-lg object-cover"
                src={projectLastImage}
                alt=""
              />
            </li>
          </ul>
        </div>
        {/* edit delete */}
        {ProjectInfo?.user?._id === userId && (
          <div className="absolute right-5 top-3">
            <div className="md:flex items-center space-x-3 hidden relative">
              <label
                onMouseEnter={()=>setShowAlert(true)}
                onMouseLeave={()=>setShowAlert(false)}
                htmlFor="AcceptConditions"
                className={`relative inline-block h-6 w-10 cursor-pointer rounded-full transition ${
                  isChecked ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  id="AcceptConditions"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => handleToggle(ProjectInfo)}
                />

                <span
                  onMouseEnter={()=>setShowAlert(true)}
                  onMouseLeave={()=>setShowAlert(false)}
                  className={`absolute inset-y-0 m-1 size-4 rounded-full bg-white transition-all ${
                    isChecked ? "start-4" : "start-0"
                  }`}
                ></span>
              </label>
              {
                showAlert &&
                <div className="w-[300px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-7 right-0 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                Enable / Disable Project Join Request
              </div>
              }
            

              <FaRegEdit
                onClick={openProjectUpdateModal}
                className="text-2xl text-blue-500 cursor-pointer"
              />
              <LuTrash2
                onClick={() => deleteProjectById(_id)}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
      {openUpdateModal === true && (
        <UpdateProjectForm
          initialData={ProjectInfo}
          openUpdateModal={openUpdateModal}
          closeProjectUpdateModal={closeProjectUpdateModal}
        />
      )}
      {openAddTaskModal === true && (
        <AddNewTask
          tasks={tasks}
          openAddTaskModal={openAddTaskModal}
          projectId={ProjectInfo?._id}
          closeAddTaskModal={closeAddTaskModal}
        />
      )}
    </div>
  );
};

export default OverviewTab;
