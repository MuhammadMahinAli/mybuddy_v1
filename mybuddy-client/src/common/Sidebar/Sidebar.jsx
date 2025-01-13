import "aos/dist/aos.css";
import DashboardIcon from "../../icons/DashboardIcon";
import FeedIcon from "../../icons/FeedIcon";
import ProjectIcon from "../../icons/ProjectIcon";
import PeoplesIcon from "../../icons/PeoplesIcon";
import VideoIcon from "../../icons/VideoIcon";
import ResearcherIcon from "../../icons/ResearcherIcon";
import Hamburger from "../../icons/Hamburger";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

const Sidebar = ({ openSidebar, toggleSidebar, theme, isPageActive, user }) => {

  const{singleUser} = useContext(AuthContext);

  const userEmail = singleUser
    && singleUser?.data?.email;
 
  return (
    <div>
      <div
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="300"
        data-aos-duration="300"
        className={`fixed  left-0 top-0 z-50`}
      >
        {openSidebar && (
          <div className="">
            <div
              className={`${
                theme === "light" ? "bg-gray-200" : "bg-[#525252]"
              } flex justify-between items-center px-3 h-[49px] md:h-[71px] 3xl:h-[71px] ${
                openSidebar === true
                  ? "w-[200px]"
                  : "w-[50px] sm:w-[60px] md:w-[80px]"
              }`}
            >
              <h1
                className={`${
                  theme === "light" ? "graish" : "text-white"
                } text-xl font-bold text-gray-600 ${
                  openSidebar === false && "hidden"
                }`}
              >
                <Link to="/">
                  <img
                    className="h-[32px] w-[30px] md:h-12 md:w-[46px] rounded-lg"
                    src="/logo.png"
                    loading="lazy"
                    alt=""
                  />
                </Link>
              </h1>
              {/* mbl tab */}

              <button
                onClick={toggleSidebar}
                className="flex justify-center items-center"
              >
                <Hamburger theme={theme} />
              </button>
            </div>
            <ul
              className={`${
                theme === "light"
                  ? "bg-[#fff] graish"
                  : "text-white bg-[url('/sidebar-bg.png')] bg-no-repeat bg-cover"
              }  w-[200px] space-y-5 lg:rounded-br-xl p-4`}
            >
              <li className="sidebar-list">
                <Link
                  to="/home"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer box1 [border:none]">
                    <div
                      className={`${
                        isPageActive("/home") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <FeedIcon theme={theme} />
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "sidebar-text" : ""
                    } text-[18px] font-semibold`}
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li className="sidebar-list">
                <Link
                  to="/find/researcher"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer box1 [border:none]">
                    <div
                      className={`${
                        isPageActive("/find/researcher") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-2 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <ResearcherIcon theme={theme} />
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "sidebar-text" : ""
                    } text-[18px] font-semibold`}
                  >
                    Researchers
                  </p>
                </Link>
              </li>
              <li className="sidebar-list">
                <Link
                   
                  to={userEmail ===  "researchbdy@gmail.com" ? `/admin/${user?._id}` : "/dashboard"}
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer [border:none] box1">
                    <div
                      className={`${
                        isPageActive("/dashboard") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-2 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <DashboardIcon theme={theme} />
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "sidebar-text" : ""
                    } text-[18px] font-semibold`}
                  >
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="sidebar-list">
                <Link
                  to="/find/project"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer [border:none] box1">
                    <div
                      className={`${
                        isPageActive("/find/project") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <ProjectIcon theme={theme} />
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "sidebar-text" : ""
                    } text-[18px] font-semibold`}
                  >
                    Projects
                  </p>
                </Link>
              </li>
              <li className="sidebar-list">
                <Link
                  to="/user/friend"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer [border:none] box1">
                    <div
                      className={`${
                        isPageActive("/user/friend") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <PeoplesIcon theme={theme} />
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "sidebar-text" : ""
                    } text-[18px] font-semibold`}
                  >
                    Friends
                  </p>
                </Link>
              </li>
              <li className="sidebar-list">
                <Link
                  to="/dashboard/meeting-schedule"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer [border:none] box1">
                    <div
                      className={`${
                        isPageActive("/dashboard/meeting-schedule") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <VideoIcon theme={theme} />
                    </div>
                  </div>
                  <p
                    className={`${
                      theme === "light" ? "sidebar-text" : ""
                    } text-[18px] font-semibold`}
                  >
                    Meetings
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
Sidebar.propTypes = {
  openSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  isPageActive: PropTypes.func.isRequired,
  user: PropTypes.object,
};
