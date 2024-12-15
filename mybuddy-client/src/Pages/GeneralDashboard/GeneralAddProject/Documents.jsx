/* eslint-disable react/prop-types */
import pdf from "../../../assets/home/pdf-icon.png";
import docx from "../../../assets/docx-logo.png";
import {useState} from "react";
import { rawFileUpload } from "../../../utils/cloudinaryForRaw";

const Documents = ({ setDocuments}) => {
  const [loading, setLoading] = useState({
    imageOne: false,
    imageTwo: false,
    imageThree: false,
  });
  const [previewImage, setPreviewImage] = useState({
    imageOne: "",
    imageTwo: "",
    imageThree: "",
  });

  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.name;
      setLoading({ ...loading, [name]: true });

      const file = e.target.files[0];

      try {
        // Upload the PDF to Cloudinary
        const uploadedUrl = await rawFileUpload(file, "raw");

        if (uploadedUrl) {
          console.log("Uploaded docx URL:", uploadedUrl);

          // Update state with the uploaded file URL
          setDocuments((prevDoc) => [...prevDoc, uploadedUrl]);

          // Show a preview (using a placeholder like PDF logo)
          setPreviewImage((prevPreviewImage) => ({
            ...prevPreviewImage,
            [name]: uploadedUrl, // URL is saved here
          }));
        }
      } catch (error) {
        console.error("Error uploading PDF:", error);
      } finally {
        setLoading({ ...loading, [name]: false });
      }
    }
  };
  
  return (
    <div>
    <div className="flex flex-col space-y-5 md:space-y-0  font-medium gray600">
        <div className="">
          <label className="text-[16px] md:text-xl capitalize font-bold">Document (up to 2)</label>
        </div>
        <div className="pt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10 lg:space-x-11 xl:space-x-8 2xl:space-x-16 3xl:space-x-12 4xl:space-x-28 ">
          {/* doc one  */}
          <div className="relative ">
            {previewImage.imageOne !== "" ? (
              <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
                <img className="h-20 lg:h-28 xl:h-32 3xl:h-36  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-5/12 rounded-md" src={docx} alt="" />
              </div>
            ) : (
              <label required htmlFor="doc-one" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                  {loading.imageOne ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-10 xl:top-16 2xl:top-14 3xl:top-16 w-full">
                     <img src={pdf} className="h-8 lg:h-10" />
                      <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a docx or</p>
                      <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
                    </div>
                  )}
                </div>
              </label>
            )}{" "}
            <input
              className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                            focus:outline-none  bg-white text-gray-900 hidden"
              type="file"
              accept=".docx"
              name="imageOne"
              id="doc-one"
              onChange={handlePreviewImage}
              required
            />
          </div>
          {/* doc two  */}
          <div className="relative ">
            {previewImage.imageTwo !== "" ? (
            <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
            <img className="h-20 lg:h-28 xl:h-32 3xl:h-40  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-6/12 rounded-md" src={docx} alt="" />
          </div>
            ) : (
              <label required htmlFor="doc-two" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                  {loading.imageTwo ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                      
                    </div>
                  )}
                </div>
              </label>
            )}{" "}
            <input
              className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                            focus:outline-none  bg-white text-gray-900 hidden"
              type="file"
              accept=".docx"
              name="imageTwo"
              id="doc-two"
              onChange={handlePreviewImage}
              required
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Documents;
