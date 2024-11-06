import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import { useSelector } from "react-redux";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // Get the current location
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  const { singleUser } = useContext(AuthContext);
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg";

  // Close the menu whenever the location (URL) changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="px-2 py-4 mx-auto  bg-tr md:pr-8 sm:px-5 lg:px-8 gray500 bg-[#DFF1FE] sm:bg-[#EFF4FA]">
      <div className="relative flex items-center justify-between  w-full">
        <div className="xl:space-x-1">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="md:hidden p-2  transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="p-2 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/hambrgr2.svg" className="h-[14px]" />
            </div>
          </button>
          <Link to="/home" className="inline-flex items-center">
            <div className="block py-1 px-2 lg:p-1 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/logo.png" className="w-5" />
            </div>
          </Link>
        </div>
        <ul className="flex items-center hidden space-x-8 md:flex ">
          <li>
            <Link to="/home">
              <p className="px-4 py-[5px] text-[18px] font-semibold rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                Home
              </p>
            </Link>
          </li>
          <li>
            <Link to="/find/academic">
              <p className="px-4 py-[5px] text-[18px] font-semibold rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                Academic
              </p>
            </Link>
          </li>
          <li>
            <div className="px-3 py-1 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <Link to={user ? "/user/edit-profile" : "/"}>
                <img src="/user.svg" className="h-8" />
              </Link>
            </div>
          </li>
        </ul>
        <div className="md:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="px-2 py-1 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/user.svg" className="h-5" />
            </div>
          </button>
          {/* <button
            aria-label="Open Menu"
            title="Open Menu"
            01767884999  985236
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="px-2 py-2 rounded-lg bg-[#e7edf2] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
              <img src="/hambrgr2.svg" className="h-4" />
            </div>
          </button> */}
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-[#DFF1FE] border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link to="/home" className="inline-flex items-center">
                      <div className="p-1 rounded-lg shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
                        <img src="/logo.png" className="h-8" />
                      </div>
                      <span className="ml-2 text-[14px] font-bold tracking-wide uppercase">
                        Research Buddy
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 gray600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="flex flex-col justify-center items-center space-y-4">
                    <li className="border-b w-full text-center pb-2">
                      <Link
                        to="/home"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="border-b w-full text-center pb-2">
                      <Link
                        to="/dashboard"
                        className={`${
                          isPageActive("/dashboard")
                            ? "font-bold"
                            : "font-medium"
                        }  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="border-b w-full text-center pb-2">
                      <Link
                        to="/dashboard/all-projects"
                        className={`${
                          isPageActive("/dashboard/all-projects")
                            ? "font-bold"
                            : "font-medium"
                        } tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400`}
                      >
                        All Projects
                      </Link>
                    </li>
                    <li className="border-b w-full text-center pb-2">
                      <Link
                        to="/dashboard/sent-request"
                        className={`${
                          isPageActive("/dashboard/recieve-request")
                            ? "font-bold"
                            : "font-medium"
                        } tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400`}
                      >
                        Requests
                      </Link>
                    </li>
                    <li className="border-b w-full text-center pb-2">
                      <Link
                        to="/dashboard/fund-proposal"
                        className={`${
                          isPageActive("/dashboard/fund-proposal")
                            ? "font-bold"
                            : "font-medium"
                        } tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400`}
                      >
                        Fund Proposal
                      </Link>
                    </li>
                    <li className="border-b w-full text-center pb-2">
                      <Link
                        to="/dashboard/friend-request"
                        className={`${
                          isPageActive("/dashboard/friend-request")
                            ? "font-bold"
                            : "font-medium"
                        }  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400`}
                      >
                        Friend Request
                      </Link>
                    </li>
                    <li className="w-full pt-2">
                      <Link
                        to="/user/edit-profile"
                        className={`bg-[#e4ecf7] py-4 
        } flex flex-col justify-center items-center relative rounded-[15px] py-2 shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]`}
                      >
                        <img
                          src={userImage}
                          className="h-10 w-10 -mt-8 rounded-full"
                        />
                        <div>
                          <p className="lg:text-[16px] xl:text-[20px]  font-medium gray600 text-center capitalize">
                            {singleUser?.data?.name?.firstName}{" "}
                            {singleUser?.data?.name?.lastName}
                          </p>
                          {/* <p className="lg:text-[16px] xl:text-[20px]  font-medium gray600 text-center pb-5 capitalize">
                            {singleUser?.data?.name?.lastName}
                          </p> */}
                        </div>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminNavbar;
