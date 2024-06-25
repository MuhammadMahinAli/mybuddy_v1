/* eslint-disable react/prop-types */
import plus from "../../../assets/plus3.png";
import PropTypes from "prop-types";
const AddProjectThirdForm = ({ handleThird, tasks, setTasks }) => {
  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title: "", details: "", budget: "" }]);
  };
  const handleTaskChange = (index, event) => {
    const newTasks = [...tasks];
    newTasks[index][event.target.name] = event.target.value;
    setTasks(newTasks);
  };

  return (
    <form className="w-[280px] ssm:w-[320px]   sm:w-11/12 lg:w-12/12 space-y-4 py-2 lg:py-3 relative lg:mr-4">
      <div className="flex  justify-between lg:items-center space-x-1 lg:space-x-3 lg:w-full">
        <div className="rounded-md text-center px-1 py-2 md:w-1/12 lg:w-1/12 md:py-3 text-sm lg:text-2xl font-bold text-white gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)] ">
          NO
        </div>
        <div className=" rounded-md text-center px-2 py-2 md:w-2/12 lg:w-2/12  md:py-3 text-sm lg:text-2xl font-bold text-white gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)]">
          Title
        </div>
        <div className="text-center rounded-md px-2  py-2 w-4/12 ssm:w-5/12 sm:w-5/12  lg:w-6/12 l  md:py-3 text-sm lg:text-2xl font-bold text-white gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)]">
          DETAILS
        </div>
        <div className=" text-white text-center rounded-md px-2  py-2 w-3/12 lg:w-2/12  md:py-3 text-sm lg:text-2xl font-bold  gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)]">
          BUDGET
        </div>
      </div>


       <div>
        {tasks?.map((task, index) => (
          <div key={index} className="flex justify-between lg:items-center w-full mt-4">
            <input readOnly className="h-10 lg:h-14 rounded-md px-1 py-2 w-1/12 text-center md:w-1/12 lg:w-1/12 md:py-3 text-sm lg:text-2xl font-medium text-gray-600 outline-none  bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] [backdrop-filter:blur(42px)] " value={String.fromCharCode(65 + index)}  />
            <textarea
              className="h-10 lg:h-14 rounded-md px-2 py-2 w-2/12 md:w-2/12 lg:w-2/12  md:py-3 text-sm lg:text-2xl font-medium text-gray-600 outline-none  bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] [backdrop-filter:blur(42px)]"
              name="title"
              value={task.title}
              onChange={(event) => handleTaskChange(index, event)}
            />
            <textarea
              className=" rounded-md px-2 h-10 lg:h-14 py-2 w-4/12 ssm:w-5/12  sm:w-5/12  lg:w-6/12 l  md:py-3 text-sm lg:text-2xl font-medium text-gray-600 outline-none  bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] [backdrop-filter:blur(42px)]"
              name="details"
              value={task.details}
              onChange={(event) => handleTaskChange(index, event)}
            />
            <input
              className=" text-gray-600 outline-none h-10 lg:h-14 rounded-md px-2  py-2 w-3/12 lg:w-2/12  md:py-3 text-sm lg:text-2xl font-medium  bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] [backdrop-filter:blur(42px)]"
              name="budget"
              value={task.budget}
              onChange={(event) => handleTaskChange(index, event)}
            />
          </div>
        ))}
      </div> 
      <div onClick={addTask} className="absolute  lg:bottom-[0px] lg:-right-20">
        <img src={plus} className="h-12 md:h-16 lg:h-20 md:-mt-2" />
      </div>
    </form>
  );
};

export default AddProjectThirdForm;

AddProjectThirdForm.propTypes = {
  handleThird: PropTypes.func,
};

// import { useState } from "react";
// import plus from "../../../assets/plus3.png";
// import post from "../../../assets/post.png";
// import PropTypes from "prop-types";

// const AddProjectThirdForm = ({ handleThird }) => {
//   const [questions, setQuestions] = useState([]);

//   const addQuestion = (e) => {
//     e.preventDefault();
//     setQuestions([...questions, { question: "", answer: "" }]);
//   };
//   return (
//     <form className="w-12/12 space-y-4 py-2 lg:py-3 relative">
//       <div className="flex justify-between items-center w-full ">
//         <div className="w-3/12 md:w-2/12 lg:w-1/12 rounded-md text-center py-2 lg:px-10 md:py-3 lg:text-2xl font-bold text-white gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)]">
//           NO
//         </div>
//         <div className="w-3/12 md:w-2/12 lg:w-4/12 rounded-md text-center py-2 lg:px-10 md:py-3 lg:text-2xl font-bold text-white gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)]">
//          Title
//         </div>
//         <div className="w-8/12 md:w-9/12 lg:w-6/12 text-center rounded-md  py-2  lg:px-10 md:py-3 lg:text-2xl font-bold text-white gradient-background shadow-[1px_5px_7px_rgba(125,_125,_125,_0.4),_1px_2px_15px_rgba(213,_213,_213,_0.3)] [backdrop-filter:blur(42px)]">
//           DETAILS
//         </div>
//       </div>

//      <div className="flex justify-between lg:items-center w-full">
//         <input className="w-3/12 md:w-2/12 lg:w-1/12 rounded-md px-5 py-1 lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//         <input className="w-3/12 md:w-2/12 lg:w-4/12 rounded-md px-5 py-1 lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//         <input className="w-7/12 md:w-6/12 rounded-md lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//       </div>
//        <div className="flex justify-between lg:items-center w-full">
//         <input className="w-3/12 md:w-2/12 lg:w-1/12 rounded-md px-5 py-1 lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//         <input className="w-3/12 md:w-2/12 lg:w-4/12 rounded-md px-5 py-1 lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//         <input className="w-8/12 md:w-6/12 rounded-md lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//       </div>
//       <div>
//         {questions.map((question, index) => (
//           <div
//             key={index}
//             className="flex justify-between lg:items-center w-full mt-4"
//           >
//             <input className="w-3/12 md:w-2/12 lg:w-1/12 rounded-md px-5 py-1 lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//             <input className="w-3/12 md:w-2/12 lg:w-4/12 rounded-md px-5 py-1 lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//             <input className="w-8/12 md:w-6/12 rounded-md lg:px-10 lg:py-3 text-2xl font-bold text-white bg-[#a2cbe4] outline-none shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] [backdrop-filter:blur(42px)]" />
//           </div>
//         ))}
//       </div>
//       <div
//         onClick={addQuestion}
//         className="absolute lg:bottom-[105px] lg:-right-16"
//       >
//         <img src={plus} className="h-9 lg:h-16" />
//       </div>

//     </form>
//   );
// };

// export default AddProjectThirdForm;

// AddProjectThirdForm.propTypes = {
//   handleThird : PropTypes.func,
// };
