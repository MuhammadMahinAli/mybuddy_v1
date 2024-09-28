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

const stripePromise = loadStripe(
  "pk_test_51Q2kJiGGKSeS74MyQwATubkvrfrB2w6nSam4Th7JXf3KAVCJMiVLtax06wgH2oYPBGEMhXC8O0PYWgcckpjqZZL500sqvvLOFL"
);

const FindProject = ({
  amounts,
  setAmounts,
  selectedTasks,
  setSelectedTasks,
}) => {
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const { getAllSentProjectJoinRequest } = useContext(AuthContext);
  const requestedId = user?._id;
  const [openDescriptionIndex, setOpenDescriptionIndex] = useState(null);
  const [showPdfList, setShowPdfList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const navigate = useNavigate();

  console.log(
    "getAllSentProjectJoinRequest",
    getAllSentProjectJoinRequest?.data
  );

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
    } else if (selectedTasks?.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget to Select Task.",
      });
    } else {
      setSelectedProject(project);
      const data = {
        projectId: project?._id,
        requestedBy: requestedId,
        requestedTo: project?.user?._id,
        status: "Pending",
        tasks: selectedTasks,
      };
      console.log("pro", data);
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
    } else if (responseError?.data) {
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: responseError?.data?.message,
      });
      // console.log("Response Error:", responseError.data)
    }
  }, [responseData, responseError, navigate]);
  console.log(responseError, responseData);
  const togglePdf = () => {
    setShowPdfList(true);
    setShowDocuments(false);
  };
  const toggleDocx = () => {
    setShowPdfList(false);
    setShowDocuments(true);
  };
  console.log(projects);

  const requestedBy = requestedId;
  const [amount, setAmount] = useState("");

  //------------ paymnet start

  const [loading, setLoading] = useState(false);

  // const handlePayment = async (requestedTo, projectId) => {
  //   setLoading(true);

  //   try {

  //     if (!requestedTo || !projectId || !amount || amount <= 0) {
  //       console.error("Invalid data: Amount is not available or less than 0");
  //       setLoading(false);
  //       return;
  //     }

  //     const response = await fetch(
  //       "http://localhost:3000/api/v1/fund/new-request",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           requestedBy,
  //           requestedTo,
  //           projectId,
  //           amount,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to create payment session");
  //     }

  //     const { id } = await response.json();

  //     const stripe = await stripePromise;
  //     const result = await stripe.redirectToCheckout({ sessionId: id });

  //     if (result.error) {
  //       console.error(result.error.message);
  //     }
  //   } catch (error) {
  //     console.error("Error in payment:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handlePayment = async (requestedTo, projectId) => {
  //   setLoading(true);

  //   try {
  //     // Validation: Check if requestedTo, projectId, and amount are valid
  //     if (!requestedTo || !projectId || !amount || amount <= 0) {
  //       console.error("Invalid data: Amount is not available or less than 0");
  //       setLoading(false);
  //       return;
  //     }

  //     // Create a payment session by making a POST request to the backend
  //     const response = await fetch(
  //       "http://localhost:3000/api/v1/fund/new-request",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           requestedBy,  // Ensure requestedBy is available in the component
  //           requestedTo,
  //           projectId,
  //           amount,
  //         }),
  //       }
  //     );

  //     // Check if the response is OK, otherwise throw an error
  //     if (!response.ok) {
  //       throw new Error("Failed to create payment session");
  //     }

  //     const { sessionId } = await response.json();

  //     // Initialize Stripe and redirect to the checkout page
  //     const stripe = await stripePromise;
  //     const result = await stripe.redirectToCheckout({ sessionId });

  //     if (result.error) {
  //       console.error(result.error.message);
  //     }
  //   } catch (error) {
  //     // Catch any errors and log them
  //     console.error("Error in payment:", error);
  //   } finally {
  //     // Stop loading indicator
  //     setLoading(false);
  //   }
  // };

  const handlePayment = async (requestedTo, projectId) => {
    setLoading(true);

    try {
      if (!requestedTo || !projectId) {
        console.error("Invalid data: Amount is not available or less than 0");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/fund/new-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestedBy,
            requestedTo,
            projectId,
            amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error in payment:", error);
    } finally {
      setLoading(false);
    }
  };

  //------------ paymnet end
  //------------ switch start
  const [selectedOption, setSelectedOption] = useState("donation"); // default selection
  //const [loading, setLoading] = useState(false);

  // Pure function to handle option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  //------------ switch end

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={` py-1 w-12/12 sm:w-full`}>
        <div className="mx-3 md:mx-6 3xl:mx-20 my-5 p-3 xl:p-3 space-y-5">
          {projects?.map((project, i) => {
            const { status } = getRequestStatus(project?._id);
            console.log(project);
            const buttonText =
              status === "Pending" ||
              status === "Declined" ||
              status === "Completed" ||
              status === "Accepted" ||
              status === "Done"
                ? "Sent"
                : "Join";

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
                        </div>
                      </div>
                    </Link>

                    {project?.user?._id !== requestedId && (
                      <>
                        {theme === "light" ? (
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

                    {/* <li

                      onClick={() => setIsPayModalOpen(true)}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <FundIcon theme={theme} />
                      <p className=" hidden sm:block text-[10px] md:text-[14px] lg:text-[16px] 3xl:text-[20px]  font-medium">
                        Fund
                      </p>
                    </li> */}
                    <li
                      onClick={() => {
                        if (project?.user?._id === requestedId) {
                          Swal.fire({
                            icon: "warning",
                            title: "Oops!",
                            text: "You can't fund your own project.",
                          });
                        } else {
                          setIsPayModalOpen(true);
                        }
                      }}
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
                        {/* <div className="flex flex-col py-7">
                          <h2 className="text-xl lg:text-2xl font-bold mb-10 cursor-pointer">
                            Enter an amount for funding
                          </h2>

                          <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="payment-input w-[200px] lg:w-[400px] mb-6"
                            placeholder="Enter Amount"
                          />

                          <button
                            onClick={() =>
                              handlePayment(project?.user?._id, project?._id)
                            }
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
                        </div> */}
                        <div className="flex flex-col py-7">
                          <h2 className="text-xl lg:text-2xl font-bold mb-6">
                            Enter an amount for funding
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

                          {/* Conditionally render based on selected option */}
                          {selectedOption === "donation" ? (
                            <>
                              <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="payment-input w-[200px] lg:w-[400px] mb-6"
                                placeholder="Enter Amount"
                              />
                              <button
                                onClick={() =>
                                  handlePayment(
                                    project?.user?._id,
                                    project?._id
                                  )
                                }
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
