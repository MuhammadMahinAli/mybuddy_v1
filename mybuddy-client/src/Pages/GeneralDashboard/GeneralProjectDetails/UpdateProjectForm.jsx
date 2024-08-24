/* eslint-disable react/prop-types */

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import Swal from "sweetalert2";
const UpdateProjectForm = ({ initialData, openUpdateModal, closeProjectUpdateModal }) => {
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
    setFormData({ ...formData, [name]: value });
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
    updateProjectInfo({ id, data });
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
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="px-[3px] rounded-m bg-white">
                  <div
                    className={`graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]`}
                  >
                    <p className="m-[1px] pt-2  text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
                      Add A New License And Certificate
                    </p>

                    <div>
                      <label>Project Name:</label>
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Category:</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="technology">Technology</option>
                        <option value="tech">Tech</option>
                        {/* Add other categories */}
                      </select>
                    </div>
                    <div>
                      <label>WhatsApp:</label>
                      <input
                        type="text"
                        name="whatsApp"
                        value={formData.whatsApp}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Discord:</label>
                      <input
                        type="text"
                        name="discord"
                        value={formData.discord}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Start Date:</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>End Date:</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Description:</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div>
        <label>Documents (Up to 2):</label>
        <input type="file" name="documents" multiple onChange={handleFileChange} />
      </div>
      <div>
        <label>PDF Files (Up to 2):</label>
        <input type="file" name="pdfFiles" multiple onChange={handleFileChange} />
      </div>
      <div>
        <label>Images (Up to 3):</label>
        <input type="file" name="images" multiple onChange={handleFileChange} />
      </div>
      <div>
        <label>Video URL:</label>
        <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
      </div> */}
                  </div>
                </div>
                <div className="mt-4">
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
