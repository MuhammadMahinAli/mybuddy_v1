import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdPermMedia } from "react-icons/md";
import { fileUpload } from "../../../utils/cloudinary";
import { useUpdateAdminToolsMutation } from "../../../features/tools/toolsApi";
import Swal from "sweetalert2";


const UpdateTool = ({ tool, setIsOpenUpdateModal, setSelectedTool }) => {
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [updateAdminTools] = useUpdateAdminToolsMutation();

  const [formData, setFormData] = useState({
    toolName: tool?.toolName || "",
    toolHomepage: tool?.toolHomepage || "",
    description: tool?.description || "",
    image: tool?.image || "",
  });

  //------ description update

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [previewImage, setPreviewImage] = useState(formData?.image);

  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file)); // For local preview
      setIsFileLoading(true);

      try {
        const imageUrl = await fileUpload(file);
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setIsFileLoading(false);
    }
  };

   //------- update post
   const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("Selected Members:", formData);
    const id = tool?._id;
    const updatedData = formData;
    try {
      const result = await updateAdminTools({
        id,
        data: updatedData,
      }).unwrap();

      console.log(result);

      if (result?.message === "Tool Info updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "This tool has been updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });

        setIsOpenUpdateModal(false);
        setSelectedTool(null);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating tool:", error);
    }
  };
  return (
    <div className="fixed top-0 left-0  flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll z-50">
      <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[750px] overflow-y-scroll 3xl:w-[800px] cursor-pointer">
        <IoIosCloseCircleOutline
          onClick={() => setIsOpenUpdateModal(false)}
          className="text-xl float-right"
        />
        <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-[#f3f6f8]">
          <p className="block text-gray-700 mb-2 text-xl font-bold pb-4">
            Update {`${tool?.toolName}`}
          </p>
          <form
          onSubmit={handleUpdate}
            className="grid grid-cols-2 gap-6"
          >
            {/* Image Selection */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="toolImage"
                className="border border-gray-400 rounded-lg w-full h-64 flex items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                {previewImage ? (
                  <div className="w-full h-60 flex justify-center items-center">
                    <img
                      src={previewImage}
                      alt="Tool Preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500 flex items-center gap-2">
                    {isFileLoading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <MdPermMedia />
                        Select An Image
                      </>
                    )}
                  </span>
                )}
              </label>
              <input
                type="file"
                id="toolImage"
                name="toolImage"
                className="hidden"
                accept="image/*"
                onChange={handlePreviewImage}
              />
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div>
                {/* <label htmlFor="toolName" className="block text-gray-700 mb-2">
                Tools Name
              </label> */}
                <input
                  type="text"
                  id="toolName"
                  name="toolName"
                  value={formData.toolName}
                  onChange={handleInputChange}
                  className="w-full border  border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter Tool Name"
                />
              </div>

              <div>
                {/* <label htmlFor="toolHomepage" className="block text-gray-700 mb-2">
                Tools Link
              </label> */}
                <input
                  type="url"
                  id="toolHomepage"
                  name="toolHomepage"
                  value={formData.toolHomepage}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter Tool Homepage Link"
                />
              </div>

              <div>
                {/* <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label> */}
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  maxLength="200"
                  className="h-20 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter Short Description"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                disabled={isFileLoading}
              >
                Save
                {/* {isFileLoading ? "Saving..." : "Save"} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTool;
