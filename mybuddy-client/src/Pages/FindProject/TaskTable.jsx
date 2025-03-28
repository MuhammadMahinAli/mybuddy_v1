import { Fragment, useEffect, useState } from "react";
import man from "../../assets/dummy.png";
import "../GeneralDashboard/GeneralAddProject/editor.css";
import { Dialog, Transition } from "@headlessui/react";
import ProjectIcon1 from "../../icons/ProjectIcon1";
import PropTypes from "prop-types";
import { IoIosCloseCircleOutline } from "react-icons/io";

const TaskTable = ({ tasks, setSelectedTasks,  selectedTasks, theme, setIsOpen, isOpen }) => {
  const [checkedStates, setCheckedStates] = useState(tasks?.map(() => false));
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  //console.log("l", checkedStates, selectedTaskIndex, selectedTasks, tasks);

  // const theme = useSelector((state) => state.theme.theme);
  const handleTaskButtonClick = (index) => {
    setSelectedTaskIndex(index);
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedTaskIndex(null);
    setIsOpen(false);
  };

  const toggleCheckbox = (index) => {
    const isChecked = !checkedStates[index];
    setCheckedStates((prevCheckedStates) => {
      const newCheckedStates = [...prevCheckedStates];
      newCheckedStates[index] = isChecked;
      return newCheckedStates;
    });

    const selectedTask = tasks[index];
    console.log(selectedTask, isChecked);
    if (isChecked) {
      setSelectedTasks((prevSelectedTasks) => [
        ...prevSelectedTasks,
        selectedTask,
      ]);
    } else {
      setSelectedTasks((prevSelectedTasks) =>
        prevSelectedTasks.filter((task) => task !== selectedTask)
      );
    }
  };


//console.log('ffd',   selectedTasks);

  return (
    <div className={` md:-my-3 xl:m-0 py-5`}>
      <div>
        {/* table for mobile & tab */}
        <form className="w-full xl:hidden md:px-10 md:py-5 space-y-6 md:space-y-9">
          {tasks?.map((task, index) => (
            <div
              key={index}
              className={`shadow-md space-y-3 xl:space-y-3 px-5 lg:px-10  rounded-lg lg:mb-5 py-2 ${
                index === 0
                  ? theme === "light"
                    ? "bg-[#fff] border"
                    : "bg-[#616e72]"
                  : index === 1
                  ? theme === "light"
                    ? "bg-[#e6f5f8]"
                    : "bg-[#5c7e8a]"
                  : index === 2
                  ? theme === "light"
                    ? "bg-[#fcebf4]"
                    : "bg-[#86728e]"
                  : index === 3
                  ? theme === "light"
                    ? "bg-[#faf3d6]"
                    : "bg-[#ae9368]"
                  : index === 4
                  ? theme === "light"
                    ? "bg-[#f7e1f1]"
                    : "bg-[#c9f3d6]"
                  : index === 5
                  ? theme === "light"
                    ? "bg-[#ddd6bc]"
                    : "bg-[#a09f9b]"
                  : theme === "light"
                  ? "bg-[#d9c6f1]"
                  : "bg-[#837891]"
              }`}
            >
              <div className="flex justify-between items-center lg:space-x-3">
                <label className="container">
                  <input
                    name={`task-${index}`}
                    checked={checkedStates[index]}
                    onChange={() => toggleCheckbox(index)}
                    type="checkbox"
                  />
                  <div className="checkmark"></div>
                </label>

                <p
                  onClick={() => handleTaskButtonClick(index)}
                  className={`border px-3 xs:px-2 sm:px-6 py-2 rounded-md md:rounded-lg   text-[14px] xl:text-[18px] font-semibold text-center h-[36px] xl:h-[35px] 2xl:h-[45px] cursor-pointer ${
                    theme === "light" ? "graish" : "text-white"
                  }  ${
                    index === 0
                      ? theme === "light"
                        ? "bg-[#f5f3ff] border-[#979797]"
                        : "border-[#fff]"
                      : index === 1
                      ? theme === "light"
                        ? "border-[#2bbce0]"
                        : "border-[#4cb5db]"
                      : index === 2
                      ? theme === "light"
                        ? "border-[#ff6cd3]"
                        : "border-pink-300"
                      : index === 3
                      ? theme === "light"
                        ? "border-[#eba206]"
                        : "border-[#fac877]"
                      : index === 4
                      ? theme === "light"
                        ? "border-[#ee8ad8]"
                        : "border-[#c9f3d6]"
                      : index === 5
                      ? theme === "light"
                        ? "border-[#ee8ad8]"
                        : "border-[#a09f9b]"
                      : theme === "light"
                      ? "border-[#ffb13b]"
                      : "border-[#fcf3cf]"
                  }`}
                >
                  Task {String.fromCharCode(65 + index)}{" "}
                </p>

                {/* <div className="bg-white shadow-lg p-2 rounded-lg">
                      <ProjectIcon theme={theme} />
                    </div> */}
                <div className="flex space-x-3">
                  <div>
                    <div className="bg-white shadow-lg p-2 rounded-lg">
                      <ProjectIcon1 />
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } text-[16px] capitalize font-semibold`}
                    >
                      {" "}
                      {tasks[index]?.title.slice(0, 14)} ...
                    </p>
                    <p
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-white"
                      } text-[15px] capitalize font-semibold`}
                    >
                      {" "}
                      {tasks[index]?.details.slice(0, 13)} ...
                    </p>
                  </div>
                </div>
            
              </div>
            </div>
          ))}
        </form>
      </div>

      {/* table for dekstop */}

      <div className="hidden xl:flex flex-col md:flex-row justify-between items-start py-2">
        {/* left Column */}
        <div className="xl:w-6/12 xl:px-6 3xl:px-8">
          {tasks?.map(
            (task, index) =>
              index % 2 === 0 && (
                <div
                  key={index}
                  className={` space-y-3 xl:space-y-3 px-5   rounded-lg xl:mb-8 py-3 ${
                    index === 0
                      ? theme === "light"
                        ? "bg-[#fff] border shadow-md"
                        : "bg-[#616e72]"
                      : index === 2
                      ? theme === "light"
                        ? "bg-[#fcebf4]"
                        : "bg-[#86728e]"
                      : index === 4
                      ? theme === "light"
                        ? "bg-[#f7e1f1]"
                        : "bg-[#c9f3d6]"
                      : theme === "light"
                      ? "bg-[#ddd6bc]"
                      : "bg-[#fcf3cf]"
                  }`}
                >
                  <div className="flex justify-between items-center lg:space-x-3">
                    <label className="container">
                      <input
                        name={`task-${index}`}
                        checked={checkedStates[index]}
                        onChange={() => toggleCheckbox(index)}
                        type="checkbox"
                      />
                      <div className="checkmark"></div>
                    </label>

                    <p
                      onClick={() => handleTaskButtonClick(index)}
                      className={`border px-6 py-2 rounded-md md:rounded-lg   text-[14px] xl:text-[18px] font-semibold text-center h-[36px] xl:h-[35px] 2xl:h-[45px] cursor-pointer ${
                        theme === "light" ? "graish" : "text-white"
                      } ${
                        index === 0
                          ? theme === "light"
                            ? "bg-[#f5f3ff] border-[#979797]"
                            : "border-[#fff]"
                          : index === 2
                          ? theme === "light"
                            ? "border-[#ff6cd3]"
                            : "border-pink-300"
                          : index === 4
                          ? theme === "light"
                            ? "border-[#ee8ad8]"
                            : "border-[#c9f3d6]"
                          : theme === "light"
                          ? "border-[#ffb13b]"
                          : "border-[#fcf3cf]"
                      }`}
                    >
                      Task {String.fromCharCode(65 + index)}{" "}
                    </p>

                    {/* <div className="bg-white shadow-lg p-2 rounded-lg">
                      <ProjectIcon theme={theme} />
                    </div> */}
                    <div className="flex space-x-3">
                      <div>
                        <div className="bg-white shadow-lg p-2 rounded-lg">
                          <ProjectIcon1 theme={theme} />
                        </div>
                      </div>

                      <div>
                        <p
                          className={`${
                            theme === "light" ? "graish" : "text-white"
                          } text-[16px] capitalize font-semibold`}
                        >
                          {" "}
                          {tasks[index]?.title.slice(0, 14)} ...
                        </p>
                        <p
                          className={`${
                            theme === "light" ? "text-gray-500" : "text-white"
                          } text-[15px] capitalize font-semibold`}
                        >
                          {" "}
                          {tasks[index]?.details.slice(0, 13)} ...
                        </p>
                      </div>
                    </div>
                
                  </div>
                </div>
              )
          )}
        </div>
        {/* right column */}
        <div className="xl:w-6/12 xl:px-6 3xl:px-8">
          {tasks?.map(
            (task, index) =>
              index % 2 !== 0 && (
                <div
                  key={index}
                  className={` space-y-3 xl:space-y-3 px-5  rounded-lg xl:mb-8 py-3 ${
                    index === 1
                      ? theme === "light"
                        ? "bg-[#e6f5f8]"
                        : "bg-[#5c7e8a]"
                      : index === 3
                      ? theme === "light"
                        ? "bg-[#faf3d6]"
                        : "bg-[#ae9368]"
                      : index === 5
                      ? theme === "light"
                        ? "bg-[#ddd6bc]"
                        : "bg-[#a09f9b]"
                      : theme === "light"
                      ? "bg-[#d9c6f1]"
                      : "bg-[#837891]"
                  }`}
                >
                  <div className="flex justify-between items-center lg:space-x-3">
                    <label className="container">
                      <input
                        name={`task-${index}`}
                        checked={checkedStates[index]}
                        onChange={() => toggleCheckbox(index)}
                        type="checkbox"
                      />
                      <div className="checkmark"></div>
                    </label>

                    <p
                      onClick={() => handleTaskButtonClick(index)}
                      className={`border px-6 py-2 rounded-md md:rounded-lg   text-[14px] xl:text-[18px] font-semibold text-center h-[36px] xl:h-[35px] 2xl:h-[45px] cursor-pointer ${
                        theme === "light" ? "graish" : "text-white"
                      }  ${
                        index === 1
                          ? theme === "light"
                            ? "border-[#2bbce0]"
                            : "border-[#4cb5db]"
                          : index === 3
                          ? theme === "light"
                            ? "border-[#eba206]"
                            : "border-[#fac877]"
                          : index === 5
                          ? theme === "light"
                            ? "border-[#ee8ad8]"
                            : "border-[#a09f9b]"
                          : theme === "light"
                          ? "border-[#fd4deb]"
                          : "border-[#837891]"
                      }`}
                    >
                      Task {String.fromCharCode(65 + index)}{" "}
                    </p>

                    {/* <div className="bg-white shadow-lg p-2 rounded-lg">
                      <ProjectIcon theme={theme} />
                    </div> */}
                    <div className="flex space-x-3">
                      <div>
                        <div className="bg-white shadow-lg p-2 rounded-lg">
                          <ProjectIcon1 theme={theme} />
                        </div>
                      </div>

                      <div>
                        <p
                          className={`${
                            theme === "light" ? "graish" : "text-white"
                          } text-[16px] capitalize font-semibold`}
                        >
                          {" "}
                          {tasks[index]?.title.slice(0, 14)} ...
                        </p>
                        <p
                          className={`${
                            theme === "light" ? "text-gray-500" : "text-white"
                          } text-[15px] capitalize font-semibold`}
                        >
                          {" "}
                          {tasks[index]?.details.slice(0, 13)} ...
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      {/* Popup Modal */}
      {selectedTaskIndex !== null && (
        <div className="z-50 fixed top-0 left-0 lg:left-20 flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll">
          <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[600px] 3xl:w-[800px] cursor-pointer">
            <IoIosCloseCircleOutline
              onClick={() => setSelectedTaskIndex(null)}
              className="text-xl float-right"
            />
            <div className="py-7">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 cursor-pointer">
                Task {String.fromCharCode(65 + selectedTaskIndex)}{" "}
              </h2>
              <h4 className="text-lg lg:text-xl graish capitalize font-bold ">
                {tasks[selectedTaskIndex]?.title} [ Coin: Free ]
              </h4>

              <p className="lg:text-[20px] mt-2 mb-5 text-gray-500">
                {tasks[selectedTaskIndex]?.details}
              </p>
              {tasks[selectedTaskIndex]?.subTask?.length !== 0 && (
                <>
                  <h4 className="text-lg lg:text-xl capitalize font-bold graish">
                    Sub Tasks
                  </h4>
                  <ul className="pl-2">
                    {tasks[selectedTaskIndex]?.subTask?.map((t, i) => (
                      <li className="lg:text-[19px] text-gray-500" key={i}>
                        <span className="font-bold pr-2">{i + 1}.</span>
                        {t?.todo}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="lg:text-[20px]"></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
TaskTable.propTypes = {
  theme: PropTypes.string.isRequired,
  setSelectedTasks: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};

// {selectedTaskIndex !== null && (
//   <Transition.Root show={isOpen} as={Fragment}>
//     <Dialog as="div" className="relative z-10" onClose={closePopup}>
//       <Transition.Child
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 bg-black/25" />
//       </Transition.Child>
//
//       <div className="fixed inset-0 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4 text-center">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all lg:w-[600px] 3xl:w-[800px] cursor-pointer">
//               <div className="py-7">
//                 <h2 className="text-xl lg:text-2xl font-bold mb-4 cursor-pointer">
//                   Task {String.fromCharCode(65 + selectedTaskIndex)}{" "}
//                 </h2>
//                 <h4 className="text-lg lg:text-xl graish capitalize font-bold ">
//                   {tasks[selectedTaskIndex]?.title} [ Coin: Free ]
//                 </h4>
//
//                 <p className="lg:text-[20px] mt-2 mb-5 text-gray-500">
//                   {tasks[selectedTaskIndex]?.details}
//                 </p>
//                 {
//                     tasks[selectedTaskIndex]?.subTask?.length !== 0 &&
//                     <>
//                     <h4 className="text-lg lg:text-xl capitalize font-bold graish">
//                       Sub Tasks
//                     </h4>
//                     <ul className="pl-2">
//                       {tasks[selectedTaskIndex]?.subTask?.map(
//                         (t, i) => (
//                           <li className="lg:text-[19px] text-gray-500" key={i}><span className="font-bold pr-2">{i+1}.</span>{t?.todo}</li>
//                         )
//                       )}
//                     </ul>
//                   </>
//                 }
//                 <p className="lg:text-[20px]"></p>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </div>
//     </Dialog>
//   </Transition.Root>
// )}
