import StatusDropdown from "../../StatusDropdown";

const AllCommit = ({
  commitOfProject,
  handleCommitMessage,
  handleEmptyMedia,
  handleEmptyExternalLink,
  formatDate,
  filteredMyself,
  getAllCommit,
  projectOwner,
  ProjectInfo,
  userId,
}) => {
  return (
    <>
    {commitOfProject?.length === 0  ? (
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {` No Commit Available To Present Right Now.`} 

        </h3>
      )
      :
    <>
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
          <div
            onClick={() =>
              handleCommitMessage(commit?.message, commit?.completedTask)
            }
            className="cursor-pointer text-[13px] md:text-[16px] capitalize text-center w-3/12 border-r border-[#C8CBD3] px-2"
          >
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
    </>
}
    </>
  );
};

export default AllCommit;
