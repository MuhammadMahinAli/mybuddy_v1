import twitter from "../../assets/user-profile/x.png";
import active from "../../assets/home/active.png";
import whiteBorder from "../../assets/home/p-border.png";
import linkedIn from "../../assets/home/linkedIn.png";
import facebook from "../../assets/home/facebook.png";
import github from "../../assets/home/github.png";
import postCover from "../../assets/home/project-post.png";
import "../../styles/buttonStyle.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/UserContext";
import FriendSection from "./FriendSection";

const RightSidebar = ({ theme }) => {
  const {
    singleUser,
    getUserPost,
    getAllProjectByUser,
    getAcceptedFriendRequest,
    getSingleUserSocialInfo,
  } = useContext(AuthContext);
  const userName = singleUser
    ? singleUser?.data?.name?.firstName + " " + singleUser?.data?.name?.lastName
    : "Welcome Guest !";
  const userPostNumber = singleUser ? getUserPost?.data?.length : "0";
  const userProjectNumber = singleUser
    ? getAllProjectByUser?.data?.length
    : "0";
  const userTotalFriend = singleUser
    ? getAcceptedFriendRequest?.data?.length
    : "0";
  const userCoverPic = singleUser?.data?.coverPic;
  const socialInfo = getSingleUserSocialInfo?.data[0];
  const currentOrcID = socialInfo?.orcid ? socialInfo?.orcid : "https://orcid.org/";
  const currentGithub = socialInfo?.github ? socialInfo?.github : "https://github.com/";
  const currentLinkedIn = socialInfo?.linkedIn ? socialInfo?.linkedIn : "https://linkedin.com/";
  const currentFacebook = socialInfo?.facebook ? socialInfo?.facebook : "https://facebook.com/";
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";

  console.log(userPostNumber);
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      age: 28,
      city: "New York",
      interests: ["reading", "hiking", "coding"],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      age: 34,
      city: "San Francisco",
      interests: ["gaming", "cycling", "cooking"],
    },
    {
      id: 3,
      name: "Carol Martinez",
      email: "carol.martinez@example.com",
      age: 25,
      city: "Chicago",
      interests: ["photography", "traveling", "dancing"],
    },
    {
      id: 4,
      name: "David Lee",
      email: "david.lee@example.com",
      age: 42,
      city: "Seattle",
      interests: ["music", "running", "tech"],
    },
    {
      id: 5,
      name: "Eva Green",
      email: "eva.green@example.com",
      age: 30,
      city: "Boston",
      interests: ["yoga", "writing", "gardening"],
    },
    {
      id: 6,
      name: "Frank Brown",
      email: "frank.brown@example.com",
      age: 37,
      city: "Los Angeles",
      interests: ["movies", "swimming", "robotics"],
    },
  ];

  const getRandomUsers = (users, count) => {
    const shuffled = users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    setRandomUsers(getRandomUsers(users, 2));
  }, []);

  //console.log(randomUsers);

  return (
    <div className="hidden lg:block space-y-7">
      {/*  top*/}
      <div
        className={`${
          theme !== "light" &&
          "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[15px]"
        }`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-white"
              : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
          } shadow-[-1px_0px_56px_-6px_rgba(134,_134,_134,_0.25)] rounded-[15px] lg:w-[370px] xl:w-[400px] 2xl:w-[380px]`}
        >
          <div
            className={`h-24 w-full rounded-t-[15px] ${
              userCoverPic
                ? `bg-cover bg-center`
                : theme === "light"
                ? "bg-[#2adba4]"
                : "bg-transparent"
            }`}
            style={{
              backgroundImage: userCoverPic ? `url(${userCoverPic})` : "none",
            }}
          />
          <div className="flex flex-col justify-center items-center py-4">
            <div className="flex flex-col justify-center items-center relative">
              <img
                src={userImage}
                className="h-[100px] w-[100px] -mt-16 rounded-full p-[8px] "
              />

              <img
                className="w-8 lg:w-32 xl:w-36 absolute -top-16 right-[12px] md:right-0"
                src={whiteBorder}
                loading="lazy"
                alt="dashedborder"
              />

              <img
                className="w-6 -mt-5 z-10"
                src={active}
                loading="lazy"
                alt="active"
              />
            </div>
            <p
              className={`${
                theme === "light" ? "graish" : "text-white"
              } text-xl capitalize font-semibold pt-1`}
            >
              {userName}
            </p>
            <p
              className={`${
                theme === "light" ? "text-gray-500" : "text-[#a7a5a5]"
              } text-lg font-medium pt-b `}
            >
              {singleUser?.data?.role}
            </p>

            <div className="flex py-7 space-x-2">
              {/* <a
                target="blank"
                href={
                  singleUser
                    ? `https://twitter.com/${currentTwitter}`
                    : "/"
                }
              >
                <img className="h-12 pr-1" src={twitter} loading="lazy" alt="" />
              </a> */}
              <a
                target="blank"
                href={
                  singleUser
                    ? `https://orcid.org/${currentOrcID}`
                    : "/"
                }
              >
                <img
                  className="h-[55px]"
                  src="./orcid.svg.png"
                  loading="lazy"
                  alt=""
                />
              </a>

              <a
                target="blank"
                href={
                  singleUser ? `https://facebook.com/${currentFacebook}` : "/"
                }
              >
                <img className="h-12" src={facebook} loading="lazy" alt="" />
              </a>
              {/* <img className="h-12" src={google} loading="lazy" alt="" /> */}
              <a
                target="blank"
                href={
                  singleUser
                    ? `https://linkedin.com/in/${currentLinkedIn}`
                    : "/"
                }
              >
                <img
                  className="h-[55px]"
                  src={linkedIn}
                  loading="lazy"
                  alt=""
                />
              </a>

              <a
                target="blank"
                href={singleUser ? `https://github.com/${currentGithub}` : "/"}
              >
                <img className="h-14" src={github} loading="lazy" alt="" />
              </a>
            </div>

            <ul className="flex justify-between items-center w-80">
              <li className="flex flex-col items-center justify-center border-r-2  py-2 w-full text-center  font-medium">
                <p
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-xl`}
                >
                  {userPostNumber}
                </p>
                <p
                  className={`${
                    theme === "light" ? "text-gray-500" : "text-white"
                  } font-medium text-[14px]`}
                >
                  POSTS
                </p>
              </li>
              <li className="flex flex-col items-center justify-center  border-r-2  py-2 w-full text-center  font-medium">
                <p
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-xl`}
                >
                  {userProjectNumber}
                </p>
                <p
                  className={`${
                    theme === "light" ? "text-gray-500" : "text-white"
                  } font-medium text-[14px]`}
                >
                  PROJECTS
                </p>
              </li>
              <li className="flex flex-col items-center justify-center    py-2 w-full text-center  font-medium">
                <p
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-xl`}
                >
                  {userTotalFriend}
                </p>
                <p
                  className={`${
                    theme === "light" ? "text-gray-500" : "text-white"
                  } font-medium text-[14px]`}
                >
                  FRIENDS
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* center */}
      <FriendSection theme={theme} active={active} />

      {/* bottom */}
      <div
        className={`${
          theme !== "light" &&
          "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[15px]"
        }`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-white text-gray-500"
              : "text-white bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
          } shadow-[-1px_0px_56px_-6px_rgba(134,_134,_134,_0.25)] lg:py-3 rounded-[15px] lg:w-[370px]  xl:w-[400px] 2xl:w-[380px]  `}
        >
          <div className="flex flex-col justify-center items-center py-4">
            <p className="text-xl font-bold pt-3 ">Browse Our</p>
            <p className="text-lg font-normal pb-3">Projects</p>
            <a href={singleUser ? "/dashboard/create-projects" : "/"}>
              {theme === "light" ? (
                <button className="px-8 py-2 text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)]">
                  Post Project
                </button>
              ) : (
                <button className="postProjectBtn">
                  <p>Post Project</p>
                </button>

                // <div className="flex flex-col items-center py-2">
                //   <div className="w-5 md:w-7 h-[4px] md:h-[5px] shadow-[0px_0px_5px_#0cfc34,_0px_0px_15px_#0cfc34,_0px_0px_30px_#0cfc34,_0px_0px_60px_#0cfc34] rounded-3xs bg-[#2ADBA4] rounded-t-xl blur-[1px]" />
                //   <p className="text-sm lg:text-[18px] rounded-2xl py-1 md:py-2 lg:py-3 px-4 md:px-7 tracking-wide text-white font-bold shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
                //     Post Project
                //   </p>
                //   <div className="w-5 md:w-7 h-[4px] md:h-[5px] shadow-[0px_0px_5px_#1eff45,_0px_0px_15px_#1eff45,_0px_0px_30px_#1eff45,_0px_0px_60px_#1eff45] rounded-3xs bg-[#2ADBA4] rounded-b-xl blur-[1px]" />
                // </div>
              )}
            </a>
            <img className="pt-10" src={postCover} loading="lazy" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
