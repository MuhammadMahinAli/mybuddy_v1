/* eslint-disable react/prop-types */


import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/UserContext";

const AddNewTask = ({ tasks,openAddTaskModal, closeAddTaskModal,projectId }) => {
const {createNewTask} = useContext(AuthContext)
  const [taskInput, setTaskInput] = useState({
    title: "",
    details: "",
    taskType: "free",
    coin: "0",
    priority: "low",
    status: "pending",
    startDate: "",
    endDate: "",
    subTask: [{ todo: "Describe the sub task", status: "pending" }],
  });

  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.title) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Task Title",
      });
      return;
    }
    if (!taskInput.details) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Details Of Task.",
      });
      return;
    }
    if (!taskInput.endDate) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Deadline Of The Task.",
      });
      return;
    }
    if (taskInput.title !== "") {
      
      setTaskInput({
        title: "",
        details: "",
        taskType: "free",
        coin: "0",
        priority: "low",
        status: "pending",
        startDate: "",
        endDate: "",
        subTask: [{ todo: "", status: "pending" }],
      });
    }

    console.log("tew task",projectId, taskInput);
    createNewTask({ id: projectId, data: taskInput })
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskInput((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubTaskChange = (index, event) => {
  //   const newSubTasks = [...taskInput.subTask];
  //   newSubTasks[index] = event.target.value;
  //   setTaskInput((prev) => ({ ...prev, subTask: newSubTasks }));
  // };

  // const addSubTask = () => {
  //   setTaskInput((prev) => ({
  //     ...prev,
  //     subTask: [...prev.subTask, "Describe the sub task"],
  //   }));
  // };

  const handleSubTaskChange = (index, event) => {
    const { name, value } = event.target;
    const newSubTasks = [...taskInput.subTask];
    newSubTasks[index] = { ...newSubTasks[index], [name]: value };
    setTaskInput((prev) => ({ ...prev, subTask: newSubTasks }));
  };

  const addSubTask = () => {
    setTaskInput((prev) => ({
      ...prev,
      subTask: [
        ...prev.subTask,
        { todo: "Describe the sub task", status: "pending" },
      ],
    }));
  };

  const removeSubTask = (index) => {
    const newSubTasks = taskInput.subTask.filter((_, i) => i !== index);
    setTaskInput((prev) => ({ ...prev, subTask: newSubTasks }));
  };

//   const removeTask = (taskIndex) => {
//     const newTasks = tasks?.filter((_, index) => index !== taskIndex);
//     setTasks(newTasks);
//   };
  console.log(tasks);
  //
  const [selectedPriority, setSelectedPriority] = useState(taskInput.priority);

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
    handleTaskChange({ target: { name: "priority", value: priority } });
  };

  const buttonClasses = (priority) => {
    let baseClasses =
      "px-5 py-1 border rounded-lg cursor-pointer mr-2 capitalize";
    if (selectedPriority === priority) {
      if (priority === "high")
        return `${baseClasses}  bg-red-200 text-red-600  border-red-600`;
      if (priority === "medium")
        return `${baseClasses} bg-[#ffe9d4] text-orange-600  border-orange-600`;
      if (priority === "low")
        return `${baseClasses} bg-blue-200 text-blue-600  border-blue-600`;
    }
    return `${baseClasses} bg-gray-300 text-gray-600  border-gray-600`;
  };

  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }
  return (
    <Transition appear show={openAddTaskModal} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-10"
      onClose={closeAddTaskModal}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>

      <form
        className="fixed inset-0 overflow-y-auto"
        onSubmit={(e) => handleSubmit(e, projectId)}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="px-[3px] rounded-m bg-white">
                <div
                  className={`graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]`}
                >
                  <p className="m-[1px] pt-2  text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
                    Add A New License And Certificate
                  </p>

                  <form className="w-full space-y-4 py-2 lg:py-3">
        <div className=" xs:w-full  md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
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
        <div className="xs:w-full md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-3 md:space-y-0 md:space-x-3">
            <label className="text-[16px] md:text-xl">Details:</label>
            <textarea
              name="details"
              value={taskInput.details}
              onChange={handleTaskChange}
              className="outline-none rounded-lg py-3 px-2 lg:h-[100px] md:w-[380px] lg:w-[446px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
            />
          </div>
        </div>

        {/* details */}
        <div className=" xs:w-full  md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
            <label className="text-[16px] md:text-xl md:pr-2 lg:pr-5">
              Budget:
            </label>
            <button className=" px-5 py-1 border rounded-2xl bg-[#ecffcd] text-[#77d804]  border-[#77d804]">
              Free
            </button>
          </div>
        </div>

        {/* duration */}
        <div className="flex flex-col space-y-3 w-full lg:w-[550px] ">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
            <label className="text-[16px] md:text-xl">Duration:</label>
            <div className="flex flex-col md:flex-row md:items-center space-x-2">
              <p>Start</p>
              <input
                type="date"
                name="startDate"
                value={taskInput.startDate}
                onChange={handleTaskChange}
                className="outline-none rounded-lg py-3 px-2 w-11/12 md:w-[140px] lg:w-[180px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
              />
              <p>End</p>
              <input
                type="date"
                name="endDate"
                value={taskInput.endDate}
                onChange={handleTaskChange}
                className="outline-none rounded-lg py-3 px-2 w-11/12 md:w-[140px] lg:w-[180px] bg-[#e4ecf7] shadow-[-4px_-4px_9px_rgba(255,_255,_255,_0.88)_inset,_4px_4px_14px_#c7d3e1_inset] box-border border-[0.5px] border-solid border-gray-100"
              />
            </div>
          </div>
        </div>

        {/* priority */}

        <div className=" xs:w-full md:w-9/12 lg:w-[550px] flex flex-col space-y-3 w-full">
          <div className="flex flex-col md:flex-row  md:items-center space-y-3 md:space-y-0 md:space-x-3">
            <label className="text-[16px] md:text-xl md:pr-2 lg:pr-4">
              Priority:
            </label>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button
                type="button"
                className={buttonClasses("low")}
                onClick={() => handlePriorityChange("low")}
              >
                Low
              </button>
              <button
                type="button"
                className={buttonClasses("medium")}
                onClick={() => handlePriorityChange("medium")}
              >
                Medium
              </button>
              <button
                type="button"
                className={buttonClasses("high")}
                onClick={() => handlePriorityChange("high")}
              >
                High
              </button>
            </div>
          </div>
        </div>

        {/* sub tasks */}
        <div className="w-full xs:w-full md:w-9/12 lg:w-[550px] flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label className="text-[16px] md:text-xl">SubTasks:</label>
            <button
              type="button"
              onClick={addSubTask}
              className="flex justify-center items-center my-3 px-3 py-1 w-44  md:py-2 space-x-2 text-[16px] text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
            >
              <FaPlus className="text-lg" />
              <span>Add SubTask</span>
            </button>
            <div className="-space-y-2">
              {taskInput.subTask.map((subTask, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3  xs:w-[180px] sm:w-[250px] px-2 md:w-[360px] lg:w-[440px]"
                >
                  <p>{index + 1}</p>
                  <input
                    type="text"
                    name="todo"
                    value={subTask.todo}
                    onChange={(e) => handleSubTaskChange(index, e)}
                    className="outline-none rounded-lg py-3 px-2 w-[135px] xs:w-[180px] sm:w-[250px] bg-transparent"
                  />
                  <IoTrashOutline
                    onClick={() => removeSubTask(index)}
                    className="text-red-500 cursor-pointer text-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-9/12 lg:w-[550px] flex ">
          <button
            type="submit"
            onClick={addTask}
            className="my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
          >
            Save Task
          </button>
        </div>
      </form>
                </div>
              </div>
             
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </form>
    </Dialog>
  </Transition>
    
     
     
  
  );
};

export default AddNewTask;

AddNewTask.propTypes = {
  handleThird: PropTypes.func,
};
