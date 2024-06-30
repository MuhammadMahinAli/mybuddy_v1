import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../../icons/DashboardIcon";
import FeedIcon from "../../icons/FeedIcon";
import ProjectIcon from "../../icons/ProjectIcon";
import PeoplesIcon from "../../icons/PeoplesIcon";
import VideoIcon from "../../icons/VideoIcon";
import ResearcherIcon from "../../icons/ResearcherIcon";
import navicon from "../../assets/navbar/navicon.png";
import AOS from "aos";
import Hamburger from "../../icons/Hamburger";
import HoveredText from "../../icons/HoveredText";

const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  toggleSidebar,
  theme,
  isPageActive,
  user
}) => {
  return (
    <div>
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        className="absolute top-0 z-40 "
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
                Logo
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
                  <li className='sidebar-list'>
                <a
                  href="/"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer box1 [border:none]">
                    <div
                      className={`${
                        isPageActive("/") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <FeedIcon theme={theme} />
                    </div>
                  </div>
                  <p className={`${theme === 'light' ? 'sidebar-text':''} text-[18px] font-semibold`}>Feed</p>
                </a>
              </li>
              <li className='sidebar-list'>
                <a
                  href="/find/researcher"
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
                  <p className={`${theme === 'light' ? 'sidebar-text':''} text-[18px] font-semibold`}>Researchers</p>
                </a>
              </li>
              <li className='sidebar-list'>
                <a
                  href={user? "/dashboard":"/login"}
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
                  <p className={`${theme === 'light' ? 'sidebar-text':''} text-[18px] font-semibold`}>Dashboard</p>
                </a>
              </li>
              <li className='sidebar-list'>
                <a
                  href="/find/project"
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
                  <p className={`${theme === 'light' ? 'sidebar-text':''} text-[18px] font-semibold`}>Projects</p>
                </a>
              </li>
              <li className='sidebar-list'>
                <a
                  href="/frnd"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer [border:none] box1">
                    <div
                      className={`${
                        isPageActive("/frnd") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <PeoplesIcon theme={theme} />
                    </div>
                  </div>
                  <p className={`${theme === 'light' ? 'sidebar-text':''} text-[18px] font-semibold`}>Friends</p>
                </a>
              </li>
              <li className='sidebar-list'>
                <a
                  href="/meet"
                  className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
                >
                  <div className="flex items-center justify-center cursor-pointer [border:none] box1">
                    <div
                      className={`${
                        isPageActive("/meet") || theme === "light"
                          ? "shadow-[1px_3px_24px_#fff_inset]"
                          : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                      } box2 py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
                    >
                      <VideoIcon theme={theme} />
                    </div>
                  </div>
                  <p className={`${theme === 'light' ? 'sidebar-text':''} text-[18px] font-semibold`}>Meetings</p>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
// import { useEffect, useState } from "react";
// import "aos/dist/aos.css";
// import { Link, useLocation } from "react-router-dom";
// import DashboardIcon from "../../icons/DashboardIcon";
// import FeedIcon from "../../icons/FeedIcon";
// import ProjectIcon from "../../icons/ProjectIcon";
// import PeoplesIcon from "../../icons/PeoplesIcon";
// import VideoIcon from "../../icons/VideoIcon";
// import ResearcherIcon from "../../icons/ResearcherIcon";
// import navicon from "../../assets/navbar/navicon.png";
// import AOS from 'aos'
// import Hamburger from "../../icons/Hamburger";
// import HoveredText from "../../icons/HoveredText";

// const Sidebar = ({openSidebar,toggleSidebar,theme}) => {
//   const [openFeed, setOpenFeed]=useState(false)
//   const [openResearcher, setOpenResearcher]=useState(false)
//   const [openDashboard, setOpenDashboard]=useState(false)
//   const [openProject, setOpenProject]=useState(false)
//   const [openPeoples, setOpenPeoples]=useState(false)
//   const [openMeeting, setOpenMeeting]=useState(false)
//   // states
//   const location = useLocation();
//   const isPageActive = (path) => {
//     return location.pathname === path;

//   };

//   // aos initializing
//     useEffect(() => {
//       AOS.init();
//     }, []);

//   return (
//     <div className=" text-gray-500 z-50">
//       <div className="">
//         {openSidebar === true ? (
//           <div className="absolute top-0">
//            <div
//             className={`${
//               theme === "light" ? "bg-gray-200" : "bg-[#525252]"
//             } flex justify-between items-center px-3 h-[49px] md:h-[71px] 3xl:h-[71px] ${
//               openSidebar === true
//                 ? "w-[200px]"
//                 : "w-[50px] sm:w-[60px] md:w-[80px]"
//             }`}
//           >
//             <h1
//               className={`${
//                 theme === "light" ? "graish" : "text-white"
//               } text-xl font-bold text-gray-600 ${
//                 openSidebar === false && "hidden"
//               }`}
//             >
//               Logoo
//             </h1>
//             {/* mbl tab */}

//               <button
//                 onClick={toggleSidebar}
//                 className="flex justify-center items-center"
//               >
//                 <Hamburger theme={theme} />
//               </button>

//             {/* dekstop */}
//             {/* <div className="hidden lg:block">
//               <button
//                 onClick={toggleSidebar}
//                 className="flex justify-center items-center"
//               >
//                 <Hamburger theme={theme} />
//               </button>
//             </div> */}

//             {/* <button

//               className="lg:hidden  justify-center items-center"
//             >
//               <Hamburger theme={theme} />
//             </button> */}
//           </div>
//           <ul
//             className={`${theme === 'light' ? "bg-[#fff] graish" : "text-white shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]"} hidden lg:block w-[200px] space-y-5 lg:rounded-br-xl p-4`}

//           >
//             <li className="">
//               <a
//                 href="/"
//                 className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
//               >
//                 <div className="flex items-center justify-center cursor-pointer [border:none]">
//                   <div className={`${isPageActive("/") || theme === 'light'  ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                   <FeedIcon theme={theme} />
//                   </div>

//                 </div>
//                 <p className="text-[18px] font-semibold">Feed</p>
//               </a>

//             </li>
//             <li>
//               <a
//                 href="/find/researcher"
//                 className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
//               >
//                 <div className="flex items-center justify-center cursor-pointer [border:none]">
//                   <div className={`${isPageActive("/find/researcher") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                   <ResearcherIcon theme={theme} />
//                   </div>

//                 </div>
//                 <p className="text-[18px] font-semibold">Researchers</p>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/dash"
//                 className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
//               >
//                 <div className="flex items-center justify-center cursor-pointer [border:none]">
//                   <div className={`${isPageActive("/dash") || theme === 'light'  ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                   <DashboardIcon theme={theme} />
//                   </div>

//                 </div>
//                 <p className="text-[18px] font-semibold">Dashboard</p>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/find/project"
//                 className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
//               >
//                 <div className="flex items-center justify-center cursor-pointer [border:none]">
//                   <div className={`${isPageActive("/find/project") || theme === 'light'  ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                   <ProjectIcon theme={theme} />
//                   </div>

//                 </div>
//                 <p className="text-[18px] font-semibold">Projects</p>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/frnd"
//                 className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
//               >
//                 <div className="flex items-center justify-center cursor-pointer [border:none]">
//                   <div className={`${isPageActive("/frnd") || theme === 'light'  ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                   <PeoplesIcon theme={theme} />
//                   </div>

//                 </div>
//                 <p className="text-[18px] font-semibold">Friends</p>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/meet"
//                 className="flex space-x-3 items-center cursor-pointer px-2 py-3 rounded-xl"
//               >
//                 <div className="flex items-center justify-center cursor-pointer [border:none]">
//                   <div className={`${isPageActive("/meet") || theme === 'light'  ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                   <VideoIcon theme={theme} />
//                   </div>

//                 </div>
//                 <p className="text-[18px] font-semibold">Meetings</p>
//               </a>
//             </li>

//           </ul>
//           </div>
//         ) : (
//           <div className="w-[50px] sm:w-[60px] md:w-[80px] z-50">
//             <ul className={`${theme === 'light' ? "bg-[#fff]":"shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)] rounded-br-xl"} flex flex-col items-center justify-center py-5 space-y-4 lg:space-y-9`}>
//               <li className="relative">
//                 <a href="/">
//                   <div className="flex items-center justify-center cursor-pointer [border:none] p-0 rounded-xl" onMouseEnter={()=>setOpenFeed(true)} onMouseLeave={()=>setOpenFeed(false)}>
//                   <div className={`${isPageActive("/") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                     <FeedIcon theme={theme} openFeed={openFeed} />
//                   </div>
//                   </div>
//                 </a>
//                 {
//                   openFeed &&
//                   <div className="absolute left-12 top-1 z-50">
//                   <HoveredText text={'Feed'} theme={theme}/>
//                 </div>
//                 }
//               </li>
//               <li className="relative">
//                 <a href="/find/researcher">
//                   <div className="flex items-center justify-center cursor-pointer [border:none] p-0 rounded-xl" onMouseEnter={()=>setOpenResearcher(true)} onMouseLeave={()=>setOpenResearcher(false)}>
//                   <div className={`${isPageActive("/find/researcher") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 md:px-3 rounded-[5px]`}>
//                     <ResearcherIcon theme={theme} openResearcher={openResearcher} />
//                   </div>
//                   </div>
//                 </a>
//                 {
//                   openResearcher &&
//                   <div className="absolute left-12 top-1 z-50">
//                   <HoveredText text={'Researchers'} theme={theme}/>
//                 </div>
//                 }
//               </li>
//               <li className="relative">
//                 <a href="/dashboard">
//                   <div className="flex items-center justify-center cursor-pointer [border:none] p-0 rounded-xl" onMouseEnter={()=>setOpenDashboard(true)} onMouseLeave={()=>setOpenDashboard(false)}>
//                   <div className={`${isPageActive("/dashboard") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                     <DashboardIcon theme={theme} openDashboard={openDashboard} />
//                   </div>
//                   </div>
//                 </a>
//                 {
//                   openDashboard &&
//                   <div className="absolute left-12 top-1 z-50">
//                   <HoveredText text={'Dashboard'} theme={theme}/>
//                 </div>
//                 }
//               </li>
//               <li className="relative">
//                 <a href="/find/project">
//                   <div className="flex items-center justify-center cursor-pointer [border:none] p-0 rounded-xl" onMouseEnter={()=>setOpenProject(true)} onMouseLeave={()=>setOpenProject(false)}>
//                   <div className={`${isPageActive("/find/project") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                     <ProjectIcon theme={theme} openProject={openProject} />
//                   </div>
//                   </div>
//                 </a>
//                 {
//                   openProject &&
//                   <div className="absolute left-12 top-1 z-50">
//                   <HoveredText text={'Projects'} theme={theme}/>
//                 </div>
//                 }
//               </li>
//               <li className="relative">
//                 <a href="/friend">
//                   <div className="flex items-center justify-center cursor-pointer [border:none] p-0 rounded-xl" onMouseEnter={()=>setOpenPeoples(true)} onMouseLeave={()=>setOpenPeoples(false)}>
//                   <div className={`${isPageActive("/friend") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                     <PeoplesIcon theme={theme} openPeoples={openPeoples} />
//                   </div>
//                   </div>
//                 </a>
//                 {
//                   openPeoples &&
//                   <div className="absolute left-12 top-1 z-50">
//                   <HoveredText text={'Friends'} theme={theme}/>
//                 </div>
//                 }
//               </li>
//               <li className="relative">
//                 <a href="/meeting">
//                   <div className="flex items-center justify-center cursor-pointer [border:none] p-0 rounded-xl" onMouseEnter={()=>setOpenMeeting(true)} onMouseLeave={()=>setOpenMeeting(false)}>
//                   <div className={`${isPageActive("/meeting") || theme === 'light' ?"shadow-[1px_3px_24px_#fff_inset]":"shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"} py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}>
//                     <VideoIcon theme={theme} openMeeting={openMeeting} />
//                   </div>
//                   </div>
//                 </a>
//                 {
//                   openMeeting &&
//                   <div className="absolute left-12 top-1 z-50">
//                   <HoveredText text={'Meetings'} theme={theme} />
//                 </div>
//                 }
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
