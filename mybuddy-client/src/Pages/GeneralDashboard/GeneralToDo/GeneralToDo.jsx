import { useContext, useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../Context/UserContext";
import { useGetAllProjectTodoByUserQuery } from "../../../features/fund/fundApi";

import CreateTodo from "./CreateTodo";
import UpdateProjectTodo from "./UpdateProjectTodo";

const GeneralToDo = () => {
  const { userId } = useContext(AuthContext);
  const { data: getAllProjectTodoByUser } =
    useGetAllProjectTodoByUserQuery(userId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectTodo, setSelectedProjectTodo] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isOpenAddSlider, setIsOpenAddSlider] = useState(false);
  const todoData = getAllProjectTodoByUser?.data || [];
  const [openProjectId, setOpenProjectId] = useState(null);

  const [formData, setFormData] = useState({
    title: selectedTodo?.title || "Untitled document",
    description: selectedTodo?.description || "",
    checklist: selectedTodo?.checklist || [],
    attachments: selectedTodo?.attachments || [],
    timer: selectedTodo?.timer || null,
    status: selectedTodo?.status || "",
  });

  const closeSlideBox = (i) => {
    setIsOpen(false);
    setSelectedProjectTodo(null);
  };

  //----------- day left claculation
  function getDaysLeft(endDateString) {
    const endDate = new Date(endDateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
    if (diffDays === 0) return "Last day!";
    return "Time's up!";
  }

  //----------- button design
  const statusStyles = {
    working: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-yellow-200 text-yellow-800 border-yellow-400",
    giveup: "bg-red-100 text-red-600 border-red-300",
    done: "bg-yellow-100 text-yellow-500 border-yellow-300",
    confuse: "bg-blue-100 text-blue-600 border-blue-300",
    boring: "bg-gray-200 text-gray-600 border-gray-400",
  };

  //----------- open Slider for a Specific Todo**
  const handleOpenTodo = (todo, _id) => {
    setSelectedTodo(todo); // Store selected todo item
    setIsOpen(true);
    setSelectedProjectTodo(_id);
  };

  //----------- Format date as "Wednesday, 29 January"
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  //----------- Function to handle month navigation
  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    setFormData(selectedTodo);
    setElapsedTime(selectedTodo?.timer || 0);
  }, [selectedTodo]);

  const openTask = (projectId) => {
    setOpenProjectId((prev) => (prev === projectId ? null : projectId)); // Toggle open/close
    setSelectedProjectTodo(projectId);
  };

  const closeTask = () => {
    setIsOptionClosing(false);
    setSelectedProjectTodo(null);
  };

  return (
    <>
      <div className="relative">
        {/* Primary Content */}
        <div className="w-full  mx-auto p-4 space-y-4 bg-blue-50">
          {/* Header / Date Navigation */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-0 border rounded-md">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="rounded-l-md border-r px-2 py-1 bg-white hover:bg-gray-100"
              >
                <IoIosArrowBack />
              </button>

              {/* Calendar Picker */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="hidden" // Hide default input
                id="date-picker"
              />
              <button
                type="button"
                className="border-r px-2 py-1 bg-white hover:bg-gray-100"
                onClick={() => document.getElementById("date-picker").click()}
              >
                <IoCalendarOutline />
              </button>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="rounded-r-md px-2 py-1 bg-white hover:bg-gray-100"
              >
                <IoIosArrowForward />
              </button>
            </div>

            {/* Display Selected Date */}
            <div className="text-gray-700 font-medium">{formattedDate}</div>

            {/* Return to Today Button */}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setSelectedDate(new Date())}
            >
              Return To Today
            </button>
          </div>

          {/* Input for new to-do */}
          <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-2">
            <span role="img" aria-label="pencil" className="text-gray-500">
              <FiEdit3 />
            </span>
            <input
              type="text"
              placeholder="Write The Title Of Your To-Do"
              className="flex-grow px-2 py-1 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsOpenAddSlider(true)}
              className="bg-blue-500 text-white rounded px-3 py-1 text-xl hover:bg-blue-600"
            >
              +
            </button>
          </div>
        </div>
        <div
          className={`fixed top-0 right-0 h-screen w-[800px] bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
            isOpenAddSlider ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CreateTodo setIsOpenAddSlider={setIsOpenAddSlider} />
        </div>

        <div className="w-full mx-auto p-4 space-y-4 bg-blue-50 min-h-screen">
          {/* Existing To-Do List */}
          <div className="space-y-4">
      {todoData.map((project) => (
        <div key={project._id} className="bg-white shadow-md rounded-lg p-4">
          {/* Project Header */}
          <div className="flex items-center justify-between cursor-pointer" onClick={() => openTask(project._id)}>
            <div className="flex items-center space-x-2">
              <IoIosArrowForward
                className={`text-xl text-gray-400 transition-transform ${
                  openProjectId === project._id ? "rotate-90" : ""
                }`}
              />
              <span className="font-semibold text-xl text-gray-800">{project?.projectName}</span>
            </div>
            <div className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded flex items-center space-x-2">
              <GoClock />
              <span>{getDaysLeft(project?.projectEndDate)}</span>
            </div>
          </div>

          {/* Task List (Only Shown for Open Project) */}
          {openProjectId === project._id && (
            <div className="mt-3 space-y-3 transition-all duration-300">
              {project?.todos?.map((todo) => (
                <div
                  key={todo._id}
                  className="flex justify-between items-center px-5 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOpenTodo(todo, project?._id)}
                >
                  <div className="flex items-center space-x-3">
                    <IoIosArrowForward className="text-gray-500" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">{todo.title}</span>
                      <span className="text-sm text-gray-600">{getDaysLeft(todo.endDate)}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                      statusStyles[todo.status] || "bg-gray-300 text-gray-700 border-gray-500"
                    }`}
                  >
                    {todo.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
        </div>

        {/* Sliding Box (Shows Selected Todo) */}
        <div
          className={`fixed top-0 right-0 h-screen w-[800px] bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <UpdateProjectTodo
            selectedTodo={selectedTodo}
            closeSlideBox={closeSlideBox}
            statusStyles={statusStyles}
            formData={formData}
            elapsedTime={elapsedTime}
            selectedProjectTodo={selectedProjectTodo}
            setFormData={setFormData}
            setElapsedTime={setElapsedTime}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralToDo;
