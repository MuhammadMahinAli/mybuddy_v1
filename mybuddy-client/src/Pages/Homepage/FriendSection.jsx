import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/UserContext";
import whiteBorder from "../../assets/home/p-border.png";
import darkBorder from "../../assets/home/dark-border.png";
import { Link } from "react-router-dom";

const FriendSection = ({ theme }) => {
  const { getAllUsers, getAcceptedFriendRequest, getFriendRequest, user } =
    useContext(AuthContext);
  const [randomUsers, setRandomUsers] = useState([]);
  const [suggestionTab, setSuggestionTab] = useState(true);
  const [friendTab, setFriendTab] = useState(false);
  const [requestTab, setRequestTab] = useState(false);

  const suggestedUsers = getAllUsers?.data;
  const allFriends = getAcceptedFriendRequest?.data;
  const recievedRequest = getFriendRequest?.data;

  const getRandomUsers = (count) => {
    if (!suggestedUsers) return [];
    const filteredUsers = suggestedUsers.filter(u => u?._id !== user?._id);
    const shuffled = [...filteredUsers]?.sort(() => 0.5 - Math.random());
    return shuffled?.slice(0, count);
  };

  useEffect(() => {
    if (suggestedUsers) {
      const randomUsersArray = getRandomUsers(3);
      setRandomUsers(randomUsersArray);
    }
  }, [suggestedUsers]);
  //console.log(randomUsers);

  const toggleSuggestion = () => {
    setSuggestionTab(true);
    setFriendTab(false);
    setRequestTab(false);
  };
  const toggleFriend = () => {
    setSuggestionTab(false);
    setFriendTab(true);
    setRequestTab(false);
  };
  const toggleRequest = () => {
    setSuggestionTab(false);
    setFriendTab(false);
    setRequestTab(true);
  };

  return (
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
              <button
                onClick={toggleSuggestion}
                className={`${ suggestionTab === true ? "text-white [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)] shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)]":"border border-gray-500"} my-3  lg:px-5 lg:py-1 text-[16px] md:text-lg font-normal rounded-[10px]`}
              >
                Suggestion
              </button>
            ) : (
              <button
                onClick={toggleSuggestion}
                className={`${
                  suggestionTab === true ? "newestBtn" : "popularBtn"
                }`}
              >
                <p>Suggestion</p>
              </button>
            )}

            {/* 2 */}
            {theme === "light" ? (
              <button
                onClick={toggleFriend}
                className={`${ friendTab === true ? "text-white [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)] shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)]":"border border-gray-500"} my-3  lg:px-5 lg:py-1 text-[16px] md:text-lg font-normal rounded-[10px]`}
              >
                Friends
              </button>
            ) : (
              <button
                onClick={toggleFriend}
                className={`${friendTab === true ? "newestBtn" : "popularBtn"}`}
              >
                <p>Friends</p>
              </button>
            )}
            {/* 3 */}
            {theme === "light" ? (
              <button
                onClick={toggleRequest}
                className={`${ requestTab === true ? "text-white [background:linear-gradient(-84.24deg,_#2adba4,_#76ffd4)] shadow-[0px_10px_10px_rgba(46,_213,_115,_0.15)]":"border border-gray-500"} my-3  lg:px-5 lg:py-1 text-[16px] md:text-lg font-normal rounded-[10px]`}
              >
                Request
              </button>
            ) : (
              <button
                onClick={toggleRequest}
                className={`${
                  requestTab === true ? "newestBtn" : "popularBtn"
                }`}
              >
                <p>Request</p>
              </button>
            )}
          </div>

          {/* suggestion */}
          <>
            {suggestionTab && (
              <>
                <ul className="space-y-6">
                  {randomUsers?.map((user, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {/* lrft */}
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col justify-center items-center relative">
                          <img
                            src={
                              user?.profilePic
                                ? user?.profilePic
                                : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                            }
                            className={`h-[54px] w-[54px] rounded-full p-[5px] `}
                          />
                          <img
                            className="w-16 lg:w-32 xl:w-36 absolute"
                            src={theme === "light" ? darkBorder : whiteBorder}
                            loading="lazy" alt="dashedborder"
                          />
                        </div>
                        <div>
                          <p
                            className={`${
                              theme === "light" ? "text-gray-500" : "text-white"
                            } text-lg font-medium capitalize pt-b `}
                          >
                            {user?.name?.firstName} {user?.name?.lastName}
                          </p>
                        </div>
                      </div>
                      <Link to={`/user/profile/${user?._id}`}>
                        {/* right */}
                        {theme === "light" ? (
                          <button className="my-3  lg:px-4 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
                            Profile
                          </button>
                        ) : (
                          <button className="popularBtn">
                            <p>Profile</p>
                          </button>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
          {/* friends */}
          <>
            {friendTab && (
              <>
                <ul className="space-y-6">
                  {allFriends?.slice(0, 3).map((user, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {/* lrft */}
                      <div className="flex items-center space-x-3">
                      <div className="flex flex-col justify-center items-center relative">
                        <img
                          src={
                            user?.requestedBy?.profilePic
                              ? user?.requestedBy?.profilePic
                              : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                          }
                          className={` h-[54px] w-[54px]  rounded-full p-[6px] `}
                        />
                        <img
                            className="w-16 lg:w-32 xl:w-36 absolute"
                            src={theme === "light" ? darkBorder : whiteBorder}
                            loading="lazy" alt="dashedborder"
                          />
                        </div>
                        <div>
                          <p
                            className={`${
                              theme === "light" ? "text-gray-500" : "text-white"
                            } text-lg font-medium capitalize pt-b `}
                          >
                            {user?.requestedBy?.name?.firstName}{" "}
                            {user?.requestedBy?.name?.lastName}
                          </p>
                        </div>
                      </div>
                      <Link to={`/user/profile/${user?.requestedBy?._id}`}>
                        {/* right */}
                        {theme === "light" ? (
                          <button className="my-3  lg:px-4 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
                            Profile
                          </button>
                        ) : (
                          <button className="popularBtn">
                            <p>Profile</p>
                          </button>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                {allFriends?.length === 0 && (
                  <p
                    className={`${
                      theme === "light" ? "text-gray-600" : "text-white"
                    } lg:text-[18px] pb-5 font-medium text-center pt-3`}
                  >{`You've no friends yet.`}</p>
                )}
              </>
            )}
          </>
          {/* request */}
          <>
            {requestTab && (
              <>
                <ul className="space-y-6">
                  {recievedRequest?.slice(0, 3).map((user, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {/* lrft */}
                      <div className="flex items-center space-x-3">
                      <div className="flex flex-col justify-center items-center relative">
                        <img
                          src={
                            user?.requestedBy?.profilePic
                              ? user?.requestedBy?.profilePic
                              : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                          }
                          className={`h-[54px] w-[54px] rounded-full p-[5px]  `}
                        />
                        <img
                            className="w-16 lg:w-32 xl:w-36 absolute"
                            src={theme === "light" ? darkBorder : whiteBorder}
                            loading="lazy" alt="dashedborder"
                          />
                        </div>
                        <div>
                          <p
                            className={`${
                              theme === "light" ? "text-gray-500" : "text-white"
                            } text-lg font-medium capitalize pt-b `}
                          >
                            {user?.requestedBy?.name?.firstName}{" "}
                            {user?.requestedBy?.name?.lastName}
                          </p>
                        </div>
                      </div>
                      <Link to={`/dashboard/friend-request`}>
                        {/* right */}
                        {theme === "light" ? (
                          <button className="my-3  lg:px-4 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
                            Dashboard
                          </button>
                        ) : (
                          <button className="popularBtn">
                            <p>Dashboard</p>
                          </button>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                {recievedRequest?.length === 0 && (
                  <p
                    className={`${
                      theme === "light" ? "text-gray-600" : "text-white"
                    } lg:text-[18px] pb-5 font-medium text-center pt-3`}
                  >{`You've not recieved any request yet.`}</p>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default FriendSection;
// <ul className="space-y-6">
//             {randomUsers?.map((user, i) => (
//               <li key={i} className="flex justify-between items-center">
//                 {/* lrft */}
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={
//                       user?.profilePic
//                         ? user?.profilePic
//                         : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                     }
//                     className={` ${
//                       theme === "light" ? "border-gray-500" : "border-white"
//                     } h-12 w-12 rounded-full border-[3px] p-1 border-dashed  `}
//                   />
//                   <div>
//                     <p
//                       className={`${
//                         theme === "light" ? "text-gray-500" : "text-white"
//                       } text-lg font-medium capitalize pt-b `}
//                     >
//                       {user?.name?.firstName} {user?.name?.lastName}
//                     </p>
//                   </div>
//                 </div>
//                 <Link to={`/user/profile/${user?._id}`}>
//                 {/* right */}
//                 {theme === "light" ? (
//                   <button className="my-3  lg:px-4 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
//                     Profile
//                   </button>
//                 ) : (
//                   <button className="popularBtn">
//                     <p>Profile</p>
//                   </button>
//                 )}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//

/// all friend
// ul className="space-y-6">
//            {allFriends?.slice(0, 3).map((user, i) => (
//              <li key={i} className="flex justify-between items-center">
//                {/* lrft */}
//                <div className="flex items-center space-x-3">
//                  <img
//                    src={
//                      user?.profilePic
//                        ? user?.requestedBy?.profilePic
//                        : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                    }
//                    className={` ${
//                      theme === "light" ? "border-gray-500" : "border-white"
//                    } h-12 w-12 rounded-full border-[3px] p-1 border-dashed  `}
//                  />
//                  <div>
//                    <p
//                      className={`${
//                        theme === "light" ? "text-gray-500" : "text-white"
//                      } text-lg font-medium capitalize pt-b `}
//                    >
//                      {user?.requestedBy?.name?.firstName}{" "}
//                      {user?.requestedBy?.name?.lastName}
//                    </p>
//                  </div>
//                </div>
//                <Link to={`/user/profile/${user?.requestedBy?._id}`}>
//                  {/* right */}
//                  {theme === "light" ? (
//                    <button className="my-3  lg:px-4 lg:py-1 text-[16px] md:text-lg graish font-normal  rounded-[10px] border border-gray-500">
//                      Profile
//                    </button>
//                  ) : (
//                    <button className="popularBtn">
//                      <p>Profile</p>
//                    </button>
//                  )}
//                </Link>
//              </li>
//            ))}
//          </ul>

// friend request
