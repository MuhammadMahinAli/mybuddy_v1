/* eslint-disable react/prop-types */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import Swal from "sweetalert2";
import { fileUpload } from "../../../../utils/cloudinary";
import { FaCheck } from "react-icons/fa";
const CommitModal = ({
  userId,
  createCommit,
  ProjectInfo,
  closeCommitModal,
  isOpenCommitModal,
}) => {
  // commit form
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    media: "",
    externalLink: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsFileLoading(true); // Start loading

      try {
        const mediaUrl = await fileUpload(file);
        setFormData((prevState) => ({
          ...prevState,
          media: mediaUrl,
        }));
      } catch (error) {
        console.log(error);
      }

      setIsFileLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message || !formData.media) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Message and Media are required fields.",
      });
      return;
    }

    const postData = {
      ...formData,
      commitBy: userId,
      project: ProjectInfo?._id,
      status: "Pending",
    };

    try {
      await createCommit(postData);
      Swal.fire({
        icon: "success",
        title: "Commit Uploaded!",
        text: "Your commit has been successfully submitted.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading your commit. Please try again.",
      });
    }
  };

  return (
    <Transition appear show={isOpenCommitModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCommitModal}>
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

        <div
          className="fixed inset-0 overflow-y-auto"
        >
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
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-[#e9f2f9] p-6 text-left align-middle shadow-xl transition-all">
                <div className="px-[3px] rounded-m bg-[#e9f2f9]">
                  <div className={`graish`}>
                   
                    <div className="p-6  ">
                      <div className=" p-6">
                        <form onSubmit={handleSubmit}>
                          <div className=" flex items-center justify-between  mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Message :
                            </label>
                            <textarea
                              type="text"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              className="w-10/12 p-3 border border-gray-200 rounded-md bg-[#e4ecf7] outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                              placeholder="Enter your message"
                            />
                          </div>
                          <div className="flex items-center space-x-20 mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                              Media :
                            </label>
                            <input
                              type="file"
                              onChange={handlePreviewImage}
                              className="hidden"
                              id="mediaUpload"
                            />
                            <label
                              htmlFor="mediaUpload"
                              className="p-3 [background:linear-gradient(-44.24deg,#87aaff,#447afc)] text-white rounded-md flex items-center space-x-2 cursor-pointer"
                            >
                              {
                                formData?.media ?
<FaCheck />
                                :
                                <svg
                                width="29"
                                height="23"
                                viewBox="0 0 29 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.3448 21.7148V11.3779M14.3448 11.3779L11.0222 14.8235M14.3448 11.3779L17.6674 14.8235M6.37063 19.992C3.43462 19.992 1.0545 17.5678 1.0545 14.5775C1.0545 12.1133 2.67058 10.0337 4.88209 9.37803C4.97606 9.35012 5.0416 9.26255 5.0416 9.16288C5.0416 4.67729 8.61176 1.04102 13.0158 1.04102C17.4198 1.04102 20.99 4.67729 20.99 9.16288C20.99 9.24882 21.0691 9.31261 21.1515 9.29386C21.5272 9.20806 21.9179 9.16288 22.319 9.16288C25.255 9.16288 27.6351 11.587 27.6351 14.5775C27.6351 17.5678 25.255 19.992 22.319 19.992"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>  
                              }
                             
                              <span>{formData?.media ? "Uploaded": "Upload"}</span>
                            
                            </label>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                              External Link :
                            </label>
                            <input
                              type="text"
                              name="externalLink"
                              value={formData.externalLink}
                              onChange={handleInputChange}
                              className="w-10/12 p-3 border border-gray-200 rounded-md bg-[#e4ecf7] outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                              placeholder="Enter the link"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-40 float-right bg-gradient-to-r [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)] text-white py-3 px-2 rounded-md"
                          >
                            Upload Commit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CommitModal;
