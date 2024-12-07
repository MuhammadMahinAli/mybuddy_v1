
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { useUpdateTaskInfoMutation } from "../../../../features/project/projectApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateTask = ({
  task,
  setIsOpenUpdateModal,
  setSelectedTask,
  projectId,
  progressColor,
}) => {
  const [updateTaskInfo] = useUpdateTaskInfoMutation();
  const navigate = useNavigate();
  const [taskInput, setTaskInput] = useState({
    title: task?.title || "",
    details: task?.details || "",
    taskType: task?.taskType || "free",
    coin: task?.coin || "0",
    priority: task?.priority || "low",
    status: task?.status || "pending",
    startDate: task?.startDate || "",
    endDate: task?.endDate || "",
    subTask: task?.subTask || [
      { todo: "Describe the sub-task", status: "pending" },
    ],
  });

  const [selectedPriority, setSelectedPriority] = useState(taskInput.priority);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskInput((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
    handleTaskChange({ target: { name: "priority", value: priority } });
  };

  const buttonClasses = (priority) => {
    let baseClasses =
      "px-5 py-1 border rounded-lg cursor-pointer mr-2 capitalize";
    if (selectedPriority === priority) {
      if (priority === "high")
        return `${baseClasses} bg-red-200 text-red-600 border-red-600`;
      if (priority === "medium")
        return `${baseClasses} bg-[#ffe9d4] text-orange-600 border-orange-600`;
      if (priority === "low")
        return `${baseClasses} bg-blue-200 text-blue-600 border-blue-600`;
    }
    return `${baseClasses} bg-gray-300 text-gray-600 border-gray-600`;
  };

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
        { todo: "Describe the sub-task", status: "pending" },
      ],
    }));
  };

  const removeSubTask = (index) => {
    const newSubTasks = taskInput.subTask.filter((_, i) => i !== index);
    setTaskInput((prev) => ({ ...prev, subTask: newSubTasks }));
  };

  const handleSubmit = async (e) => {
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
    console.log(taskInput);
    try {
      const result = await updateTaskInfo({
        projectId,
        taskId: task?._id,
        data: taskInput,
      });

      if (result?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Task info has been updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });
        setIsOpenUpdateModal(false);
        setSelectedTask(null);
          navigate(0); // Triggers a page refresh and reloads loader data
        // setTimeout(() => {
        //     window.location.reload();
        //   }, 2500);
      } else if (result?.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating Post:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex justify-center z-50 items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll">
      <div className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[600px] 3xl:w-[800px] h-[600px] overflow-y-auto">
        <IoIosCloseCircleOutline
          onClick={() => setIsOpenUpdateModal(false)}
          className="text-xl float-right cursor-pointer"
        />
        <form className="space-y-3 p-4" onSubmit={handleSubmit}>
          <div className="w-full space-y-2 py-2">
            <label className="text-[16px] md:text-xl font-semibold">
              Title:
            </label>
            <input
              name="title"
              value={taskInput.title}
              onChange={handleTaskChange}
              className="outline-none rounded-lg py-3 px-2 w-full border border-gray-300"
              required
            />
          </div>

          <div className="w-full space-y-2">
            <label className="text-[16px] md:text-xl font-semibold">
              Details:
            </label>
            <textarea
              name="details"
              value={taskInput.details}
              onChange={handleTaskChange}
              className="outline-none rounded-lg py-3 px-2 h-32 w-full border border-gray-300"
              required
            />
          </div>

          <div className="w-full space-y-2">
            <label className="text-[16px] md:text-xl font-semibold">
              Duration:
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                name="startDate"
                value={taskInput.startDate}
                onChange={handleTaskChange}
                className="outline-none rounded-lg py-2 px-3 w-1/2 border border-gray-300"
              />
              <input
                type="date"
                name="endDate"
                value={taskInput.endDate}
                onChange={handleTaskChange}
                className="outline-none rounded-lg py-2 px-3 w-1/2 border border-gray-300"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-[16px] md:text-xl font-semibold">
              Priority:
            </label>
            <div className="flex space-x-2 mt-2">
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

          <div className="w-full space-y-3">
            <label className="text-[16px] md:text-xl font-semibold">
              SubTasks:
            </label>

            <div className="space-y-2">
              {taskInput.subTask.map((subTask, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    name="todo"
                    value={subTask.todo}
                    onChange={(e) => handleSubTaskChange(index, e)}
                    className="outline-none rounded-lg py-2 px-3 w-full border border-gray-300"
                  />
                  <IoTrashOutline
                    onClick={() => removeSubTask(index)}
                    className="text-red-500 cursor-pointer text-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={addSubTask}
            className={` ${progressColor} flex items-center text-white px-4 py-2 rounded-lg`}
          >
            <FaPlus />
            <span className="ml-2">Add SubTask</span>
          </button>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className={` px-6 py-2 text-white ${progressColor} font-bold rounded-lg`}
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
