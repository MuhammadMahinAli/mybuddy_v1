import { useState } from "react";
import { fileUpload } from "../../../utils/cloudinary";
import { useAddNewToolsMutation } from "../../../features/tools/toolsApi";
import Swal from "sweetalert2";
import { MdPermMedia } from "react-icons/md";
const AdminTools = () => {
  const [formData, setFormData] = useState({
    toolName: "",
    toolHomepage: "",
    description: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [addNewTools] = useAddNewToolsMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(file);

      setIsFileLoading(true); // Start loading

      try {
        const imageUrl = await fileUpload(file); // Custom file upload function
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      } catch (error) {
        console.log("Error uploading file:", error);
      }

      setIsFileLoading(false); // End loading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const result = await addNewTools(formData);
      if (result?.data?.message === "Tools saved successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: result?.data?.message,
          timer: 3000,
          showConfirmButton: false,
        });
        setFormData({
          toolName: "",
          toolHomepage: "",
          description: "",
          image: "",
        });
        setPreviewImage(null);
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
      console.error("Error Tools saved :", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-[#f3f6f8]">
      <p className="block text-gray-700 mb-2 text-xl font-bold pb-4">
        Add A New Tool
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Image Selection */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="toolImage"
            className="border border-gray-400 rounded-lg w-full h-64 flex items-center justify-center cursor-pointer hover:bg-gray-100"
          >
            {previewImage ? (
              <div className="w-full h-60 flex justify-center items-center">
                <img
                  src={URL.createObjectURL(previewImage)}
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
            {isFileLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTools;
