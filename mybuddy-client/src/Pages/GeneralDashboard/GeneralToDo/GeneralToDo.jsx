import { useContext, useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import {
  IoIosArrowBack,
  IoIosArrowDropdownCircle,
  IoIosArrowForward,
} from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../Context/UserContext";
import {
  useGetAllProjectTodoByUserQuery,
  useGetAllTodoByUserQuery,
} from "../../../features/fund/fundApi";

import CreateTodo from "./CreateTodo";
import UpdateProjectTodo from "./UpdateProjectTodo";
import UpdateTodo from "./UpdateTodo";

const GeneralToDo = () => {
  const { userId } = useContext(AuthContext);
  const { data: getAllProjectTodoByUser } =
    useGetAllProjectTodoByUserQuery(userId);
  const { data: getAllTodoByUser } = useGetAllTodoByUserQuery(userId);
  const [isOpenProjectTodo, setIsOpenProjectTodo] = useState(true);
  const [isOpenTodo, setIsOpenTodo] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectTodo, setSelectedProjectTodo] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedIndividualTodo, setSelectedIndividualTodo] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isOpenAddSlider, setIsOpenAddSlider] = useState(false);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [isOpenProjectDropDown, setIsOpenProjectDropDown] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  // const projectTodoData = getAllProjectTodoByUser?.data || [];
  // const todoData = getAllTodoByUser?.data || [];

  const [projectTodoData, setProjectTodoData] = useState(
    getAllProjectTodoByUser?.data || []
  );
  const [todoData, setTodoData] = useState(getAllTodoByUser?.data || []);

  useEffect(() => {
    setProjectTodoData(getAllProjectTodoByUser?.data || []);
    setTodoData(getAllTodoByUser?.data || []);
  }, [getAllProjectTodoByUser, getAllTodoByUser]);

  // Logging data for debugging
  console.log(todoData);

  const handleToggleProjectTodo = () => {
    setIsOpenProjectTodo(true);
    setIsOpenTodo(false);
    setIsOpenProjectDropDown(false);
  };
  const handleToggleTodo = () => {
    setIsOpenProjectTodo(false);
    setIsOpenTodo(true);
    setIsOpenProjectDropDown(false);
  };

  const [formData, setFormData] = useState({
    title: selectedTodo?.title || "Untitled document",
    description: selectedTodo?.description || "",
    checklist: selectedTodo?.checklist || [],
    attachments: selectedTodo?.attachments || [],
    timer: selectedTodo?.timer || null,
    status: selectedTodo?.status || "",
  });

  const [indiFormData, setIndiFormData] = useState({
    title: selectedIndividualTodo?.title || "Untitled document",
    description: selectedIndividualTodo?.description || "",
    checklist: selectedIndividualTodo?.checklist || [],
    attachments: selectedIndividualTodo?.attachments || [],
    timer:
      selectedIndividualTodo?.timer !== undefined
        ? selectedIndividualTodo.timer
        : 0,
    status: selectedIndividualTodo?.status || "",
  });

  console.log(indiFormData);

  const handleOpenTodo = (todo, _id) => {
    setSelectedTodo(todo); // Store selected todo item
    setIsOpen(true);
    setSelectedProjectTodo(_id);
    setSelectedIndividualTodo(null);
  };
  const handleOpenIndividualTodo = (project) => {
    setIsOpen(true);
    setSelectedIndividualTodo(project);
    setSelectedProjectTodo(null);
  };

  console.log(selectedTodo);

  const closeSlideBox = (i) => {
    setIsOpen(false);
    setSelectedProjectTodo(null);
    setSelectedIndividualTodo(null);
  };
  const closeTodoSlideBox = (i) => {
    setIsOpen(false);
    setSelectedIndividualTodo(null);
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

  const openTask = (projectId) => {
    setOpenProjectId((prev) => (prev === projectId ? null : projectId)); // Toggle open/close
    setSelectedProjectTodo(projectId);
    setSelectedIndividualTodo(null);
  };

  const closeTask = () => {
    setIsOptionClosing(false);
    setSelectedProjectTodo(null);
  };

  // Effect hook to update local state when the data changes

  return (
    <>
      <div className="relative">
        {/* Primary Content */}
        <div className="w-full  mx-auto p-4 space-y-4 bg-blue-50">
          {/* <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-0 border rounded-md">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="rounded-l-md border-r px-2 py-1 bg-white hover:bg-gray-100"
              >
                <IoIosArrowBack />
              </button>

        
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

         
            <div className="text-gray-700 font-medium">{formattedDate}</div>

     
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setSelectedDate(new Date())}
            >
              Return To Today
            </button>
          </div> */}

          {/* <div className="bg-white rounded-lg shadow p-3 flex items-center space-x-2">
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
          </div> */}
        </div>
        {/* <div
          className={`fixed top-0 right-0 h-screen w-[800px] bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
            isOpenAddSlider ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CreateTodo setProjectTodoData={setProjectTodoData} setTodoData={setTodoData} setIsOpenAddSlider={setIsOpenAddSlider} />
        </div> */}

        {/* <div className="hidden md:block">
          <ul
            id="statusSelect"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <li onClick={handleToggleProjectTodo}>Project Todo</li>
            <li onClick={handleToggleTodo}>Individual Todo</li>
          </ul>
        </div> */}

        {/* current */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:px-4">
          {/* left */}
          <div
            onClick={() => setIsOpenAddSlider(true)}
            className="bg-white rounded-lg shadow p-2 flex items-center space-x-2 w-12/12 lg:w-8/12"
          >
            <span role="img" aria-label="pencil" className="text-gray-500">
              <FiEdit3 />
            </span>
            <input
              type="text"
              readOnly
              placeholder="Write The Title Of Your To-Do"
              className="flex-grow px-2 py-1 focus:outline-none"
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded px-3 py-1 text-xl hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {/* right */}
          <div className="relative w-full lg:w-3/12 ">
            {/* Dropdown Button */}
            <div
              onClick={() => setIsOpenProjectDropDown(!isOpenProjectDropDown)}
              className="px-3 py-3 my-4 capitalize w-full text-gray-600 bg-white hover:bg-gray-100 rounded-md flex justify-between items-center border focus:ring-2 focus:ring-[#26B893] border-gray-300 cursor-pointer"
            >
              {isOpenProjectTodo ? " Project Todo" : "Individual Todo"}

              <IoIosArrowDropdownCircle
                className={`text-xl ml-1 text-gray-400 transition-transform ${
                  isOpenProjectDropDown ? "-rotate-180" : "-rotate-0"
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isOpenProjectDropDown && (
              <div className="p-3 absolute right-0 -mt-2 w-full bg-white rounded-md shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] z-10 border border-gray-200">
                <ul className="py-1 space-y-2">
                  <li onClick={handleToggleProjectTodo}>
                    <span className="text-base text-gray-700 capitalize cursor-pointer">
                      Project Todo
                    </span>
                  </li>

                  <li onClick={handleToggleTodo}>
                    <span className="text-base text-gray-700 capitalize cursor-pointer">
                      Individual Todo
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* create todo */}
        <div
          className={`fixed top-0 right-0 h-screen ${
            isExpand ? "w-full" : "w-full lg:w-[800px]"
          } bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
            isOpenAddSlider ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CreateTodo
            isExpand={isExpand}
            setIsExpand={setIsExpand}
            setProjectTodoData={setProjectTodoData}
            setTodoData={setTodoData}
            setIsOpenAddSlider={setIsOpenAddSlider}
          />
        </div>

        {isOpenProjectTodo && (
          <>
            <div className="w-full mx-auto p-0 lg:p-4 space-y-4 bg-blue-50 min-h-screen">
              {/* Existing To-Do List */}
              <div className="space-y-4">
                {projectTodoData?.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white shadow-md rounded-lg p-2 lg:p-4"
                  >
                    {/* Project Header */}
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => openTask(project._id)}
                    >
                      <div className="flex items-center space-x-2">
                        <IoIosArrowForward
                          className={`text-xl text-gray-400 transition-transform ${
                            openProjectId === project._id ? "rotate-90" : ""
                          }`}
                        />
                        <span
                          title={project?.projectName}
                          className="md:hidden font-semibold text-sm text-gray-800"
                        >
                          {project?.projectName.length > 13
                            ? `${project?.projectName.slice(0, 13)}...`
                            : project?.projectName}
                        </span>
                        <span className="hidden md:block font-semibold text-[18px] xl:text-xl text-gray-800">
                          {project?.projectName}
                        </span>
                      </div>
                      <div className="bg-purple-100 text-purple-800 text-sm px-2 md:px-3 py-1 rounded flex items-center space-x-2">
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
                            className="flex justify-between items-center px-1 md:px-5 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => handleOpenTodo(todo, project?._id)}
                          >
                            <div className="flex items-center space-x-3">
                              <IoIosArrowForward className="text-gray-500" />
                              <div className="flex flex-col">
                                <span className="md:hidden text-sm md:text-[18px] font-semibold text-gray-800">
                                  {todo.title.length > 13
                                    ? `${todo.title.slice(0, 13)}...`
                                    : todo.title}
                                </span>
                                <span className="hidden md:block text-sm md:text-[17px] font-semibold text-gray-800">
                                  {todo.title}
                                </span>
                                <span className="text-sm text-gray-600 pt-1">
                                  {getDaysLeft(todo.endDate)}
                                </span>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <span
                              className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                                statusStyles[todo.status] ||
                                "bg-gray-300 text-gray-700 border-gray-500"
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

            {/* Sliding Box (Shows Selected Todo from project todo) */}
            <div
              className={`fixed top-0 right-0 h-screen ${
                isExpand ? "w-full" : "w-[800px]"
              } bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <UpdateProjectTodo
                isExpand={isExpand}
                setIsExpand={setIsExpand}
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
          </>
        )}
        {isOpenTodo && (
          <>
            <div className="w-full mx-auto lg:p-4 space-y-4 bg-blue-50 min-h-screen">
              {/* Existing To-Do List */}
              <div className="space-y-4">
                {todoData?.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white shadow-md rounded-lg p-2 lg:p-4"
                  >
                    {/* Project Header */}
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleOpenIndividualTodo(project)}
                    >
                      <div className="flex items-center space-x-2">
                        <IoIosArrowForward
                          className={`text-xl text-gray-400 transition-transform ${
                            openProjectId === project._id ? "rotate-90" : ""
                          }`}
                        />
                        <span
                          title={project?.title}
                          className="lg:hidden font-semibold text-sm text-gray-800"
                        >
                          {project?.title.slice(0, 8)}...
                        </span>
                        <span className="hidden lg:block font-semibold text-xl text-gray-800">
                          {project?.title}
                        </span>
                      </div>
                      <div
                        className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                          statusStyles[project?.status] ||
                          "bg-gray-300 text-gray-700 border-gray-500"
                        }`}
                      >
                        <span>{getDaysLeft(project?.endDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Sliding Box (Shows Selected Todo from individual todo) */}
            <div
              className={`fixed top-0 right-0 h-screen ${
                isExpand ? "w-full" : "w-[800px]"
              } bg-white shadow-xl border-l p-4 transition-transform duration-500 overflow-y-auto ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <UpdateTodo
                isExpand={isExpand}
                setIsExpand={setIsExpand}
                selectedIndividualTodo={selectedIndividualTodo}
                closeTodoSlideBox={closeTodoSlideBox}
                statusStyles={statusStyles}
                indiFormData={indiFormData}
                elapsedTime={elapsedTime}
                // selectedProjectTodo={selectedProjectTodo}
                setIndiFormData={setIndiFormData}
                setElapsedTime={setElapsedTime}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GeneralToDo;
