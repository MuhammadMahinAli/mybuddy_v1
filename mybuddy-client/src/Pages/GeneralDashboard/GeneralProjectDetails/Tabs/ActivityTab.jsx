/* eslint-disable react/prop-types */

import { IoQrCodeOutline } from "react-icons/io5";
import StatusDropdown from "../StatusDropdown";
import Swal from "sweetalert2";
import { useGetCommitByProjectQuery } from "../../../../features/commit/commitApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import AllCommit from "./CommitTables/AllCommit";
import MyCommit from "./CommitTables/MyCommit";
import { FiUser, FiUsers } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";
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
      (commit) => commit.commitBy._id.toString() === userId
    );
  };

  const userFilteredCommits = filterCommitsByUserId();

  const downloadPDF = () => {
    const table = document.getElementById("table-to-pdf");

    // Remove responsive styles and set a fixed width
    table.style.minHeight = "auto";
    table.style.width = "980px";
    table.style.maxWidth = "980px";

    // Remove all responsive classes
    table.className = table.className.replace(/min-h-\[.*?\]/g, "");
    table.className = table.className.replace(/w-\[.*?\]/g, "");
    table.className = table.className.replace(/md:w-\[.*?\]/g, "");
    table.className = table.className.replace(/lg:w-\[.*?\]/g, "");
    table.className = table.className.replace(/xl:w-\[.*?\]/g, "");
    table.className = table.className.replace(/2xl:w-\[.*?\]/g, "");
    table.className = table.className.replace(/3xl:w-\[.*?\]/g, "");
    table.className = table.className.replace(/4xl:w-\[.*?\]/g, "");

    html2canvas(table, {
      width: 1030, // Force canvas width to 1000px
      scale: 2, // Increase scale for better resolution
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = 600; // Fixed width for the PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const margin = 5;
      const xOffset = (pageWidth - imgWidth / 2.83) / 2 + margin; // Center the table horizontally on the page (2.83 factor converts px to mm)
      let yOffset = 10; // Top margin

      if (imgHeight > pdf.internal.pageSize.getHeight() - 2 * margin) {
        let remainingHeight = imgHeight;
        while (remainingHeight > 0) {
          pdf.addImage(
            imgData,
            "PNG",
            xOffset,
            yOffset,
            imgWidth / 2.83,
            Math.min(
              imgHeight / 2.83,
              pdf.internal.pageSize.getHeight() - 2 * margin
            )
          );
          remainingHeight -= pdf.internal.pageSize.getHeight() - 2 * margin;
          if (remainingHeight > 0) pdf.addPage();
        }
      } else {
        pdf.addImage(
          imgData,
          "PNG",
          xOffset,
          yOffset,
          imgWidth / 2.83,
          imgHeight / 2.83
        );
      }

      pdf.save("table.pdf");

      // Restore original styles
      table.style.minHeight = "";
      table.style.width = "";
      table.style.maxWidth = "";
      table.className = table.className.replace(
        /min-h-\[.*?\]/g,
        "min-h-[800px]"
      );
      table.className = table.className.replace(/w-\[.*?\]/g, "w-[300px]");
      table.className = table.className.replace(
        /md:w-\[.*?\]/g,
        "md:w-[630px]"
      );
      table.className = table.className.replace(
        /lg:w-\[.*?\]/g,
        "lg:w-[800px]"
      );
      table.className = table.className.replace(
        /xl:w-\[.*?\]/g,
        "xl:w-[850px]"
      );
      table.className = table.className.replace(
        /2xl:w-\[.*?\]/g,
        "2xl:w-[900px]"
      );
      table.className = table.className.replace(
        /3xl:w-\[.*?\]/g,
        "3xl:w-[950px]"
      );
      table.className = table.className.replace(
        /4xl:w-\[.*?\]/g,
        "4xl:w-[1080px]"
      );
    });
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

  return (
    <div>
      <div className="xl:p-6 bg-gray-100 rounded-md">
        <div className="flex justify-between items-center pt-3 ">
          <h2 className="text-xl font-semibold text-gray-800">Activity</h2>
          <div className="flex items-center space-x-3 relative">
            <button
              onClick={toggleAllCommit}
              onMouseEnter={()=>setShowAllCommitAlert(true)}
              onMouseLeave={()=>setShowAllCommitAlert(false)}
              className="p-2 rounded-md bg-[#e9f2f9]"
            >
              {/* <IoQrCodeOutline className="text-2xl" /> */}
              <FiUsers className="text-2xl text-gray-700" />
            </button>
            {
                showAllCommitAlert &&
                <div className="w-[120px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-10 -left-10 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                All Activity
              </div>
              }
            <button
              onClick={toggleMyCommit}
              onMouseEnter={()=>setShowMyCommitAlert(true)}
              onMouseLeave={()=>setShowMyCommitAlert(false)}
              className="p-2 rounded-md bg-[#e9f2f9]"
            >
              <FiUser className="text-2xl text-gray-700" />
              {/* <svg
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
              </svg> */}
            </button>
            {
                showMyCommitAlert &&
                <div className="w-[120px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-10 left-1 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                My Activity
              </div>
              }
            <button
              onClick={downloadPDF}
              onMouseEnter={()=>setShowDownload(true)}
              onMouseLeave={()=>setShowDownload(false)}
              className="cursor-pointer p-2 rounded-md bg-[#e9f2f9]"
            >
              <BsDownload className="text-2xl text-gray-700" />
              {/* <svg
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
              </svg> */}
            </button>
            {
                showDownload &&
                <div className="w-[170px]  space-x-4 px-4 py-2 rounded-[50px] absolute top-10 right-2 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
               Download Activity
              </div>
              }
          </div>
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
