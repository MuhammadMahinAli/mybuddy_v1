/* eslint-disable react/prop-types */
// import next from "../../assets/add-product/icons8customer100-1@2x.png";

import PropTypes from "prop-types";
import Images from "./Images";
import Documents from "./Documents";
import PdfFiles from "./PdfFiles";
import next from "../../../assets/next.png";

const AddProjectSecForm = ({
  handleSecond,
  images,
  setImages,
  documents,
  setDocuments,
  pdfFiles,
  setPdfFiles,
  onFormChange,
}) => {
  return (
    <form className="p-3 md:p-6  md:w-11/12 space-y-4">
      {/* images */}
      <Images images={images} setImages={setImages} />
      {/* docx */}
      <Documents setDocuments={setDocuments} documents={documents} />
      {/* pdf */}
      <PdfFiles pdfFiles={pdfFiles} setPdfFiles={setPdfFiles} />
      {/* video link */}
      <div className="md:w-6/12 lg:w-10/12 flex flex-col space-y-2 font-medium gray600">
        <label className="text-[16px] md:text-xl">Video</label>
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <input
            name="videoUrl"
            className="lg:w-[300px] 3xl:w-[350px] outline-none rounded-lg py-3 px-2 bg-[#c6e3f2] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] box-border border-[0.5px] border-solid border-gray-100"
            onChange={onFormChange}
          />
          <select className="outline-none rounded-lg py-3 px-2 bg-[#c6e3f2] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] box-border border-[0.5px] border-solid border-gray-100">
            <option value="video">Select</option>
            <option value="video">YouTube</option>
            <option value="googleDrive">Google Drive</option>
          </select>
        </div>
      </div>

      <div onClick={handleSecond} className="float-right">
        <img src={next} className="h-12" />
      </div>
    </form>
  );
};

export default AddProjectSecForm;
AddProjectSecForm.propTypes = {
  handleSecond: PropTypes.func,
};

// import next from "../../../assets/next.png";
// import pdf from "../../../assets/icon-pdf.png";
// import PropTypes from "prop-types";

// const AddProjectSecForm = ({ handleSecond }) => {

//   return (
//     <form className="p-3 md:p-6  md:w-11/12 space-y-4">
//       {/* images */}
//       <div className="flex flex-col space-y-5 md:space-y-0 font-medium gray600">
//         <div>
//           <label className="text-[16px] md:text-xl capitalize">
//             images (up to 3)
//           </label>
//           <p className="text-[12px] md:text-lg font-normal pt-1 md:pb-3">
//             Lorem ipsum dolor sit amet consectetur.
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <div className="relative">
//             <input className="rounded-lg h-[100px] md:w-[150px] xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-dashed border-2 border-gray-100 outline-none custom-shadow" />
//             <div className="flex flex-col justify-center items-center absolute top-8 xl:top-10 2xl:top-14 w-full">
//               <img src="/upload.svg" className="h-3" />
//               <p className="text-[10px] md:text-[12px] font-normal capitalize">
//                 drag & drop a photo or
//               </p>
//               <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">
//                 browse
//               </p>
//             </div>
//           </div>

//           <input className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  box-border border-2 border-gray-100 outline-none custom-shadow" />
//           <input className="rounded-lg h-[100px] md:w-[150px] xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-2 border-gray-100 outline-none" />
//         </div>
//       </div>
//       {/* docx */}
//       <div className="flex flex-col space-y-5 md:space-y-0  font-medium gray600">
//         <div className="">
//           <label className="text-[16px] md:text-xl capitalize">
//             Document (up to 3)
//           </label>
//           <p className="text-[12px] md:text-lg font-normal pt-1 md:pb-3">
//             Lorem ipsum dolor sit amet consectetur.
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <div className="relative">
//             <input
//               accept=".docx"
//               type="file"
//               className="rounded-lg h-[100px] md:w-[150px] xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-dashed border-2 border-gray-100 outline-none"
//             />
//             <div className="flex flex-col justify-center items-center absolute top-8 xl:top-10 2xl:top-14 w-full">
//               <img src={pdf} className="h-5" />
//               <p className="text-[10px] md:text-[12px] font-normal capitalize">
//                 drag & drop a pdf or
//               </p>
//               <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">
//                 browse
//               </p>
//             </div>
//           </div>

//           <input className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-2 border-gray-100 outline-none" />
//           <input className="rounded-lg h-[100px] md:w-[150px] xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-2 border-gray-100 outline-none" />
//         </div>
//       </div>
//       {/* pdf */}
//       <div className="flex flex-col space-y-5 md:space-y-0  font-medium gray600">
//         <div className="">
//           <label className="text-[16px] md:text-xl capitalize">
//             Document pdf (up to 2)
//           </label>
//           <p className="text-[12px] md:text-lg font-normal pt-1 md:pb-3">
//             Lorem ipsum dolor sit amet consectetur.
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//           <div className="relative">
//             <input
//               accept=".pdf"
//               type="file"
//               className="rounded-lg h-[100px] md:w-[150px] xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-dashed border-2 border-gray-100 outline-none"
//             />
//             <div className="flex flex-col justify-center items-center absolute top-8 xl:top-10 2xl:top-14 w-full">
//               <img src="/upload.svg" className="h-3" />
//               <p className="text-[10px] md:text-[12px] font-normal capitalize">
//                 drag & drop a docx or
//               </p>
//               <p className="text-[10px] md:text-[12px] font-medium capitalize text-blue-500">
//                 browse
//               </p>
//             </div>
//           </div>

//           <input
//             accept=".pdf"
//             type="file"
//             className="rounded-lg h-[100px] md:w-[150px]  xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px]  custom-shadow box-border border-2 border-gray-100 outline-none"
//           />
//           <input
//             accept=".pdf"
//             type="file"
//             className="rounded-lg h-[100px] md:w-[150px] xl:h-[130px] xl:w-[200px] 2xl:h-[150px] 2xl:w-[150px] custom-shadow box-border border-2 border-gray-100 outline-none"
//           />
//         </div>
//       </div>
//       {/* video link */}
//       <div className="md:w-6/12 lg:w-10/12 flex flex-col space-y-2 font-medium gray600">
//         <label className="text-[16px] md:text-xl">Video</label>
//         <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
//           <input className="lg:w-[300px] 3xl:w-[350px] outline-none rounded-lg py-3 px-2 bg-[#c6e3f2] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] box-border border-[0.5px] border-solid border-gray-100" />
//           <select className="outline-none rounded-lg py-3 px-2 bg-[#c6e3f2] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] box-border border-[0.5px] border-solid border-gray-100">
//             <option value="video">Select</option>
//             <option value="video">YouTube</option>
//             <option value="googleDrive">Google Drive</option>
//           </select>
//         </div>
//       </div>

//       <div onClick={handleSecond} className="float-right">
//         <img src={next} className="h-12" />
//       </div>
//     </form>
//   );
// };

// export default AddProjectSecForm;
// AddProjectSecForm.propTypes = {
//   handleSecond: PropTypes.func,
// };
