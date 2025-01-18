import twitter from "../../assets/user-profile/x.png";
import active from "../../assets/home/active.png";
import whiteBorder from "../../assets/home/p-border.png";
import linkedIn from "../../assets/home/linkedIn.png";
import facebook from "../../assets/home/facebook.png";
import github from "../../assets/home/github.png";
import ytube from "../../assets/icon/yt.png";
import pintrst from "../../assets/icon/pintrst.png";
import pw from "../../assets/icon/pw.png";
import tiktok from "../../assets/icon/tiktok.png";
import instaIcon from "../../assets/icon/instagram.png";
import postCover from "../../assets/home/project-post.png";
import "../../styles/buttonStyle.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/UserContext";
import FriendSection from "./FriendSection";
import { FaLocationArrow } from "react-icons/fa";
import GoogleAdComponent from "../../GoogleAdComponent/GoogleAdComponent";

const RightSidebar = ({ theme }) => {
  //   {
  //     "_id": "67395094c7e00306bb4fd02a",
  //     "orcid": "jh",
  //     "twitter": "kjb",
  //     "github": "",
  //     "linkedIn": "",
  //     "instagram": "",
  //     "personalWebsite": "",
  //     "youtube": "",
  //     "tiktok": "",
  //     "pinterest": "",
  //     "facebook": "",
  // }
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

  const currentOrcID = socialInfo?.orcid;
  const currentGithub = socialInfo?.github;
  const currentLinkedIn = socialInfo?.linkedIn;
  const currentTwitter = socialInfo?.twitter;
  const currentInstagram = socialInfo?.instagram;
  const currentPersonalWebsite = socialInfo?.personalWebsite;
  const currentYoutube = socialInfo?.youtube;
  const currentTiktok = socialInfo?.tiktok;
  const currentFacebook = socialInfo?.facebook;
  const currentResearchGate = socialInfo?.researchGate;
  const currentGoogleScholar = socialInfo?.googleScholar;
  const currentPinterest = socialInfo?.pinterest;

  const socialLinks = [
    {
      url: `https://orcid.org/${currentOrcID}`,
      icon: "./orcid.svg.png",
      alt: "ORCID",
      value: currentOrcID,
    },
    {
      url: `https://www.researchgate.net/profile/${currentResearchGate}`,
      icon: "./rg.png",
      alt: "ORCID",
      value: currentResearchGate,
    },
    {
      url: `https://scholar.google.com/citations?user=${currentGoogleScholar}`,
      icon: "./google-scholar-hd-logo.png",
      alt: "ORCID",
      value: currentGoogleScholar,
    },
    {
      url: `https://facebook.com/${currentFacebook}`,
      icon: facebook,
      alt: "Facebook",
      value: currentFacebook,
    },
    {
      url: `https://linkedin.com/in/${currentLinkedIn}`,
      icon: linkedIn,
      alt: "LinkedIn",
      value: currentLinkedIn,
    },
    {
      url: `https://github.com/${currentGithub}`,
      icon: github,
      alt: "GitHub",
      value: currentGithub,
    },
    {
      url: `https://twitter.com/${currentTwitter}`,
      icon: twitter,
      alt: "Twitter",
      value: currentTwitter,
    },
    {
      url: `https://instagram.com/${currentInstagram}`,
      icon: instaIcon,
      alt: "Instagram",
      value: currentInstagram,
    },
    {
      url: `https://youtube.com/${currentYoutube}`,
      icon: ytube,
      alt: "YouTube",
      value: currentYoutube,
    },
    {
      url: `https://tiktok.com/@${currentTiktok}`,
      icon: tiktok,
      alt: "TikTok",
      value: currentTiktok,
    },
    {
      url: `https://${currentPersonalWebsite}`,
      icon: pw,
      alt: "Website",
      value: currentPersonalWebsite,
    },
  ];

  // Filter and limit to the first 4 non-empty social links
  const availableLinks = socialLinks
    .filter((link) => link.value && link.value.trim() !== "")
    .slice(0, 4);

  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://i.ibb.co.com/Qf0HmJw/user.png";

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

  console.log(getSingleUserSocialInfo?.data[0]);

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
                className="h-[100px] w-[100px] absolute -top-16 right-[12px] md:right-0"
                src={whiteBorder}
                loading="lazy"
                alt="dashedborder"
              />

              {/* <img
                className="w-6 -mt-5 z-10"
                src={active}
                loading="lazy"
                alt="active"
              /> */}
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
              {availableLinks.map((link, index) => (
                <a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.url}
                >
                  <img
                    className={`${
                      link.value === currentGithub && "h-[55px]"
                    } h-12 rounded-full`}
                    src={link.icon}
                    loading="lazy"
                    alt={link.alt}
                  />
                </a>
              ))}
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

      <GoogleAdComponent/>
      
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
            <a href="/dashboard/create-projects">
              {theme === "light" ? (
                <button className="px-8 py-2 text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)]">
                  Post Project
                </button>
              ) : (
                <button className="postProjectBtn">
                  <p>Post Project</p>
                </button>
              )}
            </a>
            {/* <a href={singleUser ? "/dashboard/create-projects" : "/login"}>
              {theme === "light" ? (
                <button className="px-8 py-2 text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)]">
                  Post Project
                </button>
              ) : (
                <button className="postProjectBtn">
                  <p>Post Project</p>
                </button>
              )}
            </a> */}
            <img className="pt-10" src={postCover} loading="lazy" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
