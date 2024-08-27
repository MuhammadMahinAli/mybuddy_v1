 import "../GeneralAddProject/editor.css";
 import "react-quill/dist/quill.core.css";
 import { useContext, useState } from "react";
 import { AuthContext } from "../../../Context/UserContext";
 import { FaPlus } from "react-icons/fa";
 import filter from "../../../assets/filter.png";
 import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
 import { IoChevronDown } from "react-icons/io5";
 import { Link } from "react-router-dom";
 
 const TeamMemberProject = () => {
   const {allAcceptedSentRequest } = useContext(AuthContext);
   
   const [selectedOption, setSelectedOption] = useState("myProject"); // Default to "My Project"
   const [showAll, setShowAll] = useState(false);
 
   const projects = allAcceptedSentRequest?.data;
 
 
   const handleShowMore = () => {
     setShowAll(true);
   };
 
   const visibleProjects = showAll ? projects : projects?.slice(0, 3);
   console.log(visibleProjects);
 
   return (
     <div className="relative gray600">
     
       {/* Option Toggle */}
   
       {/* cards */}
       {projects?.length > 0 ? (
         <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {visibleProjects?.map((p, i) => (
               <div key={i}>
                 <div
                   className="pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden"
                 >
                   <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                    <img
                       src={p?.projectId?.images[0]}
                       className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
                       alt="Project"
                     /> 
                   </div>
 
                   <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3 md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                     <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold py-3 ssm:py-2 lg:py-0">
                       {p?.projectId?.projectName.length > 15
                         ? `${p?.projectId?.projectName.slice(0, 7)}...`
                         : p?.projectId?.projectName}
                     </p>
                     <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-1">
                       {p?.projectId?.projectName}
                     </p> 
                    <div
                       className="ssm:hidden pb-3"
                       dangerouslySetInnerHTML={{
                         __html: `${p?.projectId?.description.slice(0, 100)}${
                           p?.projectId?.description.length > 100 ? "..." : ""
                         }`,
                       }}
                     />
 
                     <div
                       className="hidden ssm:block md:hidden pb-3"
                       dangerouslySetInnerHTML={{
                         __html: p?.projectId?.description.slice(0, 300),
                       }}
                     /> 
                     <div
                       className="hidden md:block pb-3"
                       dangerouslySetInnerHTML={{
                         __html: p?.projectId?.description.slice(0, 100),
                       }}
                     /> 
 
                     <Link to={`/dashboard/details/${p?.projectId?._id}`}
                       className="w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
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
         <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You're not working any team project yet.`}</p>
       )}
     </div>
   );
 };
 
  export default TeamMemberProject;
 