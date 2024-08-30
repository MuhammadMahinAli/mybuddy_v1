

/* eslint-disable react/prop-types */

import { useState } from "react";
import Swal from "sweetalert2";
import { useUpdateCommitStatusMutation } from "../../../features/commit/commitApi";
import { useUpdateProjectStatusMutation } from "../../../features/project/projectApi";

const StatusDropdown = ({
  commit,
  commitId,
  getAllCommit,
  ProjectInfo,
  userId,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [updateCommitStatus] = useUpdateCommitStatusMutation();
  const [updateProjectStatus] = useUpdateProjectStatusMutation();
  const capitalizeText = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const completedTask = commit?.completedTask;
  console.log("completedtask", commit?.completedTask);

  const handleDeclineMessageClick = () => {
    if (commit?.status === "Declined") {
      Swal.fire({
        title: "Decline Message",
        text: capitalizeText(commit?.declineMessage || "No message provided"),
        icon: "info",
        confirmButtonText: "Close",
      });
    }
  };

  const handleStatusChange = async (status) => {
    const selectedTask = getAllCommit?.data.find(
      (commit) => commit._id === commitId
    );

    if (selectedTask) {
      let swalOptions = {
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update status!",
      };

      if (status === "Declined") {
        swalOptions = {
          ...swalOptions,
          text: "Please provide a reason for declining:",
          input: "text",
          inputPlaceholder: "Enter your reason",
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }
          },
        };
      } else {
        swalOptions.text = `Does this member's task deserve to be marked as "${status}"?`;
      }

      Swal.fire(swalOptions).then(async (result) => {
        if (result.isConfirmed) {
          const declineMessage =
            status === "Declined" ? result.value : "Your Task Is Completed";

          const postData = {
            status,
            declineMessage,
          };

          try {
            await updateCommitStatus({
              id: selectedTask._id,
              data: postData,
            }).unwrap();

            Swal.fire({
              icon: "success",
              title: "Status Updated",
              text: `You have successfully updated the status to "${status}".`,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });

            setTimeout(() => {
              window.location.reload();
            }, 2500);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Failed to Update",
              text: "There was an error updating the status.",
            });
            console.error(error);
          }
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };

  const handleTaskCompletion = async (e, status) => {
    e.preventDefault();
    const selectedProject = ProjectInfo?._id;
    const selectedTask = getAllCommit?.data.find(
      (commit) => commit._id === commitId
    );

    if (selectedProject) {
      let swalOptions = {
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update status!",
      };

      if (status === "Declined") {
        swalOptions = {
          ...swalOptions,
          text: "Please provide a reason for declining:",
          input: "text",
          inputPlaceholder: "Enter your reason",
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }
          },
        };
      } else {
        swalOptions.text = `Does this member's task deserve to be marked as "${status}"?`;
      }

      Swal.fire(swalOptions).then(async (result) => {
        if (result.isConfirmed) {
          const declineMessage = result.value || "";
          const postData = {
            status,
            ...(status === "Declined" && { declineMessage }),
          };

          try {
            console.log({ id: selectedProject, data: postData });

            // Call your update service here to update the project status
            await updateCommitStatus({
              id: selectedTask._id,
              data: postData,
            }).unwrap();
            await updateProjectStatus({
              projectId: selectedProject,
              completedTask: completedTask,
            }).unwrap();

            Swal.fire({
              icon: "success",
              title: "Status Updated",
              text: `You have successfully updated the status to "${status}".`,
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });

            setTimeout(() => {
              window.location.reload();
            }, 2500);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Failed to Update",
              text: "There was an error updating the project status.",
            });
            console.error(error);
          }
        }
      });
    } else {
      console.log("No project found for the selected project ID.");
    }
  };

  
  return (
    <td className="px-4 py-4">
      {ProjectInfo?.user?._id === userId ? (
        <>
          <span
            className={`border py-1 px-3 rounded-full text-sm cursor-pointer ${
              commit?.status === "Approved"
                ? "border-green-500 text-green-600"
                : commit?.status === "Declined"
                ? "border-red-500 text-red-600"
                : "border-blue-500 text-blue-600"
            }`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {commit?.status === "Pending" ? "Select" : commit?.status}
          </span>
          {showDropdown && (
            <div className="relative pt-1">
              <ul className="absolute bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => handleTaskCompletion(e, "Approved")}
                >
                  Approve
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStatusChange("Declined")}
                >
                  Decline
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <span
          onClick={handleDeclineMessageClick}
          className={`border py-1 px-3 rounded-full text-sm cursor-pointer ${
            commit?.status === "Approved"
              ? "border-green-500 text-green-600"
              : commit?.status === "Declined"
              ? "border-red-500 text-red-600"
              : "border-blue-500 text-blue-600"
          }`}
        >
          {commit?.status}
        </span>
      )}
    </td>
  );
};

export default StatusDropdown;
