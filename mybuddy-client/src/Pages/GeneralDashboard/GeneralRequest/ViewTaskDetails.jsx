/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import  { Fragment } from "react";

const ViewTaskDetails = ({ isOpenModal, tasks, closeModal }) => {
  console.log("t1",tasks[0].details);
  console.log("t2",tasks[1]);
  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

        <div className="fixed inset-0 overflow-y-auto">
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
              <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-[#e0e5ec] p-6 text-left align-middle shadow-xl transition-all">
                <div>
                  <h2 className="text-xl font-bold mb-4">Task Details</h2>

                  {
                    tasks.map((t,i)=>(
                      <div className="space-x-2" key={t.title}>
                        <p className="text-lg font-semibold">Task No: {i+1}</p>
                        <p><span className="font-semibold">Title of task:</span> {t?.title}</p>
                        <p><span className="font-semibold py-1">About Task:</span>  {t?.details}</p>
                        <p className="pb-7"><span className="font-semibold">Budget:</span>  ${t?.budget}</p>
                      </div>
                    ))
                  }
                  {/* {tasks?.map((task, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-bold mb-2">
                        Request {index + 1} Tasks:
                      </h3>
                      {tasks?.map((singleTask, taskIndex) => (
                        <div key={taskIndex}>
                          <p>Title: {singleTask?.title}</p>
                          <p>Details: {singleTask?.details}</p>
                          <p>Budget: ${singleTask?.budget}</p>
                        </div>
                      ))} */}
                    {/* </div> */}
                  {/* ))} */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewTaskDetails;
