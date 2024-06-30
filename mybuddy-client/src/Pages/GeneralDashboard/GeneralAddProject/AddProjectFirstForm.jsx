/* eslint-disable react/prop-types */
import DescriptionTextArea from "./DescriptionTextArea";
import next from "../../../assets/next.png";
import PropTypes from "prop-types";
import {useState} from "react";

const AddProjectFirstForm = ({handleFirst, onFormChange, projectData, setProjectData}) => {
  const handleDescriptionChange = (description) => {
    setProjectData((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  return (
    <form className="p-3 lg:p-6 w-[320px]   sm:w-11/12 space-y-2">
      {/* project name */}
      <div className="w-12/12 md:w-8/12 lg:w-4/12 flex flex-col space-y-2 font-medium gray600">
        <label className="text-[16px] md:text-xl">Project name</label>
        <input name="projectName" value={projectData.projectName} onChange={onFormChange} className="outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] px-3 box-border  border-solid border-gray-100" />
      </div>
      {/* description */}
      <div className="flex flex-col space-y-2 w-full font-medium gray600">
        <label className="text-[16px] md:text-xl border-b-2 border-white py-2">Description</label>
        <DescriptionTextArea handleDescriptionChange={handleDescriptionChange} />
      </div>
      <div onClick={handleFirst} className="float-right">
        <img src='/projectNext.svg' className="h-12"/>
      </div>
    </form>
  );
};

export default AddProjectFirstForm;
AddProjectFirstForm.propTypes = {
  handleFirst: PropTypes.func,
};


// import DescriptionTextArea from "./DescriptionTextArea";
// import next from "../../../assets/next.png";
// import PropTypes from "prop-types";
// import { useState } from "react";

// const AddProjectFirstForm = ({ handleFirst, onFormChange }) => {
//   const [formData, setFormData] = useState({
//     // Define initial state for this form's fields
//     projectName: "",
//     description: "",
//     // ... other fields
//   });
//   const handleDescriptionChange = (description) => {
//     onFormChange("description", description);
//     console.log("f", description);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     onFormChange(name, value);
//   };
//   return (
//     <form className="p-3llg:p-6  w-11/12 space-y-2">
//       {/* project name */}
//       <div className="w-10/12 md:w-5/12 lg:w-4/12 flex flex-col space-y-2 font-medium gray600">
//         <label className="text-[16px] md:text-xl">Project name</label>
//         <input
//           name="projectName"
//           value={formData.projectName}
//           onChange={handleInputChange}
//           className="rounded-lg py-3 bg-[#c6e3f2] shadow-[-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset] box-border border-[0.5px] border-solid border-gray-100"
//         />
//       </div>
//       {/* description */}
//       <div className="flex flex-col space-y-2 w-full font-medium gray600">
//         <label className="text-[16px] md:text-xl border-b-2 border-white py-2">
//           Description
//         </label>
//         <DescriptionTextArea
//           handleDescriptionChange={handleDescriptionChange}
//           setFormData={setFormData}
//         />
//       </div>
//       <div onClick={handleFirst} className="float-right">
//         <img src={next} className="h-12" />
//       </div>
//     </form>
//   );
// };

// export default AddProjectFirstForm;
// AddProjectFirstForm.propTypes = {
//   handleFirst: PropTypes.func,
// };
//import PropTypes from "prop-types";
//
//const Rectangle1 = ({ className = "" }) => {
//  return (
//    <div
//      className={`w-[263px] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] rounded-xl bg-aliceblue-100 box-border h-[63.5px] border-[1px] border-solid border-aliceblue-200 ${className}`}
//    />
//  );
//};
//
//Rectangle1.propTypes = {
//  className: PropTypes.string,
//};
//
//export default Rectangle1;
