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
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
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
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCloseCircleOutline,
  IoLogoYoutube,
} from "react-icons/io";
import feedWhiteBorder from "../../assets/home/feed-w-b.png";
import feedDarkBorder from "../../assets/home/feed-d-b.png";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import FundSlider from "./FundSlider";
import FundByPaypal from "./fundOptions/FundByPaypal";
import FundByPayoneer from "./fundOptions/FundByPayoneer";
import FundByBank from "./fundOptions/FundByBank";
import FundByStripe from "./fundOptions/FundByStripe";
import axios from "axios";

const FindProject = () => {
  //const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const { getAllSentProjectJoinRequest, userId } = useContext(AuthContext);
  //const requestedId = user?._id;
  const [openDescriptionIndex, setOpenDescriptionIndex] = useState(null);
  const [showPdfList, setShowPdfList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("Paypal");
  const [isOpen, setIsOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const navigate = useNavigate();

  // console.log(
  //   "getAllSentProjectJoinRequest",
  //   getAllSentProjectJoinRequest?.data
  // );

  const getRequestStatus = (projectID) => {
    const friend = getAllSentProjectJoinRequest?.data?.find(
      (frnd) => frnd?.projectId?._id === projectID
    );

    return friend
      ? { status: friend.status, friend }
      : { status: "No friend request found.", friend: null };
  };

  const [
    createProjectJoinRequest,
    { data: responseData, error: responseError },
  ] = useCreateProjectJoinRequestMutation();

  // const {
  //   data: allProjects,
  //   isLoading: isFetchingProject,
  //   error,
  // } = useGetAllProjectQuery();
  // //const projects = allProjects?.data;

  // const projects = allProjects?.data
  //   ?.slice()
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [allProjects, setAllProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (page = 1) => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/project/getAll`,
        {
          params: {
            page,
            limit: 5,
          },
        }
      );
      const data = response.data.data;

      console.log("dd", data);

      setAllProjects(data.projects || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);

      // Set isFiltered to true if uniqueIdFilter is applied, else false
      
    } catch (error) {
      if (
        error.response &&
        error.response.data.message ===
          "No project matched with the provided uniqueId."
      ) {
        setAllProjects([]); // No match found
      }
    }
    setLoading(false); // Set loading to false when data is fetched
  // Set loading to false when data is fetched
  };

  const projects = allProjects
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Initial fetch of projects
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);
  
  
  const handlePaymentSelection = (payment) => {
    setSelectedPayment(payment);
  };

  // Mapping through sorted projects

  // useEffect(() => {
  //   setIsLoading(true);
  //   // Simulate loading for 2 seconds
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 5000);
  // }, []);

  const toggleDescription = (i) => {
    setOpenDescriptionIndex(openDescriptionIndex === i ? null : i);
  };


  const handleJoinClick = (project) => {
    console.log(project);
    if (!userId) {
        navigate("/");
        console.log("Redirecting due to missing userId:", selectedTasks);
    } else if (selectedTasks?.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Oops !",
            text: "I Think, You Forget to Select Task.",
        });
        console.log("No tasks selected:", selectedTasks);
        return;
    } else {
        setSelectedProject(project);
        const data = {
            projectId: project?._id,
            requestedBy: userId,
            requestedTo: project?.user?._id,
            status: "Pending",
            tasks: selectedTasks,
        };
        console.log("Request Data Being Sent:", data);
        createProjectJoinRequest(data);
       
}
  }
  useEffect(() => {
    if (responseData) {
      // console.log("Response Data:", responseData);

      Swal.fire({
        icon: "success",
        title: "Well Done !!!",
        text: "Your request has been sent successfully!",
      });
      setSelectedProject(null);
      setSelectedTasks([])
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2500);

    } else if (responseError?.data) {
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: responseError?.data?.message,
      });
      // console.log("Response Error:", responseError.data)
    }
  }, [responseData, responseError, navigate]);
  //console.log(responseError, responseData);
  const togglePdf = () => {
    setShowPdfList(true);
    setShowDocuments(false);
  };
  const toggleDocx = () => {
    setShowPdfList(false);
    setShowDocuments(true);
  };
  //console.log(projects);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    if (project?.user?._id === userId) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "You can't fund your own project.",
      });
    } else {
      setIsPayModalOpen(true);
    }
  };


  //------------ switch start
  const [selectedOption, setSelectedOption] = useState("donation"); // default selection
  //const [loading, setLoading] = useState(false);

  // Pure function to handle option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log("one",   selectedProject,selectedTasks);
  //------------ switch end

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={` py-1 w-12/12 sm:w-full`}>
        <div className="mx-3 md:mx-6 3xl:mx-20 my-5 p-3 xl:p-3 space-y-5">
          {projects?.map((project, i) => {
            const { status } = getRequestStatus(project?._id);
            //console.log(project);
            const buttonText =
              status === "Pending" ||
              status === "Declined" ||
              status === "Completed" ||
              status === "Accepted" ||
              status === "Done"
                ? "Sent"
                : "Join";

            const today = new Date();
            const startDate = new Date(project.startDate);
            const endDate = new Date(project.endDate);

            // Determine project status
            const statuss =
              today < startDate
                ? "upcoming"
                : today > endDate
                ? "ended"
                : "running";

            return (
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
                            src={
                              project?.user?.profilePic ||
                              "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                            }
                            loading="lazy"
                            alt=""
                            className="h-9 w-9 md:h-10 md:w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16  rounded-full p-[6px]"
                          />
                          <img
                            className="h-9 w-9 md:h-10 md:w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16 absolute top-0  md:right-0"
                            src={
                              theme === "light"
                                ? feedDarkBorder
                                : feedWhiteBorder
                            }
                            loading="lazy"
                            alt="dashedborder"
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
                          { project?.user?.country &&
                            <p
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-[14px] md:text-[16px] xl:text-[20px]`}
                          >
                            <span
                              className={`${
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-white"
                              } capitalize text-[13px] md:text-[15px] xl:text-[19px] font-normal pl-1`}
                            >
                              {project?.user?.country}
                            </span>
                          </p>
                          }
                          <p className="graish text-[11px] lg:text-[16px] 3xl:text-[18px] font-medium pl-1 pt-1">
                            {statuss === "ended"
                              ? `Project: ${
                                  project.projectName
                                } is ended. It started on ${startDate.toLocaleDateString()} and ended on ${endDate.toLocaleDateString()}.`
                              : statuss === "upcoming"
                              ? `Project: ${
                                  project.projectName
                                } will start very soon. It will start on ${startDate.toLocaleDateString()} and end on ${endDate.toLocaleDateString()}.`
                              : `Project: ${
                                  project.projectName
                                } is ongoing. It started on ${startDate.toLocaleDateString()} and will end on ${endDate.toLocaleDateString()}.`}
                          </p>
                        </div>
                      </div>
                    </Link>

                   
                    {project?.user?._id !== userId && (
                      <>
                        {project.isMemberRequestAccept ? (
                          theme === "light" ? (
                            buttonText === "Join" ? (
                              <div>
                                <button
                                  onClick={() => handleJoinClick(project)}
                                  className="flex items-center space-x-2 lg:text-sm xl:text-lg rounded-[13px] font-semibold px-3 py-2 xl:px-4 xl:py-2 bg-gradient-to-l from-[#2adba4] to-[#69f9cc] text-white"
                                >
                                  {buttonText}
                                  <FaPlus className="text-[15px] md:text-lg ml-1 md:ml-2" />
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div
                                  onClick={() => handleJoinClick(project)}
                                  className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]"
                                >
                                  <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
                                    {buttonText}
                                  </button>
                                </div>
                              </div>
                            )
                          ) : (
                            <button
                              onClick={
                                buttonText === "Join"
                                  ? () => handleJoinClick(project)
                                  : undefined
                              }
                              className="profileFriendRequestBtn"
                            >
                              <p>{buttonText}</p>
                            </button>
                          )
                        ) : (
                          <button
                            className="profileFriendRequestBtn opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <p>{buttonText}</p>
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Task Table */}
                  <TaskTable
                    tasks={project?.tasks}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks}
                    theme={theme}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
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
                              {project?.videoUrl.includes("drive_link") ? (
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
                                setShowPdfList={setShowPdfList}
                              />
                            </div>
                          )}
                          {showDocuments && (
                            <div className="absolute top-14 left-2 md:left-56 lg:left-0 xl:top-20  z-40">
                              <OpenDocx
                                documents={project?.documents}
                                showDocuments={showDocuments}
                                setShowDocuments={setShowDocuments}
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
                    } flex  justify-between items-center border-b pb-3`}
                  >
                    <p className="text-[14px] lg:text-[16px] 3xl:text-[20px] font-medium">
                      React [5]
                    </p>
                    <div className="flex items-center space-x-2">
                      <FundSlider projectId={project?._id} />
                      <p className="text-[14px] lg:text-[16px] 3xl:text-[20px] font-medium">
                        2 Comments, 5 Shares
                      </p>
                    </div>
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
                    <li
                      onClick={() => handleOpenModal(project)}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
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
                  {/* Popup Modal */}
                  {isPayModalOpen === true && (
                    <div className="fixed top-0 left-0 lg:left-20 flex justify-center items-center bg-black/5 bg-opacity-50 w-screen h-screen overflow-y-scroll">
                      <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] 3xl:w-[800px] cursor-pointer">
                        <IoIosCloseCircleOutline
                          onClick={() => setIsPayModalOpen(false)}
                          className="text-xl float-right"
                        />
                        <div className="flex flex-col py-7">
                          <h2 className="text-xl lg:text-2xl font-bold mb-6">
                            Select a payment method for funding
                          </h2>

                          {/* Radio Buttons for selecting funding type */}
                          <div className="mb-6 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="donation"
                                  checked={selectedOption === "donation"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Donation</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="buyStack"
                                  checked={selectedOption === "buyStack"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Buy Stack</p>
                            </div>
                          </div>

                          {/* Payment Method Selection */}
                          {selectedOption === "donation" && (
                            <div className="mb-6">
                              <ul className="flex items-center space-x-6">
                                <li
                                  onClick={() =>
                                    handlePaymentSelection("Paypal")
                                  }
                                  className={`cursor-pointer p-1 rounded-lg ${
                                    selectedPayment === "Paypal"
                                      ? "border-2 p-3 border-blue-500 bg-blue-100"
                                      : "border-2 p-3 border-gray-300"
                                  }`}
                                >
                                  <img
                                    className="h-12 w-12"
                                    src="https://i.ibb.co.com/NYDfhjQ/paypal-1.png"
                                    alt="paypal"
                                  />
                                </li>
                                <li
                                  onClick={() =>
                                    handlePaymentSelection("Payoneer")
                                  }
                                  className={`cursor-pointer p-1 rounded-lg ${
                                    selectedPayment === "Payoneer"
                                      ? "border-2 p-3 border-blue-500 bg-blue-100"
                                      : "border-2 p-3 border-gray-300"
                                  }`}
                                >
                                  <img
                                    className="h-12 w-12"
                                    src="https://i.ibb.co.com/qR4yw1g/payoneer-logo1.png"
                                    alt="payoneer"
                                  />
                                </li>
                                <li
                                  onClick={() =>
                                    handlePaymentSelection("Stripe")
                                  }
                                  className={`cursor-pointer p-1 rounded-lg ${
                                    selectedPayment === "Stripe"
                                      ? "border-2  border-blue-500 px-3  py-2 bg-blue-100"
                                      : "border-2 px-3 py-2 border-gray-300"
                                  }`}
                                >
                                  <img
                                    className="h-14 w-14"
                                    src="https://i.ibb.co.com/rstQvKT/stripe.png"
                                    alt="stripe"
                                  />
                                </li>

                                <li
                                  onClick={() =>
                                    handlePaymentSelection("Bank transfer")
                                  }
                                  className={`cursor-pointer p-1 rounded-lg ${
                                    selectedPayment === "Bank transfer"
                                      ? "border-2 p-3 border-blue-500 bg-blue-100"
                                      : "border-2 p-3 border-gray-300"
                                  }`}
                                >
                                  <img
                                    className="h-12 w-12"
                                    src="https://i.ibb.co.com/zJ3bWNk/bank.png"
                                    alt="bank transfer"
                                  />
                                </li>
                              </ul>
                            </div>
                          )}
                          {/* Conditional Form Fields */}

                          {/* paypal */}
                          {selectedPayment === "Paypal" &&
                            selectedOption === "donation" && <FundByPaypal setIsPayModalOpen={setIsPayModalOpen} setSelectedProject={setSelectedProject}  selectedProject={selectedProject} />}
                          {/* payoneer */}
                          {selectedPayment === "Payoneer" &&
                            selectedOption === "donation" && 
                            <FundByPayoneer 
                            userId={userId}
                            setIsPayModalOpen={setIsPayModalOpen} 
                            setSelectedProject={setSelectedProject}  
                            selectedProject={selectedProject} />}
                          {/* Bank transfer */}
                          {selectedPayment === "Bank transfer" &&
                            selectedOption === "donation" && <FundByBank 
                            selectedProject={selectedProject}
                            setIsPayModalOpen={setIsPayModalOpen}
                            setSelectedProject={setSelectedProject}
                            userId={userId} />}
                          {/* stripe */}
                          {selectedPayment === "Stripe" &&
                            selectedOption === "donation" && (
                              <FundByStripe
                              setIsPayModalOpen={setIsPayModalOpen}
                                setSelectedProject={setSelectedProject}
                                userId={userId}
                                selectedProject={selectedProject}
                              />
                            )}

                          {selectedOption === "buyStack" && (
                            <p className="text-2xl font-semibold py-3">
                              Coming Soon
                            </p>
                          )}
                        </div>
                        {/* <div className="flex flex-col py-7">
                          <h2 className="text-xl lg:text-2xl font-bold mb-6">
                            Enter an amount for funding
                          </h2>

                     
                          <div className="mb-6 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="donation"
                                  checked={selectedOption === "donation"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Donation</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="buyStack"
                                  checked={selectedOption === "buyStack"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Buy Stack</p>
                            </div>
                          </div>

                         
                          {selectedOption === "donation" ? (
                            <>
                              <input
                                value={amount}
                                type="number"
                                onChange={(e) =>
                                  setAmount(parseFloat(e.target.value) || "")
                                }
                                className="payment-input w-[200px] lg:w-[400px] mb-6"
                                placeholder="Enter Amount"
                              />
                              <button
                                onClick={() => handlePayment(selectedProject)}
                                disabled={loading}
                                className="fancy w-44"
                              >
                                <span className="top-key"></span>
                                <span className="text">
                                  {" "}
                                  {loading ? "Processing..." : "Pay Now"}
                                </span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                              </button>
                            </>
                          ) : (
                            <p className="text-2xl font-semibold py-3">
                              Coming Soon
                            </p>
                          )}
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        { projects?.length !== 0 && loading === false && (
          <div className=" pagination flex items-center justify-center mt-5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
            >
           <FaRegArrowAltCircleLeft  className="text-2xl"  />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
            >
                <FaRegArrowAltCircleRight className="text-2xl" />
            </button>

          </div>
        )}
      </div>
    </>
  );
};

export default FindProject;
//<div
//key={i}
//className={`${
//  theme !== "light" &&
//  "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[27px]"
//}`}
//>

//<div
//  key={i}
//  className={`${
//    theme === "light"
//      ? "bg-[#fff] shadow-[-1px_0px_56px_-6px_rgba(134,_134,_134,_0.25)]]"
//      : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover "
//  } py-6 md:px-4 px-6  rounded-[27px]`}
//>
//  {/* projet name & join */}
//  <div className="flex justify-between">
//    {/* profile */}
//    <Link to={`/user/profile/${project?.user?._id}`}>
//    <div className="flex space-x-2">
//      <div className="relative">
//        <img
//          src={project?.user?.profilePic ||
//            "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//          }
//          loading="lazy" alt=""
//          className="h-9 w-9 md:h-10 md:w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16  rounded-full p-[6px]"
//        />
//        <img
//          className="h-9 w-9 md:h-10 md:w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16 absolute top-0  md:right-0"
//          src={
//            theme === "light" ? feedDarkBorder : feedWhiteBorder
//          }
//          loading="lazy" alt="dashedborder"
//        />
//      </div>
//
//      <div>
//        <p
//          className={`${
//            theme === "light" ? "graish" : "text-white"
//          } text-[14px] md:text-[16px] xl:text-[20px] font-semibold`}
//        >
//          <span className=" pl-1 font-medium capitalize">
//            {" "}
//            {project?.user?.name?.firstName}{" "}
//            {project?.user?.name?.lastName}
//          </span>
//        </p>
//        <p
//          className={`${
//            theme === "light" ? "graish" : "text-white"
//          } text-[14px] md:text-[16px] xl:text-[20px]`}
//        >
//          <span
//            className={`${
//              theme === "light" ? "text-gray-500" : "text-white"
//            } capitalize text-[13px] md:text-[15px] xl:text-[19px] font-normal pl-1`}
//          >
//            {project?.user?.country}
//          </span>
//        </p>
//      </div>
//    </div>
//    </Link>
//
//    <div onClick={() => handleJoinClick(project)}>
//      {theme === "light" ? (
//        <div
//          className={`${
//            selectedTasks?.length > 0
//              ? "cursor-pointer"
//              : "cursor-not-allowed"
//          } flex justify-center items-center px-3 py-1 md:px-6 md:py-3 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[25px] md:rounded-[27px] [background:linear-gradient(-84.24deg,_#2adba4,_#65f7c9)]`}
//        >
//          <p className="text-[14px] md:text-[16px] xl:text-[20px] font-semibold pr-1">
//            Join
//          </p>
//          <FaPlus className="text-[15px] md:text-lg ml-1 md:ml-2" />
//        </div>
//      ) : (
//        <button className="joinBtn">
//          <p>
//            Join <FaPlus className="text-[15px] ml-1 md:ml-2" />
//          </p>
//        </button>
//      )}
//    </div>
//  </div>
//
//  {/* Task Table */}
//  <TaskTable
//    tasks={project?.tasks}
//    selectedTasks={selectedTasks}
//    setSelectedTasks={setSelectedTasks}
//    theme={theme}
//  />
//
//  {/* bor=ttom div */}
//  {openDescriptionIndex === i && (
//    <div className="py-7 ">
//      <div className="flex justify-between md:px-10 lg:px-2">
//        {/* left */}
//        <div className="relative flex justify-center items-center lg:justify-start space-x-2 md:space-x-3 py-5 md:py-2 xl:py-2 xl:ml-8">
//          <div>
//            <div
//              onClick={toggleDocx}
//              className="bg-[#f5eefc] p-2 md:p-3 rounded-md"
//            >
//              <img
//                className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
//                src={docx}
//              />
//            </div>
//          </div>
//          <div>
//            <div className="bg-[#f5eefc] p-2 md:p-3 rounded-md">
//              <img
//                onClick={togglePdf}
//                className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
//                src={pdf}
//              />
//            </div>
//          </div>
//
//          <a href={project?.videoUrl} target="blank">
//            <div className="bg-[#f5eefc] p-2 md:p-3 rounded-md">
//              {project?.videoUrl.includes("drive_link") ? (
//                <img
//                  className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
//                  src={gdrive}
//                />
//              ) : (
//                <IoLogoYoutube className="text-[20px] md:text-[33px] xl:text-[40px] 3xl:text-[44px] text-red-500" />
//              )}
//            </div>
//          </a>
//          {showPdfList && (
//            <div className="absolute top-14 left-24 md:left-72 lg:left-10 xl:left-24 xl:top-20  z-40">
//              <OpenPdf
//                pdfFiles={project?.pdfFiles}
//                showPdfList={showPdfList}
//                setShowPdfList={setShowPdfList}
//              />
//            </div>
//          )}
//          {showDocuments && (
//            <div className="absolute top-14 left-2 md:left-56 lg:left-0 xl:top-20  z-40">
//              <OpenDocx
//                documents={project?.documents}
//                showDocuments={showDocuments}
//                setShowDocuments={setShowDocuments}
//              />
//            </div>
//          )}
//
//        </div>
//        {/* right */}
//
//        <div className="flex items-center space-x-1 xs:space-x-2 md:space-x-3 ">
//          <div>
//            <div className="bg-[#f5eefc] p-2 md:p-3 rounded-md">
//              <img
//                className="h-5 md:h-8 xl:h-10 rounded-md cursor-pointer"
//                src={circle}
//              />
//            </div>
//          </div>
//          <img
//            className="h-14 md:h-16 xl:h-20"
//            src={blockChain}
//          />
//          <div>
//            <div className="bg-[#f5eefc] h-8 w-8 md:h-14 3xl:h-16 3xl:w-16 md:w-14 rounded-md flex justify-center items-center">
//              <img
//                className=" rounded-md cursor-pointer"
//                src={qr}
//              />
//            </div>
//          </div>
//        </div>
//      </div>
//
//      <div className="flex flex-col lg:flex-row space-y-3 justify-start lg:justify-between items-center px-3 lg:px-24">
//        <div className="flex justify-center  w-11/12 lg:w-5/12">
//          <div>
//            {/* <img
//             src={des}
//             className="h-40 md:h-48 lg:h-52 xl:h-[300px]"
//             loading="lazy" alt="hero"
//           /> */}
//            <ImageSlider images={project?.images} />
//          </div>
//        </div>
//        <ProjectDescription
//          description={project?.description}
//          theme={theme}
//        />
//      </div>
//    </div>
//  )}
//  <div
//    onClick={() => toggleDescription(i)}
//    className={`${
//      theme === "light" ? "graish" : "text-white"
//    } flex justify-center items-center cursor-pointer pb-5 lg:pb-0 3xl:py-5`}
//  >
//    <div className="flex flex-col justify-center items-center -space-y-1">
//      {openDescriptionIndex === i && (
//        <IoIosArrowUp className={`3xl:text-xl`} />
//      )}
//      <p className="3xl:text-xl font-semibold">
//        {openDescriptionIndex !== i ? "read more" : "read less"}
//      </p>
//      {openDescriptionIndex !== i && <IoIosArrowDown />}
//    </div>
//  </div>
//  <div
//    className={`${
//      theme === "light" ? "graish" : "text-white"
//    } flex justify-between items-center border-b pb-3`}
//  >
//    <p className="text-[14px] lg:text-[16px] 3xl:text-[20px] font-medium">
//      React [5]
//    </p>
//    <p className="text-[14px] lg:text-[16px] 3xl:text-[20px] font-medium">
//      2 Comments, 5 Shares
//    </p>
//  </div>
//
//  <ul
//    className={`${
//      theme === "light" ? "graish" : "text-white"
//    } flex space-x-3 md:space-x-6 pt-5`}
//  >
//    <li className="flex items-center space-x-2">
//      <LikeIcon theme={theme} />
//      <p className="hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
//        Like
//      </p>
//    </li>
//    <li className="flex items-center space-x-2">
//      <FundIcon theme={theme} />
//      <p className=" hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
//        Fund
//      </p>
//    </li>
//    <li className="flex items-center space-x-2">
//      <CommentIcon theme={theme} />
//      <p className="hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
//        Comment
//      </p>
//    </li>
//    <li className="flex items-center space-x-2">
//      <ShareIcon theme={theme} />
//      <p className="hidden sm:block  text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
//        Share
//      </p>
//    </li>
//  </ul>
//</div>
//</div>
