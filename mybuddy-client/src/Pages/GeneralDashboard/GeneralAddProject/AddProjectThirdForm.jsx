 import { useState } from "react";
 import plus from "../../../assets/plus3.png";
 import PropTypes from "prop-types";

 const AddProjectThirdForm = ({ tasks, setTasks }) => {
   const [taskInput, setTaskInput] = useState({
     title: "",
     details: "",
     taskType: "free",
     coin: "0",
     priority: "low",
     startDate: "", 
     endDate: "" ,
     subTask: [],
   });

   const addTask = (e) => {
     e.preventDefault();
     if (taskInput.title !== "") {
       setTasks([...tasks, { ...taskInput }]);
       setTaskInput({
         title: "",
         details: "",
         taskType: "free",
         coin: "0",
         priority: "low",
          startDate: "", 
          endDate: "" ,
         subTask: [],
       });
     }
   };

   const handleTaskChange = (e) => {
     const { name, value } = e.target;
     setTaskInput((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubTaskChange = (index, event) => {
     const newSubTasks = [...taskInput.subTask];
     newSubTasks[index] = event.target.value;
     setTaskInput((prev) => ({ ...prev, subTask: newSubTasks }));
   };

   const addSubTask = () => {
     setTaskInput((prev) => ({ ...prev, subTask: [...prev.subTask, ""] }));
   };

   const removeSubTask = (index) => {
     const newSubTasks = taskInput.subTask.filter((_, i) => i !== index);
     setTaskInput((prev) => ({ ...prev, subTask: newSubTasks }));
   };

   const removeTask = (taskIndex) => {
     const newTasks = tasks?.filter((_, index) => index !== taskIndex);
     setTasks(newTasks);
   };
console.log(tasks);
   return (
     <div className="w-full">
       {tasks?.length > 0 && (
         <table className="w-full table-auto mb-4">
           <thead>
             <tr>
               <th>Title</th>
               <th>Details</th>
               <th>Budget</th>
               <th>Deadline</th>
               <th>Priority</th>
               <th>SubTasks</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {tasks.map((task, index) => (
               <tr key={index}>
                 <td>{task.title}</td>
                 <td>{task.details}</td>
                 <td>{task.taskType === "paid" ? `${task.coin} coin` : "Free"}</td>
                 <td>{task.endDate}</td>
                 <td>{task.priority}</td>
                 <td>{task.subTask.length}</td>
                 <td>
                   <button
                     onClick={() => removeTask(index)}
                     className="text-red-500 hover:text-red-700"
                   >
                     &times;
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       )}

       <form className="w-full space-y-4 py-2 lg:py-3">
         <div className="md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
           <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-3">
             <label className="text-[16px] md:text-xl">Title:</label>
             <input
               name="title"
               value={taskInput.title}
               onChange={handleTaskChange}
               className="outline-none rounded-lg py-3 px-2 md:w-[380px] lg:w-[446px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
             />
           </div>
         </div>

         {/* details */}
         <div className="md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
           <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-3">
             <label className="text-[16px] md:text-xl">Details:</label>
             <textarea
               name="details"
               value={taskInput.details}
               onChange={handleTaskChange}
               className="outline-none rounded-lg py-3 px-2 md:w-[380px] lg:w-[446px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
             />
           </div>
         </div>

         {/* budget */}
         <div className="md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
           <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-3">
             <label className="text-[16px] md:text-xl">Budget:</label>
             <select
               name="taskType"
               value={taskInput.taskType}
               onChange={handleTaskChange}
               className="outline-none rounded-lg py-3 px-2 md:w-[380px] lg:w-[447px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
             >
               <option value="free">Free</option>
               <option value="paid">Paid</option>
             </select>
             {taskInput.taskType === "paid" && (
               <input
                 name="coin"
                 type="number"
                 value={taskInput.coin}
                 onChange={handleTaskChange}
                 className="outline-none rounded-lg py-3 px-2 md:w-[315px] lg:w-[340px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
               />
             )}
           </div>
         </div>

         {/* duration */}
         <div className="flex flex-col space-y-3 w-full lg:w-[550px] ">
           <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-3">
             <label className="text-[16px] md:text-xl">Duration:</label>
             <input
               type="date"
               name="startDate"
               value={taskInput.startDate}
                onChange={handleTaskChange}
               
               className="outline-none rounded-lg py-3 px-2 md:w-[182px] lg:w-[215px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
             />
             <input
               type="date"
               name="endDate"
               value={taskInput.endDate}
               onChange={handleTaskChange}
               className="outline-none rounded-lg py-3 px-2 md:w-[182px] lg:w-[215px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
             />
           </div>
         </div>

         {/* priority */}
         <div className="md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
           <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-3">
             <label className="text-[16px] md:text-xl">Priority:</label>
             <select
               name="priority"
               value={taskInput.priority}
               onChange={handleTaskChange}
               className="outline-none rounded-lg py-3 px-2 md:w-[380px] lg:w-[447px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
             >
               <option value="low">Low</option>
               <option value="medium">Medium</option>
               <option value="high">High</option>
             </select>
           </div>
         </div>

         {/* sub tasks */}
         <div className="md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
           <div className="flex flex-col space-y-2">
             <label className="text-[16px] md:text-xl">SubTasks:</label>
             {taskInput.subTask.map((subTask, index) => (
               <div
                 key={index}
                 className="flex items-center space-x-3 md:w-[360px] lg:w-[440px]"
               >
                 <input
                   type="text"
                   value={subTask}
                   onChange={(e) => handleSubTaskChange(index, e)}
                   className="outline-none rounded-lg py-3 px-2 w-full bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
                 />
                 <button
                   type="button"
                   onClick={() => removeSubTask(index)}
                   className="text-red-500 hover:text-red-700"
                 >
                   &times;
                 </button>
               </div>
             ))}
             <button
               type="button"
               onClick={addSubTask}
               className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
             >
               <img src={plus} alt="Add SubTask" className="w-5 h-5" />
               <span>Add SubTask</span>
             </button>
           </div>
         </div>

         <div className="md:w-9/12 lg:w-[550px] flex justify-end">
           <button
             type="submit"
             onClick={addTask}
             className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
           >
             Add Task
           </button>
         </div>
       </form>
     </div>
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
