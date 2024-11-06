import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";
import Loading from "../Loading/Loading";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaCodepen,
  FaDev,
} from "react-icons/fa";

const Try = () => {
  const [projects, setProjects] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch projects with pagination or uniqueId filter
  const fetchProjects = async (page = 1, uniqueIdFilter = "") => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/member/getAllMember`,
        {
          params: {
            page,
            limit: 6,
            uniqueId: uniqueIdFilter,
          },
        }
      );
      const data = response.data.data;

      console.log("dd", data);

      setProjects(data.users || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);

      // Set isFiltered to true if uniqueIdFilter is applied, else false
      setIsFiltered(!!uniqueIdFilter);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message ===
          "No project matched with the provided uniqueId."
      ) {
        setProjects([]); // No match found 01768320134
      }
    }
    setLoading(false); // Set loading to false when data is fetched 01620702021
  };

  // Initial fetch of projects
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  // Handle uniqueId filter
  const handleFilter = () => {
    fetchProjects(1, uniqueId);
  };

  // Reset to original paginated view
  const handleReset = () => {
    setUniqueId("");
    setIsFiltered(false);
    fetchProjects(1); // Fetch initial 6 projects
  };

  return (
    <div>
      <div>
        <div className="w-5/12 flex justify-center items-center relative md:w-8/12 xl:w-7/12 2xl:w-6/12 3xl:w-7/12 mb-4">
          <input
            type="text"
            placeholder="Search"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="w-full h-9 md:h-10 lg:h-12 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
          />
          <IoIosSearch
            onClick={handleFilter}
            className="text-2xl absolute right-8 cursor-pointer"
          />
          {isFiltered && (
            <AiOutlineReload
              onClick={handleReset}
              className="text-2xl absolute right-1 cursor-pointer"
            />
          )}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((p, i) => (
                <div key={i}>
                  <div className="my-10 bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
                    {/* Profile Image */}
                    <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-yellow-300 -mt-16">
                      <img
                        src="https://via.placeholder.com/100" // Replace this URL with the actual image URL
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name and Role */}
                    <h2 className="text-2xl font-semibold mt-4">
                      {p.name.firstName} {p.name.lastName}
                    </h2>
                    <p className="text-purple-600 font-medium">{p.role}</p>

                    {/* Bio */}
                    <p className="text-gray-600 mt-2 text-sm">
                      {p.about
                        ? p.about.slice(0, 30) + "..."
                        : `Nothing to show about ${p.name.firstName} ${p.name.lastName}`}
                    </p>

                    {/* Email Button */}
                    <button className="bg-purple-700 text-white py-2 px-4 rounded-lg mt-4">
                      {p.email}
                    </button>

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-4 mt-4 text-purple-600 text-xl">
                      <a href="#">
                        <FaTwitter />
                      </a>
                      <a href="#">
                        <FaInstagram />
                      </a>
                      <a href="#">
                        <FaGithub />
                      </a>
                      <a href="#">
                        <FaLinkedin />
                      </a>
                      <a href="#">
                        <FaCodepen />
                      </a>
                      <a href="#">
                        <FaDev />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center">
                No project matched with the provided uniqueId.
              </p>
            )}
          </div>
        )}

        {!isFiltered && (
          <div className="pagination flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Try;

//------------------------------------------- Project ---------------------------------//

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { IoIosSearch } from "react-icons/io";
// import { AiOutlineReload } from "react-icons/ai";
// import Loading from "../Loading/Loading";
// import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaCodepen, FaDev } from 'react-icons/fa';

// const Try = () => {
//   const [projects, setProjects] = useState([]);
//   const [uniqueId, setUniqueId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch projects with pagination or uniqueId filter
//   const fetchProjects = async (page = 1, uniqueIdFilter = "") => {
//     setLoading(true); // Set loading to true when fetching data
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/project/getAllProject`,
//         {
//           params: {
//             page,
//             limit: 6,
//             uniqueId: uniqueIdFilter,
//           },
//         }
//       );
//       const data = response.data.data;

//       console.log("dd", data);

//       setProjects(data.projects || []);
//       setCurrentPage(data.currentPage || 1);
//       setTotalPages(data.totalPages || 1);

//       // Set isFiltered to true if uniqueIdFilter is applied, else false
//       setIsFiltered(!!uniqueIdFilter);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data.message ===
//           "No project matched with the provided uniqueId."
//       ) {
//         setProjects([]); // No match found
//       }
//     }
//     setLoading(false); // Set loading to false when data is fetched
//   };

//   // Initial fetch of projects
//   useEffect(() => {
//     fetchProjects(currentPage);
//   }, [currentPage]);

//   // Handle uniqueId filter
//   const handleFilter = () => {
//     fetchProjects(1, uniqueId);
//   };

//   // Reset to original paginated view
//   const handleReset = () => {
//     setUniqueId("");
//     setIsFiltered(false);
//     fetchProjects(1); // Fetch initial 6 projects
//   };

//   return (
//     <div>

//     <div className="flex justify-center items-center min-h-screen bg-purple-100">
//       <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
//         {/* Profile Image */}
//         <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-yellow-300 -mt-16">
//           <img
//             src="https://via.placeholder.com/100" // Replace this URL with the actual image URL
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Name and Role */}
//         <h2 className="text-2xl font-semibold mt-4">Joeylene Rivera</h2>
//         <p className="text-purple-600 font-medium">Web Developer</p>

//         {/* Bio */}
//         <p className="text-gray-600 mt-2 text-sm">
//           A kiddo who uses Bootstrap and Laravel in web development. Currently playing around with design via Figma.
//         </p>

//         {/* Email Button */}
//         <button className="bg-purple-700 text-white py-2 px-4 rounded-lg mt-4">
//           joeylenerivera@gmail.com
//         </button>

//         {/* Social Icons */}
//         <div className="flex justify-center space-x-4 mt-4 text-purple-600 text-xl">
//           <a href="#"><FaTwitter /></a>
//           <a href="#"><FaInstagram /></a>
//           <a href="#"><FaGithub /></a>
//           <a href="#"><FaLinkedin /></a>
//           <a href="#"><FaCodepen /></a>
//           <a href="#"><FaDev /></a>
//         </div>
//       </div>
//     </div>

//       <div>
//         <div className="w-5/12 flex justify-center items-center relative md:w-8/12 xl:w-7/12 2xl:w-6/12 3xl:w-7/12 mb-4">
//           <input
//             type="text"
//             placeholder="Search"
//             value={uniqueId}
//             onChange={(e) => setUniqueId(e.target.value)}
//             className="w-full h-9 md:h-10 lg:h-12 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
//           />
//           <IoIosSearch
//             onClick={handleFilter}
//             className="text-2xl absolute right-8 cursor-pointer"
//           />
//           {isFiltered && (
//             <AiOutlineReload
//               onClick={handleReset}
//               className="text-2xl absolute right-1 cursor-pointer"
//             />
//           )}
//         </div>
//         {loading ? (
//           <Loading />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {projects.length > 0 ? (
//               projects.map((p, i) => (
//                 <div key={i}>
//                   <div
//                     className={`pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-lg overflow-hidden`}
//                   >
//                     <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
//                       <img
//                         src={p.images[0]}
//                         alt="Project"
//                         className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
//                       />
//                     </div>
//                     <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3 md:px-5 lg:py-3 space-y-1 lg:space-y-1">
//                       <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold pt-2 ssm:py-0">
//                         {p.projectName.length > 15
//                           ? `${p.projectName.slice(0, 7)}...`
//                           : p.projectName}
//                       </p>
//                       <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-0">
//                         {p.projectName}
//                       </p>
//                       <div
//                         className="ssm:hidden pb-3"
//                         dangerouslySetInnerHTML={{
//                           __html: `${p.description.slice(0, 100)}${
//                             p.description.length > 100 ? "..." : ""
//                           }`,
//                         }}
//                       />
//                       <div
//                         className="hidden ssm:block md:hidden pb-3"
//                         dangerouslySetInnerHTML={{
//                           __html: p.description.slice(0, 130),
//                         }}
//                       />
//                       <div
//                         className="hidden md:block pb-3"
//                         dangerouslySetInnerHTML={{
//                           __html: p.description.slice(0, 100),
//                         }}
//                       />
//                       <button className="w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]">
//                         <Link to={`/dashboard/details/${p._id}`}>
//                           View More
//                         </Link>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="col-span-full text-center">
//                 No project matched with the provided uniqueId.
//               </p>
//             )}
//           </div>
//         )}

//         {!isFiltered && (
//           <div className="pagination flex justify-center mt-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Try;

{
  /* <div className="fixed top-0 left-0 lg:left-20 flex justify-center items-center bg-black/5 bg-opacity-50 w-screen h-screen overflow-y-scroll">
                      <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] 3xl:w-[800px] cursor-pointer">
                      <IoIosCloseCircleOutline
                          onClick={() => setIsPayModalOpen(false)}
                          className="text-xl float-right"
                        /> 
                        <div className="flex flex-col py-7">
                          <h2 className="text-xl lg:text-2xl font-bold mb-6">
                            Enter an amount for funding
                          </h2>

                        Radio Buttons for selecting funding type 
                          <div className="mb-6 flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="donation"
                                  checked={selectedOption === "donation"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Donation</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label>
                                <input
                                  value="buyStack"
                                  checked={selectedOption === "buyStack"}
                                  onChange={handleOptionChange}
                                  type="checkbox"
                                  className="pay-input"
                                />
                                <span className="custom-checkbox"></span>
                              </label>
                              <p className="ml-2">Buy Stack</p>
                            </div>
                          </div>

                         Conditionally render based on selected option 
                          {selectedOption === "donation" ? (
                            <>
                              <input
                                //value={amount}
                                type="number"
                                // onChange={(e) =>
                                //   setAmount(parseFloat(e.target.value) || "")
                                // }
                                className="payment-input w-[200px] lg:w-[400px] mb-6"
                                placeholder="Enter Amount"
                              />
                              <button
                                // onClick={() => handlePayment(selectedProject)}
                                // disabled={loading}
                                className="fancy w-44"
                              >
                                <span className="top-key"></span>
                                <span className="text">
                                  {" pay"}
                                 {loading ? "Processing..." : "Pay Now"}
                                </span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                              </button>
                            </>
                          ) : (
                            <p className="text-2xl font-semibold py-3">
                              Coming Soon
                            </p>
                          )}
                        </div>
                      </div>
b                    </div> */
}

// const Try = () => {
//   const meetingData = {
//     _id: {
//       $oid: "670e0669f773c8df141b3f95",
//     },
//     projectId: {
//       $oid: "66e7b19955557bdb2d692820",
//     },
//     creator:  {
//       "_id": "66e6d2dac01285d519e32177",
//       "email": "shadrinmoni15@gmail.com",
//       "name": {
//       "firstName": "Jane",
//       "lastName": "Thompson",
//       "_id": "66ed67c443c00c866e98ec15"
//       },
//       "phoneNumber": "+124123235",
//       "phoneNumberPrivacy": false,
//       "address": "",
//       "addressPrivacy": false,
//       "country": "",
//       "role": "Full Stack Developer",
//       "profilePic": "",
//       "coverPic": "",
//       "about": "",
//       "emailVerified": true,
//       "createdAt": "2024-09-15T12:28:10.268Z",
//       "updatedAt": "2024-09-20T12:17:08.630Z",
//       "__v": 0,
//       "resetPasswordExpires": "2024-09-16T02:33:28.899Z",
//       "resetPasswordToken": "6dabde36f286cd52913ce2988086c80777d930b1dc0451600ca66dd9b8280b34"
//       },
//     meetingMembers: [
//       {
//         memberId: {
//           _id: "66de8586fa97180c4f05844f",
//           email: "mahintahmid2024@gmail.com",
//           name: {
//             firstName: "mahin",
//             lastName: "tahmid",
//             _id: "66fc6a6229ec316d1474d629",
//           },
//           profilePic:
//             "https://res.cloudinary.com/dv51da0o9/image/upload/v1725859341/fv470fyaktfhahparjdq.jpg",
//         },
//         attendance: [
//           {
//             meetingDate: "2024-10-06T06:30:00.000Z",
//             isAttend: false,
//             _id: "6702276349b7bc65dc3fc71b",
//           },
//         ],
//         _id: "6702267d49b7bc65dc3fc714",
//       },
//       {
//         memberId: {
//           _id: "66de8586fa97180c4f05844f",
//           email: "mahintahmid2024@gmail.com",
//           name: {
//             firstName: "Farin",
//             lastName: "tahmid",
//             _id: "66fc6a6229ec316d1474d629",
//           },
//           profilePic:
//             "https://res.cloudinary.com/dv51da0o9/image/upload/v1725859341/fv470fyaktfhahparjdq.jpg",
//         },
//         attendance: [
//           {
//             meetingDate: "2024-10-06T06:30:00.000Z",
//             isAttend: false,
//             _id: "6702276349b7bc65dc3fc71b",
//           },
//         ],
//         _id: "6702267d49b7bc65dc3fc714",
//       },
//     ],
//     title: "Test",
//     description: "Test description",
//     meetingPlatform: {
//       platform: "Zoom",
//       link: "https://zoom.com",
//     },
//     duration: 0,
//     meetingTime: {
//       $date: "2024-10-15T06:39:00.000Z",
//     },
//     timeZone: "Asia/Dhaka",
//     repeat: "everyday",
//     weeklyRepeat: 1,
//     endDate: {
//       $date: "2024-10-22T06:39:00.000Z",
//     },
//     customDays: [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ],
//     attendenceLink: null,
//     createdAt: {
//       $date: "2024-10-15T06:06:33.200Z",
//     },
//     updatedAt: {
//       $date: "2024-10-15T06:44:38.514Z",
//     },
//     __v: 0,
//   };

//   // Function to format the date
//   function formatDate(dateString, formatType) {
//     const date = new Date(dateString);

//     if (formatType === "date") {
//       const options = { day: "numeric", month: "short", year: "numeric" };
//       return date.toLocaleDateString("en-GB", options);
//     }

//     if (formatType === "time") {
//       const options = { hour: "numeric", minute: "numeric", hour12: true };
//       return date.toLocaleTimeString("en-GB", options);
//     }

//     if (formatType === "monthDayYear") {
//       const options = { day: "numeric", month: "short", year: "numeric" };
//       return date.toLocaleDateString("en-GB", options).replace(/\s/, ", ");
//     }
//   }

//   // Formatting Start Time (e.g., 10:00 AM)
//   const formattedStartTime = formatDate(meetingData.meetingTime.$date, "time");

//   // Formatting Start Date (e.g., 15 Oct, 2024)
//   const formattedStartDate = formatDate(
//     meetingData.meetingTime.$date,
//     "monthDayYear"
//   );

//   // Formatting End Date (e.g., 22 Oct, 2024)
//   const formattedEndDate = formatDate(
//     meetingData.endDate.$date,
//     "monthDayYear"
//   );

//   // Example Output
//   console.log(formattedStartTime); // "10:00 AM"
//   console.log(formattedStartDate); // "15 Oct, 2024"
//   console.log(formattedEndDate); // "22 Oct, 2024"

//   const bgColors = [
//     "#fff3c4",
//     "#e0ebf6",
//     "#d0cddd",
//     "#d0eafd",
//     "#d0cddd",
//     "#e0ffd2",
//     "#fddac2",
//     "#b0d3e8",
//   ];

//   return (
//     <div>
//       <div className="max-w-lg mx-auto bg-white border border-gray-300 shadow-md p-6 rounded-lg">
//         {/* Creator and Role */}
//         <div className="flex space-x-2 items-center mb-4">
//         <img
//                   src={
//                     meetingData.creator.profilePic
//                       ? meetingData.creator.profilePic
//                       : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                   }
//                   loading="lazy"
//                   alt={meetingData.creator.name?.firstName}
//                   className="h-12 w-12 rounded-full ml-2"
//                 />
//           <div>
//             <h2 className="text-lg font-semibold">{meetingData.creator.name?.firstName}  {meetingData.creator.name?.lastName}</h2>
//             <p className="text-sm text-gray-600">{meetingData.creator.role}</p>
//           </div>
//         </div>

//         {/* Meeting Details */}
//         <div className="mb-4">
//           <h3 className="text-lg font-bold">{meetingData.title}</h3>
//           <p className="text-lg text-gray-700">{meetingData.description}</p>
//         </div>

//         {/* Time & Schedule */}
//         <div className="mb-4">
//           <p className="text-lg text-gray-600">
//             Meeting will start from{" "}
//             <span className="font-bold">{formattedStartDate}</span>, and End
//             on <span className="font-bold">{formattedEndDate}</span>, on
//             every{" "}
//             <span className="font-bold">
//               {meetingData.customDays.join(", ")}
//             </span>

//           </p>

//           <p className="mt-4 font-bold text-lg ">
//             Start Time :{" "}
//             <span className="font-normal uppercase">{formattedStartTime}</span>
//           </p>
//         </div>

//         {/* Invited Members */}
//         <div className="mb-4">
//           <h4 className="font-bold text-lg">Invited Members:</h4>
//           <div className="grid grid-cols-2 gap-2 mt-2">
//             {meetingData.meetingMembers.map((item, index) => (
//               <div
//                 key={item?.memberId?.profilePic}
//                 style={{ backgroundColor: bgColors[index] }}
//                 className="flex  items-center px-3 py-2 rounded-lg shadow-lg  "
//               >
//                 <img
//                   src={
//                     item?.memberId?.profilePic
//                       ? item?.memberId?.profilePic
//                       : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                   }
//                   loading="lazy"
//                   alt={item?.memberId?.name?.firstName}
//                   className="h-9 w-9 rounded-full ml-2"
//                 />
//                 <div className="text-lg md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
//                   {item?.memberId?.name?.firstName}{" "}
//                   {item?.memberId?.name?.lastName}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Update Button */}
//         <div className="flex justify-center">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//             Update Attendance
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Try;
