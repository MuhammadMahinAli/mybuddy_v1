import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { fileUpload } from "../../utils/cloudinary";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MultipleMediaModal = ({
  setFormData,
  setMediaModal,
  images,
  setImages,
}) => {

  const [primaryImage, setPrimaryImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLoading(true);

      try {
        const imageUrl = await fileUpload(file);
        setImages((prev) => [...prev, imageUrl]);
        if (!primaryImage) setPrimaryImage(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrimaryImageChange = (image) => {
    setPrimaryImage(image); // Update primary image
  };
  const handleCloseModal = () => {
    setMediaModal(false);
    setImages([]);
  };

  const handleDeleteImage = (imageToDelete) => {
    setImages(images.filter((image) => image !== imageToDelete));
    if (primaryImage === imageToDelete) {
      setPrimaryImage(images.find((image) => image !== imageToDelete) || null);
    }
  };

  const handleSave = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: images,
    }));
    setMediaModal(false);
  };

  return (
    // <div className="flex justify-center items-center border-4 p-2 lg:p-4">
    <div className="z-50 fixed top-0 -left-5 3xl:left-16  flex justify-center items-center bg-black/40 bg-opacity-50 w-screen h-screen overflow-y-scroll">
      <div className="3xl:-ml-16 w-full relative  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[700px] lg:w-[900px] xl:w-[1000px] lg:h-[500px] xl:h-[600px] 3xl:h-[650px] 3xl:w-[1000px] overflow-y-scroll cursor-pointer">
        <IoIosCloseCircleOutline
          onClick={handleCloseModal}
          className="text-xl absolute right-5 top-5"
        />
        {/* Primary Image Section */}
        <div className="w-full lg:w-12/12  relative mt-5  lg:mb-4 py-5 ">
          {primaryImage ? (
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 sm:space-y-7 lg:space-y-0 ">
              <div className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 py-2 md:py-8 bg-gray-100 lg:h-[320px] xl:h-[420px] 3xl:h-[450px] rounded-2xl">
                {images?.length !== 0 && (
                  <div className="p-2 lg:p-3 md:hidden flex items-end justify-end space-x-4">
                    <label htmlFor="image-upload">
                      <BsPlusCircle className="text-[20px] cursor-pointer hover:text-blue-500 text-gray-600" />
                    </label>
                    <FaRegTrashAlt
                      className="text-[20px] text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={() => handleDeleteImage(primaryImage)}
                    />
                  </div>
                )}
                <img
                  className="px-3 lg:px-0 w-full h-[290px] md:h-[350px] lg:h-full  object-contain rounded-3xl"
                  src={primaryImage}
                  alt="Primary"
                />
              </div>
              <div className="grid grid-cols-3 xs:grid-cols-4 md:grid-cols-3 xl:grid-cols-2 3xl:grid-cols-2 gap-3  max-h-[500px] lg:max-h-[320px] xl:max-h-[420px] 3xl:max-h-[450px] lg:h-auto overflow-x-auto">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={` cursor-pointer border-2 p-1 rounded-md ${
                      image === primaryImage
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    onClick={() => handlePrimaryImageChange(image)}
                  >
                    <img
                      className="h-16 w-16 xl:h-[100px] xl:w-[100px] object-cover rounded-md"
                      src={image}
                      alt={`Thumbnail ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col  justify-center items-center py-5 space-y-2  rounded-lg  w-full  border-gray-100">
              <img
                src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-25537.jpg"
                className="w-80"
              />
              <p className="text-xl">Select image from your device</p>
              <label
                htmlFor="image-upload"
                className="px-6 py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
              >
                {loading ? "Uploading..." : "Select An Image"}
              </label>
            </div>
          )}
          {images?.length !== 0 && (
            <div className="pt-4 hidden md:flex  space-x-4">
              <label htmlFor="image-upload">
                <BsPlusCircle className="text-[30px] cursor-pointer hover:text-blue-500 text-gray-600" />
              </label>
              <FaRegTrashAlt
                className="text-[30px] text-gray-600 hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteImage(primaryImage)}
              />
            </div>
          )}
          {images?.length !== 0 && (
            <button
              onClick={handleSave}
              className="float-right my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
            >
              Save
            </button>
          )}
        </div>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default MultipleMediaModal;
