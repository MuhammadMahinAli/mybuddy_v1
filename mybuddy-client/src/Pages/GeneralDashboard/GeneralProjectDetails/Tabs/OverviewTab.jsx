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
    _id,
  } = ProjectInfo;
  const [showPdfList, setShowPdfList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

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
    : "https://www.liquidplanner.com/wp-content/uploads/2019/04/HiRes-17-1024x615.jpg";
  const projectSecoundImage = images[1]
    ? images[1]
    : "https://www.liquidplanner.com/wp-content/uploads/2019/04/HiRes-17-1024x615.jpg";
  const projectLastImage = images[2]
    ? images[2]
    : "https://www.liquidplanner.com/wp-content/uploads/2019/04/HiRes-17-1024x615.jpg";
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
            <ul className="flex justify-between items-center w-full space-y-1 md:space-y-0">
              <li className="flex flex-row md:flex-col space-x-1 md:space-x-0">
                <p className="graish font-bold md:text-[14px] lg:text-lg">
                  WhatsApp:
                </p>
                <p className="graish md:text-[13px] lg:text-[16px] md:pt-[3px]">
                  {whatsApp}
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
                  src={videoUrl.includes("drive_link") ?  gdrive: youtube }
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
                <OpenDocx documents={documents} showDocuments={showDocuments} setShowDocuments={setShowDocuments} />
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
            <div className="md:flex items-center space-x-2 hidden">
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
