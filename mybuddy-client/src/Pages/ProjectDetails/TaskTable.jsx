/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import man from "../../assets/dummy.png";
import man1 from "../../assets/people1.png";
import "../GeneralDashboard/GeneralAddProject/editor.css";
import { Dialog, Transition } from "@headlessui/react";

const TaskTable = ({ tasks,setSelectedTasks }) => {
  const [checkedStates, setCheckedStates] = useState(tasks?.map(() => false));


  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    if (isChecked) {
      setSelectedTasks((prevSelectedTasks) => [...prevSelectedTasks, selectedTask]);
    } else {
      setSelectedTasks((prevSelectedTasks) =>
        prevSelectedTasks.filter((task) => task !== selectedTask)
      );
    }
  };




  return (
    <div className="md:-my-3 xl:m-0 py-5">
      <div>
        {/* First Column */}
        <form className="w-full md:hidden">
          {tasks?.map((task, index) => (
            <div key={index} className="space-y-3 xl:space-y-3 px-5  ">
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

                <img className="h-11 xl:h-16" src={man1} />
                <img className="h-10 xl:h-12" src={man} />
                <div
                  onClick={() => handleTaskButtonClick(index)}
                  className="rounded-lg bg-gradient-to-r from-[#35eed8] from-10% via-[#4164f0] via-30% to-[#DD7BFF] to-90% h-10 w-20 md:h-10 3xl:h-12 lg:w-28"
                >
                  <p className="m-[2px] pt-2 xl:pt-1 3xl:pt-2 gray500 rounded-md md:rounded-lg bg-[#e3f1fb] px-2 md:px-3 text-[14px] xl:text-[18px] font-semibold text-center h-[36px] xl:h-[35px] 2xl:h-[45px]">
                    Task {String.fromCharCode(65 + index)}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
           
        </form>
      </div>
      {/* from tab */}
      <div className="hidden md:flex flex-col md:flex-row justify-between items-start py-1 space-y-3 md:space-y-0">
        {/* First Column */}
        <div className="w-full md:w-5/12 lg:w-4/12">
          {tasks?.map(
            (task, index) =>
              index % 2 === 0 && (
                <div key={index} className="space-y-3 xl:space-y-3 px-5  ">
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

                    <img className="h-11 xl:h-16" src={man1} />
                    <img className="h-10 xl:h-12" src={man} />
                    <div
                      onClick={() => handleTaskButtonClick(index)}
                      className="rounded-lg bg-gradient-to-r from-[#35eed8] from-10% via-[#4164f0] via-30% to-[#DD7BFF] to-90% h-10 w-20 md:h-10 3xl:h-12 lg:w-28"
                    >
                      <p className="m-[2px] pt-2 xl:pt-1 3xl:pt-2 gray500 rounded-md md:rounded-lg bg-[#e3f1fb] px-2 md:px-3 text-[14px] xl:text-[18px] font-semibold text-center h-[36px] xl:h-[35px] 2xl:h-[45px]">
                        Task {String.fromCharCode(65 + index)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        {/* second Column */}
        <div className="w-full md:w-5/12 lg:w-4/12">
          {tasks?.map(
            (task, index) =>
              index % 2 !== 0 && (
                <div key={index} className="space-y-3 xl:space-y-3 px-5  ">
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

                    <img className="h-11 xl:h-16" src={man1} />
                    <img className="h-10 xl:h-12" src={man} />
                    <div
                      onClick={() => handleTaskButtonClick(index)}
                      className="rounded-lg bg-gradient-to-r from-[#35eed8] from-10% via-[#4164f0] via-30% to-[#DD7BFF] to-90% h-10 w-20 md:h-10 3xl:h-12 lg:w-28"
                    >
                      <p className="m-[2px] pt-2 xl:pt-1 3xl:pt-2 gray500 rounded-md md:rounded-lg bg-[#e3f1fb] px-2 md:px-3 text-[14px] xl:text-[18px] font-semibold text-center h-[36px] xl:h-[35px] 2xl:h-[45px]">
                        Task {String.fromCharCode(65 + index)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        {/* Popup Modal */}
        {selectedTaskIndex !== null && (
          <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide mx-5 lg:mx-20 3xl:mx-40"
              onClose={closePopup}
            >
              <div className="flex items-center justify-center min-h-screen scrollbar-hide">
                <Dialog.Overlay className="fixed inset-0 bg-black/30 opacity-30 scrollbar-hide" />

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="bg-white rounded-xl p-4 lg:p-6 w-11/12 md:w-full  scrollbar-hide">
                    <button
                      type="button"
                      className="float-right mb-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closePopup}
                    >
                      Close
                    </button>
                    <div className="pt-9">
                      <h2 className="text-xl lg:text-2xl font-bold mb-4">
                        Task {String.fromCharCode(65 + selectedTaskIndex)}{" "}
                      </h2>
                      <h4 className="text-lg lg:text-xl font-bold mb-4">
                        {tasks[selectedTaskIndex]?.title} [ Budget ${tasks[selectedTaskIndex]?.budget} ]
                      </h4>

                      <p className="lg:text-[20px]">
                        {tasks[selectedTaskIndex]?.details}
                      </p>
                      <p className="lg:text-[20px]">
                        
                      </p>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </div>
    </div>
  );
};

export default TaskTable;
//<div className="flex justify-center items-center rounded-[13px] px-3 py-2 lg:px-4 md:py-3 [background:linear-gradient(125.26deg,_rgba(217,_217,_217,_0.66),_rgba(239,_239,_239,_0.66)_55.46%,_rgba(252,_252,_252,_0.66))] shadow-[3px_3px_5px_rgba(255,_255,_255,_0.25),_3px_3px_8px_rgba(159,_159,_159,_0.3),_3px_3px_6px_rgba(163,_177,_198,_0.3)_inset,_3px_3px_8px_-2px_rgba(185,_187,_191,_0.6)_inset] hover:shadow-[3px_3px_5px_rgba(255,_255,_255,_0.25),_3px_3px_8px_rgba(159,_159,_159,_0.3),_3px_3px_6px_rgba(163,_177,_198,_0.3)inset,_3px_3px_8px_-2px_rgba(185,_187,_191,_0.6)] cursor-pointer">
//                      <p className="text-sm lg:text-lg font-semibold gray500">
//                        Apply now
//                      </p>
//                    </div>
//
