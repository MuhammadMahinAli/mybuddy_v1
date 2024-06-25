import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import { useAuthCheck } from "../utils/useAuthCheck";
import { useEffect } from "react";
import SunIcon from "../icons/SunIcon";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../common/Sidebar/Sidebar";
import RightSidebar from "../Pages/Homepage/RightSidebar";
import Loading from "../Pages/Loading/Loading";
import BottomNavbar from "../common/BottomNavbar/BottomNavbar";
import { useGetSingleUserQuery } from "../features/auth/authApi";
import { useGetSingleUserPostQuery } from "../features/post/postApi";
import { useGetAllProjectByUserQuery } from "../features/project/projectApi";

const HomepageLayout = ({singleUser}) => {
  let [isOpen, setIsOpen] = useState(true);
  const theme = useSelector((state) => state.theme.theme);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();






   //console.log("userpost",getUserPost);
  const handleSidebarLinkClick = (path) => {
    setIsLoading(true);
    navigate(path);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div
                  className={`${
                    theme === "light" ? "bg-[#eaecef]" : "bg-[#070c12]"
                  } min-h-full`}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-1000"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-1000"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full transition-all">
                      <div
                        className={`bg-no-repeat bg-cover min-h-screen ${
                          theme === "light" ? "bg-[#eaecef]" : "bg-[#070c12]"
                        }`}
                      >
                        <Navbar
                          handleSidebarLinkClick={handleSidebarLinkClick}
                          toggleSidebar={toggleSidebar}
                          openSidebar={openSidebar}
                          theme={theme}
                        />
                        <div
                          className={`z-0 lg:space-x-7 xl:space-x-10 2xl:space-x-14 flex justify-center items-center md:items-center  lg:items-start  pt-8 md:py-10 3xl:py-14 mb-14 md:mb-0`}
                        >
                          <Outlet />
                          <RightSidebar
                            openSidebar={openSidebar}
                            theme={theme}
                          />
                        </div>
                        <BottomNavbar theme={theme}/>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </>
  );
};

// import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "../common/Navbar/Navbar";
// import { useAuthCheck } from "../utils/useAuthCheck";
// import { useEffect, useState } from "react";
// import SunIcon from "../icons/SunIcon";
// import { useDispatch, useSelector } from "react-redux";
// import Sidebar from "../common/Sidebar/Sidebar";
// import RightSidebar from "../Pages/Homepage/RightSidebar";

// const HomepageLayout = () => {
//   const authChecked = useAuthCheck();
// const theme = useSelector((state) => state.theme.theme);
// const [openSidebar, setOpenSidebar] = useState(false);
// const [isLoading, setIsLoading] = useState(false);
// const navigate = useNavigate();

// const handleSidebarLinkClick = (path) => {
//   setIsLoading(true);
//   navigate(path);
//   setTimeout(() => {
//     setIsLoading(false);
//   }, 500);
// };

// const toggleSidebar = () => {
//   setOpenSidebar(!openSidebar);
// };

//   return (
//     <>
//       {!authChecked ? (
//         <div>Checking Authentication....</div>
//       ) : (
//         <>
//           <div
//             className={`bg-no-repeat bg-cover min-h-screen ${
//               theme === "light" ? "bg-[#eaecef]" : "bg-[#070c12]"
//             }`}
//           >
//             <Navbar
//               handleSidebarLinkClick={handleSidebarLinkClick}
//               toggleSidebar={toggleSidebar}
//               openSidebar={openSidebar}
//               theme={theme}
//             />
//             <div
//               className={`z-0 lg:space-x-7 xl:space-x-10 2xl:space-x-14 flex justify-center items-center md:items-center  lg:items-start  pt-8 md:py-10 3xl:py-14`}
//             >
//               <Outlet />
//               <RightSidebar openSidebar={openSidebar} theme={theme} />
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

export default HomepageLayout;
