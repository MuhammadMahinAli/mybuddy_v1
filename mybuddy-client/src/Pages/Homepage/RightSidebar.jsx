import twitter from "../../assets/user-profile/x.png";
import active from "../../assets/home/active.png";
import whiteBorder from "../../assets/home/p-border.png";
import linkedIn from "../../assets/home/linkedIn.png";
import facebook from "../../assets/home/facebook.png";
import github from "../../assets/home/github.png";
import postCover from "../../assets/home/project-post.png";
import "../../styles/buttonStyle.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

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
  const currentTwitter = socialInfo?.twitter;
  const currentGithub = socialInfo?.github;
  const currentLinkedIn = socialInfo?.linkedIn;
  const currentFacebook = socialInfo?.facebook;
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";

  console.log(userPostNumber);

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
                alt="dashedborder"
              />

              <img className="w-6 -mt-5 z-10" src={active} alt="active" />
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
              <a
                target="blank"
                href={
                  singleUser
                    ? `https://twitter.com/${currentTwitter}`
                    : "/login"
                }
              >
                <img className="h-12 pr-1" src={twitter} alt="" />
              </a>
              <a
                target="blank"
                href={
                  singleUser
                    ? `https://facebook.com/${currentFacebook}`
                    : "/login"
                }
              >
                <img className="h-12" src={facebook} alt="" />
              </a>
              {/* <img className="h-12" src={google} alt="" /> */}
              <a
                target="blank"
                href={
                  singleUser
                    ? `https://linkedin.com/in/${currentLinkedIn}`
                    : "/login"
                }
              >
                <img className="h-[55px]" src={linkedIn} alt="" />
              </a>
              <a
                target="blank"
                href={
                  singleUser ? `https://github.com/${currentGithub}` : "/login"
                }
              >
                <img className="h-14" src={github} alt="" />
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
          } shadow-[-1px_0px_56px_-6px_rgba(134,_134,_134,_0.25)] px-4 lg:py-4 rounded-[15px] lg:w-[370px]  xl:w-[400px] 2xl:w-[380px]  `}
        >
          <div className="flex justify-between">
            <div>
              <p
                className={`${
                  theme === "light" ? "graish" : "text-white"
                } pb-1 text-2xl font-semibold`}
              >
                Friends
              </p>
              <svg
                width="30"
                height="4"
                viewBox="0 0 30 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5744 2.2797L6.53619 2.2701M28.0373 2.22852L13.1519 2.25731"
                  stroke="#2ADBA4"
                  strokeWidth="3"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <svg
              className="w-8"
              viewBox="0 0 36 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.49"
                d="M3.97718 7.08469C3.08372 7.08469 2.31703 6.76474 1.67711 6.12482C1.0372 5.48491 0.717241 4.71822 0.717241 3.82475C0.717241 2.93129 1.0372 2.1646 1.67711 1.52468C2.31703 0.884765 3.08372 0.564808 3.97718 0.564808C4.87065 0.564808 5.63734 0.884765 6.27726 1.52468C6.91717 2.1646 7.23713 2.93129 7.23713 3.82475C7.23713 4.41637 7.0862 4.95969 6.78436 5.45472C6.49458 5.94975 6.10218 6.34819 5.60716 6.65004C5.1242 6.93981 4.58088 7.08469 3.97718 7.08469ZM18.0221 7.08469C17.1286 7.08469 16.3619 6.76474 15.722 6.12482C15.0821 5.48491 14.7622 4.71822 14.7622 3.82475C14.7622 2.93129 15.0821 2.1646 15.722 1.52468C16.3619 0.884765 17.1286 0.564808 18.0221 0.564808C18.9156 0.564808 19.6823 0.884765 20.3222 1.52468C20.9621 2.1646 21.282 2.93129 21.282 3.82475C21.282 4.41637 21.1311 4.95969 20.8293 5.45472C20.5395 5.94975 20.1471 6.34819 19.6521 6.65004C19.1691 6.93981 18.6258 7.08469 18.0221 7.08469ZM32.067 7.08469C31.1736 7.08469 30.4069 6.76474 29.767 6.12482C29.127 5.48491 28.8071 4.71822 28.8071 3.82475C28.8071 2.93129 29.127 2.1646 29.767 1.52468C30.4069 0.884765 31.1736 0.564808 32.067 0.564808C32.9605 0.564808 33.7272 0.884765 34.3671 1.52468C35.007 2.1646 35.327 2.93129 35.327 3.82475C35.327 4.41637 35.176 4.95969 34.8742 5.45472C34.5844 5.94975 34.192 6.34819 33.697 6.65004C33.214 6.93981 32.6707 7.08469 32.067 7.08469Z"
                fill={theme === "light" ? "#595353" : "#fff"}
              />
            </svg>
          </div>
          <div className="flex flex-col  py-4">
            <div className="flex justify-between items-center py-5 space-x-1">
              {/* 1 */}
              {theme === "light" ? (
                <button className="my-3  lg:px-5 lg:py-1 text-[16px] md:text-lg text-white font-normal shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)]">
                  Newest
                </button>
              ) : (
                <button className="newestBtn">
                  <p>Newest</p>
                </button>
              )}

              {/* 2 */}
              {theme === "light" ? (
                <button className="my-3  lg:px-5 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
                  Popular
                </button>
              ) : (
                <button className="popularBtn">
                  <p>Popular</p>
                </button>
              )}
              {/* 3 */}
              {theme === "light" ? (
                <button className="my-3  lg:px-5 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
                  Active
                </button>
              ) : (
                <button className="activeBtn">
                  <p>Active</p>
                </button>
              )}
            </div>
            <ul className="space-y-7">
              <li className="flex justify-between items-center">
                {/* lrft */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                    className="h-12 rounded-full border-[3px] p-1 border-dashed border-white"
                  />
                  <div>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } text-lg font-medium pt-b `}
                    >
                      Lorem ipsum Nisi
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-[#a7a5a5]"
                      } text-lg font-medium pt-b `}
                    >
                      @Lorem
                    </p>
                  </div>
                </div>
                {/* right */}
                <img className="w-7" src={active} alt="active" />
              </li>
              <li className="flex justify-between items-center">
                {/* lrft */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                    className="h-12 rounded-full border-[3px] p-1 border-dashed border-white"
                  />
                  <div>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } text-lg font-medium pt-b `}
                    >
                      Lorem ipsum Nisi
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-[#a7a5a5]"
                      } text-lg font-medium pt-b `}
                    >
                      @Lorem
                    </p>
                  </div>
                </div>
                {/* right */}
                <img className="w-7" src={active} alt="active" />
              </li>
              <li className="flex justify-between items-center">
                {/* lrft */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                    className="h-12 rounded-full border-[3px] p-1 border-dashed border-white"
                  />
                  <div>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } text-lg font-medium pt-b `}
                    >
                      Lorem ipsum Nisi
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-[#a7a5a5]"
                      } text-lg font-medium pt-b `}
                    >
                      @Lorem
                    </p>
                  </div>
                </div>
                {/* right */}
                <img className="w-7" src={active} alt="active" />
              </li>
            </ul>
          </div>
        </div>
      </div>

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
            <a href={singleUser ? "/dashboard/create-projects" : "/login"}>
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
            <img className="pt-10" src={postCover} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
