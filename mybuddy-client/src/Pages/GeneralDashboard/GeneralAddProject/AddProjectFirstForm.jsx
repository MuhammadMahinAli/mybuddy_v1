/* eslint-disable react/prop-types */
import DescriptionTextArea from "./DescriptionTextArea";
import PropTypes from "prop-types";

const AddProjectFirstForm = ({
  handleFirst,
  onFormChange,
  projectData,
  setProjectData,
}) => {
  const handleDescriptionChange = (description) => {
    setProjectData((prevState) => ({
      ...prevState,
      description: description,
    }));
  };
console.log(projectData.startDate);
  return (
    <form className="p-5 md:p-3 lg:p-6 w-[320px]   sm:w-11/12 space-y-2">
      {/* project name */}
      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px]  lg:w-[460px] flex flex-col  space-y-2 font-medium gray600">
        <label className="text-[18px] md:text-xl">Project name:</label>
        <input
          name="projectName"
          value={projectData.projectName}
          onChange={onFormChange}
          className=" outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border  border-solid border-gray-100"
        />
      </div>
      {/* category */}

      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px]  lg:w-[460px] flex flex-col space-y-2 font-medium gray600">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-3">
          <label className="text-[18px] md:text-xl ">Category:</label>
          <select
            value={projectData.category}
            onChange={onFormChange}
            name="category"
            className="lg:mx-9 outline-none rounded-lg py-3 px-2 md:w-[315px] lg:w-[340px]  bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
          >
            <option value="">Select</option>
            <option value="technology">Technology</option>
            <option value="tech">Tech</option>
          </select>
        </div>
      </div>
      {/* Whatsapp */}
      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px]  lg:w-[460px] flex flex-col space-y-2 font-medium gray600">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <label className="text-[18px] md:text-xl">WhatsApp:</label>
          <input
            className="outline-none rounded-lg py-3 px-2 md:w-[380px]   bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
            name="whatsApp"
            value={projectData.whatsApp}
            onChange={onFormChange}
          />
        </div>
      </div>
      {/* discord */}
      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-[430px] lg:w-[460px]   flex flex-col space-y-2 font-medium gray600">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-3">
          <label className="text-[18px] md:text-xl">Discord:</label>
          <input
            className="outline-none rounded-lg py-3 px-2 md:w-[320px] lg:w-[343px]   bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
            name="discord"
            value={projectData.discord}
            onChange={onFormChange}
          />
        </div>
      </div>
      {/* duration */}
      <div className="pl-6 xs:pl-0 xs:w-full w-11/12 md:w-6/12 lg:w-10/12 flex flex-col space-y-2 font-medium gray600">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <label className="text-[18px] md:text-xl lg:mr-6">Duration:</label>
          <div className="flex flex-col md:flex-row justify-start md:items-center space-y-3 md:space-y-0 cursor-pointer md:space-x-4 h-40 md:h-20 pt-1">
            <p>Start</p>
            <input
              name="startDate"
              type="date"
              value={projectData.startDate}
              onChange={onFormChange}
              className={`bg-[#e4ecf7] m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-11/12 md:w-full md:px-3 text-[15px] font-medium text-start shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[37px] md:h-[57px]`}
            />
            <p>End</p>
            <input
              name="endDate"
              type="date"
              value={projectData.endDate}
              onChange={onFormChange}
              className={`bg-[#e4ecf7] m-[1px] border uppercase outline-none pl-2 md:pt-0 rounded-lg w-11/12 md:w-full md:px-3 text-[15px] font-medium text-start shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] h-[37px] md:h-[57px]`}
            />
          </div>
        </div>
      </div>
      {/* description */}
      <div className="pl-6 xs:pl-0 xs:w-full flex flex-col space-y-2 w-full font-medium gray600">
        <label className="text-[18px] md:text-xl font-bold border-b-2 border-gray-200 py-2">
          Description
        </label>
        <DescriptionTextArea
          handleDescriptionChange={handleDescriptionChange}
        />
      </div>
      <div onClick={handleFirst} className="float-right py-2">
        <img src="/projectNext.svg" className="h-8 md:h-12 mr-6 xs:mr-0" />
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
