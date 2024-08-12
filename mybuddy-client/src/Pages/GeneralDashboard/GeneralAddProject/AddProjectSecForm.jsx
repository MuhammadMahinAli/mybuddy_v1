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
        <label className="text-[16px] md:text-xl font-bold">Video</label>
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <input
            name="videoUrl"
            className="lg:w-[300px] 3xl:w-[350px] outline-none rounded-lg py-3 px-2 bg=-[#f5f9fc] box-border border-[0.5px] border-solid border-gray-100"
            onChange={onFormChange}
          />
          <select className="outline-none rounded-lg py-3 px-2 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100">
            <option value="video">Select</option>
            <option value="video">YouTube</option>
            <option value="googleDrive">Google Drive</option>
          </select>
        </div>
      </div>

      <div
        onClick={handleSecond}
        className="flex items-center justify-center pb-2 xs:mb-0 float-right"
      >
        {/* <img src="/projectprev.png" className="h-8 md:h-12 md:mb-2" /> */}
        <img src="/projectNext.svg" className="h-8 md:h-12  xs:mb-0" />
      </div>
    </form>
  );
};

export default AddProjectSecForm;
AddProjectSecForm.propTypes = {
  handleSecond: PropTypes.func,
};
