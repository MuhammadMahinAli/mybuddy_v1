import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Context/UserContext";
import Swal from "sweetalert2";
import { useUpdateLicenseMutation } from "../../../../../features/license/licenseApi";

const UpdateLicenseModal = ({theme,isOpenUpdateLicence,currentLicenseId,closeUpdateLicenceModal}) => {
      // Initialize form data state
  const{getUserLicense,user}=useContext(AuthContext);
  const licenseInfo = getUserLicense?.data[0];
  const lisenseId  = getUserLicense?.data[0]?._id
      const [formData, setFormData] = useState({
    title: "",
    organization: "",
    issueDate: "",
    credentialLink: "",
  });

  
  // Populate form data state with licenseInfo when modal opens
  useEffect(() => {
    if (licenseInfo) {
      setFormData({
        title: licenseInfo?.title || '',
        organization: licenseInfo?.organization || '',
        issueDate: licenseInfo?.issueDate || '',
        credentialLink: licenseInfo?.credentialLink || '',
      });
    }
  }, [licenseInfo]);

  useEffect(() => {
    const licenseInfo = getUserLicense?.data.find(exp => exp._id === currentLicenseId);
    if (licenseInfo) {
      setFormData({
        title: licenseInfo?.title || '',
        organization: licenseInfo?.organization || '',
        issueDate: licenseInfo?.issueDate || '',
        credentialLink: licenseInfo?.credentialLink || '',
      });
    }
  }, [currentLicenseId, getUserLicense]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 // Handle form submission
 

//   const handleSubmit = (e,id) => {
//     e.preventDefault();
//     const data ={
//       ...formData
//     }
//     console.log(formData);

//     console.log('data',data);
//      updateLicense({id,data}).unwrap() 
//     Swal.fire({
//       icon: "success",
//       title: "Good Job !",
//       text: "You've Updated Your License Information !",
//     });
//     closeUpdateLicenceModal();
//     // setTimeout(() => {
//     //   window.location.reload();
//     // }, 2500);

//     console.log(formData);
// }

const [updateLicense, { isLoading, isSuccess, isError, error }] = useUpdateLicenseMutation();
const handleSubmit = async ( id) => {

  
  const data = {
    ...formData,
  };

  console.log(formData);
  console.log('data', data);

  try {
    // Await the `unwrap` to handle the resolved/rejected state properly
    await updateLicense({ id, data }).unwrap();
    
    Swal.fire({
      icon: "success",
      title: "Good Job!",
      text: "You've Updated Your License Information!",
    });
    
    closeUpdateLicenceModal();
  } catch (error) {
    console.error('Failed to update license:', error);
    
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Failed to update your license information. Please try again.",
    });
  }

  console.log(formData);
};



    return (
        <Transition appear show={isOpenUpdateLicence} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeUpdateLicenceModal}>
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
  
          <div className="fixed inset-0 overflow-y-auto" >
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
                    <div
                      className={`${
                        theme === "light"
                          ? "graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]"
                          : "text-white"
                      } `}
                    >
                      <p className="m-[1px] pt-2  text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
                        Add A New License And Certificate
                      </p>
                      <div className="flex justify-center items-center md:-mt-5 lg:justify-start lg:pl-10">
                        <div
                          className={`${
                            theme === "light"
                              ? "bg-[#f5f5f5] border-gray"
                              : "bg-[#24272f]"
                          } my-4 md:my-9 border xs:w-[250px] md:w-[500px] lg:w-[400px] xl:w-[500px] shadow-2xl space-y-4 p-3 md:p-8 box-border rounded-xl`}
                        >
                          {/* Title */}
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              Title
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <input
                                name="title"
                                value={formData?.title}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border pl-2  outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>
  
                          {/* Organization */}
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              Organization
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <input
                                name="organization"
                                value={formData?.organization}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border pl-2  outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>
  
                          {/* Issue Date */}
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              Issue Date
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <input
                                type="date"
                                name="issueDate"
                                value={formData?.issueDate}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-full md:px-3 text-[15px] font-medium text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>
  
                          {/* Credential Link */}
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              Credential Link
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <input
                                name="credentialLink"
                                value={formData?.credentialLink}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border pl-2  outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                    onClick={()=>handleSubmit(lisenseId)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
};

export default UpdateLicenseModal;