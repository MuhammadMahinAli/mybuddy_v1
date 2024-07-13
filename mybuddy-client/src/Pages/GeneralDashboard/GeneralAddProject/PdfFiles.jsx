/* eslint-disable react/prop-types */
import {useState} from "react";
import pdf from "../../../assets/profile1.png";
import pdfLogo from "../../../assets/pdf-logo3.png";
const PdfFiles = ({pdfFiles, setPdfFiles}) => {
  const [loading, setLoading] = useState({
    pdfOne: false,
    pdfTwo: false,
    pdfThree: false,
  });
  const [previewImage, setPreviewImage] = useState({
    pdfOne: "",
    pdfTwo: "",
    pdfThree: "",
  });
  const handleUploadPdf = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const name = e.target.name;
      setLoading({
        ...loading,
        [name]: true,
      });
      const file = e.target.files[0];
  
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (base64data) {
          console.log(base64data);
          setPdfFiles(prevDoc => [...prevDoc, base64data]);
      // Update doc state with base64 data
          setPreviewImage(prevPreviewImage => ({
            ...prevPreviewImage,
            [name]: base64data, 
          }));
          setLoading({
            ...loading,
            [name]: false,
          });
        } else {
          console.error("Error: base64 data is null");
          setLoading({
            ...loading,
            [name]: false,
          });
        }
      };
      reader.onerror = () => {
        console.error("Error occurred while reading the file");
        setLoading({
          ...loading,
          [name]: false,
        });
      };
    }
  };
  return (
    <div>
      <div className="flex flex-col space-y-5 md:space-y-0  font-medium gray600">
        <div className="">
          <label className="text-[16px] md:text-xl capitalize">Pdf (up to 3)</label>
          <p className="text-[12px] md:text-lg font-normal pt-1 md:pb-3">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* doc one  */}
          <div className="relative ">
            {previewImage.pdfOne  ? (
              <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
                <img className="h-24 lg:h-28 xl:h-32 3xl:h-52  w-6/12  lg:w-7/12 xl:w-6/12 md:w-9/12 3xl:w-8/12 rounded-md" src={pdfLogo} loading="lazy" alt="" />
              </div>
            ) : (
              <label required htmlFor="pdf-one" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none bg-[#DCF0FC] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8),_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                  {loading.pdfOne ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                      <img src="/upload.svg" className="h-3" />
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
              accept=".pdf"
              name="pdfOne"
              id="pdf-one"
              onChange={handleUploadPdf}
             
            />
          </div>
          {/* doc two  */}
          <div className="relative ">
            {previewImage.pdfTwo ? (
              <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
                <img className="h-24 lg:h-28 xl:h-32 3xl:h-52  w-6/12  lg:w-7/12 xl:w-6/12 md:w-9/12 3xl:w-8/12 rounded-md" src={pdfLogo} loading="lazy" alt="" />
              </div>
            ) : (
              <label required htmlFor="pdf-two" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none bg-[#DCF0FC] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8),_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                  {loading.pdfTwo ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                      <img src={pdf} className="h-5" />
                      <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a pdf or</p>
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
              accept=".pdf"
              name="pdfTwo"
              id="pdf-two"
              onChange={handleUploadPdf}
             
            />
          </div>
          {/* doc three  */}
          <div className="relative ">
            {previewImage.pdfThree  ? (
              <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
                <img className="h-24 lg:h-28 xl:h-32 3xl:h-52  w-6/12  lg:w-7/12 xl:w-6/12 md:w-9/12 3xl:w-8/12 rounded-md" src={pdfLogo} loading="lazy" alt="" />
              </div>
            ) : (
              <label required htmlFor="pdf-three" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none bg-[#DCF0FC] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8),_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                  {loading.pdfThree ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                      <img src={pdf} className="h-5" />
                      <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a pdf or</p>
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
              accept=".pdf"
              name="pdfThree"
              id="pdf-three"
              onChange={handleUploadPdf}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfFiles;
