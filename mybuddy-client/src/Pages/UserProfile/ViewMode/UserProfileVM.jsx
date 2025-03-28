/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import whiteBorder from "../../../assets/user-profile/profile-white-border.png";
import darkBorder from "../../../assets/user-profile/profile-dark-border.png";
import xIcon from "../../../assets/user-profile/x.png";
import facebookIcon from "../../../assets/home/facebook.png";
import githubIcon from "../../../assets/user-profile/github.png";
import linkedinIcon from "../../../assets/user-profile/linkedin.png";
import { FaHeart } from "react-icons/fa";
import DekstopFormatVM from "./DekstopFormatVM";
import MobileTabFormetVM from "./MobileTabFormetVM";
import UserProfileAboutVM from "./UserProfileAboutVM";
import { AuthContext } from "../../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../../utils/apiFetch";
import Swal from "sweetalert2";

const UserProfileVM = () => {
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const { createNewRequest, isFetchingSkill, getAllStatusFriendRequest } =
    useContext(AuthContext);
  const requestedId = user?._id;
  const [data, setData] = useState(null);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  const { id } = useParams();
  //getting designer data
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = async () => {
      const res = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/member/getUserById/${id}`,
        "GET"
      );
      setData(res?.data ?? {});
      console.log(res?.data);
    };
    fetchData();
  }, [id]);

  //getting designer different info
  const [userInfo, setUserInfo] = useState({
    userPersonalInfo: {},
    posts: [],
    projects: [],
    experiences: [],
    licenses: [],
    socialInfos: [],
    skills: [],
    friends: [],
  });
  useEffect(() => {
    if (!data?._id) {
      return;
    }
    const fetchData = async () => {
      const userPersonalInfo = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/member/getUserById/${data?._id}`,
        "GET"
      );
      const posts = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/posts/getUserPostById/${data?._id}`,
        "GET"
      );
      const projects = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/project/getUserProjectById/${data?._id}`,
        "GET"
      );
      const experiences = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/experience/getExperienceByUser/${data?._id}`,
        "GET"
      );
      const licenses = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/license/getLicenseByUser/${data?._id}`,
        "GET"
      );
      const socialInfos = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/socialInfo/getSocialInfoByUser/${data?._id}`,
        "GET"
      );
      const skills = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/skill/getUserSkillById/${data?._id}`,
        "GET"
      );
      const friends = await apiFetch(
        `https://test-two-22w0.onrender.com/api/v1/friend/accepted/getFriendRequest/${data?._id}`,
        "GET"
      );
      setUserInfo({
        userPersonalInfo: userPersonalInfo?.data ?? {},
        posts: posts?.data ?? [],
        projects: projects?.data ?? [],
        experiences: experiences?.data ?? [],
        licenses: licenses?.data ?? [],
        socialInfos: socialInfos?.data ?? [],
        skills: skills?.data ?? [],
        friends: friends?.data ?? [],
      });
    };
    fetchData();
  }, [data]);

  console.log("id", user?._id);

  // user posts,

  const userData = userInfo?.userPersonalInfo;
  const allPost = userInfo?.posts;
  const allProject = userInfo?.projects;
  const allLicense = userInfo?.licenses;
  const allExperience = userInfo?.experiences;
  const allSocialInfo = userInfo?.socialInfos;
  const allSkill = userInfo?.skills;
  const allFriend = userInfo?.friends;

  const currentTwitter = allSocialInfo?.twitter ? allSocialInfo?.twitter : "";
  const currentGithub = allSocialInfo?.github ? allSocialInfo?.github : "";
  const currentLinkedIn = allSocialInfo?.linkedIn
    ? allSocialInfo?.linkedIn
    : "";
  const currentFacebook = allSocialInfo?.facebook
    ? allSocialInfo?.facebook
    : "";


  // Function to get friend status based on `requestedId`
  const friendId = userData?._id;

  // Function to get the friend request status
  // const getFriendStatus = () => {
  //   const friend = getAllStatusFriendRequest?.data?.find(
  //     (frnd) =>
  //       frnd?.requestedBy?._id === friendId || frnd?.requestedTo?._id === friendId
  //   );

  //   return friend
  //     ? { status: friend.status, friend }
  //     : { status: "No friend request found.", friend: null };
  // };

  const getFriendStatus = () => {
    const friend = getAllStatusFriendRequest?.data?.find(
      (frnd) =>
        frnd?.requestedBy?._id === friendId || frnd?.requestedTo?._id === friendId
    );
  
    if (friend) {
      return { status: friend.status, friend };
    }
  
    if (sentFriendRequests.includes(friendId)) {
      return { status: "Pending", friend: null }; // Locally tracked
    }
  
    return { status: "No friend request found.", friend: null };
  };
  

  const { status, friend } = getFriendStatus();

  const buttonText =
    status === "Accepted"
      ? "Friend"
      : status === "Pending"
      ? "Request Sent"
      : status === "Rejected"
      ? "Rejected"
      : "Send Request";

  const sentFriendRequest = () => {
    const datas = {
      requestedBy: requestedId,
      requestedTo: userData?._id,
      status: "Pending",
    };
    createNewRequest(datas)
    .unwrap() 
    Swal.fire({
      icon: "success",
      title: "Well done !",
      text: "You've sent friend request successfully.",
    });
    setSentFriendRequests((prev) => [...prev, userData?._id]);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2500);
  };

  useEffect(() => {
    if (getAllStatusFriendRequest?.data) {
      const ids = getAllStatusFriendRequest.data.map((req) => {
        return req?.requestedTo?._id === requestedId
          ? req?.requestedBy?._id
          : req?.requestedTo?._id;
      });
  
      setSentFriendRequests(ids);
    }
  }, [getAllStatusFriendRequest]);
  

  return (
    <div>
      {/* cover photo  3e4246 */}

      <div
        className={`${
          theme === "light" ? "bg-gray-400" : "bg-[#3e4246]"
        }  h-[180px] md:h-[250px]`}
      >
        {userData?.coverPic && (
          <img
            src={userData?.coverPic}
            loading="lazy"
            alt="Cover Photo"
            className="h-[180px] md:h-[250px] w-full object-cover z-0 p-[0px] "
          />
        )}

        {/* <div className="lg:hidden pt-5 md:pt-12 px-5 md:px-10 flex justify-between items-center">
          <BackButton />
          <UpdateButton />
        </div> */}

        {/* {theme === "light" ? (
          <div className="hidden lg:block p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc] float-right lg:mt-[210px] xl:mt-[200px] lg:mr-1 3xl:mr-4">
            <button className="flex items-center space-x-1 lg:text-sm  rounded-[13px] font-semibold graish lg:px-1 lg:py-1 xl:px-4 xl:py-2 bg-gray-400">
              <CameraIcon2 theme={theme} />
              <p>Edit Cover Photo</p>
            </button>
          </div>
        ) : (
          <button className="hidden lg:block updateCoverBtn float-right relative top-5 right-5">
            <p>
              <span>
                <CameraIcon2 theme={theme} />
              </span>
              Edit Cover Photo
            </p>
          </button>
        )} */}
      </div>
      {/* profile  */}
      <div className="z-50 -mt-20 space-y-5">
        <div
          className={`${
            theme !== "light" &&
            "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-3xl w-full md:w-11/12 lg:w-9/12 mx-0 md:mx-7 lg:mx-[100px] xl:mx-36"
          }`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-white w-full md:w-11/12 lg:w-9/12 mx-0 md:mx-7 lg:mx-[100px] xl:mx-36"
                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px]"
            } rounded-3xl lg:rounded-3xl relative  py-10  z-40 shadow-2xl`}
          >
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center ">
              {/* left */}
              <div className="">
                <ul className="flex justify-between items-center w-64 xl:w-80">
                  <li className="flex flex-col items-center justify-center border-r-2  py-2 w-full text-center  font-medium">
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } text-[16px] xl:text-xl`}
                    >
                      {allPost?.length}
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } font-medium text-[14px] xl:text-[16px]`}
                    >
                      POSTS
                    </p>
                  </li>
                  <li className="flex flex-col items-center justify-center  border-r-2  py-2 w-full text-center  font-medium">
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } text-[16px] xl:text-xl`}
                    >
                      {allProject?.length}
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } font-medium text-[14px] xl:text-[16px]`}
                    >
                      PROJECTS
                    </p>
                  </li>
                  <li className="flex flex-col items-center justify-center    py-2 w-full text-center  font-medium">
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } text-[16px] xl:text-xl`}
                    >
                      {allFriend?.length}
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } font-medium text-[14px] xl:text-[16px]`}
                    >
                      FRIENDS
                    </p>
                  </li>
                </ul>
              </div>
              {/* center */}
              {/* <div className=" bg-red-400 hidden lg:flex flex-col justify-start items-start relative">
                <img
                  src={
                    userData?.profilePic ||
                    "https://i.ibb.co.com/FKKD4mT/opp.png"
                  }
                  className="h-32 w-32 -mt-[115px] rounded-full p-[9px] "
                />

                <img
                  className="w-8 lg:w-32 xl:h-32 xl:w-36 absolute -top-28 right-[12px] md:right-0"
                  src={theme === "light" ? whiteBorder : darkBorder}
                  loading="lazy"
                  alt="dashedborder"
                />
              </div> */}
              {/* right */}
              <div className=" py-6 lg:py-0 lg:px-3 3xl:px-8">
                <div className="flex justify-between items-center space-x-3">
                  {/* {theme === "light" ? (
                    <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                      <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
                        Proposal
                      </button>
                    </div>
                  ) : (
                    <p className="cursor-pointer text-sm lg:text-[14px] font-medium rounded-[15px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
                      PROPOSAL
                    </p>
                  )} */}
                  {/* <p>{isFriend ? "Friend" : " Friend Request"}</p> */}
                  {/* friend request button test*/}

                  {/* friend request button */}

                  {theme === "light" ? (
                    buttonText === "Send Request" ? (
                      <button
                        onClick={sentFriendRequest}
                        className="lg:text-sm xl:text-lg rounded-[13px] font-semibold px-3 py-2 xl:px-4 xl:py-2 bg-gradient-to-l from-[#2adba4] to-[#69f9cc] text-white"
                      >
                        {buttonText}
                      </button>
                    ) : (
                      <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                        <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
                          {buttonText}
                        </button>
                      </div>
                    )
                  ) : (
                    <button
                      onClick={
                        buttonText === "Send Request"
                          ? sentFriendRequest
                          : undefined
                      }
                      className="profileFriendRequestBtn"
                    >
                      <p>{buttonText}</p>
                    </button>
                  )}

                  <div
                    className={`${
                      theme === "light"
                        ? "bg-red-200"
                        : "border border-[#9370DB]"
                    } rounded-[11px] px-3 py-2 xl:px-3 xl:py-2 flex justify-center items-center`}
                  >
                    <FaHeart className="text-2xl font-semibold text-red-500 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* profile for mobile and tab */}
              <div className=" lg:hidden flex flex-col justify-center items-center space-y-4 relative">
                <img
                  src={
                    userData?.profilePic ||
                    "https://i.ibb.co.com/FKKD4mT/opp.png"
                  }
                  className=" h-20 w-20 md:w-32 md:h-32 -mt-20 md:-mt-24 lg:-mt-28 rounded-full p-2 md:p-[10px] lg:p-[8px] "
                />

                <img
                  className="w-20 md:w-32 lg:w-32 xl:w-36 absolute -top-[95px] md:-top-[110px] lg:-top-28 md:right-[27px] lg:right-14"
                  src={theme === "light" ? whiteBorder : darkBorder}
                  loading="lazy"
                  alt="dashedborder"
                />

                {/* <CameraIcon /> */}

                <div>
                  <h1
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } text-center capitalize text-xl font-bold`}
                  >
                    {userData?.name?.firstName}
                    {userData?.name?.lastName}
                  </h1>
                  <div className="space-y-1 flex flex-col justify-center items-center pt-3">
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      }`}
                    >
                      {userData?.role}
                    </p>
                    {userData?.phoneNumberPrivacy !== false && (
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        }`}
                      >
                        {userData?.phoneNumber}
                      </p>
                    )}
                    {userData?.adddressPrivacy !== false && (
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        }`}
                      >
                        {userData?.address}
                      </p>
                    )}
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      }`}
                    >
                      {userData?.country}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {/* <img src={xIcon} className="h-9 rounded-full" />
                  <img src={googleIcon} className="h-9 rounded-full" />
                  <img src={linkedinIcon} className="h-9 rounded-full" />
                  <img src={githubIcon} className="h-9 rounded-full" /> */}

                  <a
                    target="blank"
                    href={`https://twitter.com/${currentTwitter}`}
                  >
                    <img className="9" src={xIcon} loading="lazy" alt="" />
                  </a>

                  <a
                    target="blank"
                    href={`https://facebook.com/${currentFacebook}`}
                  >
                    <img
                      className="h-9  p-[2px]"
                      src={facebookIcon}
                      loading="lazy"
                      alt=""
                    />
                  </a>

                  <a
                    target="blank"
                    href={`https://linkedin.com/in/${currentLinkedIn}`}
                  >
                    <img
                      className="h-9 "
                      src={linkedinIcon}
                      loading="lazy"
                      alt=""
                    />
                  </a>

                  <a
                    target="blank"
                    href={`https://github.com/${currentGithub}`}
                  >
                    <img
                      className="h-9"
                      src={githubIcon}
                      loading="lazy"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            {/* profile for dekstop */}
            <div className=" hidden lg:flex flex-col justify-center items-center space-y-3 lg:pt-6">
            <div className="-mt-20  hidden lg:flex flex-col justify-start items-start relative">
                <img
                  src={
                    userData?.profilePic ||
                    "https://i.ibb.co.com/FKKD4mT/opp.png"
                  }
                  className="h-32 w-32 -mt-[115px] rounded-full p-[9px] "
                />

                <img
                  className="w-8 lg:w-32 xl:h-32 xl:w-36 absolute -top-28 right-[12px] md:right-0"
                  src={theme === "light" ? whiteBorder : darkBorder}
                  loading="lazy"
                  alt="dashedborder"
                />
              </div>
              <div className="pt-8 xl:pt-10 3xl:pt-7 flex flex-col justify-center items-center space-y-3 pb-10">
                <h1
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } capitalize text-xl font-bold`}
                >
                  {userData?.name?.firstName} {userData?.name?.lastName}
                </h1>
                <div className="space-y-1 flex flex-col justify-center items-center pt-1">
                  <p
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } font-medium`}
                  >
                    Role: {userData?.role}
                  </p>
                  {userData?.phoneNumberPrivacy !== false &&
                    userData?.phoneNumber && (
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        } font-medium`}
                      >
                        Contact: {userData?.phoneNumber}
                      </p>
                    )}
                  {userData?.adddressPrivacy !== false && userData?.address && (
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } font-medium`}
                    >
                      Address: {userData?.address}
                    </p>
                  )}
                  {userData?.country && (
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } font-medium`}
                    >
                      Country: {userData?.country}
                    </p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <a
                    target="blank"
                    href={`https://twitter.com/${currentTwitter}`}
                  >
                    <img className="h-9" src={xIcon} loading="lazy" alt="" />
                  </a>
                  <a
                    target="blank"
                    href={`https://facebook.com/${currentFacebook}`}
                  >
                    <img
                      className="h-9"
                      src={facebookIcon}
                      loading="lazy"
                      alt=""
                    />
                  </a>
                  {/* <img className="h-12" src={google} loading="lazy" alt="" /> */}
                  <a
                    target="blank"
                    href={`https://linkedin.com/in/${currentLinkedIn}`}
                  >
                    <img
                      className="h-9 "
                      src={linkedinIcon}
                      loading="lazy"
                      alt=""
                    />
                  </a>
                  <a
                    target="blank"
                    href={`https://github.com/${currentGithub}`}
                  >
                    <img
                      className="h-9"
                      src={githubIcon}
                      loading="lazy"
                      alt=""
                    />
                  </a>
                </div>
              </div>

              {userData?.about && (
                <p
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } capitalize border-t text-center px-5 border-[#838DAA] py-5`}
                >
                  {userData?.about}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* about , activity */}
        <div className="lg:hidden lg:w-9/12 px-5 md:mx-7 lg:mx-[100px] xl:mx-36">
          <UserProfileAboutVM about={userData?.about} theme={theme} />
        </div>
      </div>
      <MobileTabFormetVM
        isFetchingSkill={isFetchingSkill}
        allExperience={allExperience}
        allLicense={allLicense}
        allPost={allPost}
        allProject={allProject}
        allSkill={allSkill}
        allSocialInfo={allSocialInfo}
        theme={theme}
      />
      <DekstopFormatVM
        isFetchingSkill={isFetchingSkill}
        allExperience={allExperience}
        allLicense={allLicense}
        allPost={allPost}
        allProject={allProject}
        allSkill={allSkill}
        allSocialInfo={allSocialInfo}
        theme={theme}
      />
    </div>
  );
};

export default UserProfileVM;
