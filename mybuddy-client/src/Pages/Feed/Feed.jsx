import { useEffect, useState, useContext } from "react";
import AboutTab from "./AboutTab";
import ProjectTab from "./ProjectTab";
import SkillTab from "./SkillTab";
import SocialTab from "./SocialTab";
import MobileNavbar from "../../common/MobileNavbar/MobileNavbar";
import TabletNavbar from "../TabletNavbar/TabletNavbar";
import { useSelector } from "react-redux";
import feedWhiteBorder from "../../assets/home/feed-w-b.png";
import feedDarkBorder from "../../assets/home/feed-d-b.png";
import { AuthContext } from "../../Context/UserContext";
import { apiFetch } from "../../utils/apiFetch";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const Feed = () => {
  const [activeTab, setActiveTab] = useState({});
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const { getAllUsers, user, createNewRequest, getAllStatusFriendRequest } =
    useContext(AuthContext);
  const requestedId = user?._id;

  const getShuffledUsers = () => {
    if (!getAllUsers?.data) return [];

    // Filter out the logged-in user
    const filteredUsers = getAllUsers?.data?.filter(
      (u) => u?._id !== user?._id
    );

    // Shuffle the filtered users
    const shuffled = [...filteredUsers].sort(() => 0.5 - Math.random());
    return shuffled;
  };

  useEffect(() => {
    if (getAllUsers?.data) {
      const shuffledUsersArray = getShuffledUsers();
      setAllUsers(shuffledUsersArray);
    }
  }, [getAllUsers]);

  const toggleTab = async (userId, tab) => {
    setActiveTab((prevState) => ({
      ...prevState,
      [userId]: tab,
    }));

    if (!userData[userId]?.[tab]) {
      await fetchData(userId, tab);
    }
  };

  const fetchData = async (userId, tab) => {
    if (!userId || !tab) return;

    try {
      let data;
      switch (tab) {
        case "description":
          data = await apiFetch(
            `http://localhost:3000/api/v1/member/getUserById/${userId}`,
            "GET"
          );
          setUserData((prevState) => ({
            ...prevState,
            [userId]: {
              ...prevState[userId],
              description: data?.data ?? {},
            },
          }));
          break;
        case "skill":
          data = await apiFetch(
            `http://localhost:3000/api/v1/skill/getUserSkillById/${userId}`,
            "GET"
          );
          setUserData((prevState) => ({
            ...prevState,
            [userId]: {
              ...prevState[userId],
              skill: data?.data ?? [],
            },
          }));
          break;
        case "project":
          data = await apiFetch(
            `http://localhost:3000/api/v1/project/getUserProjectById/${userId}`,
            "GET"
          );
          setUserData((prevState) => ({
            ...prevState,
            [userId]: {
              ...prevState[userId],
              project: data?.data ?? [],
            },
          }));
          break;
        case "social":
          data = await apiFetch(
            `http://localhost:3000/api/v1/socialInfo/getSocialInfoByUser/${userId}`,
            "GET"
          );
          setUserData((prevState) => ({
            ...prevState,
            [userId]: {
              ...prevState[userId],
              social: data?.data ?? [],
            },
          }));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const defaultTabs = {};
    allUsers?.forEach((user) => {
      defaultTabs[user?._id] = "description";
    });
    setActiveTab(defaultTabs);
  }, [allUsers]);

  const sentFriendRequest = (user) => {
    const datas = {
      requestedBy: requestedId,
      requestedTo: user?._id,
      status: "Pending",
    };
    createNewRequest(datas).unwrap();
    Swal.fire({
      icon: "success",
      title: "Well done !",
      text: "You've sent friend request successfully.",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };
  // Function to get friend status based on `requestedId`
  // const friendId = userData?._id;

  // Function to get the friend request status
  const getFriendStatus = (friendId) => {
    const friend = getAllStatusFriendRequest?.data?.find(
      (frnd) =>
        frnd?.requestedBy?._id === friendId || frnd?.requestedTo?._id === friendId
    );

    return friend
      ? { status: friend.status, friend }
      : { status: "No friend request found.", friend: null };
  };

  console.log(getAllUsers?.data);

  return (
    <div className="space-y-4">
      {allUsers?.map((user) => {
        // Get friend status for each user
        const { status, friend } = getFriendStatus(user?._id);
        const buttonText =
        status === "Accepted"
          ? "Friend"
          : status === "Pending"
          ? "Request Sent"
          : status === "Rejected"
          ? "Rejected"
          : "Send Request";

        return (
          <div
            key={user?._id}
            className={`${
              theme !== "light" &&
              "p-[1px] ml-5 md:ml-10 xl:ml-14 3xl:ml-16 w-11/12 bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[20px]"
            }`}
          >
            <div
              className={`${
                theme === "light"
                  ? "bg-[#fff]  ml-5 md:ml-10 xl:ml-14 3xl:ml-16 shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray w-11/12"
                  : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:mr-[1px] w-12/12"
              }  text-graish p-3 xl:p-5 rounded-[20px]`}
            >
              {/* User details and buttons */}
              <div className="lg:flex hidden flex-col lg:flex-row justify-between items-center md:space-y-4 lg:space-y-0">
                {/* Left */}
                <div className="flex justify-between items-center space-x-3">
                  <div className="relative">
                    <img
                      src={
                        user?.profilePic
                          ? user?.profilePic
                          : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                      }
                      loading="lazy"
                      alt=""
                      className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 rounded-full p-1"
                    />
                    <img
                      className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 absolute top-0  md:right-0"
                      src={theme === "light" ? feedDarkBorder : feedWhiteBorder}
                      loading="lazy"
                      alt="dashedborder"
                    />
                  </div>

                  {/* Description Button */}
                  {theme === "light" ? (
                    <div
                      onClick={() => toggleTab(user?._id, "description")}
                      className={`${
                        activeTab[user?._id] === "description"
                          ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                          : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                      }  cursor-pointer rounded-[27px] bg-[#d0f5fe] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
                    >
                      <p className="graish lg:text-sm xl:text-lg font-semibold">
                        Description
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => toggleTab(user?._id, "description")}
                      className="relative flex flex-col items-center py-2"
                    >
                      {activeTab[user?._id] === "description" && (
                        <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
                      )}
                      <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)] box-border">
                        Description
                      </p>
                    </div>
                  )}

                  {/* Skill Button */}
                  {theme === "light" ? (
                    <div
                      onClick={() => toggleTab(user?._id, "skill")}
                      className={`${
                        activeTab[user?._id] === "skill"
                          ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                          : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                      }  cursor-pointer rounded-[27px] bg-[#fde4f7] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
                    >
                      <p className="graish lg:text-sm xl:text-lg font-semibold">
                        All Skills
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => toggleTab(user?._id, "skill")}
                      className="relative flex flex-col items-center py-2"
                    >
                      {activeTab[user?._id] === "skill" && (
                        <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
                      )}
                      <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)]  box-border">
                        All Skills
                      </p>
                    </div>
                  )}

                  {/* Projects Button */}
                  {theme === "light" ? (
                    <div
                      onClick={() => toggleTab(user?._id, "project")}
                      className={`${
                        activeTab[user?._id] === "project"
                          ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                          : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                      }  cursor-pointer rounded-[27px] bg-[#fdeed4] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
                    >
                      <p className="graish lg:text-sm xl:text-lg font-semibold">
                        Projects
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => toggleTab(user?._id, "project")}
                      className="relative flex flex-col items-center py-2"
                    >
                      {activeTab[user?._id] === "project" && (
                        <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#FFCB33,_0px_0px_15px_#FFCB33,_0px_0px_30px_#FFCB33,_0px_0px_60px_#FFCB33] rounded-3xs bg-[#FFCB33] rounded-t-xl blur-[12px]" />
                      )}
                      <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
                        Projects
                      </p>
                    </div>
                  )}

                  {/* Social Button */}
                  {theme === "light" ? (
                    <div
                      onClick={() => toggleTab(user?._id, "social")}
                      className={`${
                        activeTab[user?._id] === "social"
                          ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
                          : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
                      }  cursor-pointer rounded-[27px] bg-[#caf79a73] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
                    >
                      <p className="graish lg:text-sm xl:text-lg font-semibold">
                        Social Media
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => toggleTab(user?._id, "social")}
                      className="relative flex flex-col items-center py-2"
                    >
                      {activeTab[user?._id] === "social" && (
                        <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#4EEBFF,_0px_0px_15px_#4EEBFF,_0px_0px_30px_#4EEBFF,_0px_0px_60px_#4EEBFF] rounded-3xs bg-[#4EEBFF] rounded-t-xl blur-[12px]" />
                      )}
                      <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
                        Social Media
                      </p>
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="flex justify-between items-center space-x-3">
                  <Link to={`/user/profile/${user?._id}`}>
                    {theme === "light" ? (
                      <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                        <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
                          Profile
                        </button>
                      </div>
                    ) : (
                      <p className="cursor-pointer text-sm lg:text-[14px] font-medium rounded-[15px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
                        profile
                      </p>
                    )}
                  </Link>

                  {/* Friend request button */}
                  {theme === "light" ? (
                    buttonText === "Send Request" ? (
                      <button
                        onClick={() => sentFriendRequest(user)}
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
                          ? () => sentFriendRequest(user)
                          : undefined
                      }
                      className="friendRequestBtn"
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
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                    </svg>
                    {/* <FaRegHeart className="text-2xl font-semibold text-red-500 bg-white cursor-pointer" /> */}
                  </div>
                </div>
              </div>

              {/* Mobile and Tablet navbar components */}
              <div className="lg:hidden flex justify-between items-center py-1">
                <MobileNavbar
                  toggleTab={toggleTab}
                  user={user}
                  activeTab={activeTab}
                  theme={theme}
                  sentFriendRequest={sentFriendRequest}
                />
              </div>
              <div className="hidden md:flex md:justify-between md:items-center lg:py-1">
                <TabletNavbar
                  toggleTab={toggleTab}
                  user={user}
                  activeTab={activeTab}
                  theme={theme}
                  sentFriendRequest={sentFriendRequest}
                />
              </div>

              {/* Tabs content rendering */}
              {activeTab[user?._id] === "description" && (
                <AboutTab theme={theme} user={user} />
              )}
              {activeTab[user?._id] === "skill" && (
                <SkillTab
                  user={user}
                  theme={theme}
                  skills={userData[user?._id]?.skill || []}
                />
              )}
              {activeTab[user?._id] === "project" && (
                <ProjectTab
                  user={user}
                  theme={theme}
                  projects={userData[user?._id]?.project || []}
                />
              )}
              {activeTab[user?._id] === "social" && (
                <SocialTab
                  user={user}
                  theme={theme}
                  socialInfos={userData[user?._id]?.social || []}
                />
              )}
            </div>
          </div>
        );
      })}

      {allUsers?.length === 0 && <Loading />}
    </div>
  );
};

export default Feed;

//-------------------------2nd

//<div className="space-y-4">
//      {allUsers?.map((user) => (
//
//        <div
//          key={user?._id}
//          className={`${
//            theme !== "light" &&
//            "p-[1px] ml-5 md:ml-10 xl:ml-14 3xl:ml-16 w-11/12 bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-[20px]"
//          }`}
//        >
//          <div
//            className={`${
//              theme === "light"
//                ? "bg-[#fff]  ml-5 md:ml-10 xl:ml-14 3xl:ml-16 shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray w-11/12"
//                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:mr-[1px] w-12/12"
//            }  text-graish p-3 xl:p-5 rounded-[20px]`}
//          >
//            <div className="lg:flex hidden flex-col lg:flex-row justify-between items-center md:space-y-4 lg:space-y-0">
//              {/* left */}
//              <div className="flex justify-between items-center space-x-3">
//                <div className="relative">
//                  <img
//                    src={
//                      user?.profilePic
//                        ? user?.profilePic
//                        : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                    }
//                    loading="lazy"
//                    alt=""
//                    className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 rounded-full p-1"
//                  />
//                  <img
//                    className="w-8 h-8 md:w-12 md:h-12 xl:w-12 xl:h-12 absolute top-0  md:right-0"
//                    src={theme === "light" ? feedDarkBorder : feedWhiteBorder}
//                    loading="lazy"
//                    alt="dashedborder"
//                  />
//                </div>
//
//                {/* Description Button */}
//                {theme === "light" ? (
//                  <div
//                    onClick={() => toggleTab(user?._id, "description")}
//                    className={`${
//                      activeTab[user?._id] === "description"
//                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                    }  cursor-pointer rounded-[27px] bg-[#d0f5fe] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                  >
//                    <p className="graish lg:text-sm xl:text-lg font-semibold">
//                      Description
//                    </p>
//                  </div>
//                ) : (
//                  <div
//                    onClick={() => toggleTab(user?._id, "description")}
//                    className="relative flex flex-col items-center py-2"
//                  >
//                    {activeTab[user?._id] === "description" && (
//                      <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
//                    )}
//                    <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)] box-border">
//                      Description
//                    </p>
//                  </div>
//                )}
//
//                {/* Skill Button */}
//                {theme === "light" ? (
//                  <div
//                    onClick={() => toggleTab(user?._id, "skill")}
//                    className={`${
//                      activeTab[user?._id] === "skill"
//                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                    }  cursor-pointer rounded-[27px] bg-[#fde4f7] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                  >
//                    <p className="graish lg:text-sm xl:text-lg font-semibold">
//                      All Skills
//                    </p>
//                  </div>
//                ) : (
//                  <div
//                    onClick={() => toggleTab(user?._id, "skill")}
//                    className="relative flex flex-col items-center py-2"
//                  >
//                    {activeTab[user?._id] === "skill" && (
//                      <div className="absolute top-[40%] w-7/12 md:w-10/12 h-[7px] lg:h-[20px] shadow-[0px_0px_5px_#f58e9f,_0px_0px_15px_#f58e9f,_0px_0px_30px_#f58e9f,_0px_0px_60px_#f58e9f] rounded-3xs bg-[#f33d5c] rounded-t-xl blur-[1px]" />
//                    )}
//                    <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(13px)]  box-border">
//                      All Skills
//                    </p>
//                  </div>
//                )}
//
//                {/* Projects Button */}
//                {theme === "light" ? (
//                  <div
//                    onClick={() => toggleTab(user?._id, "project")}
//                    className={`${
//                      activeTab[user?._id] === "project"
//                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                    }  cursor-pointer rounded-[27px] bg-[#fdeed4] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                  >
//                    <p className="graish lg:text-sm xl:text-lg font-semibold">
//                      Projects
//                    </p>
//                  </div>
//                ) : (
//                  <div
//                    onClick={() => toggleTab(user?._id, "project")}
//                    className="relative flex flex-col items-center py-2"
//                  >
//                    {activeTab[user?._id] === "project" && (
//                      <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#FFCB33,_0px_0px_15px_#FFCB33,_0px_0px_30px_#FFCB33,_0px_0px_60px_#FFCB33] rounded-3xs bg-[#FFCB33] rounded-t-xl blur-[12px]" />
//                    )}
//                    <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
//                      Projects
//                    </p>
//                  </div>
//                )}
//
//                {/* Social Button */}
//                {theme === "light" ? (
//                  <div
//                    onClick={() => toggleTab(user?._id, "social")}
//                    className={`${
//                      activeTab[user?._id] === "social"
//                        ? "shadow-[0px_2px_3px_rgba(0,_0,_0,_0.25)_inset]"
//                        : "shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
//                    }  cursor-pointer rounded-[27px] bg-[#caf79a73] border-[2px] border-solid px-4 py-2 flex justify-center items-center`}
//                  >
//                    <p className="graish lg:text-sm xl:text-lg font-semibold">
//                      Social Media
//                    </p>
//                  </div>
//                ) : (
//                  <div
//                    onClick={() => toggleTab(user?._id, "social")}
//                    className="relative flex flex-col items-center py-2"
//                  >
//                    {activeTab[user?._id] === "social" && (
//                      <div className="absolute top-[40%] w-7/12 md:w-11/12 h-[8px] lg:h-[10px] shadow-[0px_0px_5px_#4EEBFF,_0px_0px_15px_#4EEBFF,_0px_0px_30px_#4EEBFF,_0px_0px_60px_#4EEBFF] rounded-3xs bg-[#4EEBFF] rounded-t-xl blur-[12px]" />
//                    )}
//                    <p className="cursor-pointer text-sm xl:text-[16px] rounded-[27px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[1px_1px_5px_#eae3e3_inset] [backdrop-filter:blur(0px)]  box-border">
//                      Social Media
//                    </p>
//                  </div>
//                )}
//              </div>
//
//              {/* right */}
//              <div className="flex justify-between items-center space-x-3">
//                <Link to={`/user/profile/${user?._id}`}>
//                  {theme === "light" ? (
//                    <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
//                      <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
//                        Profile
//                      </button>
//                    </div>
//                  ) : (
//                    <p className="cursor-pointer text-sm lg:text-[14px] font-medium rounded-[15px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
//                      profile
//                    </p>
//                  )}
//                </Link>
//                {/* friend request button */}
//                {/* {theme === "light" ? (
//                  <div
//                    onClick={() => sentFriendRequest(user)}
//                    className="lg:text-sm xl:text-lg text-white font-semibold rounded-[13px] px-3 py-2 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]"
//                  >
//                    Add Friend
//                  </div>
//                ) : (
//                  <button className="friendRequestBtn">
//                    <p>ADD FRIEND</p>
//                  </button>
//                )} */}
//
//                {theme === "light" ? (
//                  buttonText === "Send Request" ? (
//                    <button
//                      onClick={sentFriendRequest}
//                      className="lg:text-sm xl:text-lg rounded-[13px] font-semibold px-3 py-2 xl:px-4 xl:py-2 bg-gradient-to-l from-[#2adba4] to-[#69f9cc] text-white"
//                    >
//                      {buttonText}
//                    </button>
//                  ) : (
//                    <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
//                      <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
//                        {buttonText}
//                      </button>
//                    </div>
//                  )
//                ) : (
//                  <button
//                    onClick={
//                      buttonText === "Send Request"
//                        ? sentFriendRequest
//                        : undefined
//                    }
//                    className="friendRequestBtn"
//                  >
//                    <p>{buttonText}</p>
//                  </button>
//                )}
//
//                <div
//                  className={`${
//                    theme === "light" ? "bg-red-200" : "border border-[#9370DB]"
//                  } rounded-[11px] px-3 py-2 xl:px-3 xl:py-2 flex justify-center items-center`}
//                >
//                  <svg
//                    width="24"
//                    height="24"
//                    xmlns="http://www.w3.org/2000/svg"
//                    fillRule="evenodd"
//                    clipRule="evenodd"
//                  >
//                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
//                  </svg>
//                  {/* <FaRegHeart className="text-2xl font-semibold text-red-500 bg-white cursor-pointer" /> */}
//                </div>
//              </div>
//            </div>
//
//            <div className="lg:hidden flex justify-between items-center py-1">
//              <MobileNavbar
//                toggleTab={toggleTab}
//                user={user}
//                activeTab={activeTab}
//                theme={theme}
//                sentFriendRequest={sentFriendRequest}
//              />
//            </div>
//            <div className="hidden md:flex md:justify-between md:items-center lg:py-1">
//              <TabletNavbar
//                toggleTab={toggleTab}
//                user={user}
//                activeTab={activeTab}
//                theme={theme}
//                sentFriendRequest={sentFriendRequest}
//              />
//            </div>
//            {activeTab[user?._id] === "description" && (
//              <AboutTab theme={theme} user={user} />
//            )}
//            {activeTab[user?._id] === "skill" && (
//              <SkillTab
//                user={user}
//                theme={theme}
//                skills={userData[user?._id]?.skill || []}
//              />
//            )}
//            {activeTab[user?._id] === "project" && (
//              <ProjectTab
//                user={user}
//                theme={theme}
//                projects={userData[user?._id]?.project || []}
//              />
//            )}
//            {activeTab[user?._id] === "social" && (
//              <SocialTab
//                user={user}
//                theme={theme}
//                socialInfos={userData[user?._id]?.social || []}
//              />
//            )}
//          </div>
//        </div>
//      ))}
//      {allUsers?.length === 0 && <Loading />}
//    </div>
