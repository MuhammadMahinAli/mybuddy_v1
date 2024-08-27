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
    _id,
  } = ProjectInfo;
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
      <div className=" space-y-2 pb-6 rounded-[20px] md:rounded-[15px] relative bg-[#e4ecf7]  shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]">
        {/* profile */}
        <div className="flex  items-start  w-11/12 pt-8   bg-skyblue p-2 overflow-hidden">
          {/* left */}
          <div className=" w-4/12 flex flex-col justify-center items-center space-y-1 py-2">
            <img
              className="h-[68px] w-[68px] border-4 border-[#dad8d8] rounded-full"
              src={userProfilePic}
              alt=""
            />
            <p className="text-[18px] graish font-bold pt-3">Project Owner</p>
            <p className="text-[17px] graish font-medium capitalize">
              {userName}
            </p>
            <p className="text-[16px] graish font-medium">
              Member since -{formattedDate}{" "}
            </p>
            <p className="text-[16px] graish font-medium">{userEmail}</p>
          </div>

          {/* right */}
          <div className=" w-8/12 space-y-4 py-4 ">
            <p className="graish text-[17px]">Overview</p>
            <ul className="flex justify-between items-center w-full">
              <li>
                <p className="graish font-bold text-lg">Duration</p>
                <p className="graish text-[16px] pt-[3px]">{projectDeadline}</p>
              </li>
              <li>
                <p className="graish font-bold text-lg">Category</p>
                <p className="graish text-[16px] pt-[3px] capitalize">
                  {category}
                </p>
              </li>
              <li>
                <p className="graish font-bold text-lg">Disdord</p>
                <p className="graish text-[16px] pt-[3px]">{discord}</p>
              </li>
            </ul>
            <ul className="flex justify-between items-center w-full">
              <li>
                <p className="graish font-bold text-lg">WhatsApp</p>
                <p className="graish text-[16px] pt-[3px]">{whatsApp}</p>
              </li>
            </ul>
            <div>
              <p className="graish font-bold text-lg">Description</p>
              <ExpandDescription description={description} />
            </div>
          </div>
        </div>
        {/* documents */}
        <div className="flex justify-between items-start w-11/12">
          <ul className="flex justify-center items-center  px-4  space-x-4 w-4/12">
            <li className=" ">

            <a href={videoUrl} target="blank">
                      <img
                        className="w-12 p-2 rounded-lg bg-[#e9f2f9]"
                        src={videoUrl.includes("youtu.be") ? youtube : gdrive
                        }
                      />
                    </a>
              {/* <img
                className="w-12 p-2  rounded-lg bg-[#e9f2f9]"
                src={youtube}
                alt=""
              /> */}
            </li>
            <li className=" ">
              <img
                className="w-10 p-2  rounded-lg bg-[#e9f2f9]"
                src={pdf}
                alt=""
              />
            </li>
            <li className=" ">
              <img
                className="w-10 p-2  rounded-lg bg-[#e9f2f9]"
                src={docx}
                alt=""
              />
            </li>
          </ul>
          <ul className="flex justify-between  items-center space-x-4 w-8/12">
            <li className="">
              <img
                className="h-36 w-40 rounded-lg"
                src={projectFirstImage}
                alt=""
              />
            </li>
            <li className="">
              <img
                className="h-36 w-40 rounded-lg object-center"
                src={projectSecoundImage}
                alt=""
              />
            </li>
            <li className="">
              <img
                className="h-36 w-40 rounded-lg object-cover"
                src={projectLastImage}
                alt=""
              />
            </li>
          </ul>
        </div>
        {/* edit delete */}
        {
            ProjectInfo?.user?._id === userId && (
            <div className="absolute right-5 top-3">
            <div className="flex items-center space-x-2">
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
