/* eslint-disable react/prop-types */

import { IoQrCodeOutline } from "react-icons/io5";
import StatusDropdown from "../StatusDropdown";
import Swal from "sweetalert2";
import { useGetCommitByProjectQuery } from "../../../../features/commit/commitApi";

const ActivityTab = ({
  commits,
  getAllCommit,
  filteredMyself,
  formatDate,
  projectOwner,
  ProjectInfo,
  userId,
}) => {
  //------------- get recieve project request
  const { data: getCommitByProject } = useGetCommitByProjectQuery(
    ProjectInfo?._id
  );
  const commitOfProject = getCommitByProject?.data;

  const handleCommitMessage = (message, completedTask) => {
    if (!message) {
      Swal.fire({
        title: "No message Found",
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      const taskTitles = completedTask?.map(t => t.taskTitle).join(', ') || "No tasks completed";
      
      Swal.fire({
        title: message,
        html: `<p><strong>Completed Tasks:</strong> ${taskTitles}</p>`,
        icon: "info",
        confirmButtonText: "Close",
      });
    }
  };
  
  const handleEmptyMedia = (media) => {
    if (!media) {
      Swal.fire({
        title: "No Media Found",
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      window.open(media, "_blank");
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
      </div>
      {commitOfProject?.length === 0 ? (
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {` No Commit Available To Present Right Now.`}
        </h3>
      ) : (
        <div className="min-h-screen w-[300px] md:w-[630px] lg:w-[800px] xl:w-[850px] 2xl:w-[900px] 3xl:w-[950px] 4xl:w-[1080px] overflow-x-auto ">
          {/* table head */}
          <div className="min-w-[900px] md:min-w-[900px]  py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl">
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-[120px] border-r border-[#C8CBD3]">
              Serial No.
            </div>
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-3/12 border-r border-[#C8CBD3]">
              Name
            </div>
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-3/12 border-r border-[#C8CBD3]">
              Message
            </div>
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-1/12 border-r border-[#C8CBD3]">
              Media
            </div>
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-1/12 border-r border-[#C8CBD3]">
              Link
            </div>
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12 border-r border-[#C8CBD3]">
              Date
            </div>
            <div className="text-[14px] md:text-[16px] font-semibold text-center w-2/12">
              Action
            </div>
          </div>
          {/* table data */}
          {commitOfProject?.map((commit, i) => (
            <div
              key={i}
              className="min-w-[900px] md:min-w-[900px] py-4 flex my-5 items-center bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px) rounded-xl"
            >
              <div className="text-[13px] md:text-[16px] capitalize text-center w-[120px] border-r border-[#C8CBD3]">
                #{commit?._id?.slice(-4)}
              </div>
              <div className="flex items-centertext-[14px] md:text-[16px] capitalize w-3/12 border-r border-[#C8CBD3]">
                <img
                  src={
                    commit?.commitBy?.profilePic
                      ? commit?.commitBy?.profilePic
                      : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                  }
                  alt="Profile"
                  className="h-8 xl:w-10 w-8 xl:h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-800 text-[14px] lg:text-[15px]">
                    {commit?.commitBy?.name?.firstName}{" "}
                    <span>{commit?.commitBy?.name?.lastName}</span>
                  </div>
                  <div className=" text-gray-500 text-[13px] lg:text-[13px]">
                    {commit?.commitBy?.role}
                  </div>
                </div>
              </div>
              <div onClick={()=>handleCommitMessage(commit?.message,commit?.completedTask)} className="cursor-pointer text-[13px] md:text-[16px] capitalize text-center w-3/12 border-r border-[#C8CBD3] px-2">
                {commit?.message.slice(0, 20)}...
              </div>
              <div
                onClick={() => handleEmptyMedia(commit?.media)}
                className="flex justify-center w-1/12 border-r border-[#C8CBD3]"
              >
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
              </div>
              <div
                onClick={() => handleEmptyExternalLink(commit?.externalLink)}
                className="flex justify-center w-1/12 border-r border-[#C8CBD3]"
              >
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
              </div>
              <div className="text-[13px] md:text-[16px] capitalize text-center w-2/12 border-r border-[#C8CBD3]">
                {formatDate(commit?.createdAt)}
              </div>
              <div className="text-[13px] md:text-[16px] capitalize text-center w-2/12 flex justify-center items-center">
                <StatusDropdown
                  filteredMyself={filteredMyself}
                  commit={commit}
                  commitId={commit?._id}
                  getAllCommit={getAllCommit}
                  projectOwner={projectOwner}
                  ProjectInfo={ProjectInfo}
                  userId={userId}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/**********************************************   */}
      {/* <div className="xl:p-6 bg-gray-100 rounded-md">
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
       
        {commitOfProject?.map((commit, i) => (
          <tr
            key={i}
            className="w-full px-1 py-4  flex my-5 justify-between items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
          >
            <td className="bg-red-400 px-1 py-4 text-gray-800">
              #{commit?._id?.slice(-4)}
            </td>
            <td className="bg-red-400 px-1 py-4 flex items-center">
              <img
                src={
                  commit?.commitBy?.profilePic
                    ? commit?.commitBy?.profilePic
                    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                }
                alt="Profile"
                className="lg:h-8 xl:w-10 lg:w-8 xl:h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800 lg:text-[15px]">
                  {commit?.commitBy?.name?.firstName}
                </div>
                <div className="text-sm text-gray-500 lg:text-[13px]">
                  {commit?.commitBy?.role}
                </div>
              </div>
            </td>
            <td className="bg-red-400 px-1 py-4 text-gray-800 lg:text-[15px]">{commit?.message.slice(0,20)}...</td>
            <td
              onClick={() => handleEmptyMedia(commit?.media)}
              className="px-4 py-4"
            >
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
            <td
              onClick={() => handleEmptyExternalLink(commit?.externalLink)}
              className="px-4 py-4"
            >
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
            <td className="bg-red-400 px-4 py-4 text-gray-800">{formatDate(commit?.createdAt)}</td>
            <td className="bg-red-400 px-4 py-4">
              <StatusDropdown
                filteredMyself={filteredMyself}
                commit={commit}
                commitId={commit?._id}
                getAllCommit={getAllCommit}
                projectOwner={projectOwner}
                ProjectInfo={ProjectInfo}
                userId={userId} 
              />
            </td>
          </tr>
        ))}
      </div> */}
    </div>
  );
};

export default ActivityTab;
