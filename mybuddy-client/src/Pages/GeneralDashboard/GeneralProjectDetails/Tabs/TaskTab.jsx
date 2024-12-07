/* eslint-disable react/prop-types */

import { BsThreeDotsVertical } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { LuTrash2 } from "react-icons/lu";
import { MdOutlineCircle } from "react-icons/md";
import Swal from "sweetalert2";
import {
  useUpdateSubTaskStatusMutation,
  useUpdateTaskStatusMutation,
} from "../../../../features/project/projectApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/UserContext";
import {
  useLeaveTaskFromProjectMutation,
  useUpdateJoinRequestStatusMutation,
} from "../../../../features/projectJoinRequest/projectJoinRequestApi";
import xMark from "../../../../assets/xmark.png";
import rightMark from "../../../../assets/checkmark.png";
import CommitModal from "../modals/CommitModal";
import AddNewTask from "../AddNewTask";
import { apiFetch } from "../../../../utils/apiFetch";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import UpdateTask from "../modals/UpdateTask";
import { TbLogout } from "react-icons/tb";

const TaskTab = ({
  ProjectInfo,
  tasks,
  setIsOpenTaskTab,
  openTaskModal,
  formatDate,
  currentTeamMember,
  req,
  teamMembers, 
  setTeamMembers,
  projectId,
  allRecieveRequest,
  filteredMyself,
  projectOwner,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isOpenCommitModal, setIsOpenCommitModal] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [leaveTaskFromProject] = useLeaveTaskFromProjectMutation();

  const closeAddTaskModal = () => {
    setOpenAddTaskModal(false);
  };
  // update task member status
  //const [updateJoinRequestStatus] = useUpdateJoinRequestStatusMutation();
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const { userId, deleteTask, deleteTeamMember, createCommit } =
    useContext(AuthContext);

  const totalTasks = tasks?.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "complete"
  ).length;
  const progress = (completedTasks / totalTasks) * 100;
  //console.log("info", ProjectInfo);

  // commit modal
  const closeCommitModal = () => {
    setIsOpenCommitModal(false);
  };

  // Function to calculate days left
  // const calculateDaysLeft = (startDate, endDate) => {
  //   const end = new Date(endDate);
  //   const today = new Date(startDate);
  //   const diffTime = Math.abs(end - today);
  //   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // };

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    // Remove time portion for date-only comparison
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Calculate the time difference in milliseconds
    const diffTime = end - today;

    if (diffTime < 0) {
      return "Times Up";
    }

    // Convert the time difference to days
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${daysLeft} ${daysLeft > 1 ? "Days" : "Day"} Left`;
  };
  // "Deadline over" if today is "2024-12-03"

  // Mapping colors based on index
  const colors = [
    {
      progressColor: "bg-[#52E0FF]",
      textColor: "text-[#52E0FF]",
      borderColor: "border-[#52E0FF]",
      daysLeftTextColor: "text-[#52E0FF]",
      daysLeftColor: "bg-blue-100 text-[#52E0FF]",
      cardBg: "bg-white",
    },
    {
      progressColor: "bg-[#FF6F32]",
      textColor: "text-[#FF6F32]",
      borderColor: "border-[#FF6F32]",
      daysLeftTextColor: " text-[#FF6F32]",
      daysLeftColor: "bg-white text-[#FF6F32]",
      cardBg: "bg-[#fee4cb]",
    },
    {
      progressColor: "bg-[#72A7EF]",
      textColor: "text-[#72A7EF]",
      borderColor: "border-[#72A7EF]",
      daysLeftTextColor: "text-[#72A7EF]",
      daysLeftColor: "bg-white text-[#72A7EF]",
      cardBg: "bg-[#D5E7FC]",
    },
    {
      progressColor: "bg-[#02CF4B]",
      textColor: "text-[#02CF4B]",
      borderColor: "border-[#02CF4B]",
      daysLeftTextColor: "text-[#02CF4B]",
      daysLeftColor: "bg-white text-[#02CF4B]",
      cardBg: "bg-[#BAF3D2]",
    },
    {
      progressColor: "bg-[#FF6FAB]",
      textColor: "text-[#FF6FAB]",
      borderColor: "border-[#FF6FAB]",
      daysLeftTextColor: "text-[#FF6FAB]",
      daysLeftColor: "bg-white text-[#FF6FAB]",
      cardBg: "bg-[#FFD3E2]",
    },
    {
      progressColor: "bg-[#02CF4B]",
      textColor: "text-[#02CF4B]",
      borderColor: "border-[#02CF4B]",
      daysLeftTextColor: "text-[#02CF4B]",
      daysLeftColor: "bg-white text-[#02CF4B]",
      cardBg: "bg-[#BAF3D2]",
    },
  ];

  // member status
  const handleUpdateStatusDone = (e, request) => {
    e.preventDefault();
    // setSelectedRequestIndex(index);
    const selectedTask = request;
    console.log(selectedTask);
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Does this member completed his task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Done";
          console.log({ id: selectedTask?._id, data: { status: newStatus } });
          updateJoinRequestStatus({
            id: selectedTask?._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have accepted the request successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            })
            .catch((error) => {
              alert("Failed to accept the request.");
              console.error(error);
            });
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };

  // is Matching useGetAllAcceptedProjectTeamMemberQuery

 

 
  // access of commit

  const currentTaskid = tasks[selectedIndex]?._id;

  const isMatchingMember = teamMembers?.some(
    (member) =>
      member?.requestedBy?._id === userId &&
      member?.tasks?.some((task) => task?._id === currentTaskid) // Check if any task's title matches
  );

  //----------- update task, subtask status
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [updateSubTaskStatus] = useUpdateSubTaskStatusMutation();

  const handleUpdateTaskStatus = (e) => {
    e.preventDefault();
    const selectedTask = tasks[selectedIndex];
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Does this task deserve to be marked as done?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark as done!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "completed";
          updateTaskStatus({
            projectId: ProjectInfo?._id,
            taskId: selectedTask?._id,
            status: newStatus,
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Task Updated!",
                text: "You have updated the task status successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            })
            .catch((error) => {
              alert("Failed to update task status.");
              console.error(error);
            });
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };

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
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            setTimeout(() => {
              window.location.reload();
            }, 2500);
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
    console.log("req id", id);
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
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "This member has been deleted.", "success");
            setTimeout(() => {
              window.location.reload();
            }, 2500);
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
  // Use the mutation hook
  const [updateJoinRequestStatus] = useUpdateJoinRequestStatusMutation();

  const handleUpdateStatusAccept = (e, index) => {
    e.preventDefault();
    setSelectedRequestIndex(index);
    const selectedTask = allRecieveRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to accept the request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Accepted";
          console.log({ id: selectedTask?._id, data: { status: newStatus } });
          updateJoinRequestStatus({
            id: selectedTask?._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have accepted the request successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            })
            .catch((error) => {
              alert("Failed to accept the request.");
              console.error(error);
            });
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };
  const handleUpdateStatusReject = (e, index) => {
    e.preventDefault();
    setSelectedRequestIndex(index);
    const selectedTask = allRecieveRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to reject the request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Rejected";
          console.log({ id: selectedTask?._id, data: { status: newStatus } });
          updateJoinRequestStatus({
            id: selectedTask?._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have rejected the request successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            })
            .catch((error) => {
              alert("Failed to reject the request.");
              console.error(error);
            });
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };

  //------ count progress bar

  const calculateProgress = (task) => {
    let totalTasks = 1; // Start with the main task itself
    let completedTasks = task.status === "completed" ? 1 : 0;

    if (task.subTask && task.subTask.length > 0) {
      totalTasks += task.subTask.length; // Add subtasks to the total count

      // Count completed subtasks
      task.subTask.forEach((subtask) => {
        if (subtask.status === "completed") {
          completedTasks++;
        }
      });
    }

    // Calculate progress as a percentage
    return (completedTasks / totalTasks) * 100;
  };
  //---------- count total, in progress, done and up coming project
  const today = new Date().toISOString().split("T")[0];

  const totalTask = tasks?.length || 0;

  const inProgressTasks = tasks?.filter(
    (task) =>
      new Date(task.startDate) <= new Date(today) &&
      new Date(today) <= new Date(task.endDate) &&
      task.status === "pending"
  ).length;

  const upcomingTasks = tasks?.filter(
    (task) => new Date(task.startDate) > new Date(today)
  ).length;

  const doneTasks = tasks?.filter((task) => task.status === "completed").length;

  // ----------------------
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleOption = (task) => {
    setIsOpenOption(!isOpenOption);
    setSelectedTask(task);
  };

  const toggleUpdateTask = (post) => {
    setIsOpenOption(false);
    setIsOpenUpdateModal(true);
    setSelectedTask(post);
  };

  // ----- leave task

  const handleLeaveTask = (task) => {
   const taskId= task?._id
    console.log("OP",projectId,
      task?._id,);
    const capitalizedTitle = task?.title?.toUpperCase(); // Capitalize the task title

    Swal.fire({
      title: "Are you sure you want to leave this task?",
      html: `Type the task title below to confirm:<br><b>${capitalizedTitle}</b>`, // Display the title in bold and capitalized
      input: "text",
      inputPlaceholder: `Enter task title: ${capitalizedTitle}`, // Placeholder includes the capitalized title
      inputAttributes: {
        autocapitalize: "on", // Capitalize user input
      },
      showCancelButton: true,
      confirmButtonText: "Leave Task",
      showLoaderOnConfirm: true,
      preConfirm: (inputValue) => {
        if (inputValue.toUpperCase() === capitalizedTitle) {
          // Compare input value in uppercase
          return Promise.resolve(); // Task title matches
        } else {
          Swal.showValidationMessage(
            `Task title does not match. Did you mean: "${capitalizedTitle}"?`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the task leaving logic
        leaveTaskFromProject(
          {projectId,taskId}) // Replace this with your API call or function
          .then(() => {
            Swal.fire(
              "Success!",
              `You have successfully left the task: <b>${capitalizedTitle}</b>.`,
              "success"
            );
            // setTimeout(() => {
            //   window.location.reload(); // Optional, reload the page
            // }, 2000);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error!",
              "There was an issue leaving the task. Please try again later.",
              "error"
            );
          });
      }
    });
  };

  // currentTeamMember?.forEach((request) => {
  //   request.tasks.forEach((t) => console.log(t));
  // });
  console.log("pp",teamMembers);
  
  return (
    <div
    // key={key}
    >
      {/* <button onClick={refreshPage}>Refresh</button> */}
      {ProjectInfo?.user?._id === userId && (
        <div className="flex  justify-between items-center py-5 md:py-10">
          <div className="flex  space-x-8 text-center">
            <div className="text-gray-700 flex flex-row-reverse md:flex-col">
              <p className="text-[15px] md:text-[20px] font-bold">
                {totalTask}
              </p>
              <div className="graish text-[14px] md:text-[14px] flex items-center space-x-2 pr-3 md:pr-0">
                Total Task
              </div>
            </div>
            <div className="text-gray-700 hidden md:block">
              <p className="text-[15px] md:text-[20px] font-bold">
                {inProgressTasks}
              </p>
              <div className="text-[14px] flex items-center space-x-2">
                <MdOutlineCircle className="mr-1 graish text-[12px] md:text-[14px]" />{" "}
                In Progress
              </div>
            </div>
            <div className="text-gray-700 hidden md:block">
              <p className="text-[15px] md:text-[20px] font-bold">
                {upcomingTasks}
              </p>
              <div className="text-[14px] flex items-center space-x-2">
                <MdOutlineCircle className="mr-1 graish text-[12px] md:text-[14px]" />{" "}
                Upcoming
              </div>
            </div>
            <div className="text-gray-700 hidden md:block">
              <p className="text-[15px] md:text-[20px] font-bold">
                {doneTasks}
              </p>
              <div className="text-[14px] flex items-center space-x-2">
                <MdOutlineCircle className="mr-1 graish text-[12px] md:text-[14px]" />{" "}
                Done
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpenAddTaskModal(true)}
            className=" flex items-center px-2 py-1 md:px-4 md:py-2 bg-gradient-to-r from-[#60f5c6] to-teal-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg focus:outline-none"
          >
            <span className="mr-2">+</span>
            Add New Task
          </button>
        </div>
      )}
      {openAddTaskModal && (
        <AddNewTask
          tasks={tasks}
          openAddTaskModal={openAddTaskModal}
          closeAddTaskModal={closeAddTaskModal}
          projectId={ProjectInfo?._id}
        />
      )}

      {/* card */}
      <div className="flex justify-center md:justify-between items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-3 sm:w-full">
          {tasks?.map((task, index) => {
            const daysLeft = calculateDaysLeft(task.endDate);
            const progress = calculateProgress(task);
            const { progressColor, daysLeftColor, cardBg } =
              colors[index % colors.length];

            return (
              <div
                key={index}
                className={`rounded-3xl shadow-md p-4 w-72 sm:w-64 ${cardBg}`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex justify-between items-center mb-2 relative">
                  <p className="text-gray-500 text-sm">
                    {formatDate(task.startDate)}
                  </p>
                  {/* {ProjectInfo?.user?._id === userId && ( */}
                  <button
                    onClick={() => toggleOption(task)}
                    className="absolute  right-0 top-0"
                  >
                    <HiOutlineDotsVertical />
                  </button>
                  {/* )} */}
                  {isOpenOption &&
                    selectedTask &&
                    selectedTask?._id === task?._id && (
                      <ul className="absolute bg-slate-50 rounded-md text-center  right-2 top-4 shadow-xl w-28">
                        {ProjectInfo?.user?._id === userId && (
                          <>
                            <li
                              onClick={() => toggleUpdateTask(task)}
                              className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2"
                            >
                              {" "}
                              <span>
                                <FaRegPenToSquare className="text-gray-500" />
                              </span>{" "}
                              <span className=""> Edit</span>
                            </li>
                            <li
                              onClick={() => deleteTaskById(task?._id)}
                              className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2"
                            >
                              {" "}
                              <span>
                                <FaRegTrashCan className="text-gray-500" />
                              </span>{" "}
                              <span className=""> Delete</span>
                            </li>
                          </>
                        )}

                      {isMatchingMember  && 
                            (<li
                              key={index}
                              onClick={() => handleLeaveTask(task)}
                              className="hover:bg-gray-100 py-2 cursor-pointer flex items-center pl-5 space-x-2"
                            >
                              <span>
                                <TbLogout className="text-xl text-gray-500" />
                              </span>
                              <span className="">Leave</span>
                            </li>
                          )}
                      </ul>
                    )}
                  {isOpenUpdateModal &&
                    selectedTask &&
                    selectedTask?._id === task?._id && (
                      <UpdateTask
                        projectId={ProjectInfo?._id}
                        progressColor={progressColor}
                        task={task}
                        setIsOpenUpdateModal={setIsOpenUpdateModal}
                        setSelectedTask={setSelectedTask}
                      />
                    )}
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
                  <div className="flex -space-x-3">
                    <>
                      <img
                        src={
                          ProjectInfo?.user?.profilePic
                            ? ProjectInfo?.user?.profilePic
                            : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                        }
                        alt="Profile"
                        className="h-8 xl:w-8 w-8 xl:h-8 rounded-full border-2 border-white"
                      />
                    </>
                    {teamMembers
                      ?.filter((request) =>
                        request.tasks.some((t) => t.title === task.title)
                      )
                      .slice(0, 2) // Show only the first 3 members
                      .map((request, i) => (
                        <div key={i}>
                          <img
                            src={
                              request?.requestedBy?.profilePic
                                ? request?.requestedBy?.profilePic
                                : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                            }
                            alt="Profile"
                            className="h-8 xl:w-8 w-8 xl:h-8 rounded-full border-2 border-white"
                          />
                        </div>
                      ))}
                    {/* Show "+" button if more than 3 members */}
                    {teamMembers?.filter((request) =>
                      request.tasks.some((t) => t.title === task.title)
                    ).length > 2 && (
                      <button
                        className={`w-8 h-8 rounded-full ${progressColor} text-white flex items-center justify-center border-2 border-white`}
                      >
                        +
                        {teamMembers.filter((request) =>
                          request.tasks.some((t) => t.title === task.title)
                        ).length - 2}
                      </button>
                    )}
                  </div>
                  <button
                    className={`${daysLeftColor} text-sm px-4 py-1 rounded-full`}
                  >
                    {daysLeft}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------- Project Owner ---------------------------- */}

      {selectedIndex !== null && (
        <div className="space-y-5 py-9">
          <div>
            <h1 className="gray600 text-[28px] lg:text-[28px] font-bold">
              Task
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-gray-500">
              {" "}
              {tasks[selectedIndex].title}
            </p>
            <p className="text-gray-600 text-xl font-semibold pt-3">
              Description
            </p>
            <p className="text-gray-500 text-lg">
              {" "}
              {tasks[selectedIndex].details}
            </p>
            <p className="text-gray-600 text-xl font-semibold pt-3">
              Coin: Free
            </p>
            <button
              className={`float-right ${colors[selectedIndex].progressColor} text-white px-2 py-1 capitalize rounded-lg`}
            >
              {tasks[selectedIndex].status}
            </button>
          </div>
          {tasks[selectedIndex].subTask?.length !== 0 && (
            <div className="">
              <h1 className="text-xl font-bold text-gray-500  md:pt-5 pb-3">
                Sub Tasks
              </h1>
              <ul className={` grid grid-cols-1 md:grid-cols-2 gap-5`}>
                {tasks[selectedIndex].subTask?.map((sub, i) => (
                  <li
                    key={i}
                    className={`px-3 py-3 flex justify-between items-start shadow-md rounded-xl w-12/12 ${colors[selectedIndex].cardBg}`}
                  >
                    <div className="flex justify-between items-start space-x-4">
                      <div
                        className={` mt-1 w-3 h-3 rounded-full graish text-[14px]`}
                      >
                        {i + 1}.
                      </div>
                      <p className="text-gray-500 w-11/12 text-lg">
                        {sub?.todo}
                      </p>
                    </div>

                    <button
                      className={` ${colors[selectedIndex].progressColor} text-white px-2 py-1 capitalize rounded-lg`}
                    >
                      {sub?.status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* commit button  ProjectInfo?.user?._id !== userId && */}
          {tasks[selectedIndex].title && (
            <div className="pb-3">
              <button
                onClick={() => setIsOpenCommitModal(true)}
                className={`float-right ${colors[selectedIndex].progressColor} text-white text-[18px] px-3 py-1 capitalize rounded-lg mt-10 `}
              >
                Commit
              </button>
              {isOpenCommitModal && (
                <CommitModal
                  isMatchingMember={isMatchingMember}
                  textColor={colors[selectedIndex].textColor}
                  cardBg={colors[selectedIndex].cardBg}
                  buttonColor={colors[selectedIndex].progressColor}
                  borderColor={colors[selectedIndex].borderColor}
                  tasks={tasks[selectedIndex]}
                  userId={userId}
                  createCommit={createCommit}
                  ProjectInfo={ProjectInfo}
                  closeCommitModal={closeCommitModal}
                  isOpenCommitModal={isOpenCommitModal}
                />
              )}
            </div>
          )}
          {/* current task member */}
          {ProjectInfo?.user?._id === userId && (
            <>
              <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
                Current Task Member
              </h1>
              {currentTeamMember?.filter((request) =>
                request.tasks.some(
                  (task) => task.title === tasks[selectedIndex]?.title
                )
              ).length === 0 ? (
                <p className="text-lg font-semibold text-gray-500">
                  No one is working on this task.
                </p>
              ) : (
                <div className="w-[300px] xs:w-[330px] ssm:w-[370px] sm:w-[570px] md:w-[610px] lg:w-full overflow-x-auto ">
                  {/* table head */}
                  <div className="min-w-[600px] md:min-w-[800px]  py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl">
                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-4/12 border-r border-[#C8CBD3]">
                      Name
                    </div>
                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-4/12 border-r border-[#C8CBD3]">
                      Part
                    </div>

                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12 border-r border-[#C8CBD3]">
                      Status
                    </div>
                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12">
                      Manage
                    </div>
                  </div>
                  {/* table data */}
                  {currentTeamMember
                    ?.filter((request) =>
                      request.tasks.some(
                        (task) => task.title === tasks[selectedIndex]?.title
                      )
                    )
                    .map((request, i) => (
                      <div
                        key={i}
                        className="min-w-[600px] md:min-w-[800px] py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl"
                      >
                        <div className="flex justify-start pl-2 text-[14px] md:text-[16px] capitalize w-4/12 border-r border-[#C8CBD3]">
                          <img
                            src={
                              request?.requestedBy?.profilePic
                                ? request?.requestedBy?.profilePic
                                : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                            }
                            alt="Profile"
                            className="h-8 xl:w-10 w-8 xl:h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-semibold text-gray-800 text-[14px] lg:text-[15px] 3xl:text-[19px]">
                              {request?.requestedBy?.name?.firstName}{" "}
                              <span>
                                {request?.requestedBy?.name?.lastName}
                              </span>
                            </div>
                            <div className=" text-gray-500 text-[13px] lg:text-[13px] 3xl:text-[17px]">
                              {request?.requestedBy?.role}
                            </div>
                          </div>
                        </div>
                        <div className="text-[13px] md:text-[16px] 3xl:text-[19px] capitalize text-center w-4/12 border-r border-[#C8CBD3] px-2">
                          {tasks[selectedIndex]?.details.slice(0, 20)}...
                        </div>

                        <div className="text-[13px] md:text-[16px] capitalize text-center w-2/12 border-r border-[#C8CBD3]">
                          <button className="border border-blue-500 capitalize bg-blue-200 text-blue-600 py-1 px-3 rounded-lg text-sm">
                            {request?.status === "Accepted"
                              ? "in progress"
                              : request?.status}
                          </button>
                        </div>
                        <div className="w-1/12 flex justify-center items-center ml-5 space-x-1 md:space-x-2">
                          {request?.status === "Accepted" && (
                            <CiEdit
                              onClick={(e) =>
                                handleUpdateStatusDone(e, request)
                              }
                              className="text-3xl text-blue-600 cursor-pointer"
                            />
                          )}

                          <LuTrash2
                            onClick={() => deleteMember(request?._id)}
                            className="text-xl text-red-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <h1 className="gray600 text-[20px] lg:text-[28px] pt-3 font-bold w-full">
                Task Join Request
              </h1>

              <>
                <div className="w-[300px] xs:w-[330px] ssm:w-[370px] sm:w-[570px] md:w-[610px] lg:w-full overflow-x-auto ">
                  {/* table head */}
                  {/* <div className="min-w-[600px] md:min-w-[800px]  py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl">
                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-4/12 border-r border-[#C8CBD3]">
                      From
                    </div>
                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-4/12 border-r border-[#C8CBD3]">
                      Details
                    </div>

                    <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12">
                      Action
                    </div>
                  </div> */}
                  {/* table data */}
                  {/* {req
                    ?.filter((request) =>
                      request.tasks.some(
                        (task) => task?.title === tasks[selectedIndex]?.title
                      )
                    )
                    .map(
                      (filteredRequest, i) =>
                        filteredRequest && (
                          <div
                            key={i}
                            className="min-w-[500px] md:min-w-[600px] py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl"
                          >
                            <div className="flex justify-center items-center text-[14px] md:text-[16px] capitalize w-4/12 border-r border-[#C8CBD3]">
                              <img
                                src={
                                  filteredRequest.requestedBy?.profilePic
                                    ? filteredRequest.requestedBy?.profilePic
                                    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                                }
                                alt="Profile"
                                className="h-8 xl:w-10 w-8 xl:h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-semibold text-gray-800 text-[14px] lg:text-[15px] 3xl:text-[18px]">
                                  {filteredRequest.requestedBy?.name?.firstName}{" "}
                                  <span>
                                    {
                                      filteredRequest.requestedBy?.name
                                        ?.lastName
                                    }
                                  </span>
                                </div>
                                <div className=" text-gray-500 text-[13px] lg:text-[13px] 3xl:text-[17px]">
                                  {filteredRequest.requestedBy?.role}
                                </div>
                              </div>
                            </div>
                            <p className="w-6/12 border-r-2 pl-2 text-[14px] md:text-[15px] lg:text-[16px] text-center 3xl:text-[19px]">
                              {tasks[selectedIndex]?.details.slice(0, 90)}...
                            </p>

                            <div className="w-1/12 flex justify-center items-center ml-5 space-x-1 md:space-x-2">
                              <img
                                onClick={(e) => handleUpdateStatusAccept(e, i)}
                                src={rightMark}
                                className="h-5 md:h-7"
                              />
                              <img
                                onClick={(e) => handleUpdateStatusReject(e, i)}
                                src={xMark}
                                className="h-5 md:h-7"
                              />
                            </div>
                          </div>
                        )
                    )} */}
                </div>
                {req?.filter((request) =>
                  request.tasks.some(
                    (task) => task?.title === tasks[selectedIndex]?.title
                  )
                ).length === 0 ? (
                  <p className="text-lg font-semibold text-gray-500">
                    No Request Available On This Task.
                  </p>
                ) : (
                  <>
                    <div className="gray600 space-y-6 w-12/12 md:w-full">
                      <div className="w-full py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
                        <div className="text-[15px] md:text-[21px] font-semibold border-r-2 text-center w-4/12 sm:w-3/12">
                          From
                        </div>
                        <div className="text-[15px] md:text-[21px] font-semibold border-r-2 text-center w-2/12 sm:w-7/12">
                          Details
                        </div>
                        <div className="text-[15px] md:text-[21px] w-3/12 sm:w-2/12">
                          <p className="font-semibold text-center">Action</p>
                        </div>
                      </div>
                    </div>

                    {req
                      ?.filter((request) =>
                        request.tasks.some(
                          (task) => task?.title === tasks[selectedIndex]?.title
                        )
                      )
                      .map(
                        (filteredRequest, i) =>
                          filteredRequest && (
                            <div
                              key={i}
                              className="w-full px-1 py-4 flex my-5 justify-between items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
                            >
                              <div className="flex justify-start pl-2   space-x-1 text-[16px] md:text-lg border-r-2 text-center w-4/12 sm:w-3/12">
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
                                    {
                                      filteredRequest.requestedBy?.name
                                        ?.firstName
                                    }{" "}
                                    {
                                      filteredRequest.requestedBy?.name
                                        ?.lastName
                                    }
                                  </p>
                                </div>
                              </div>
                              <p>
                                {tasks[selectedIndex]?.details.slice(0, 90)}...
                              </p>

                              <div className="flex justify-center xs:space-x-2 items-center text-[16px] md:text-lg w-2/12 sm:w-2/12">
                                <img
                                  onClick={(e) =>
                                    handleUpdateStatusAccept(e, i)
                                  }
                                  src={rightMark}
                                  className="h-5 md:h-7"
                                />
                                <img
                                  onClick={(e) =>
                                    handleUpdateStatusReject(e, i)
                                  }
                                  src={xMark}
                                  className="h-5 md:h-7"
                                />
                              </div>
                            </div>
                          )
                      )}
                  </>
                )}
              </>
            </>
          )}
        </div>
      )}

      {/* ----------------------------------- Project Worker ---------------------------- */}
    </div>
  );
};

export default TaskTab;

////////////////////////////////////////////////////////////////////////

//   <p className="text-[50px]">Static</p>
//   {/* current task member */}
//   {selectedIndex !== null && (
//     <>
//       <div className="space-y-5 py-9">
//         <div>
//           <h1 className="text-[20px] font-bold">Task</h1>
//           <p className="text-lg font-semibold text-gray-800">
//             {" "}
//             {tasks[selectedIndex].title}
//           </p>
//           <p className="text-gray-800 font-semibold pt-3">Description</p>
//           <p className="text-gray-500 text-lg">
//             {" "}
//             {tasks[selectedIndex].details}
//           </p>
//           <button
//             onClick={(e) => {
//               const taskStatus = tasks[selectedIndex].status;
//               if (taskStatus === "pending") {
//                 handleUpdateTaskStatus(e, selectedIndex);
//               } else if (taskStatus === "completed") {
//                 Swal.fire({
//                   icon: "info",
//                   title: "Task Completed",
//                   text: "You already completed the task.",
//                 });
//               }
//             }}
//             className={`float-right ${colors[selectedIndex].progressColor} text-white px-2 py-1 capitalize rounded-lg`}
//           >
//             {tasks[selectedIndex].status}
//           </button>
//         </div>
//         <div>
//           <h1 className="text-lg font-semibold text-gray-800 pt-5 pb-3">
//             Sub Tasks
//           </h1>
//           <ul className={` grid grid-cols-2 gap-5`}>
//             {tasks[selectedIndex].subTask?.map((sub, i) => (
//               <li
//                 key={i}
//                 className={`px-3 py-3 flex justify-between items-start shadow-md rounded-xl w-12/12 ${colors[selectedIndex].cardBg}`}
//               >
//                 <div className="flex justify-between items-center">
//                   <MdOutlineCircle
//                     className={`${colors[selectedIndex].progressColor} rounded-full mr-1 graish text-[14px]`}
//                   />
//                   <p className="text-gray-500 text-lg">{sub?.todo}</p>
//                 </div>
//
//                 <button
//                   onClick={(e) => handleUpdateSubTaskStatus(e, sub)}
//                   className={` ${colors[selectedIndex].progressColor} text-white px-2 py-1 capitalize rounded-lg`}
//                 >
//                   {sub?.status}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//
//       {/* task with checkbox */}
//       {/* <div className="py-4">
//           <h2 className="text-lg font-semibold text-gray-800">
//             {tasks[selectedIndex].title}
//           </h2>
//
//           <div className="mt-2">
//             <p className="text-gray-800 font-semibold">Description</p>
//             <p className="text-gray-500">{tasks[selectedIndex].details}</p>
//           </div>
//
//           <div className="mt-2">
//             <p className="text-gray-800 font-semibold">Deadline</p>
//             <p className="text-gray-500">
//               {formatDate(tasks[selectedIndex].endDate)}
//             </p>
//           </div>
//           <ul className="list-none mt-2 space-y-2">
//             {tasks[selectedIndex]?.subTask?.map((t) => (
//               <li key={t?.todo}>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     className="form-checkbox h-5 w-5 text-blue-600"
//                   />
//                   <span className="text-gray-700">{t?.todo}</span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div> */}
//
//       <div className=" gray600 space-y-6 w-12/12 md:w-full">
//         <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
//           Current team member
//         </h1>
//         <div className="w-full py-4 flex my-5  items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
//           <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-4/12 sm:w-3/12 ">
//             Name
//           </div>
//           <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-3/12 sm:w-4/12 ">
//             Part
//           </div>
//           <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-2/12 sm:w-2/12 ">
//             Status
//           </div>
//
//           <div className="text-[15px]  md:text-[21px] w-3/12 sm:w-3/12">
//             <p className="font-semibold text-center ">Manage</p>
//           </div>
//         </div>
//         {/* table */}
//         {currentTeamMember
//           ?.filter((request) =>
//             request.tasks.some(
//               (task) => task.title === tasks[selectedIndex]?.title
//             )
//           )
//           .map(
//             (request, i) =>
//               request && (
//                 <div
//                   key={i}
//                   className="w-full px-1 py-4  flex my-5 justify-between items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
//                 >
//                   <div className="flex justify-center items-center space-x-1 text-[16px] md:text-lg   border-r-2  text-center w-4/12 sm:w-3/12">
//                     <img
//                       src={
//                         request?.requestedBy?.profilePic ||
//                         "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                       }
//                       className="w-8 h-8 md:w-12 md:h-12 border border-black rounded-full"
//                       loading="lazy"
//                       alt=""
//                     />
//                     <div className="pl-1">
//                       <p className="text-start text-[15px] font-bold capitalize md:pt-0">
//                         {request?.requestedBy?.name?.firstName}{" "}
//                         {request?.requestedBy?.name?.lastName}
//                       </p>
//                       <p className="text-start text-[14px]">
//                         {request?.requestedBy?.role}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="capitalize text-[16px] md:text-[18px] border-r-2  text-center sm:w-4/12">
//                     {tasks[selectedIndex]?.details.slice(0, 20)}
//                   </div>
//                   <div className="text-[16px] md:text-lg   border-r-2  text-center w-2/12 sm:w-2/12 ">
//                     <button className="border border-blue-500 bg-blue-200 text-blue-600 py-1 px-3 rounded-lg text-sm">
//                       In Progress
//                     </button>
//                   </div>
//
//                   <div className="flex justify-center xs:space-x-2 items-center text-[16px] md:text-lg   w-2/12 sm:w-3/12 ">
//                     <CiEdit
//                       onClick={(e) => handleUpdateStatusDone(e, i)}
//                       className="text-3xl text-blue-500"
//                     />
//                     <LuTrash2
//                       onClick={() => deleteMember(request?._id)}
//                       className="text-xl text-red-500"
//                     />
//                   </div>
//                 </div>
//               )
//           )}
//       </div>
//       {/* task join request */}
//       <div className=" gray600 space-y-6 w-12/12 md:w-full">
//         <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
//           Task Join Request
//         </h1>
//         <div className="w-full py-4 flex my-5  items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
//           <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-4/12 sm:w-3/12 ">
//             From
//           </div>
//
//           <div className="text-[15px] md:text-[21px]  font-semibold border-r-2 text-center w-2/12 sm:w-7/12 ">
//             Details
//           </div>
//
//           <div className="text-[15px]  md:text-[21px] w-3/12 sm:w-2/12">
//             <p className="font-semibold text-center ">Action</p>
//           </div>
//         </div>
//
//         {/* table */}
//       </div>
//
//       {req
//         ?.filter((request) =>
//           request.tasks.some(
//             (task) => task.title === tasks[selectedIndex]?.title
//           )
//         )
//         .map(
//           (filteredRequest, i) =>
//             filteredRequest && (
//               <div
//                 key={i}
//                 className="w-full px-1 py-4 flex my-5 justify-between items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
//               >
//                 <div className="flex justify-center items-center space-x-1 text-[16px] md:text-lg border-r-2 text-center w-4/12 sm:w-3/12">
//                   <img
//                     src={
//                       filteredRequest.profileImagec ||
//                       "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                     }
//                     className="w-8 h-8 md:w-10 md:h-10 border border-black rounded-full"
//                     loading="lazy"
//                     alt=""
//                   />
//                   <div className="pl-1">
//                     <p className="text-start text-[17px] font-bold capitalize md:pt-0">
//                       {filteredRequest.requestedBy?.name?.firstName}{" "}
//                       {filteredRequest.requestedBy?.name?.lastName}
//                     </p>
//                   </div>
//                 </div>
//                 <p>{tasks[selectedIndex]?.details.slice(0, 90)}...</p>
//                 {/* <div
//       className=""
//       dangerouslySetInnerHTML={{
//         __html: filteredRequest?.details?.slice(0, 100) || '',
//       }}
//     />  */}
//
//                 <div className="flex justify-center xs:space-x-2 items-center text-[16px] md:text-lg w-2/12 sm:w-2/12 ">
//                   <CiEdit className="text-3xl text-blue-500" />
//                   <LuTrash2 className="text-xl text-red-500" />
//                 </div>
//               </div>
//             )
//         )}
//     </>
//   )}
//
//   {/* for worker */}
//   {filteredMyself?.length > 0 && (
//     <div className="p-6">
//       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//         For Project Worker
//       </h3>
//
//       {/* <div className="text-gray-600 mb-4">
//           <span className="font-semibold">Subtask:</span>
//           <ul className="list-none mt-2 space-y-2">
//             <li>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                 />
//                 <span className="text-gray-700">
//                   Setup the user authentication system
//                 </span>
//               </label>
//             </li>
//             <li>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                 />
//                 <span className="text-gray-700">
//                   Setup the user authentication system
//                 </span>
//               </label>
//             </li>
//             <li>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                 />
//                 <span className="text-gray-700">
//                   Setup the user authentication system
//                 </span>
//               </label>
//             </li>
//           </ul>
//           <div className="mt-4 [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] text-white py-1 px-4 rounded-[10px] float-right">
//             Commit
//           </div>
//         </div> */}
//
//       {/* <div className="p-6 bg-[#e9f2f9] rounded-lg shadow-md">
//         <div className=" p-6">
//           <form onSubmit={handleSubmit}>
//             <div className="flex items-center justify-between mb-4">
//               <label className="block text-gray-700 font-bold mb-2">
//                 Message :
//               </label>
//               <input
//                 type="text"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 className="w-10/12 p-3 border border-gray-200 rounded-md bg-[#e4ecf7] outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
//                 placeholder="Enter your message"
//               />
//             </div>
//             <div className="flex items-center space-x-20 mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Media :
//               </label>
//               <input
//                 type="file"
//                 onChange={handlePreviewImage}
//                 className="hidden"
//                 id="mediaUpload"
//               />
//               <label
//                 htmlFor="mediaUpload"
//                 className="p-3 [background:linear-gradient(-44.24deg,#87aaff,#447afc)] text-white rounded-md flex items-center space-x-2 cursor-pointer"
//               >
//                 <svg
//                   width="29"
//                   height="23"
//                   viewBox="0 0 29 23"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M14.3448 21.7148V11.3779M14.3448 11.3779L11.0222 14.8235M14.3448 11.3779L17.6674 14.8235M6.37063 19.992C3.43462 19.992 1.0545 17.5678 1.0545 14.5775C1.0545 12.1133 2.67058 10.0337 4.88209 9.37803C4.97606 9.35012 5.0416 9.26255 5.0416 9.16288C5.0416 4.67729 8.61176 1.04102 13.0158 1.04102C17.4198 1.04102 20.99 4.67729 20.99 9.16288C20.99 9.24882 21.0691 9.31261 21.1515 9.29386C21.5272 9.20806 21.9179 9.16288 22.319 9.16288C25.255 9.16288 27.6351 11.587 27.6351 14.5775C27.6351 17.5678 25.255 19.992 22.319 19.992"
//                     stroke="white"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//                 <span>Upload</span>
//               </label>
//             </div>
//             <div className="flex items-center justify-between mb-4">
//               <label className="block text-gray-700 font-semibold mb-2">
//                 External Link :
//               </label>
//               <input
//                 type="text"
//                 name="externalLink"
//                 value={formData.externalLink}
//                 onChange={handleInputChange}
//                 className="w-10/12 p-3 border border-gray-200 rounded-md bg-[#e4ecf7] outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
//                 placeholder="Enter the link"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-40 float-right bg-gradient-to-r [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] text-white py-3 px-2 rounded-md"
//             >
//               Upload Commit
//             </button>
//           </form>
//         </div>
//       </div> */}
//     </div>
//   )}
