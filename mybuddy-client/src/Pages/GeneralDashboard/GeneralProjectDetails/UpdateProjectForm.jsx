/* eslint-disable react/prop-types */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
const UpdateProjectForm = ({
  initialData,
  openUpdateModal,
  closeProjectUpdateModal,
}) => {
  const projectId = initialData?._id;
  const { updateProjectInfo } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    projectName: initialData.projectName || "",
    category: initialData.category || "",
    whatsApp: initialData.whatsApp || "",
    discord: initialData.discord || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    description: initialData.description || "",
    // documents: initialData.documents || [],
    // pdfFiles: initialData.pdfFiles || [],
    // images: initialData.images || [],
    // videoUrl: initialData.videoUrl || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "description" ? `<p>${value}</p>` : value,
    });
  };

  //   const handleFileChange = (e) => {
  //     const { name, files } = e.target;
  //     setFormData({ ...formData, [name]: Array.from(files) });
  //   };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const data = {
      ...formData,
    };
    console.log(data);
    updateProjectInfo({ id, data }).unwrap();
    Swal.fire({
      icon: "success",
      title: "Well done !",
      text: "You have updated the project info successfully!",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    <Transition appear show={openUpdateModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeProjectUpdateModal}
      >
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

        <form
          className="fixed inset-0 overflow-y-auto"
          onSubmit={(e) => handleSubmit(e, projectId)}
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
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl  bg-[#e8eff7]  p-6 text-left align-middle shadow-xl transition-all">
                <div className="px-[3px] rounded-m  bg-[#e8eff7] ">
                  <div
                    className={`graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]`}
                  >
                    <div className="p-5 md:p-3 lg:p-6 w-[320px] sm:w-11/12 space-y-2">
                      {/* Project Name */}
                      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px] lg:w-[460px] flex flex-col space-y-2 font-medium gray600">
                        <label className="text-[18px] md:text-xl">
                          Project Name:
                        </label>
                        <input
                          type="text"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                          className="outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
                        />
                      </div>

                      {/* Category */}
                      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px] lg:w-[460px] flex flex-col space-y-2 font-medium gray600">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-3">
                          <label className="text-[18px] md:text-xl">
                            Category:
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="lg:mx-9 outline-none rounded-lg py-3 px-2 md:w-[315px] lg:w-[340px] bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
                          >
                            <option value="">Select</option>
                            <option value="technology">Technology</option>
                            <option value="tech">Tech</option>
                            <option value="software">Software</option>
                            <option value="cloud-computing">
                              Cloud Computing
                            </option>
                            <option value="ai">Artificial Intelligence</option>
                            <option value="machine-learning">
                              Machine Learning
                            </option>
                            <option value="iot">Internet of Things</option>
                            <option value="data-science">Data Science</option>
                            <option value="blockchain">Blockchain</option>
                            <option value="cybersecurity">Cybersecurity</option>
                            <option value="web-development">
                              Web Development
                            </option>
                            <option value="mobile-development">
                              Mobile Development
                            </option>
                            <option value="devops">DevOps</option>
                            <option value="robotics">Robotics</option>
                            <option value="game-development">
                              Game Development
                            </option>
                            <option value="vr-ar">VR/AR</option>
                            <option value="embedded-systems">
                              Embedded Systems
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px] lg:w-[460px] flex flex-col space-y-2 font-medium gray600">
                        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
                          <label className="text-[18px] md:text-xl">
                            WhatsApp:
                          </label>
                          <input
                            type="text"
                            name="whatsApp"
                            value={formData.whatsApp}
                            onChange={handleChange}
                            className="outline-none rounded-lg py-3 px-2 md:w-[380px] bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
                          />
                        </div>
                      </div>

                      {/* Discord */}
                      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px] lg:w-[460px] flex flex-col space-y-2 font-medium gray600">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-3">
                          <label className="text-[18px] md:text-xl">
                            Discord:
                          </label>
                          <input
                            type="text"
                            name="discord"
                            value={formData.discord}
                            onChange={handleChange}
                            className="outline-none rounded-lg py-3 px-2 md:w-[320px] lg:w-[343px] bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
                          />
                        </div>
                      </div>

                      {/* Start Date */}
                      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-6/12 lg:w-10/12 flex flex-col space-y-2 font-medium gray600">
                        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
                          <label className="text-[18px] md:text-xl lg:mr-6">
                            Duration:
                          </label>
                          <input
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="bg-[#e4ecf7] m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-11/12 md:w-full md:px-3 text-[15px] font-medium text-start shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[37px] md:h-[57px]"
                          />
                          <p>From</p>
                          <input
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="bg-[#e4ecf7] m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-11/12 md:w-full md:px-3 text-[15px] font-medium text-start shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[37px] md:h-[57px]"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="pl-6 xs:pl-0 xs:w-full xl:w-10/12 flex flex-col space-y-2 w-full font-medium gray600">
                        <label className="text-[18px] md:text-xl font-bold border-b-2 border-gray-200 py-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          defaultValue={formData.description.replace(
                            /<p>|<\/p>/g,
                            ""
                          )}
                          // value={formData.description}
                          onChange={handleChange}
                          className="h-44 outline-none rounded-lg py-3 px-2 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mt-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Update Project
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default UpdateProjectForm;
