/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { fileUpload } from "../../../../utils/cloudinary";
import { FaCheck } from "react-icons/fa";

const CommitModal = ({
  isMatchingMember,
  userId,
  buttonColor,
  createCommit,
  ProjectInfo,
  closeCommitModal,
  isOpenCommitModal,
  tasks,
  cardBg,
  borderColor,
  textColor,
}) => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    media: [],
    externalLink: "",
    completedTask: [],
  });

  const handleInputChange = (e) => {
    console.log("dddd");
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsFileLoading(true);

      try {
        const mediaUrl = await fileUpload(file);
        setFormData((prevState) => ({
          ...prevState,
          media: [...prevState.media, mediaUrl],
        }));
      } catch (error) {
        console.log(error);
      }

      setIsFileLoading(false);
    }
  };

  const handleTaskCheckboxChange = (e, title, type) => {
    const isChecked = e.target.checked;

    setFormData((prevState) => {
      const updatedCompletedTask = { ...prevState.completedTask };

      if (type === "task") {
        if (isChecked) {
          updatedCompletedTask.task = title;
        } else {
          updatedCompletedTask.task = "";
        }
      } else if (type === "subTask") {
        updatedCompletedTask.subTask = updatedCompletedTask.subTask || [];

        if (isChecked) {
          if (!updatedCompletedTask.subTask.includes(title)) {
            updatedCompletedTask.subTask = [
              ...updatedCompletedTask.subTask,
              title,
            ];
          }
        } else {
          updatedCompletedTask.subTask = updatedCompletedTask.subTask.filter(
            (sub) => sub !== title
          );
        }
      }

      return {
        ...prevState,
        completedTask: updatedCompletedTask,
      };
    });
  };

  // Utility function to check if a task or subTask is checked
  const isTaskChecked = (title, type) => {
    if (type === "task") {
      return formData.completedTask.task === title;
    } else if (type === "subTask") {
      return formData.completedTask.subTask?.includes(title) || false;
    }
    return false;
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
    console.log("commit", postData);
    try {
      await createCommit(postData).unwrap();
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

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel
                className={`w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-[#fff] p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="px-[3px] rounded-m">
                  <form onSubmit={handleSubmit} className={`graish`}>
                    <div
                      role="alert"
                      className={`rounded shadow-md border-s-4  ${borderColor} ${cardBg} p-4`}
                    >
                      <strong
                        className={` block text-lg font-bold ${textColor}`}
                      >
                        {" "}
                        Rules of Commit
                      </strong>

                      <p className={`mt-2 text-lg`}>
                        {`You've to complete at least 1 task / sub task to commit. You've to add at least 1  work proof ( media ) & can add maximum 10.`}
                      </p>
                    </div>
                    <div className="space-y-5 py-6">
                      <div>
                        <p className="text-2xl font-semibold">Task</p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={
                              tasks?.status === "pending"
                                ? isTaskChecked(tasks?.title, "task")
                                : true
                            }
                            onChange={(e) =>
                              handleTaskCheckboxChange(e, tasks?.title, "task")
                            }
                          />
                          <p
                            className={`${
                              tasks?.status === "pending"
                                ? "text-gray-600"
                                : "text-gray-400"
                            } text-xl font-semibold`}
                          >
                            {tasks?.title}
                          </p>
                        </div>
                      </div>
                      {tasks?.subTask?.length !== 0 && (
                        <div>
                          <p className="text-xl font-semibold">SubTask</p>
                          <ul>
                            {tasks?.subTask?.map((sub, i) => (
                              <li
                                className="flex items-center space-x-2"
                                key={i}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    sub?.status === "pending"
                                      ? isTaskChecked(sub?.todo, "subTask")
                                      : true
                                  }
                                  onChange={(e) =>
                                    handleTaskCheckboxChange(
                                      e,
                                      sub?.todo,
                                      "subTask"
                                    )
                                  }
                                />
                                <p
                                  className={`${
                                    sub?.status === "pending"
                                      ? "text-gray-600"
                                      : "text-gray-400"
                                  } text-xl font-semibold`}
                                >
                                  {sub?.todo}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="md:p-4 lg:p-6 3xl:p-10  rounded-xl shadow-xl">
                      <div>
                        <div className=" flex flex-col md:flex-row md:items-center justify-between  mb-4">
                          <label className="block text-gray-700 font-bold mb-2">
                            Message :
                          </label>
                          <textarea
                            type="text"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="md:w-10/12 p-3 border border-gray-200 rounded-md  outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                            placeholder="Enter your message"
                          />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 xl:space-x-[44px] 2xl:space-x-[55px] 3xl:space-x-[60px] 4xl:space-x-[70px] 5xl:space-x-[80px] 6xl:space-x-[170px] mb-4">
                          <label className="block w-28 text-gray-700 font-bold mb-2">
                            Media :
                          </label>

                          {/* Hidden file input */}
                          <input
                            type="file"
                            onChange={handlePreviewImage}
                            className="hidden"
                            id="mediaUpload"
                          />

                          {/* Visible button associated with the label */}
                          <label
                            htmlFor="mediaUpload"
                            className="cursor-pointer w-full"
                          >
                            <div
                              className={`flex items-center space-x-2 px-3 w-52 py-2 ${buttonColor} text-white rounded-md`}
                            >
                              <svg
                                width="29"
                                height="23"
                                viewBox="0 0 29 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.3448 21.7148V11.3779M14.3448 11.3779L11.0222 14.8235M14.3448 11.3779L17.6674 14.8235M6.37063 19.992C3.43462 19.992 1.0545 17.5678 1.0545 14.5775C1.0545 12.1133 2.67058 10.0337 4.88209 9.37803C4.97606 9.35012 5.0416 9.26255 5.0416 9.16288C5.0416 4.67729 8.61176 1.04102 13.0158 1.04102C17.4198 1.04102 20.99 4.67729 20.99 9.16288C20.99 9.24882 21.0691 9.31261 21.1515 9.29386C21.5272 9.20806 21.9179 9.16288 22.319 9.16288C25.255 9.16288 27.6351 11.5871 27.6351 14.5775C27.6351 17.5678 25.255 19.992 22.319 19.992H6.37063Z"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span>
                                {isFileLoading
                                  ? "Uploading..."
                                  : formData.media.length < 10
                                  ? `Upload next media`
                                  : "Maximum 10 media files reached"}
                              </span>
                            </div>
                          </label>
                        </div>

                        {formData.media?.length !== 0 && (
                          <div className="grid grid-cols-1 ssm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pt-4 pb-7">
                            {formData.media.length > 0 &&
                              formData.media.map((media, index) => (
                                <button
                                  key={index}
                                  className={`flex items-center justify-center py-1 space-x-2 ${buttonColor} opacity-85 text-white rounded-md`}
                                >
                                  <FaCheck />
                                  <span>{index + 1} Selected</span>
                                </button>
                              ))}
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center justify-between  mb-4">
                          <label className="block text-gray-700 font-bold mb-2">
                            External Link :
                          </label>
                          <input
                            type="text"
                            name="externalLink"
                            value={formData.externalLink}
                            onChange={handleInputChange}
                            className="md:w-10/12 p-3 border border-gray-200 rounded-md  outline-none shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset]"
                            placeholder="Enter external link (optional)"
                          />
                        </div>
                      </div>

                      <div className="flex">
                        <button
                          type="submit"
                          className={`text-lg text-white font-medium ${buttonColor} py-2 px-8 rounded-md`}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
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
