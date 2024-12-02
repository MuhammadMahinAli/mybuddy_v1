// /* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import whiteBorder from "../../assets/home/p-border.png";
import darkBorder from "../../assets/home/dark-border.png";
import Image from "./view/Image";
import Skills from "./view/Skills";
import { useGetAllPostQuery } from "../../features/post/postApi";
import ViewPdfFile from "./ViewPdfFile";
import ProjectSidebar from "./ProjectSidebar/ProjectSidebar";
import {
  FaPlus,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import Description from "./Description";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import TeamMember from "./view/TeamMember";
import { AuthContext } from "../../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PostLike from "../../icons/PostLike";
import PostComment from "../../icons/PostComment";
import PostShare from "../../icons/PostShare";
import LoveIcon from "../../icons/LoveIcon";
import PostSupportIcon from "../../icons/PostSupportIcon";
import PostIdeaIcon from "../../icons/PostIdeaIcon";
import PostHandHeartIcon from "../../icons/PostHandHeartIcon";
import ReactComponent from "./ReactComponent";
import { updatePostReact } from "../../features/auth/authSlice";
import DefaultPostLike from "../../icons/DefaultPostLike";

const ViewPosts = ({ theme }) => {
  // all state
  const [openComponent, setOpenComponent] = useState({});
  const [reactionState, setReactionState] = useState({});
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const {
    createNewRequest,
    getAllStatusFriendRequest,
    getAcceptedFriendRequest,
  } = useContext(AuthContext);
  const requestedId = user?._id;
  const {
    data: allPosts,
    isLoading: isFetchingPosts,
    error,
    refetch,
  } = useGetAllPostQuery({ page });

  const dispatch = useDispatch();
  console.log(allPosts?.meta);
  useEffect(() => {
    if (allPosts && allPosts?.data) {
      const initialOpenComponent = {};
      const initialReactionState =
        JSON.parse(localStorage.getItem(`postReact_${user?._id}`)) || {};
      console.log(initialReactionState);
      allPosts.data.posts.forEach((_, index, post) => {
        initialOpenComponent[index] = "image";

        if (!initialReactionState[post._id]) {
          initialReactionState[post._id] = {
            like: false,
            love: false,
            celebrate: false,
            support: false,
            insightful: false,
          };
        }
      });

      setOpenComponent(initialOpenComponent);
      setReactionState(initialReactionState);
    }
  }, [allPosts]);

  const toggleComponent = (index, component) => {
    setOpenComponent((prev) => ({
      ...prev,
      [index]: component,
    }));
  };

  const posts = allPosts?.data?.posts;
  console.log("post", allPosts?.data);

  // const sentFriendRequest = async (friend) => {
  //   const datas = {
  //     requestedBy: requestedId,
  //     requestedTo: friend?._id,
  //     status: "Pending",
  //   };
  //   console.log(datas);

  //   try {
  //     const response = await createNewRequest(datas).unwrap();
  //     console.log(response);

  //     if (response.data.success === true) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Well done!",
  //         text: "You've sent friend request successfully.",
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2500);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops!",
  //         text:
  //           response.data.message || "You have already sent a friend request.",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire({
  //       icon: "error",
  //       // title: "Oops!",
  //       text: "You have already sent a friend request.",
  //     });
  //   }
  // };

  // project

  // const getFriendStatus = (friendId) => {
  //   const friend = getAllStatusFriendRequest?.data?.find(
  //     (frnd) => frnd?.requestedBy?._id === friendId || frnd?.requestedTo?._id === friendId
  //   );

  //   return friend
  //     ? { status: friend.status, friend }
  //     : { status: "No friend request found.", friend: null };
  //};

  
  const getFriendStatus = (friendId) => {
    const friend = getAllStatusFriendRequest?.data?.find(
      (frnd) =>
        frnd?.requestedBy?._id === friendId ||
        frnd?.requestedTo?._id === friendId
    );

    if (friend) {
      const isRequestedTo = friend?.requestedTo?._id === friendId;
      const isRequestedBy = friend?.requestedBy?._id === friendId;

      let statusText = "No friend request found.";
      if (friend.status === "Accepted") {
        statusText = "Friend";
      } else if (isRequestedTo && friend.status === "Pending") {
        statusText = "Pending"; // You are the receiver of the request
      } else if (isRequestedBy && friend.status === "Pending") {
        statusText = "Sent"; // You are the sender of the request
      }

      return { status: statusText, friend };
    }

    return { status: "No friend request found.", friend: null };
  };

  // Default to 'Add' if no other status matches

  console.log("frnd", getFriendStatus("67396ba011eb8789052c3cfd"));

  const sentFriendRequest = async (friend, buttonText) => {
    if (buttonText === "Friend") {
      Swal.fire({
        icon: "info",
        title: "Already Friends",
        text: "You are already friends with this user.",
      });
      return;
    } else if (buttonText === "Pending") {
      Swal.fire({
        icon: "info",
        title: "Request Pending",
        text: "Friend request is already pending.",
      });
      return;
    } else if (buttonText === "Sent") {
      Swal.fire({
        icon: "info",
        title: "Request Sent",
        text: "You have already sent a friend request.",
      });
      return;
    } else if (buttonText === "Add") {
      const datas = {
        requestedBy: requestedId,
        requestedTo: friend?._id,
        status: "Pending",
      };
  
      try {
        const response = await createNewRequest(datas).unwrap();
        console.log(response);
  
        if (response?.success) {
          Swal.fire({
            icon: "success",
            title: "Request Sent",
            text: "Friend request sent successfully.",
          });
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2500);
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Errorrr",
            text: "Something went wrong. Please try again later.",
          });
        }
      } catch (error) {
        if ( error){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong. Please try again later.",
          });
        }
       
      }
    } 
    }
  



  //  post reaction on db
  const handleReactionBoxToggle = (id) => {
    setHoveredPostId(id);
  };

  const updateReaction = async (postId, reactedBy, reactionType) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/PostReact/update-reaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, reactedBy, reactionType }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Reaction updated successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Error updating reaction:", errorData.message);
      }
    } catch (error) {
      console.error("Error updating reaction:", error.message);
    }
  };

  const handleReactionToggle = async (postId, reactionType) => {
    // Initialize the state for the post if it doesn't exist
    const currentPostReactions = reactionState[postId] || {
      like: false,
      love: false,
      celebrated: false,
      supported: false,
      insightfulled: false,
    };

    // Create a new updated state for the post based on the reaction type
    const updatedReactions = {
      ...reactionState,
      [postId]: {
        like: reactionType === "like" ? !currentPostReactions.like : false,
        love: reactionType === "love" ? !currentPostReactions.love : false,
        celebrate:
          reactionType === "celebrate"
            ? !currentPostReactions.celebrate
            : false,
        support:
          reactionType === "support" ? !currentPostReactions.support : false,
        insightful:
          reactionType === "insightful"
            ? !currentPostReactions.insightful
            : false,
      },
    };

    setReactionState(updatedReactions);
    // storing redux
    dispatch(updatePostReact(updatedReactions));

    // Uncomment these lines once you have implemented the updateReaction function
    const reactedBy = user?._id;
    await updateReaction(postId, reactedBy, reactionType);
  };

  // Pagination handlers
  const totalPages = allPosts?.data?.totalPages || 1;
  const currentPage = allPosts?.data?.currentPage || 1;
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage((prev) => prev + 1);
      refetch(); // Refetch when page changes
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
      refetch();
    }
  };

  if (isFetchingPosts) {
    return (
      <div className="flex justify-center items-center -pt-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${
          theme === "light" ? "text-gray-600" : "text-white"
        } xl:text-xl font-semibold`}
      >
        Error loading posts
      </div>
    );
  }

  if (!allPosts || !allPosts.data || allPosts.data.length === 0) {
    return (
      <div
        className={`${
          theme === "light" ? "text-gray-600" : "text-white"
        } xl:text-xl font-semibold`}
      >
        No posts available
      </div>
    );
  }

  return (
    <div className="space-y-3 xl:space-y-5 py-3">
      {posts?.map((post, i) => {
        const { like, love, celebrate, support, insightful } =
          reactionState[post._id] || {};
        const { status } = getFriendStatus(post?.postedBy?._id);
        // Button Text Logic
        const buttonText =
          status === "Friend"
            ? "Friend"
            : status === "Pending"
            ? "Pending"
            : status === "Sent"
            ? "Sent"
            : "Add";

        return (
          <div
            key={i}
            className={`${
              theme !== "light" &&
              "relative p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
            }`}
          >
            <div
              className={`${
                theme === "light"
                  ? "bg-white  relative"
                  : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
              } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] w-[270px] xs:w-[280px] sm:w-[350px] md:w-[600px] lg:w-[500px] xl:w-[670px] 2xl:w-[750px] 3xl:w-[800px] 3xl:ml-[1px] `}
            >
              <div className=" flex justify-between items-center p-2 sm:px-3 sm:pt-3">
                <div className="flex items-center space-x-3">
                  <Link to={`/user/profile/${post?.postedBy?._id}`}>
                    <div className="flex flex-col justify-center items-center relative">
                      <img
                        data-src={
                          post?.postedBy?.profilePic
                            ? post?.postedBy?.profilePic
                            : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                        }
                        className="lazy h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full p-[6px]"
                      />

                      <img
                        className="w-16 lg:w-32 xl:w-36 absolute"
                        src={theme === "light" ? darkBorder : whiteBorder}
                        loading="lazy"
                        alt="dashedborder"
                      />
                    </div>
                  </Link>
                  <div>
                    <div className="flex items-center space-x-1">
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        } sm:hidden capitalize text-[14px] md:text-[15px] lg:text-[18px] font-semibold`}
                      >
                        {post?.postedBy?.name?.firstName}{" "}
                      </p>
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        } hidden sm:block capitalize text-[14px] md:text-[15px] lg:text-[18px] font-semibold`}
                      >
                        {post?.postedBy?.name?.firstName}{" "}
                        {post?.postedBy?.name?.lastName}
                      </p>
                    </div>
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } hidden  md:block capitalize text-[14px] lg:text-[15px]`}
                    >
                      {post?.postedBy?.role}
                    </p>
                  </div>
                </div>
                {post?.postedBy?._id !== requestedId && (
                  <div>
                    {theme === "light" ? (
                      <button
                      onClick={() => sentFriendRequest(post?.postedBy, buttonText)}
                        className="flex items-center my-3 px-4 py-1 md:px-4 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
                      >
                        <span className="pr-1">
                          {buttonText === "Add" && <FaPlus />}
                        </span>
                        {buttonText}
                      </button>
                    ) : (
                      <button className="newBtn">
                        <p>
                          <span className="pr-1">
                            {buttonText === "Add" && <FaPlus />}
                          </span>{" "}
                          {buttonText}
                        </p>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div
                className={`${
                  theme === "light" ? "graish" : "text-white"
                } flex flex-col justify-center py-3 md:py-3`}
              >
                <div className="text-start">
                  <Description text={post?.description} />
                </div>

                <div className="w-full  my-3 md:mt-3 flex justify-center items-center ">
                  {post?.technicalRecommendations.length > 0 && (
                    <div className="flex justify-center items-center w-full relative">
                      {openComponent[i] === "image" && post?.image && (
                        <Image
                          image={post?.image}
                          technicalRecommendations={
                            post?.technicalRecommendation
                          }
                          teamMembers={post?.teamMembers}
                        />
                      )}
                      {openComponent[i] === "skill" &&
                        post?.technicalRecommendations.length > 0 && (
                          <Skills
                            openComponent={openComponent[i]}
                            theme={theme}
                            skillArray={post?.technicalRecommendations}
                          />
                        )}
                      {openComponent[i] === "team" &&
                        post?.teamMembers.length > 0 && (
                          <TeamMember
                            openComponent={openComponent[i]}
                            theme={theme}
                            teamMembers={post?.teamMembers}
                          />
                        )}
                      {(post?.technicalRecommendations.length > 0 ||
                        post?.teamMembers?.length > 0) && (
                        <ProjectSidebar
                          theme={theme}
                          description={post?.description}
                          teamMembers={post?.teamMembers}
                          technicalRecommendations={
                            post?.technicalRecommendations
                          }
                          openComponent={openComponent[i]}
                          toggleImage={() => toggleComponent(i, "image")}
                          toggleSkill={() => toggleComponent(i, "skill")}
                          toggleTeam={() => toggleComponent(i, "team")}
                        />
                      )}
                    </div>
                  )}
                </div>

                {post?.technicalRecommendations.length === 0 &&
                  post?.pdf === "" && (
                    <div className="w-full">
                      <Image image={post?.image} />
                    </div>
                  )}
                {post?.pdf && post.pdf.includes("data:") && (
                  <ViewPdfFile pdf={post.pdf} />
                )}
              </div>
              <div className="py-2">
                {/* Reaction and Comment Count Section */}
                <div className="flex items-center justify-between px-4 pb-2">
                  <div className="flex items-center space-x-1">
                    <ReactComponent
                      postId={post._id}
                      user={user}
                      theme={theme}
                    />
                  </div>
                  {/* <div
                    className={`${
                      theme === "light" ? "text-gray-600" : "text-white"
                    } text-sm`}
                  >
                    2 Comments
                  </div> */}
                </div>

                {/* Action Buttons Section */}
                <div
                  onMouseLeave={() => setHoveredPostId(null)}
                  className="flex space-x-4 border-t border-gray-300 pt-2 relative px-4"
                >
                  <div
                    onMouseEnter={() => handleReactionBoxToggle(post._id)}
                    className="py-2 flex space-x-4"
                  >
                    <button
                      onClick={() => handleReactionBoxToggle(post._id)}
                      className="flex items-center space-x-1"
                    >
                      <span
                        className={`${
                          theme === "light" ? "text-gray-600" : "text-white"
                        } text-xl`}
                      >
                        {like ? (
                          <PostLike />
                        ) : love ? (
                          <LoveIcon />
                        ) : celebrate ? (
                          <PostSupportIcon />
                        ) : support ? (
                          <PostHandHeartIcon />
                        ) : insightful ? (
                          <PostIdeaIcon />
                        ) : (
                          <DefaultPostLike />
                        )}
                      </span>
                      <span
                        className={`${
                          like
                            ? "text-blue-500"
                            : love
                            ? "text-red-500"
                            : celebrate
                            ? "text-yellow-500"
                            : support
                            ? "text-red-500"
                            : insightful
                            ? "text-yellow-500"
                            : "text-gray-600"
                        } ${
                          theme === "light" ? "text-gray-600" : "text-white"
                        } font-medium`}
                      >
                        {like
                          ? "Liked"
                          : love
                          ? "Loved"
                          : celebrate
                          ? "Celebrated"
                          : support
                          ? "Supported"
                          : insightful
                          ? "Insightfulled"
                          : "Like"}
                      </span>
                    </button>
                    <button
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-white"
                      } flex items-center space-x-1  hover:text-blue-500 transition-colors duration-200`}
                    >
                      <span className="text-xl">
                        <PostComment theme={theme} />
                      </span>
                      <span>Comment</span>
                    </button>
                    <button
                      className={`${
                        theme === "light" ? "text-gray-600" : "text-white"
                      } flex items-center space-x-1  hover:text-blue-500 transition-colors duration-200`}
                    >
                      <span className="text-xl">
                        <PostShare theme={theme} />
                      </span>
                      <span>Share</span>
                    </button>
                  </div>
                  {hoveredPostId === post._id && (
                    <div className="flex items-center justify-between space-x-4 px-4 py-3 rounded-[50px] absolute -top-11 -left-3 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
                      <button
                        title="Like"
                        className="hover:scale-150 duration-100 hover:-mt-1"
                        onClick={() => handleReactionToggle(post._id, "like")}
                      >
                        <PostLike liked={like} />
                      </button>
                      <button
                        title="Love"
                        className="hover:scale-150 duration-100"
                        onClick={() => handleReactionToggle(post._id, "love")}
                      >
                        <LoveIcon loved={love} />
                      </button>
                      <button
                        title="Celebrate"
                        className="hover:scale-150 duration-100"
                        onClick={() =>
                          handleReactionToggle(post._id, "celebrate")
                        }
                      >
                        <PostSupportIcon celebrated={celebrate} />
                      </button>
                      <button
                        title="Support"
                        className="hover:scale-150 duration-100"
                        onClick={() =>
                          handleReactionToggle(post._id, "support")
                        }
                      >
                        <PostHandHeartIcon supported={support} />
                      </button>
                      <button
                        title="Insightful"
                        className="hover:scale-150 duration-100"
                        onClick={() =>
                          handleReactionToggle(post._id, "insightful")
                        }
                      >
                        <PostIdeaIcon insightfulled={insightful} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {!isFetchingPosts && posts?.length !== 0 && (
        <div className="space-x-2 flex items-center justify-center pt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`${
              theme === "light" ? "text-gray-600" : "text-white"
            }  py-2  rounded-lg mx-2`}
          >
            <FaRegArrowAltCircleLeft className="text-2xl" />
          </button>
          <span
            className={`${theme === "light" ? "text-gray-600" : "text-white"}`}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`${
              theme === "light" ? "text-gray-600" : "text-white"
            }  py-2  rounded-lg mx-2`}
          >
            <FaRegArrowAltCircleRight className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPosts;
