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
