// import Academic from '../AcademicPage/Academic';

// const FindProject = () => {
//   return (
//     <div>
//       <Academic/>
//     </div>
//   );
// };

// export default FindProject;






import circle from "../../assets/projectDetail/block.png";
import qr from "../../assets/projectDetail/qr1.png";
import gdrive from "../../assets/projectDetail/drive.png";
import blockChain from "../../assets/projectDetail/block-chain.png";
import docx from "../../assets/projectDetail/docx.png";
import pdf from "../../assets/projectDetail/pdf1.png";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetAllProjectQuery } from "../../features/project/projectApi";
import { useSelector } from "react-redux";
import ImageSlider from "./ImageSlider";
import ProjectDescription from "./ProjectDescription";
import OpenPdf from "./OpenPdf";
import OpenDocx from "./OpenDocx";
import TaskTable from "./TaskTable";
import { useCreateProjectJoinRequestMutation } from "../../features/projectJoinRequest/projectJoinRequestApi";
import Swal from "sweetalert2";
import LikeIcon from "../../icons/LikeIcon";
import CommentIcon from "../../icons/CommentIcon";
import FundIcon from "../../icons/FundIcon";
import ShareIcon from "../../icons/ShareIcon";
import { IoIosArrowDown, IoIosArrowUp, IoLogoYoutube } from "react-icons/io";
import feedWhiteBorder from "../../assets/home/feed-w-b.png";
import feedDarkBorder from "../../assets/home/feed-d-b.png";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../Loading/Loading'

const FindProject = ({
  amounts,
  setAmounts,
  selectedTasks,
  setSelectedTasks,
}) => {
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const requestedId = user?._id;
  const [openDescriptionIndex, setOpenDescriptionIndex] = useState(null);
  const [showPdfList, setShowPdfList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const [
    createProjectJoinRequest,
    { data: responseData, error: responseError },
  ] = useCreateProjectJoinRequestMutation();
  const {
    data: allProjects,
    isLoading: isFetchingProject,
    error,
  } = useGetAllProjectQuery();
  const projects = allProjects?.data;

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);



  const toggleDescription = (i) => {
    setOpenDescriptionIndex(openDescriptionIndex === i ? null : i);
  };
  //   window.location.href = "https://buy.stripe.com/test_7sIfZP7d6bha3Qs5kk";
  const handleJoinClick = (project) => {
    if (!user) {
      navigate("/");
    } 
    else if (selectedTasks?.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget to Select Task.",
      });
    } 
    else {
      setSelectedProject(project);
      const data = {
        projectId: project?._id,
        requestedBy: requestedId,
        requestedTo: project?.user?._id,
        status: "Pending",
        tasks: selectedTasks,
      };
      console.log("pro",data);
      createProjectJoinRequest(data);
    }
  };
  useEffect(() => {
    if (responseData) {
      console.log("Response Data:", responseData);

        Swal.fire({
          icon: "success",
          title: "Well Done !!!",
          text: "Your request has been sent successfully!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);

    } else if (responseError?.data) {
     // console.log("Response Error:", responseError.data)

      if (responseError?.data?.message === "You have already requested to join this project.") {
        Swal.fire({
          icon: "error",
          title: "Request failed",
          text: "You have already requested to join this project.",
        });
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Request failed",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  }, [responseData, responseError, navigate]);
  console.log(responseError,responseData);
  const togglePdf = () => {
    setShowPdfList(true);
    setShowDocuments(false);
  };
  const toggleDocx = () => {
    setShowPdfList(false);
    setShowDocuments(true);
  };
  console.log(projects);
  if(isLoading){
    return <Loading/>
  }

//   {
//     "projectId": "66c6961b64ecba40aedd9a1d",
//     "requestedBy": "668d10eb5bb2949bedffc34f",
//     "requestedTo": "6695d0cdf7a393f4697fc845",
//     "status": "Pending",
//     "tasks": [
//         {
//             "title": "Research Management",
//             "details": "As a researcher, I want to post my research with a title, description, and the ability to add team members.\nAs a researcher, I want to search for other researchers based on their skills and expertise.\n",
//             "taskType": "free",
//             "coin": "0",
//             "priority": "high",
//             "status": "pending",
//             "startDate": "2024-09-11",
//             "endDate": "2024-09-20",
//             "subTask": [
//                 {
//                     "todo": "Use Redux for state management",
//                     "status": "pending",
//                     "_id": "66c6961b64ecba40aedd9a22"
//                 },
//                 {
//                     "todo": "Add Researcher NID info while creating account.",
//                     "status": "pending",
//                     "_id": "66c6961b64ecba40aedd9a23"
//                 }
//             ],
//             "_id": "66c6961b64ecba40aedd9a21"
//         },
//         {
//             "title": "User Management",
//             "details": "As a user, I want to register and create a profile so I can participate in the research community.\nAs a user, I want to edit my profile information (e.g., skills, research interests) to keep it up-to-date.\n",
//             "taskType": "free",
//             "coin": "0",
//             "priority": "medium",
//             "status": "complete",
//             "startDate": "2024-08-30",
//             "endDate": "2024-09-10",
//             "subTask": [
//                 {
//                     "todo": "Neat  code of User management",
//                     "status": "pending",
//                     "_id": "66c6961b64ecba40aedd9a1f"
//                 },
//                 {
//                     "todo": "User JWT",
//                     "status": "pending",
//                     "_id": "66c6961b64ecba40aedd9a20"
//                 }
//             ],
//             "_id": "66c6961b64ecba40aedd9a1e"
//         }
//     ]
// }
  return (
    <>
      <div className=" py-1 w-12/12 sm:w-full">
        <div className="mx-3 md:mx-6 3xl:mx-20 my-5 p-3 xl:p-3 space-y-5 ">
          <>
            {projects?.map((project, i) => (
              <div
                key={i}
                className={`${
                  theme !== "light" &&
                  "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[27px]"
                }`}
              >
                <div
                  key={i}
                  className={`${
                    theme === "light"
                      ? "bg-[#fff] shadow-[-1px_0px_56px_-6px_rgba(134,_134,_134,_0.25)]]"
                      : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover "
                  } py-6 md:px-4 px-6  rounded-[27px]`}
                >
                  {/* projet name & join */}
                  <div className="flex justify-between">
                    {/* profile */}
                    <Link to={`/user/profile/${project?.user?._id}`}>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <img
                          src={project?.user?.profilePic ||
                            "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                          }
                          loading="lazy" alt=""
                          className="h-9 w-9 md:h-10 md:w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16  rounded-full p-[6px]"
                        />
                        <img
                          className="h-9 w-9 md:h-10 md:w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16 absolute top-0  md:right-0"
                          src={
                            theme === "light" ? feedDarkBorder : feedWhiteBorder
                          }
                          loading="lazy" alt="dashedborder"
                        />
                      </div>

                      <div>
                        <p
                          className={`${
                            theme === "light" ? "graish" : "text-white"
                          } text-[14px] md:text-[16px] xl:text-[20px] font-semibold`}
                        >
                          <span className=" pl-1 font-medium capitalize">
                            {" "}
                            {project?.user?.name?.firstName}{" "}
                            {project?.user?.name?.lastName}
                          </span>
                        </p>
                        <p
                          className={`${
                            theme === "light" ? "graish" : "text-white"
                          } text-[14px] md:text-[16px] xl:text-[20px]`}
                        >
                          <span
                            className={`${
                              theme === "light" ? "text-gray-500" : "text-white"
                            } capitalize text-[13px] md:text-[15px] xl:text-[19px] font-normal pl-1`}
                          >
                            {project?.user?.country}
                          </span>
                        </p>
                      </div>
                    </div>
                    </Link>
                    
                    <div onClick={() => handleJoinClick(project)}>
                      {theme === "light" ? (
                        <div
                          className={`${
                            selectedTasks?.length > 0
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          } flex justify-center items-center px-3 py-1 md:px-6 md:py-3 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[25px] md:rounded-[27px] [background:linear-gradient(-84.24deg,_#2adba4,_#65f7c9)]`}
                        >
                          <p className="text-[14px] md:text-[16px] xl:text-[20px] font-semibold pr-1">
                            Join
                          </p>
                          <FaPlus className="text-[15px] md:text-lg ml-1 md:ml-2" />
                        </div>
                      ) : (
                        <button className="joinBtn">
                          <p>
                            Join <FaPlus className="text-[15px] ml-1 md:ml-2" />
                          </p>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Task Table */}
                  <TaskTable
                    tasks={project?.tasks}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks}
                    theme={theme}
                  />

                  {/* bor=ttom div */}
                  {openDescriptionIndex === i && (
                    <div className="py-7 ">
                      <div className="flex justify-between md:px-10 lg:px-2">
                        {/* left */}
                        <div className="relative flex justify-center items-center lg:justify-start space-x-2 md:space-x-3 py-5 md:py-2 xl:py-2 xl:ml-8">
                          <div>
                            <div
                              onClick={toggleDocx}
                              className="bg-[#f5eefc] p-2 md:p-3 rounded-md"
                            >
                              <img
                                className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
                                src={docx}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="bg-[#f5eefc] p-2 md:p-3 rounded-md">
                              <img
                                onClick={togglePdf}
                                className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
                                src={pdf}
                              />
                            </div>
                          </div>
                        
                          <a href={project?.videoUrl} target="blank">
                            <div className="bg-[#f5eefc] p-2 md:p-3 rounded-md">
                              {project?.videoUrl.includes("docs.google") ? (
                                <img
                                  className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
                                  src={gdrive}
                                />
                              ) : (
                                <IoLogoYoutube className="text-[20px] md:text-[33px] xl:text-[40px] 3xl:text-[44px] text-red-500" />
                              )}
                            </div>
                          </a>
                          {showPdfList && (
                            <div className="absolute top-14 left-24 md:left-72 lg:left-10 xl:left-24 xl:top-20  z-40">
                              <OpenPdf
                                pdfFiles={project?.pdfFiles}
                                showPdfList={showPdfList}
                              />
                            </div>
                          )}
                          {showDocuments && (
                            <div className="absolute top-14 left-2 md:left-56 lg:left-0 xl:top-20  z-40">
                              <OpenDocx
                                documents={project?.documents}
                                showDocuments={showDocuments}
                              />
                            </div>
                          )}

                        </div>
                        {/* right */}

                        <div className="flex items-center space-x-1 xs:space-x-2 md:space-x-3 ">
                          <div>
                            <div className="bg-[#f5eefc] p-2 md:p-3 rounded-md">
                              <img
                                className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
                                src={circle}
                              />
                            </div>
                          </div>
                          <img
                            className="h-14 md:h-16 xl:h-20"
                            src={blockChain}
                          />
                          <div>
                            <div className="bg-[#f5eefc] h-8 w-8 md:h-14 3xl:h-16 3xl:w-16 md:w-14 rounded-md flex justify-center items-center">
                              <img
                                className=" rounded-md cursor-pointer"
                                src={qr}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row space-y-3 justify-start lg:justify-between items-center px-3 lg:px-24">
                        <div className="flex justify-center  w-11/12 lg:w-5/12">
                          <div>
                            {/* <img
                             src={des}
                             className="h-40 md:h-48 lg:h-52 xl:h-[300px]"
                             loading="lazy" alt="hero"
                           /> */}
                            <ImageSlider images={project?.images} />
                          </div>
                        </div>
                        <ProjectDescription
                          description={project?.description}
                          theme={theme}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    onClick={() => toggleDescription(i)}
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } flex justify-center items-center cursor-pointer pb-5 lg:pb-0 3xl:py-5`}
                  >
                    <div className="flex flex-col justify-center items-center -space-y-1">
                      {openDescriptionIndex === i && (
                        <IoIosArrowUp className={`3xl:text-xl`} />
                      )}
                      <p className="3xl:text-xl font-semibold">
                        {openDescriptionIndex !== i ? "read more" : "read less"}
                      </p>
                      {openDescriptionIndex !== i && <IoIosArrowDown />}
                    </div>
                  </div>
                  <div
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } flex justify-between items-center border-b pb-3`}
                  >
                    <p className="text-[14px] lg:text-[16px] 3xl:text-[20px] font-medium">
                      React [5]
                    </p>
                    <p className="text-[14px] lg:text-[16px] 3xl:text-[20px] font-medium">
                      2 Comments, 5 Shares
                    </p>
                  </div>

                  <ul
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } flex space-x-3 md:space-x-6 pt-5`}
                  >
                    <li className="flex items-center space-x-2">
                      <LikeIcon theme={theme} />
                      <p className="hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
                        Like
                      </p>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FundIcon theme={theme} />
                      <p className=" hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
                        Fund
                      </p>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CommentIcon theme={theme} />
                      <p className="hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
                        Comment
                      </p>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ShareIcon theme={theme} />
                      <p className="hidden sm:block  text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
                        Share
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default FindProject;