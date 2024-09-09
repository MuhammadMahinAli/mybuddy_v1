/* eslint-disable react/prop-types */
import pdf from "../../../assets/home/pdf-icon.png";
import docx from "../../../assets/docx-logo.png";
import {useState} from "react";

const Documents = ({ setDocuments}) => {
  const [loading, setLoading] = useState({
    docOne: false,
    docTwo: false,
    docThree: false,
  });
  const [previewImage, setPreviewImage] = useState({
    docOne: "",
    docTwo: "",
    docThree: "",
  });
  
  const handleUploadDocx = async (e) => {
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
          setDocuments(prevDoc => [...prevDoc, base64data]);
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
          <label className="text-[16px] md:text-xl capitalize font-bold">Document (up to 2)</label>
        </div>
        <div className="pt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10 lg:space-x-11 xl:space-x-8 2xl:space-x-16 3xl:space-x-12 4xl:space-x-28 ">
          {/* doc one  */}
          <div className="relative ">
            {previewImage.docOne !== "" ? (
              <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
                <img className="h-20 lg:h-28 xl:h-32 3xl:h-36  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-5/12 rounded-md" src={docx} alt="" />
              </div>
            ) : (
              <label required htmlFor="doc-one" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                  {loading.docOne ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
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
              name="docOne"
              id="doc-one"
              onChange={handleUploadDocx}
              required
            />
          </div>
          {/* doc two  */}
          <div className="relative ">
            {previewImage.docTwo !== "" ? (
            <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
            <img className="h-20 lg:h-28 xl:h-32 3xl:h-40  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-6/12 rounded-md" src={docx} alt="" />
          </div>
            ) : (
              <label required htmlFor="doc-two" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                  {loading.docTwo ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <div className="flex flex-col justify-center items-center absolute top-8 lg:top-12 xl:top-16 2xl:top-14 3xl:top-20 w-full">
                      {/* <img src={pdf} className="h-5" />
                      <p className="text-[10px] md:text-[12px] font-normal capitalize">drag & drop a pdf or</p>
                      <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">browse</p> */}
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
              name="docTwo"
              id="doc-two"
              onChange={handleUploadDocx}
              required
            />
          </div>
          {/* doc three  */}
          {/* <div className="relative ">
            {previewImage.docThree !== "" ? (
             <div className="flex justify-center items-center rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 custom-shadow">
             <img className="h-20 lg:h-28 xl:h-32 3xl:h-40  w-5/12 lg:w-7/12 xl:w-5/12 md:w-6/12 3xl:w-6/12 rounded-md" src={docx} alt="" />
           </div>
            ) : (
              <label required htmlFor="doc-three" className="">
                <div className="rounded-lg h-[110px] w-[200px] md:w-[150px] lg:h-[150px] lg:w-[220px]  xl:h-[170px] xl:w-[300px] 3xl:h-[200px] 3xl:w-[330px]  box-border border-2 border-gray-100 outline-none custom-shadow bg-white">
                  {loading.docThree ? (
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
              accept=".docx"
              name="docThree"
              id="doc-three"
              onChange={handleUploadDocx}
              required
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Documents;
