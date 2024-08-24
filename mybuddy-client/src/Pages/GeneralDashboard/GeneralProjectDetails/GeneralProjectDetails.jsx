import { BsHouseDoor } from "react-icons/bs";
import { FaCaretRight } from "react-icons/fa";
import OverviewIcon from "../../../icons/OverviewIcon";
import ProjectTaskIcon from "../../../icons/ProjectTaskIcon";
import ActivityIcon from "../../../icons/ActivityIcon";
import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import youtube from "../../../assets/dashboardpd/ytube.svg";
import pdf from "../../../assets/dashboardpd/pdf.svg";
import docx from "../../../assets/dashboardpd/document.svg";
import { MdOutlineCircle } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { IoQrCodeOutline } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
import UpdateProjectForm from "./UpdateProjectForm";
import AddNewTask from "./AddNewTask";
import { useUpdateJoinRequestStatusMutation } from "../../../features/projectJoinRequest/projectJoinRequestApi";

const GeneralProjectDetails = () => {
  const {
    allRecieveRequest,
    allAcceptedRecieveRequest,
    deleteProject,
    deleteTask,
    deleteTeamMember
  } = useContext(AuthContext);
  const currentTeamMember = allAcceptedRecieveRequest?.data;
  const req = allRecieveRequest?.data;
  console.log("currentTeamMember", currentTeamMember);
  const info = useLoaderData();
  const ProjectInfo = info?.data;
  const {
    tasks,
    description,
    category,
    discord,
    whatsApp,
    projectName,
    user,
    startDate,
    endDate,
    images,
    _id,
  } = ProjectInfo;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const navigate = useNavigate();

  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }

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

  const totalTasks = tasks?.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "complete"
  ).length;
  const progress = (completedTasks / totalTasks) * 100;
  //console.log("info", ProjectInfo);

  // Function to calculate days left
  const calculateDaysLeft = (startDate, endDate) => {
    const end = new Date(endDate);
    const today = new Date(startDate);
    const diffTime = Math.abs(end - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Mapping colors based on index
  const colors = [
    {
      progressColor: "bg-[#52E0FF]",
      daysLeftTextColor: "text-[#52E0FF]",
      daysLeftColor: "bg-blue-100 text-[#52E0FF]",
      cardBg: "bg-white",
    },
    {
      progressColor: "bg-[#FF6F32]",
      daysLeftTextColor: " text-[#FF6F32]",
      daysLeftColor: "bg-white text-[#FF6F32]",
      cardBg: "bg-[#fee4cb]",
    },
    {
      progressColor: "bg-[#72A7EF]",
      daysLeftTextColor: "text-[#72A7EF]",
      daysLeftColor: "bg-white text-[#72A7EF]",
      cardBg: "bg-[#D5E7FC]",
    },
    {
      progressColor: "bg-[#02CF4B]",
      daysLeftTextColor: "text-[#02CF4B]",
      daysLeftColor: "bg-white text-[#02CF4B]",
      cardBg: "bg-[#BAF3D2]",
    },
    {
      progressColor: "bg-[#FF6FAB]",
      daysLeftTextColor: "text-[#FF6FAB]",
      daysLeftColor: "bg-white text-[#FF6FAB]",
      cardBg: "bg-[#FFD3E2]",
    },
    {
      progressColor: "bg-[#02CF4B]",
      daysLeftTextColor: "text-[#02CF4B]",
      daysLeftColor: "bg-white text-[#02CF4B]",
      cardBg: "bg-[#BAF3D2]",
    },
  ];

  // members
  const member = [
    {
      profileImage:
        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",
      name: "Adam Smith",
      role: "MERN Stack Developer",
      status: "Frontend management",
    },
    {
      profileImage:
        "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg",
      name: "Adam Smith",
      role: "MERN Stack Developer",
      status: "Backend management",
    },
  ];

  // open update
  const openProjectUpdateModal = () => {
    setOpenUpdateModal(true);
  };
  const openTaskModal = () => {
    setOpenAddTaskModal(true);
  };
  const closeProjectUpdateModal = () => {
    setOpenUpdateModal(false);
  };
  const closeAddTaskModal = () => {
    setOpenAddTaskModal(false);
  };

  // delete project

  const deleteProjectById = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id)
          .then(() => {
            Swal.fire("Deleted!", "Your project has been deleted.", "success");
            navigate("/dashboard/all-projects"); // Navigate on success
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue deleting your project.",
              "error"
            );
          });
      }
    });
  };
  // delete task
  const deleteTaskById = (taskId) => {
    console.log(taskId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId)
          .then(() => {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            // Optionally, navigate or update the UI after deletion
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue deleting your task.",
              "error"
            );
          });
      }
    });
  };
  // delete team member
  const deleteMember = (id) => {
  console.log('req id', id);
    Swal.fire({
      title: "Are you sure to delete this member?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeamMember(id)
          .then(() => {
            Swal.fire("Deleted!", "This member has been deleted.", "success");
            // Optionally, navigate or update the UI after deletion
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue deleting your task.",
              "error"
            );
          });
      }
    });
  };
// update task member status
const [updateJoinRequestStatus] = useUpdateJoinRequestStatusMutation();
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
const handleUpdateStatusDone = (e, index) => {
  e.preventDefault();
  setSelectedRequestIndex(index);
  const selectedTask = allRecieveRequest?.data[index];
  if (selectedTask) {
    Swal.fire({
      title: "Are you sure?",
      text: "Does this member completed his task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, all task are completed!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = "Done";
        console.log({ id: selectedTask._id, data: { status: newStatus } });
        updateJoinRequestStatus({
          id: selectedTask._id,
          data: { status: newStatus },
        })
          .unwrap()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Well done !",
              text: "You have updated the status successfully!",
            });
          })
          .catch((error) => {
            alert("Failed to update status.");
            console.error(error);
          });
      }
    });
  } else {
    console.log("No task found for the selected index.");
  }
};
  return (
    <div>
      <div className="flex items-center space-x-1">
        <BsHouseDoor className="text-xl text-blue-500" />
        <p className="text-blue-500 text-lg">Dashboard</p>
        <FaCaretRight className="text-xl text-blue-500" />
        <p className="text-blue-500 text-lg">Project</p>
        <FaCaretRight className="text-xl text-blue-500" />
        <p className=" text-lg">{projectName}</p>
      </div>
      <p className="graish font-bold text-xl py-3">{projectName}</p>

      <div className="p-5 space-y-3">
        {/* tab */}
        <ul className="flex items-center justify-between bg-[#e9f2f9] py-3 px-3">
          <li className="flex justify-center items-center space-x-1 bg-blue-400 py-3 w-full">
            <OverviewIcon />
            <p className="graish text-lg">Overview</p>
          </li>
          <li className="flex justify-center items-center space-x-1 bg-blue-300 py-3 w-full">
            <ProjectTaskIcon />
            <p className="graish text-lg">Tasks</p>
          </li>
          <li className="flex justify-center items-center space-x-1 bg-blue-200 py-3 w-full">
            <ActivityIcon />
            <p className="graish text-lg">Activity</p>
          </li>
        </ul>
        {/* overview */}
        <div className=" space-y-2 pb-6 rounded-[20px] md:rounded-[15px] relative bg-[#e4ecf7]  shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]">
          {/* profile */}
          <div className="flex  items-start  w-11/12 pt-8   bg-skyblue p-2 overflow-hidden">
            {/* left */}
            <div className=" w-4/12 flex flex-col justify-center items-center space-y-1 py-2">
              <img
                className="h-[68px] w-[68px] rounded-full"
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
                  <p className="graish text-[16px] pt-[3px]">
                    {projectDeadline}
                  </p>
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
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: description.slice(0, 100),
                  }}
                />
              </div>
            </div>
          </div>
          {/* documents */}
          <div className="flex justify-between items-start w-11/12">
            <ul className="flex justify-center items-center  px-4  space-x-4 w-4/12">
              <li className=" ">
                <img
                  className="w-12 p-2  rounded-lg bg-[#e9f2f9]"
                  src={youtube}
                  alt=""
                />
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
        {/* task */}
        <div className="flex justify-between items-center py-10">
          <div className="flex space-x-8 text-center">
            <div className="text-gray-700">
              <p className="text-[20px] font-bold">45</p>
              <div className="graish text-[14px] flex items-center space-x-2">
                {" "}
                Total Task
              </div>
            </div>
            <div className="text-gray-700">
              <p className="text-[20px] font-bold">12</p>
              <div className="text-[14px] flex items-center space-x-2">
                {" "}
                <MdOutlineCircle className="mr-1 graish text-[14px]" /> In
                Progress
              </div>
            </div>
            <div className="text-gray-700">
              <p className="text-[20px] font-bold">10</p>
              <div className="text-[14px] flex items-center space-x-2">
                {" "}
                <MdOutlineCircle className="mr-1 graish text-[14px]" />
                Upcoming
              </div>
            </div>
            <div className="text-gray-700">
              <p className="text-[20px] font-bold">67</p>
              <div className="text-[14px] flex items-center space-x-2">
                {" "}
                <MdOutlineCircle className="mr-1 graish text-[14px]" /> Done
              </div>
            </div>
          </div>
          <button
            onClick={openTaskModal}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#60f5c6] to-teal-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg focus:outline-none"
          >
            <span className="mr-2">+</span>
            Add New Task
          </button>
        </div>
        {/* card */}
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task, index) => {
            const daysLeft = calculateDaysLeft(task.startDate, task.endDate);
            const { progressColor, daysLeftColor, cardBg } =
              colors[index % colors.length];

            return (
              <div
                key={index}
                className={`rounded-3xl shadow-md p-4 w-64 ${cardBg}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-sm">
                    {formatDate(task.startDate)}
                  </p>
                  <button className="text-gray-500">
                    <BsThreeDotsVertical
                      onClick={() => deleteTaskById(task?._id)}
                    />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {task.description}
                </p>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm mb-1">Progress</p>
                  <div className="w-full bg-gray-50 rounded-full h-2.5 mb-2">
                    <div
                      className={`${progressColor} h-2.5 rounded-full`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-500 text-sm text-right">
                    {progress.toFixed(2)}%
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User 1"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src="https://randomuser.me/api/portraits/women/2.jpg"
                      alt="User 2"
                    />
                    <button
                      className={`w-8 h-8 rounded-full ${progressColor} text-white text-bl flex items-center justify-center border-2 border-white`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={`${daysLeftColor}  text-sm px-4 py-1 rounded-full`}
                  >
                    {daysLeft} Days Left
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* current task member */}
        {selectedIndex !== null && (
          <>
            <div className="py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {tasks[selectedIndex].title}
              </h2>

              <div className="mt-2">
                <p className="text-gray-800 font-semibold">Description</p>
                <p className="text-gray-500">{tasks[selectedIndex].details}</p>
              </div>

              <div className="mt-2">
                <p className="text-gray-800 font-semibold">Deadline</p>
                <p className="text-gray-500">
                  {formatDate(tasks[selectedIndex].endDate)}
                </p>
              </div>
            </div>

            <div className=" gray600 space-y-6 w-12/12 md:w-full">
              <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
                Current team member
              </h1>
              <div className="w-full py-4 flex my-5  items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
                <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-4/12 sm:w-3/12 ">
                  Name
                </div>
                <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-3/12 sm:w-4/12 ">
                  Part
                </div>
                <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-2/12 sm:w-2/12 ">
                  Status
                </div>

                <div className="text-[15px]  md:text-[21px] w-3/12 sm:w-3/12">
                  <p className="font-semibold text-center ">Manage</p>
                </div>
              </div>
              {/* table */}
              {currentTeamMember
                ?.filter((request) =>
                  request.tasks.some(
                    (task) => task.title === tasks[selectedIndex]?.title
                  )
                )
                .map(
                  (request, i) =>
                    request && (
                      <div
                        key={i}
                        className="w-full px-1 py-4  flex my-5 justify-between items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
                      >
                        <div className="flex justify-center items-center space-x-1 text-[16px] md:text-lg   border-r-2  text-center w-4/12 sm:w-3/12">
                          <img
                            src={
                              request?.requestedBy?.profilePic ||
                              "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                            }
                            className="w-8 h-8 md:w-12 md:h-12 border border-black rounded-full"
                            loading="lazy"
                            alt=""
                          />
                          <div className="pl-1">
                            <p className="text-start text-[15px] font-bold capitalize md:pt-0">
                              {request?.requestedBy?.name?.firstName}{" "}
                              {request?.requestedBy?.name?.lastName}
                            </p>
                            <p className="text-start text-[14px]">
                              {request?.requestedBy?.role}
                            </p>
                          </div>
                        </div>
                        <div className="capitalize text-[16px] md:text-[18px] border-r-2  text-center sm:w-4/12">
                          {tasks[selectedIndex]?.details.slice(0, 20)}
                        </div>
                        <div className="text-[16px] md:text-lg   border-r-2  text-center w-2/12 sm:w-2/12 ">
                          <button className="border border-blue-500 bg-blue-200 text-blue-600 py-1 px-3 rounded-lg text-sm">
                            In Progress
                          </button>
                        </div>

                        <div className="flex justify-center xs:space-x-2 items-center text-[16px] md:text-lg   w-2/12 sm:w-3/12 ">
                          <CiEdit onClick={(e)=>handleUpdateStatusDone(e,i)} className="text-3xl text-blue-500" />
                          <LuTrash2 onClick={()=>deleteMember(request?._id)} className="text-xl text-red-500" />
                        </div>
                      </div>
                    )
                )}
             
            </div>
            {/* task join request */}
            <div className=" gray600 space-y-6 w-12/12 md:w-full">
              <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
                REQUESTS 2
              </h1>
              <div className="w-full py-4 flex my-5  items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
                <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-4/12 sm:w-3/12 ">
                  From
                </div>

                <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-2/12 sm:w-7/12 ">
                  Details
                </div>

                <div className="text-[15px]  md:text-[21px] w-3/12 sm:w-2/12">
                  <p className="font-semibold text-center ">Action</p>
                </div>
              </div>

              {/* table */}
            </div>

            {req
              ?.filter((request) =>
                request.tasks.some(
                  (task) => task.title === tasks[selectedIndex]?.title
                )
              )
              .map(
                (filteredRequest, i) =>
                  filteredRequest && (
                    <div
                      key={i}
                      className="w-full px-1 py-4 flex my-5 justify-between items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
                    >
                      <div className="flex justify-center items-center space-x-1 text-[16px] md:text-lg border-r-2 text-center w-4/12 sm:w-3/12">
                        <img
                          src={
                            filteredRequest.profileImagec ||
                            "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                          }
                          className="w-8 h-8 md:w-10 md:h-10 border border-black rounded-full"
                          loading="lazy"
                          alt=""
                        />
                        <div className="pl-1">
                          <p className="text-start text-[17px] font-bold capitalize md:pt-0">
                            {filteredRequest.requestedBy?.name?.firstName}{" "}
                            {filteredRequest.requestedBy?.name?.lastName}
                          </p>
                        </div>
                      </div>
                      <p>{tasks[selectedIndex]?.details.slice(0, 90)}...</p>
                      {/* <div
          className=""
          dangerouslySetInnerHTML={{
            __html: filteredRequest?.details?.slice(0, 100) || '',
          }}
        />  */}

                      <div className="flex justify-center xs:space-x-2 items-center text-[16px] md:text-lg w-2/12 sm:w-2/12 ">
                        <CiEdit className="text-3xl text-blue-500" />
                        <LuTrash2 className="text-xl text-red-500" />
                      </div>
                    </div>
                  )
              )}
          </>
        )}
        {/* activity log */}
        <div className="p-6 bg-gray-100 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Activity</h2>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-md bg-[#e9f2f9]">
                <IoQrCodeOutline className="text-2xl" />
              </button>
              <button className="p-2 rounded-md bg-[#e9f2f9]">
                <svg
                  className="h-5"
                  viewBox="0 0 27 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.8579 2.46057L25.4712 2.46154M7.8579 10.5898L25.4712 10.5909M7.8579 18.719L25.4712 18.7201M1.76099 2.45966H1.77454M1.76099 10.5889H1.77454M1.76099 18.7181H1.77454M2.43842 2.45966C2.43842 2.83379 2.13512 3.13709 1.76099 3.13709C1.38686 3.13709 1.08356 2.83379 1.08356 2.45966C1.08356 2.08553 1.38686 1.78223 1.76099 1.78223C2.13512 1.78223 2.43842 2.08553 2.43842 2.45966ZM2.43842 10.5889C2.43842 10.9629 2.13512 11.2663 1.76099 11.2663C1.38686 11.2663 1.08356 10.9629 1.08356 10.5889C1.08356 10.2148 1.38686 9.91143 1.76099 9.91143C2.13512 9.91143 2.43842 10.2148 2.43842 10.5889ZM2.43842 18.7181C2.43842 19.0922 2.13512 19.3955 1.76099 19.3955C1.38686 19.3955 1.08356 19.0922 1.08356 18.7181C1.08356 18.344 1.38686 18.0406 1.76099 18.0406C2.13512 18.0406 2.43842 18.344 2.43842 18.7181Z"
                    stroke="#5D6271"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-md bg-[#e9f2f9]">
                <svg
                  className="h-7"
                  viewBox="0 0 17 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.9364 9.57611C14.0205 9.50185 14.1004 9.43273 13.9364 9.57611C14.0205 9.50185 14.0943 9.69115 13.9364 9.57611L14.778 10.9702V16.9937C14.5595 19.0659 13.4027 20.6709 11.5701 22.4889C9.51921 23.9841 6.73853 24.8252 3.83811 24.8276C3.61492 24.8276 3.40088 24.763 3.24306 24.6479C3.08524 24.5329 2.99658 24.3768 2.99658 24.2141C2.99658 24.0514 3.08524 23.8953 3.24306 23.7803C3.40088 23.6652 3.61492 23.6006 3.83811 23.6006C6.29231 23.5985 8.6452 22.8868 10.3806 21.6216C12.116 20.3563 13.4027 18.5784 13.4027 16.8516L13.507 13.8388L13.3413 10.9702C13.1835 11.0853 13.3181 10.2361 13.0949 10.2361C12.8717 10.2361 13.811 9.86187 13.0949 10.2361C13.0949 10.3988 13.9364 9.5762 13.0949 10.2361C13.0949 10.0734 13.811 9.80336 13.0949 10.2361L13.3413 9.05517C13.347 9.05108 13.3531 9.0476 13.3588 9.04367C13.3731 9.03378 13.3874 9.0239 13.4027 9.01476C13.4137 9.0082 13.4252 9.00244 13.4365 8.99633C13.4473 8.99049 13.4578 8.98442 13.4689 8.97896C13.4814 8.97289 13.4942 8.96761 13.507 8.96207C13.5179 8.95735 13.5285 8.95237 13.5397 8.94799C13.5522 8.94316 13.5649 8.93904 13.5776 8.93469C13.5899 8.93046 13.602 8.92601 13.6146 8.92219C13.6264 8.91863 13.6385 8.91574 13.6505 8.9126C13.6645 8.90889 13.6783 8.90503 13.6925 8.90189C13.7041 8.89934 13.7158 8.89751 13.7274 8.89534C13.7423 8.89256 13.7572 8.88953 13.7724 8.88732C13.7852 8.88549 13.7981 8.88444 13.811 8.88305C13.8253 8.88148 13.8394 8.87957 13.8539 8.87852C13.8752 8.87702 13.8965 8.8765 13.9178 8.87616C13.9241 8.87609 13.9301 8.87549 13.9364 8.87549C13.9427 8.87549 13.9488 8.87609 13.955 8.87616C13.9764 8.8765 13.9977 8.87702 14.0189 8.87852C14.0334 8.87957 14.0476 8.88148 14.0619 8.88305C14.0747 8.88444 14.0876 8.88549 14.1004 8.88732C14.1157 8.88953 14.1305 8.89256 14.1455 8.89534C14.1571 8.89751 14.1688 8.89934 14.1803 8.90189C14.1946 8.90503 14.2084 8.90889 14.2223 8.9126C14.2343 8.91574 14.2464 8.91863 14.2583 8.92219C14.2708 8.92601 14.2829 8.93046 14.2952 8.93469C14.3079 8.93904 14.3207 8.94316 14.3331 8.94799C14.3443 8.95237 14.3549 8.95735 14.3658 8.96207C14.3786 8.96761 14.3915 8.97289 14.4039 8.97896C14.4151 8.98442 14.4256 8.99049 14.4363 8.99633C14.4477 9.00244 14.4592 9.0082 14.4702 9.01476C14.4854 9.02389 14.4997 9.03378 14.514 9.04367C14.5198 9.0476 14.5259 9.05108 14.5315 9.05517L13.9364 9.57611Z"
                    fill="#5D6271"
                  />
                  <path
                    d="M2.99646 5.66064V31.5449"
                    stroke="#5D6271"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="14.0983"
                    cy="9.5335"
                    r="2"
                    fill="#E9F2F9"
                    stroke="#5D6271"
                    strokeWidth="1.21445"
                  />
                  <circle
                    cx="2.99657"
                    cy="3.32109"
                    r="2"
                    stroke="#5D6271"
                    strokeWidth="1.21445"
                  />
                  <circle
                    cx="2.99657"
                    cy="33.8567"
                    r="2"
                    stroke="#5D6271"
                    strokeWidth="1.21445"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full py-4 flex my-5  items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <div className="text-[15px] md:text-[16px]  font-semibold border-r-2 text-center w-[100px]">
              Serial No.
            </div>

            <div className="text-[15px] md:text-[16px]  font-semibold border-r-2 text-center w-2/12">
              Name
            </div>
            <div className="text-[15px] md:text-[16px]  font-semibold border-r-2 text-center w-3/12">
              Message
            </div>
            <div className="text-[15px] md:text-[16px]  font-semibold border-r-2 text-center w-1/12">
              Media
            </div>
            <div className="text-[15px] md:text-[16px]  font-semibold border-r-2 text-center w-1/12">
              Link
            </div>
            <div className="text-[15px] md:text-[16px]  font-semibold border-r-2 text-center w-2/12">
              Date
            </div>

            <div className="text-[15px]  md:text-[16px] w-[100px]">
              <p className="font-semibold text-center ">Action</p>
            </div>
          </div>

          {/* row 1 */}
          <tr className="w-full px-1 py-4  flex my-5 justify-between items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <td className="px-4 py-4 text-gray-800">#00987</td>
            <td className="px-4 py-4 flex items-center">
              <img
                src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800">Ronny Asmo</div>
                <div className="text-sm text-gray-500">Software engineer</div>
              </div>
            </td>
            <td className="px-4 py-4 text-gray-800">Joined as Backend</td>
            <td className="px-4 py-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.52673 13.8911C1.52673 8.11433 1.52673 5.22594 3.32135 3.43134C5.11596 1.63672 8.00435 1.63672 13.7811 1.63672C19.5578 1.63672 22.4463 1.63672 24.2409 3.43134C26.0355 5.22594 26.0355 8.11433 26.0355 13.8911C26.0355 19.6678 26.0355 22.5563 24.2409 24.3509C22.4463 26.1455 19.5578 26.1455 13.7811 26.1455C8.00435 26.1455 5.11596 26.1455 3.32135 24.3509C1.52673 22.5563 1.52673 19.6678 1.52673 13.8911Z"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                />
                <path
                  d="M18.6829 11.4403C20.0365 11.4403 21.1338 10.343 21.1338 8.98945C21.1338 7.63587 20.0365 6.53857 18.6829 6.53857C17.3293 6.53857 16.232 7.63587 16.232 8.98945C16.232 10.343 17.3293 11.4403 18.6829 11.4403Z"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                />
                <path
                  d="M1.52673 14.5046L3.6732 12.6265C4.78991 11.6495 6.47295 11.7055 7.52218 12.7547L12.779 18.0115C13.6211 18.8537 14.9468 18.9685 15.9212 18.2836L16.2867 18.0269C17.6888 17.0414 19.5859 17.1556 20.8599 18.3022L24.8101 21.8573"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </td>
            <td className="px-4 py-4">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.6068 9.54492V1.93555M23.6068 1.93555H16.4008M23.6068 1.93555L13.9988 12.0814M10.3959 4.47201H7.7537C5.73585 4.47201 4.72692 4.47201 3.95621 4.88669C3.27826 5.25146 2.72708 5.8335 2.38165 6.5494C1.98895 7.36326 1.98895 8.42868 1.98895 10.5595V18.6762C1.98895 20.8071 1.98895 21.8724 2.38165 22.6863C2.72708 23.4022 3.27826 23.9842 3.95621 24.349C4.72692 24.7637 5.73585 24.7637 7.7537 24.7637H15.44C17.4579 24.7637 18.4668 24.7637 19.2376 24.349C19.9155 23.9842 20.4667 23.4022 20.8121 22.6863C21.2048 21.8724 21.2048 20.8071 21.2048 18.6762V15.8861"
                  stroke="#2B68FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </td>
            <td className="px-4 py-4 text-gray-800">July 11, 2024</td>
            <td className="px-4 py-4">
              <span className="border border-green-500 text-green-600 py-1 px-3 rounded-full text-sm">
                Approved
              </span>
            </td>
          </tr>
          {/* row 2 */}
          <tr className="w-full px-1 py-4  flex my-5 justify-between items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <td className="px-4 py-4 text-gray-800">#00987</td>
            <td className="px-4 py-4 flex items-center">
              <img
                src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800">Ronny Asmo</div>
                <div className="text-sm text-gray-500">Software engineer</div>
              </div>
            </td>
            <td className="px-4 py-4 text-gray-800">Uploaded 3D Models</td>
            <td className="px-4 py-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.52673 13.8911C1.52673 8.11433 1.52673 5.22594 3.32135 3.43134C5.11596 1.63672 8.00435 1.63672 13.7811 1.63672C19.5578 1.63672 22.4463 1.63672 24.2409 3.43134C26.0355 5.22594 26.0355 8.11433 26.0355 13.8911C26.0355 19.6678 26.0355 22.5563 24.2409 24.3509C22.4463 26.1455 19.5578 26.1455 13.7811 26.1455C8.00435 26.1455 5.11596 26.1455 3.32135 24.3509C1.52673 22.5563 1.52673 19.6678 1.52673 13.8911Z"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                />
                <path
                  d="M18.6829 11.4403C20.0365 11.4403 21.1338 10.343 21.1338 8.98945C21.1338 7.63587 20.0365 6.53857 18.6829 6.53857C17.3293 6.53857 16.232 7.63587 16.232 8.98945C16.232 10.343 17.3293 11.4403 18.6829 11.4403Z"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                />
                <path
                  d="M1.52673 14.5046L3.6732 12.6265C4.78991 11.6495 6.47295 11.7055 7.52218 12.7547L12.779 18.0115C13.6211 18.8537 14.9468 18.9685 15.9212 18.2836L16.2867 18.0269C17.6888 17.0414 19.5859 17.1556 20.8599 18.3022L24.8101 21.8573"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </td>
            <td className="px-4 py-4">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.6068 9.54492V1.93555M23.6068 1.93555H16.4008M23.6068 1.93555L13.9988 12.0814M10.3959 4.47201H7.7537C5.73585 4.47201 4.72692 4.47201 3.95621 4.88669C3.27826 5.25146 2.72708 5.8335 2.38165 6.5494C1.98895 7.36326 1.98895 8.42868 1.98895 10.5595V18.6762C1.98895 20.8071 1.98895 21.8724 2.38165 22.6863C2.72708 23.4022 3.27826 23.9842 3.95621 24.349C4.72692 24.7637 5.73585 24.7637 7.7537 24.7637H15.44C17.4579 24.7637 18.4668 24.7637 19.2376 24.349C19.9155 23.9842 20.4667 23.4022 20.8121 22.6863C21.2048 21.8724 21.2048 20.8071 21.2048 18.6762V15.8861"
                  stroke="#2B68FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </td>
            <td className="px-4 py-4 text-gray-800">July 11, 2024</td>
            <td className="px-4 py-4">
              <span className="border border-red-500 text-red-600 py-1 px-3 rounded-full text-sm">
                Declined
              </span>
            </td>
          </tr>
          {/* row 3 */}
          <tr className="w-full px-1 py-4  flex my-5 justify-between items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <td className="px-4 py-4 text-gray-800">#00987</td>
            <td className="px-4 py-4 flex items-center">
              <img
                src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800">Ronny Asmo</div>
                <div className="text-sm text-gray-500">Software engineer</div>
              </div>
            </td>
            <td className="px-4 py-4 text-gray-800">Joined as Backend</td>
            <td className="px-4 py-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.52673 13.8911C1.52673 8.11433 1.52673 5.22594 3.32135 3.43134C5.11596 1.63672 8.00435 1.63672 13.7811 1.63672C19.5578 1.63672 22.4463 1.63672 24.2409 3.43134C26.0355 5.22594 26.0355 8.11433 26.0355 13.8911C26.0355 19.6678 26.0355 22.5563 24.2409 24.3509C22.4463 26.1455 19.5578 26.1455 13.7811 26.1455C8.00435 26.1455 5.11596 26.1455 3.32135 24.3509C1.52673 22.5563 1.52673 19.6678 1.52673 13.8911Z"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                />
                <path
                  d="M18.6829 11.4403C20.0365 11.4403 21.1338 10.343 21.1338 8.98945C21.1338 7.63587 20.0365 6.53857 18.6829 6.53857C17.3293 6.53857 16.232 7.63587 16.232 8.98945C16.232 10.343 17.3293 11.4403 18.6829 11.4403Z"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                />
                <path
                  d="M1.52673 14.5046L3.6732 12.6265C4.78991 11.6495 6.47295 11.7055 7.52218 12.7547L12.779 18.0115C13.6211 18.8537 14.9468 18.9685 15.9212 18.2836L16.2867 18.0269C17.6888 17.0414 19.5859 17.1556 20.8599 18.3022L24.8101 21.8573"
                  stroke="#2ABFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </td>
            <td className="px-4 py-4">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.6068 9.54492V1.93555M23.6068 1.93555H16.4008M23.6068 1.93555L13.9988 12.0814M10.3959 4.47201H7.7537C5.73585 4.47201 4.72692 4.47201 3.95621 4.88669C3.27826 5.25146 2.72708 5.8335 2.38165 6.5494C1.98895 7.36326 1.98895 8.42868 1.98895 10.5595V18.6762C1.98895 20.8071 1.98895 21.8724 2.38165 22.6863C2.72708 23.4022 3.27826 23.9842 3.95621 24.349C4.72692 24.7637 5.73585 24.7637 7.7537 24.7637H15.44C17.4579 24.7637 18.4668 24.7637 19.2376 24.349C19.9155 23.9842 20.4667 23.4022 20.8121 22.6863C21.2048 21.8724 21.2048 20.8071 21.2048 18.6762V15.8861"
                  stroke="#2B68FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </td>
            <td className="px-4 py-4 text-gray-800">July 11, 2024</td>
            <td className="px-4 py-4">
              <button className="border border-blue-500 text-blue-600 py-1 px-3 rounded-full text-sm">
                Select
              </button>
            </td>
          </tr>

          {/* </table> */}
        </div>
        {/* for worker */}
        {/*  <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            For Project Worker
          </h3>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            Develop Backend
          </h4>
          <div className="text-gray-600 mb-2">
            <span className="font-semibold">Description</span>
            <p className="text-sm">
              Create the backend for user management and data processing...
              <a href="#" className="text-blue-500">
                Read More
              </a>
            </p>
          </div>
          <div className="text-gray-600 mb-4">
            <p>
              <span className="font-semibold">Deadline:</span> August 30, 2024
            </p>
            <p>
              <span className="font-semibold">Total income:</span> 10 Coins
            </p>
          </div>
          <div className="text-gray-600 mb-4">
            <span className="font-semibold">Subtask:</span>
            <ul className="list-none mt-2 space-y-2">
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">
                    Setup the user authentication system
                  </span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">
                    Setup the user authentication system
                  </span>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">
                    Setup the user authentication system
                  </span>
                </label>
              </li>
            </ul>
            <div className="mt-4 [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] text-white py-1 px-4 rounded-[10px] float-right">
              Commit
            </div>
          </div>
          <div className="p-6 bg-[#e9f2f9] rounded-lg shadow-md">
            <div className=" p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-gray-700  font-bold mb-2">
                  Message :
                </label>
                <input
                  type="text"
                  className="w-10/12 p-3 border border-gray-200 rounded-md bg-[#e4ecf7] outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                  placeholder="Enter your message"
                />
              </div>
              <div className="flex items-center space-x-20 mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Media :
                </label>
                <button className="p-3 [background:linear-gradient(-44.24deg,#87aaff,#447afc)] text-white rounded-md flex items-center space-x-2">
                  <svg
                    width="29"
                    height="23"
                    viewBox="0 0 29 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3448 21.7148V11.3779M14.3448 11.3779L11.0222 14.8235M14.3448 11.3779L17.6674 14.8235M6.37063 19.992C3.43462 19.992 1.0545 17.5678 1.0545 14.5775C1.0545 12.1133 2.67058 10.0337 4.88209 9.37803C4.97606 9.35012 5.0416 9.26255 5.0416 9.16288C5.0416 4.67729 8.61176 1.04102 13.0158 1.04102C17.4198 1.04102 20.99 4.67729 20.99 9.16288C20.99 9.24882 21.0691 9.31261 21.1515 9.29386C21.5272 9.20806 21.9179 9.16288 22.319 9.16288C25.255 9.16288 27.6351 11.587 27.6351 14.5775C27.6351 17.5678 25.255 19.992 22.319 19.992"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>Upload</span>
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  External Link :
                </label>
                <input
                  type="text"
                  className="w-10/12 p-3 border border-gray-200 rounded-md bg-[#e4ecf7] outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                  placeholder="Enter the link"
                />
              </div>
              <button className="w-40 float-right bg-gradient-to-r [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] text-white py-3 px-2 rounded-md">
                Upload Commit
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GeneralProjectDetails;
