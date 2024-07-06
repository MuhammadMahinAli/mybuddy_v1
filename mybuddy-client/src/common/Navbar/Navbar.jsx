import { useContext, useState } from "react";
import { useAuthCheck } from "../../utils/useAuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import searchIcon from "../../assets/navbar/searchicon.png";
import darkSearchIcon from "../../assets/home/dark-search-btn.png";
import activeDark from "../../assets/home/active-dark.png";
import darkBorder from "../../assets/home/dark-border.png";
import whiteBorder from "../../assets/home/white-border.png";
import msgIcon2 from "../../assets/navbar/msg-icon2.png";
import active from "../../assets/home/active.png";
import { setTheme } from "../../features/theme/themeSlice";
import NotificationIcon from "../../icons/NotificationIcon";
import Hamburger from "../../icons/Hamburger";
import MessageIcon1 from "../../icons/MessageIcon1";
import MessageIcon2 from "../../icons/MessageIcon2";
import UsersIcon from "../../icons/usersIcon";
import { IoIosArrowDown } from "react-icons/io";
import SearchIcon from "../../icons/SearchIcon";
import Sidebar from "../Sidebar/Sidebar";
import FindDropdown from "./FindDropdown";
import { Menu } from "@headlessui/react";
import MiniSidebar from "./MiniSidebar";
import ProfileTab from "./ProfileTab";
import { AuthContext } from "../../Context/UserContext";

const Navbar = ({
  darkMode,
  toggleSidebar,
  setOpenSidebar,
  openSidebar,
  theme,
}) => {
  const { singleUser } = useContext(AuthContext);
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";
  const { logout: originalLogout } = useAuthCheck();
  const [openProfile, setOpenProfile] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  const navigate = useNavigate();
  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      originalLogout();
      Swal.fire({
        icon: "success",
        text: "Logged out successfully!",
      });
      navigate("/home");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2500);
    }
  };

  // const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <div
      className={`  lg:px-0 lg:py-0 ${
        theme === "light" ? "bg-[#fff]" : "bg-[#272727]"
      }`}
    >
      <div className="relative flex items-center justify-between">
        {/* left */}
        <div className="flex space-x-3 ">
          <div
            className={`${
              theme === "light" ? "bg-gray-200" : "bg-[#525252]"
            } flex justify-between items-center px-3 h-[49px] md:h-[71px] 3xl:h-[71px] w-[50px] sm:w-[60px] md:w-[80px]
            }`}
          >
            <div
              className={`absolute left-0 top-0 sidebar ${
                openSidebar ? "sidebar-open" : ""
              }`}
            >
              <button
                onClick={toggleSidebar}
                className="flex justify-center items-center pl-2 md:pl-4 3xl:pl-5 outline-0"
              >
                <Hamburger theme={theme} />
              </button>
              <MiniSidebar user={user} theme={theme} />
            </div>
          </div>

          <ul
            className={`relative flex items-center hidden space-x-8 lg:flex lg:py-5 ${
              theme === "light" ? "text-gray-500" : "text-white"
            }`}
          >
            <li className="absolute top-1-left-0">
              {openSidebar === false && (
                <a   href={ singleUser ? "/home" : "/"} >
                  <img
                    className="h-16 w-16 lg:p-2  rounded-lg"
                    src="/logo.png"
                    alt=""
                  />
                </a>
              )}
            </li>

            <li className="pl-12">
              <a
                href="/home"
                className="text-[18px] font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Home
              </a>
            </li>
            <li>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="text-[18px] font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400">
                    <div className="flex items-center">
                      Find{" "}
                      <IoIosArrowDown
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        } mt-1 ml-1 text-lg`}
                      />
                    </div>

                    <FindDropdown theme={theme} />
                  </Menu.Button>
                </div>
              </Menu>
            </li>
            <li>
              <a
                href="/find/academic"
                className="text-[18px] font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Academic
              </a>
            </li>
          </ul>
        </div>
        {/* right */}

        <ul className=" flex items-center space-x-2 md:space-x-3 lg:space-x-3 3xl:space-x-2 lg:flex">
          {theme === "light" ? (
            <li className="xl:flex items-center -space-x-9 hidden  ">
              <input className=" h-10 w-60 rounded-3xl bg-gray-200 outline-none px-3" />
              <img className="w-9" src={searchIcon} alt="search" />
            </li>
          ) : (
            <li className="relative xl:flex items-center -space-x-11 hidden rounded-3xl p-[1px] bg-gradient-to-l from-[#4EEBFF] to-[#AA62F9]">
              <input
                placeholder="Search"
                className="ml-[1px] text-white h-10 w-60 rounded-3xl bg-[#525252]  outline-none px-3"
              />
              <img
                className=" absolute right-3 w-6 mb-2"
                src={darkSearchIcon}
                alt="search"
              />
            </li>
          )}

          <li>
            {theme === "light" ? (
              <img
                className="w-7 md:w-9 xl:hidden"
                src={searchIcon}
                alt="search"
              />
            ) : (
              <div className="p-[1px] rounded-full bg-gradient-to-l from-[#4EEBFF] to-[#AA62F9]">
                <div
                  className={`flex justify-center items-center xl:hidden p-2  shadow-md bg-[#525252] rounded-full `}
                >
                  <SearchIcon />
                </div>
              </div>
            )}
          </li>

          <ul
            className={`${
              theme === "light"
                ? "space-x-2 md:space-x-5 lg:space-x-5"
                : "space-x-3"
            } flex items-center  border-l lg:mr-0   lg:px-3`}
          >
            <div className="hidden lg:block">
              <div
                className={`${
                  theme !== "light" &&
                  " p-[3px] shadow-md shadow-[#181717] bg-[#525252] rounded-full"
                }`}
              >
                <UsersIcon theme={theme} />
              </div>
            </div>
            <div className="hidden lg:block">
              <div
                className={`${
                  theme !== "light" &&
                  "hidden lg:block p-[3px] pl-2 shadow-md shadow-[#181717] bg-[#525252] rounded-full"
                }`}
              >
                <MessageIcon1 theme={theme} />
              </div>
            </div>
            <div
              className={`${
                theme !== "light" &&
                "p-1 shadow-md shadow-[#181717] bg-[#525252] rounded-full"
              }`}
            >
              <NotificationIcon theme={theme} />
            </div>

            <li>
              <label className="switch">
                <span className="moon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                  </svg>
                </span>
                <span className="sun">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="#838daa">
                      <circle r="5" cy="12" cx="12"></circle>
                      <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                    </g>
                  </svg>
                </span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleTheme}
                  className="input"
                />
                <span className="slider"></span>
              </label>
            </li>
            <li
              onClick={() => setOpenProfile(!openProfile)}
              className="relative"
            >
              {theme === "light" ? (
                <img
                  className="w-5 absolute -top-1 right-1 md:-right-2"
                  src={active}
                  alt="active"
                />
              ) : (
                <img
                  className="w-5 absolute -top-1 right-[2px] md:-right-2"
                  src={activeDark}
                  alt="active"
                />
              )}
              <img
                className="w-8 md:w-20 absolute  right-[12px] md:right-0"
                src={theme === "light" ? darkBorder : whiteBorder}
                alt="dashedborder"
              />
              <img
                src={userImage}
                alt=""
                className={`${
                  theme === "light" ? "" : ""
                } mr-3 md:mr-0 object-cover w-8 h-8 md:w-12 md:h-12 xl:w-14 xl:h-14 mx-auto rounded-full aspect-square  p-[5px] border-dashed`}
              />
            </li>
          </ul>
          <li
            className={`${
              theme !== "light" &&
              " p-[1px] bg-gradient-to-l from-[#4EEBFF] to-[#AA62F9]"
            }`}
          >
            <a
              href="/home"
              className={`${
                theme === "light" ? "bg-[#2adba4]" : "bg-[#525252]"
              } h-[49px] md:h-[71px]  3xl:h-[71px] flex justify-center items-center px-1 md:px-0  md:w-[80px]`}
            >
              {theme === "light" ? (
                <img
                  src={msgIcon2}
                  alt="navicon"
                  className="w-10 md:w-12 md:py-2"
                />
              ) : (
                <MessageIcon2 theme={theme} />
              )}
            </a>
          </li>
        </ul>
      </div>

      {openSidebar && (
        <Sidebar
          user={user}
          openSidebar={openSidebar}
          toggleSidebar={toggleSidebar}
          theme={theme}
          isPageActive={isPageActive}
        />
      )}
      {openProfile && <ProfileTab openProfile={openProfile} logout={logout} />}
    </div>
  );
};
export default Navbar;
