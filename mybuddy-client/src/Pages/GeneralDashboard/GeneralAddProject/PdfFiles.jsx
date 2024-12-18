/* eslint-disable react/prop-types */
import {useState} from "react";
import pdf from "../../../assets/home/pdf-icon.png";
import pdfLogo from "../../../assets/pdf-logo3.png";
import { rawFileUpload } from "../../../utils/cloudinaryForRaw";
const PdfFiles = ({pdfFiles, setPdfFiles}) => {
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
          console.log("Uploaded PDF URL:", uploadedUrl);

          // Update state with the uploaded file URL
          setPdfFiles((prevDoc) => [...prevDoc, uploadedUrl]);

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

  console.log('pdf', pdfFiles);

  return (
    <div>
    <div className="flex flex-col space-y-5 md:space-y-0 font-medium gray600">
      <div>
        <label className="text-[16px] md:text-xl capitalize font-bold">PDF (up to 2)</label>
      </div>
      <div className="pt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10">
        {/* PDF one */}
        <div className="relative">
          {previewImage.imageOne ? (
            <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
              <img className="h-20 lg:h-28 xl:h-32 3xl:h-40  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-6/12 rounded-md" src={pdfLogo} alt="PDF preview" />
            </div>
          ) : (
            <label htmlFor="pdf-one">
              <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                {loading.imageOne ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <div className="flex flex-col justify-center items-center absolute top-8 lg:top-10 xl:top-16 2xl:top-14 3xl:top-16 w-full">
                    <img src={pdf} className="h-8 lg:h-10" alt="Upload PDF" />
                    <p className="text-[10px] md:text-[12px] font-normal capitalize">Drag & drop a PDF or</p>
                    <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p>
                  </div>
                )}
              </div>
            </label>
          )}
          <input
            className="hidden"
            type="file"
            accept=".pdf"
            name="imageOne"
            id="pdf-one"
            onChange={handlePreviewImage}
          />
        </div>
        <div className="relative">
          {previewImage.imageTwo ? (
            <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
              <img className="h-20 lg:h-28 xl:h-32 3xl:h-36  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-5/12 rounded-md" src={pdfLogo} alt="PDF preview" />
            </div>
          ) : (
            <label htmlFor="pdf-two">
              <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                {loading.imageTwo ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <div className="flex flex-col justify-center items-center absolute top-8 lg:top-10 xl:top-16 2xl:top-14 3xl:top-16 w-full">
                    <img src={pdf} className="h-8 lg:h-10" alt="Upload PDF" />
                    <p className="text-[10px] md:text-[12px] font-normal capitalize pt-1">Add anotner pdf (optional) </p>
                  </div>
                )}
              </div>
            </label>
          )}
          <input
            className="hidden"
            type="file"
            accept=".pdf"
            name="imageTwo"
            id="pdf-two"
            onChange={handlePreviewImage}
          />
        </div>
     
      </div>
    </div>
  </div>
  );
};

export default PdfFiles;
