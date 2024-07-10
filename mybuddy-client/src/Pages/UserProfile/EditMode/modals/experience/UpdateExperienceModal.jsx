

// // export default UpdateExperienceModal;
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../../../Context/UserContext";
// import Swal from "sweetalert2";

// const UpdateExperienceModal = ({ theme, isOpenUpdateExperience, closeUpdateExperienceModal }) => {
//   const { updateExperience, getUserExperience, user } = useContext(AuthContext);
//   const experienceInfo = getUserExperience?.data[0];
//   const experienceId = getUserExperience?.data[0]?._id;

//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyLocation: "",
//     startDate: "",
//     endDate: "",
//     role: "",
//     jobType: "On-site",
//     employeeType: "Full-time Employee",
//   });

//   const [currentlyWorking, setCurrentlyWorking] = useState(false);

//   useEffect(() => {
//     if (experienceInfo) {
//       setFormData({
//         companyName: experienceInfo?.companyName || '',
//         companyLocation: experienceInfo?.companyLocation || '',
//         startDate: experienceInfo?.startDate || '',
//         endDate: experienceInfo?.endDate || '',
//         role: experienceInfo?.role || '',
//         jobType: experienceInfo?.jobType || 'On-site',
//         employeeType: experienceInfo?.employeeType || 'Full-time Employee',
//       });
//       setCurrentlyWorking(experienceInfo?.endDate === "Currently Working");
//     }
//   }, [experienceInfo]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = () => {
//     setCurrentlyWorking((prev) => !prev);
//     if (!currentlyWorking) {
//       setFormData((prevData) => ({
//         ...prevData,
//         endDate: "Currently Working",
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         endDate: "",
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...formData,
//     };

//     try {
//       await updateExperience({ id: experienceId, data });
//       Swal.fire({
//         icon: "success",
//         title: "Good Job!",
//         text: "You've Updated Your Experience Information!",
//       });
//       closeUpdateExperienceModal();
//       setTimeout(() => {
//         window.location.reload();
//       }, 2500);
//     } catch (error) {
//       console.error("Error updating experience:", error);
//     }
//   };

//   return (
//     <Transition appear show={isOpenUpdateExperience} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeUpdateExperienceModal}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/25" />
//         </Transition.Child>

//         <form className="fixed inset-0 overflow-y-auto" onSubmit={handleSubmit}>
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <div className="px-[3px] rounded-m bg-white">
//                   <div className={`${theme === "light" ? "graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]" : "text-white"}`}>
//                     <p className="m-[1px] pt-2 text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
//                       Update Experience
//                     </p>
//                     <div className="flex justify-center items-center md:-mt-5 lg:justify-start lg:pl-10">
//                       <div className={`${theme === "light" ? "bg-[#f5f5f5] border-gray" : "bg-[#24272f]"} my-4 md:my-9 border xs:w-[250px] md:w-[500px] lg:w-[400px] xl:w-[500px] shadow-2xl space-y-4 p-3 md:p-8 box-border rounded-xl`}>
//                         {/* Role */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             Role
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <input
//                               name="role"
//                               value={formData?.role}
//                               onChange={handleChange}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
//                             />
//                           </div>
//                         </div>

//                         {/* Company Name */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             Company Name
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <input
//                               name="companyName"
//                               value={formData?.companyName}
//                               onChange={handleChange}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
//                             />
//                           </div>
//                         </div>

//                         {/* Company Location */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             Company Location
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <input
//                               name="companyLocation"
//                               value={formData?.companyLocation}
//                               onChange={handleChange}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
//                             />
//                           </div>
//                         </div>

//                         {/* Start Date */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             Start Date
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <input
//                               type="date"
//                               name="startDate"
//                               value={formData?.startDate}
//                               onChange={handleChange}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-full md:px-3 text-[15px] font-medium text-start h-[37px] md:h-[57px]`}
//                             />
//                           </div>
//                         </div>

//                         {/* End Date */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             End Date
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <input
//                               type="date"
//                               name="endDate"
//                               value={currentlyWorking ? "Currently Working" : formData?.endDate}
//                               onChange={handleChange}
//                               disabled={currentlyWorking}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-full md:px-3 text-[15px] font-medium text-start h-[37px] md:h-[57px]`}
//                             />
//                           </div>
//                           <div className="flex items-center mt-2">
//                             <input
//                               type="checkbox"
//                               checked={currentlyWorking}
//                               onChange={handleCheckboxChange}
//                               className="mr-2"
//                             />
//                             <label className={`${theme === "light" ? "text-black" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                               Currently Working
//                             </label>
//                           </div>
//                         </div>

//                         {/* Job Type */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             Job Type
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <select
//                               name="jobType"
//                               value={formData?.jobType}
//                               onChange={handleChange}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
//                             >
//                               <option value="On-site">On-site</option>
//                               <option value="Remote">Remote</option>
//                               <option value="Hybrid">Hybrid</option>
//                             </select>
//                           </div>
//                         </div>

//                         {/* Employee Type */}
//                         <div>
//                           <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
//                             Employee Type
//                           </label>
//                           <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
//                             <select
//                               name="employeeType"
//                               value={formData?.employeeType}
//                               onChange={handleChange}
//                               className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
//                             >
//                               <option value="Full-time Employee">Full-time Employee</option>
//                               <option value="Part-time Employee">Part-time Employee</option>
//                               <option value="Self-Employed">Self-Employed</option>
//                               <option value="Freelancer">Freelancer</option>
//                               <option value="Internship">Internship</option>
//                             </select>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <button
//                       type="submit"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </form>
//       </Dialog>
//     </Transition>
//   );
// };

// export default UpdateExperienceModal;
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Context/UserContext";
import Swal from "sweetalert2";

const UpdateExperienceModal = ({ theme, isOpenUpdateExperience, closeUpdateExperienceModal, experienceId }) => {
  const { updateExperience, getUserExperience } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    companyName: "",
    companyLocation: "",
    startDate: "",
    endDate: "",
    role: "",
    jobType: "On-site",
    employeeType: "Full-time Employee",
  });

  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  useEffect(() => {
    const experienceInfo = getUserExperience?.data.find(exp => exp._id === experienceId);
    if (experienceInfo) {
      setFormData({
        companyName: experienceInfo?.companyName || '',
        companyLocation: experienceInfo?.companyLocation || '',
        startDate: experienceInfo?.startDate || '',
        endDate: experienceInfo?.endDate || '',
        role: experienceInfo?.role || '',
        jobType: experienceInfo?.jobType || 'On-site',
        employeeType: experienceInfo?.employeeType || 'Full-time Employee',
      });
      setCurrentlyWorking(experienceInfo?.endDate === "Currently Working");
    }
  }, [experienceId, getUserExperience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setCurrentlyWorking((prev) => !prev);
    if (!currentlyWorking) {
      setFormData((prevData) => ({
        ...prevData,
        endDate: "Currently Working",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        endDate: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
    };

    try {
      await updateExperience({ id: experienceId, data });
      Swal.fire({
        icon: "success",
        title: "Good Job!",
        text: "You've Updated Your Experience Information!",
      });
      closeUpdateExperienceModal();
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };
  console.log(formData);

  return (
    <Transition appear show={isOpenUpdateExperience} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeUpdateExperienceModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <form className="fixed inset-0 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="px-[3px] rounded-m bg-white">
                  <div className={`${theme === "light" ? "graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]" : "text-white"}`}>
                    <p className="m-[1px] pt-2 text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
                      Update Experience
                    </p>
                    <div className="flex justify-center items-center md:-mt-5 lg:justify-start lg:pl-10">
                      <div className={`${theme === "light" ? "bg-[#f5f5f5] border-gray" : "bg-[#24272f]"} my-4 md:my-9 border xs:w-[250px] md:w-[500px] lg:w-[400px] xl:w-[500px] shadow-2xl space-y-4 p-3 md:p-8 box-border rounded-xl`}>
                        {/* Role */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            Role
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <input
                              name="role"
                              value={formData?.role}
                              onChange={handleChange}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Company Name */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            Company Name
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <input
                              name="companyName"
                              value={formData?.companyName}
                              onChange={handleChange}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Company Location */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            Company Location
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <input
                              name="companyLocation"
                              value={formData?.companyLocation}
                              onChange={handleChange}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Start Date */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            Start Date
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <input
                              type="date"
                              name="startDate"
                              value={formData?.startDate}
                              onChange={handleChange}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-full md:px-3 text-[15px] font-medium text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* End Date */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            End Date
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <input
                              type="date"
                              name="endDate"
                              value={currentlyWorking ? "Currently Working" : formData?.endDate}
                              onChange={handleChange}
                              disabled={currentlyWorking}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-full md:px-3 text-[15px] font-medium text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              checked={currentlyWorking}
                              onChange={handleCheckboxChange}
                              className="mr-2"
                            />
                            <label className={`${theme === "light" ? "text-black" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                              Currently Working
                            </label>
                          </div>
                        </div>

                        {/* Job Type */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            Job Type
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <select
                              name="jobType"
                              value={formData?.jobType}
                              onChange={handleChange}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            >
                              <option value="On-site">On-site</option>
                              <option value="Remote">Remote</option>
                              <option value="Hybride">Hybrid</option>
                            </select>
                          </div>
                        </div>

                        {/* Employee Type */}
                        <div>
                          <label className={`${theme === "light" ? "graish" : "text-white"} text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}>
                            Employee Type
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <select
                              name="employeeType"
                              value={formData?.employeeType}
                              onChange={handleChange}
                              className={`${theme === "light" ? "bg-white text-black" : "bg-[#204057] text-white"} m-[1px] border pl-2 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            >
                              <option value="Full-time Employee">Full-time Employee</option>
                              <option value="Part-time Employee">Part-time Employee</option>
                              <option value="Self-Employed">Self-Employed</option>
                              <option value="Temporary Employee">Temporary Employee</option>
                              <option value="Internship">Internship</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default UpdateExperienceModal;
