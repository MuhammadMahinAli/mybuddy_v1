 import "../GeneralAddProject/editor.css";
 import "react-quill/dist/quill.core.css";
 import { useContext, useState } from "react";
 import { AuthContext } from "../../../Context/UserContext";
 import { FaPlus, FaSearch } from "react-icons/fa";
 import filter from "../../../assets/filter.png";
 import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
 import ProjectCard from "../GDashboard/ProjectCard";
 import { IoChevronDown } from "react-icons/io5";
 import { Link } from "react-router-dom";

 const GeneralAllProject = () => {
   // const { getAllProjectByUser } = useContext(AuthContext);
   // const projects = getAllProjectByUser?.data;
   // console.log(projects);
   const { getAllProjectByUser,allAcceptedSentRequest } = useContext(AuthContext);
   const projects = getAllProjectByUser?.data;

   const currentTeamMember = allAcceptedSentRequest?.data;
   console.log(currentTeamMember);
   const [showAll, setShowAll] = useState(false);

   const handleShowMore = () => {
     setShowAll(true);
   };

   const visibleProjects = showAll ? projects : projects?.slice(0, 3);

   return (
     <div className="relative gray600">
       <h1 className=" text-[20px] lg:text-[28px] py-4 font-bold">
         ALL PROJECTS
       </h1>

       {/* search div */}

       <div className="pb-5 w-full justify-between  items-center flex flex-row">
         {/* input */}
         <div className="w-5/12 flex  justify-center items-center relative   md:w-6/12 xl:w-7/12 2xl:w-6/12 3xl:w-7/12">
           <input
             placeholder="Search"
             className="w-full h-9 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border  border-solid border-gray-100"
           />
           <IoIosSearch className="text-2xl absolute right-1" />
         </div>

         {/* buttons */}
         <div className="flex space-x-2 lg:space-x-3 items-center w-6/12 md:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-5/12 md:px-4">
           <button
             className={`flex justify-center items-center space-x-1 w-full my-3 px-1 md:px-3 py-1 lg:px-4 md:py-2 text-[12px] xs:text-[14px] md:text-[16px] text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[7px] h-8 [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]`}
           >
             <FaPlus /> <span> New Project</span>
           </button>
           <button
             className={`flex justify-center  items-center space-x-1 w-16 my-3 md:px-3 py-1 lg:px-4 md:py-2 text-[14px] md:text-[16px]  font-semibold shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] h-8 rounded-[10px]`}
           >
             <img src={filter} />
             <span className="hidden">Filter</span>
           </button>
         </div>
       </div>

       {/* cards */}
     
       {projects?.length > 0 ? (
         <>
           <div
  
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
           >
             {visibleProjects.map((p, i) => (
               <div key={i}>
                 <div
                   className={`pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden`}
                 >
                   <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                     <img
                       src={p.images[0]}
                       className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
                     />
                   </div>

                   <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                     <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold py-3 ssm:py-2">
                       {p?.projectName.length > 15
                         ? `${p.projectName.slice(0, 7)}...`
                         : p.projectName}
                     </p>
                     <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-1">
                       {p.projectName}
                     </p>
                     <div
                       className="ssm:hidden pb-3"
                       dangerouslySetInnerHTML={{
                         __html: `${p?.description.slice(0, 100)}${
                           p?.description.length > 100 ? "..." : ""
                         }`,
                       }}
                     />

                     <div
                       className="hidden ssm:block md:hidden pb-3"
                       dangerouslySetInnerHTML={{
                         __html: p?.description.slice(0, 300),
                       }}
                     />
                     <div
                       className="hidden md:block pb-3"
                       dangerouslySetInnerHTML={{
                         __html: p?.description.slice(0, 100),
                       }}
                     />

                     <Link to={`/dashboard/details/${p._id}`}
                       className={`${i}

              w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]`}
                     >
                       View More
                     </Link>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           <div
             onClick={() => setShowAll(!showAll)}
             className="w-full flex justify-center items-center pt-3"
           >
             {!showAll ? <IoChevronDown /> : <IoIosArrowUp />}
           </div>
         </>
       ) : (
         <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p>
       )}
  
     </div>
   );
 };

 export default GeneralAllProject;


// import "../GeneralAddProject/editor.css";
// import "react-quill/dist/quill.core.css";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Context/UserContext";
// import { FaPlus } from "react-icons/fa";
// import filter from "../../../assets/filter.png";
// import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
// import ProjectCard from "../GDashboard/ProjectCard";
// import { IoChevronDown } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { CiLight } from "react-icons/ci";
// 
// const GeneralAllProject = () => {
//   const { getAllProjectByUser, allAcceptedSentRequest } = useContext(AuthContext);
//   
//   const [selectedOption, setSelectedOption] = useState("myProject"); // Default to "My Project"
//   const [showAll, setShowAll] = useState(false);
// 
//   const projects = allAcceptedSentRequest?.data;
// 
// 
//   const handleShowMore = () => {
//     setShowAll(true);
//   };
// 
//   const visibleProjects = showAll ? projects : projects?.slice(0, 3);
//   console.log(visibleProjects);
// 
//   return (
//     <div className="relative gray600">
//       <h1 className=" text-[20px] lg:text-[28px] py-4 font-bold">
//         ALL PROJECTS
//       </h1>
// 
//       {/* search div */}
//       <div className="pb-5 w-full justify-between items-center flex flex-row">
//         {/* input */}
//         <div className="w-5/12 flex justify-center items-center relative md:w-6/12 xl:w-7/12 2xl:w-6/12 3xl:w-7/12">
//           <input
//             placeholder="Search"
//             className="w-full h-9 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
//           />
//           <IoIosSearch className="text-2xl absolute right-1" />
//         </div>
// 
//         {/* buttons */}
//         <div className="flex space-x-2 lg:space-x-3 items-center w-6/12 md:w-6/12 xl:w-5/12 2xl:w-5/12 3xl:w-5/12 md:px-4">
//           <button
//             className="flex justify-center items-center space-x-1 w-full my-3 px-1 md:px-3 py-1 lg:px-4 md:py-2 text-[12px] xs:text-[14px] md:text-[16px] text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[7px] h-8 [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
//           >
//             <FaPlus /> <span> New Project</span>
//           </button>
//           <button
//             onClick={() => setSelectedOption(selectedOption === "myProject" ? "sentProject" : "myProject")}
//             className="flex justify-center items-center space-x-1 w-16 my-3 md:px-3 py-1 lg:px-4 md:py-2 text-[14px] md:text-[16px] font-semibold shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] h-8 rounded-[10px]"
//           >
//             <img src={filter} alt="Filter" />
//             <span className="hidden">Filter</span>
//           </button>
//         </div>
//       </div>
// 
//       {/* Option Toggle */}
//       <div className="flex justify-center space-x-4 mb-4">
//         <button
//           onClick={() => setSelectedOption("myProject")}
//           className={`px-4 py-2 rounded-md ${selectedOption === "myProject" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           My Project
//         </button>
//         <button
//           onClick={() => setSelectedOption("sentProject")}
//           className={`px-4 py-2 rounded-md ${selectedOption === "sentProject" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//         >
//           Sent Project
//         </button>
//       </div>
// 
//       {/* cards */}
//       {projects?.length > 0 ? (
//         <>
//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {visibleProjects?.map((p, i) => (
//               <div key={i}>
//                 <div
//                   className="pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden"
//                 >
//                   <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
//                    <img
//                       src={p?.projectId?.images[0]}
//                       className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
//                       alt="Project"
//                     /> 
//                   </div>
// 
//                   <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3 md:px-5 lg:py-3 space-y-1 lg:space-y-1">
//                     <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold py-3 ssm:py-2">
//                       {p?.projectId?.projectName.length > 15
//                         ? `${p?.projectId?.projectName.slice(0, 7)}...`
//                         : p?.projectId?.projectName}
//                     </p>
//                     <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-1">
//                       {p?.projectId?.projectName}
//                     </p> 
//                     <div
//                       className="ssm:hidden pb-3"
//                       dangerouslySetInnerHTML={{
//                         __html: `${p?.description.slice(0, 100)}${
//                           p?.projectId?.description.length > 100 ? "..." : ""
//                         }`,
//                       }}
//                     />
// 
//                     <div
//                       className="hidden ssm:block md:hidden pb-3"
//                       dangerouslySetInnerHTML={{
//                         __html: p?.projectId?.description.slice(0, 300),
//                       }}
//                     />
//                     <div
//                       className="hidden md:block pb-3"
//                       dangerouslySetInnerHTML={{
//                         __html: p?.projectId?.description.slice(0, 100),
//                       }}
//                     /> 
// 
//                     <Link to={`/dashboard/details/${p?.projectId?._id}`}
//                       className="w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
//                     >
//                       View More
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div> 
//           <div
//             onClick={() => setShowAll(!showAll)}
//             className="w-full flex justify-center items-center pt-3"
//           >
//             {!showAll ? <IoChevronDown /> : <IoIosArrowUp />}
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p>
//       )}
//     </div>
//   );
// };
// 
//  export default GeneralAllProject;
// 