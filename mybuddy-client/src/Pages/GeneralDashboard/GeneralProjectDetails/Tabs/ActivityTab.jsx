/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import { useGetCommitByProjectQuery } from "../../../../features/commit/commitApi";
import { useState } from "react";
import AllCommit from "./CommitTables/AllCommit";
import MyCommit from "./CommitTables/MyCommit";
import { FiUser, FiUsers } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";

const ActivityTab = ({
  commits,
  getAllCommit,
  filteredMyself,
  formatDate,
  projectOwner,
  ProjectInfo,
  userId,
}) => {
  const [openAllCommit, setOpenAllCommit] = useState(true);
  const [openMyCommit, setOpenMyCommit] = useState(false);
  const [showAllCommitAlert, setShowAllCommitAlert] = useState(false);
  const [showMyCommitAlert, setShowMyCommitAlert] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const toggleAllCommit = () => {
    setOpenAllCommit(true);
    setOpenMyCommit(false);
  };
  const toggleMyCommit = () => {
    setOpenAllCommit(false);
    setOpenMyCommit(true);
  };
  //------------- get recieve project request
  const { data: getCommitByProject } = useGetCommitByProjectQuery(
    ProjectInfo?._id
  );
  const commitOfProject = getCommitByProject?.data;

  // Utility function for filtering commits
  const filterCommitsByUserId = () => {
    return commitOfProject?.filter(
      (commit) => commit?.commitBy?._id.toString() === userId
    );
  };

  const userFilteredCommits = filterCommitsByUserId();

  const handleDownload = () => {
    const currentActivity = openAllCommit === true? commitOfProject : userFilteredCommits
    // Process and flatten the data for Excel
    const processedData = currentActivity?.map((item) => {
      return {
        "Commit ID": item._id,
        "Commit By ID": item.commitBy._id,
        "Commit By Name": `${item.commitBy.name.firstName} ${item.commitBy.name.lastName}`,
        "Commit By Role": item.commitBy.role || "Not mentioned",
        "Commit By Profile Picture": item.commitBy.profilePic || "Not Available",
        "Project ID": item.project._id,
       "Message": item.message,
       "Media": item.media.length ? item.media.join(", ") : "N/A",
        "External Link": item.externalLink || "N/A",
        "Status": item.status || "N/A",
        "Decline Message": item.declineMessage || "N/A",
        "Commited Date": new Date(item.createdAt).toLocaleString(),
        "Completed Task": item.completedTask?.task || "No Task",
        "Completed SubTasks": item.completedTask?.subTask?.length
          ? item.completedTask.subTask.join(", ")
          : "No SubTasks",
      };
    });

    // Convert the processed data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(processedData);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All-activity");

    // Write the workbook and trigger the download
    XLSX.writeFile(workbook, `Activity-history.xlsx`);
  };

  const handleCommitMessage = (message, completedTask) => {
    if (!message) {
      Swal.fire({
        title: "No message Found",
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      // Extract task and subtasks from completedTask
      const taskTitle = completedTask?.task || "No task completed";
      const subTasks = completedTask?.subTask || [];

      // Format subtasks into an ordered list
      const subTaskList = subTasks.length
        ? `<ul>${subTasks
            .map((sub, index) => `<li>${index + 1}. ${sub}</li>`)
            .join("")}</ul>`
        : "<p>No subtasks completed</p>";

      // Construct the HTML content for the alert
      const alertHtml = `
      <strong>Task:</strong>
        <p> ${taskTitle}</p>
        <p><strong>Sub Task:</strong></p>
        ${subTaskList}
      `;
      Swal.fire({
        title: message,
        html: alertHtml,
        icon: "info",
        confirmButtonText: "Close",
      });
    }
  };

  const handleEmptyMedia = (media) => {
    console.log(media);
    if (media?.length === 0) {
      Swal.fire({
        title: "No Media Found",
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      const limitedMedia = media.slice(0, 10); // Limit to 10 images
      const rows = [limitedMedia.slice(0, 5), limitedMedia.slice(5, 10)]; // Split into two rows

      const htmlContent = rows
        .map(
          (row, rowIndex) =>
            `<div style="display: flex; justify-content: center; margin-bottom: 10px;">` +
            row
              .map(
                (image, index) =>
                  `<label style="margin: 0 10px;">
                      <input type="radio" name="imageSelect" value="${image}" style="margin-right: 5px;" />
                      Image ${rowIndex * 5 + index + 1}
                    </label>`
              )
              .join("") +
            `</div>`
        )
        .join("");

      Swal.fire({
        title: "Select an image to view",
        icon: "info",
        html: htmlContent,
        showCancelButton: true,
        confirmButtonText: "View Image",
        preConfirm: () => {
          const selectedImage = document.querySelector(
            'input[name="imageSelect"]:checked'
          );
          if (!selectedImage) {
            Swal.showValidationMessage("You need to select an image!");
            return null;
          }
          return selectedImage.value;
        },
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          window.open(result.value, "_blank");
        }
      });
    }
  };
  const handleEmptyExternalLink = (externalLink) => {
    if (!externalLink) {
      Swal.fire({
        title: "No External Link Found",
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      window.open(externalLink, "_blank");
    }
  };

  console.log(commitOfProject);

  return (
    <div>
      <div className="xl:p-6 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center pt-3 ">
          <h2 className="text-xl font-semibold text-gray-800">Activity</h2>
          {userId !== "67396ba011eb8789052c3cfd" && (
            <div className="flex items-center space-x-3 relative">
              <button
                onClick={toggleAllCommit}
                onMouseEnter={() => setShowAllCommitAlert(true)}
                onMouseLeave={() => setShowAllCommitAlert(false)}
                className="p-2 rounded-md bg-[#e9f2f9]"
              >
                <FiUsers className="text-2xl text-gray-700" />
              </button>
              {showAllCommitAlert && (
                <div className="w-[120px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-10 -left-10 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                  All Activity
                </div>
              )}
              <button
                onClick={toggleMyCommit}
                onMouseEnter={() => setShowMyCommitAlert(true)}
                onMouseLeave={() => setShowMyCommitAlert(false)}
                className="p-2 rounded-md bg-[#e9f2f9]"
              >
                <FiUser className="text-2xl text-gray-700" />
              </button>
              {showMyCommitAlert && (
                <div className="w-[120px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-10 left-1 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                  My Activity
                </div>
              )}
              <button
                onClick={handleDownload}
                onMouseEnter={() => setShowDownload(true)}
                onMouseLeave={() => setShowDownload(false)}
                className="cursor-pointer p-2 rounded-md bg-[#e9f2f9]"
              >
                <BsDownload className="text-2xl text-gray-700" />
              </button>
              {showDownload && (
                <div className="w-[170px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-10 right-2 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                  Download Activity
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <div
          id="table-to-pdf"
          className="min-h-[800px] w-[300px] md:w-[630px] lg:w-[800px] xl:w-[850px] 2xl:w-[900px] 3xl:w-[950px] 4xl:w-[1080px] overflow-x-auto "
        >
          {openAllCommit && (
            <AllCommit
              commitOfProject={commitOfProject}
              handleCommitMessage={handleCommitMessage}
              handleEmptyMedia={handleEmptyMedia}
              formatDate={formatDate}
              handleEmptyExternalLink={handleEmptyExternalLink}
              filteredMyself={filteredMyself}
              getAllCommit={getAllCommit}
              projectOwner={projectOwner}
              ProjectInfo={ProjectInfo}
              userId={userId}
            />
          )}
          {openMyCommit && (
            <MyCommit
              userFilteredCommits={userFilteredCommits}
              handleCommitMessage={handleCommitMessage}
              handleEmptyMedia={handleEmptyMedia}
              formatDate={formatDate}
              handleEmptyExternalLink={handleEmptyExternalLink}
              filteredMyself={filteredMyself}
              getAllCommit={getAllCommit}
              projectOwner={projectOwner}
              ProjectInfo={ProjectInfo}
              userId={userId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
