import { Link } from "react-router-dom";
import dash from "../../../assets/project1.png";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import GeneralAddProject from "./GeneralAddProject";
import { FaPen } from "react-icons/fa";

const AddProject = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const lists = [
    {
      _id: 1,
      title: "Create a New Project",
      paragraph:
        "Create, assign, and track tasks with ease to ensure timely project completion.",
      image: dash,
      route: `/dashboard/create-project`,
    },
  ];

  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1200"
      className="pt-5 flex flex-col-reverse md:flex-row justify-between   lg:space-x-6 items-start md:items-center lg:py-10 gray500 mr-4"
    >
      {/* left */}
      <div className="w-full md:w-6/12 lg:w-6/12">
        <div className="md:flex hidden items-center space-x-4">
          <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#fff] rounded-md shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-8 h-[32px]">
            <FaPen className="text-xl" />
          </div>
          <h1 className="text-3xl font-semibold">Create</h1>
        </div>
        {/* list */}
        <div className="py-3 xl:py-5 space-y-4 lg:space-y-6">
          {lists.map((list) => (
            <div
              type="button"
              onClick={openModal}
              key={list?._id}
              className="flex items-center justify-between px-1 cursor-pointer md:h-[160px] lg:h-[150px] xl:h-[160px]  bg-[#e6f3f3] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)"
            >
              {/* left */}
              <div className="flex  items-center space-x-4">
                <div className="p-2 lg:p-3">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <div className="flex items-center justify-center cursor-pointer [border:none] p-0  w-12 h-[42px]">
                      <img
                        className=" h-8 object-cover"
                        alt=""
                        src={list?.image}
                      />
                    </div>
                    <h1 className="text-lg lg:text-2xl font-semibold">
                      {list?.title}
                    </h1>
                  </div>
                  <p className="pt-2 text-start">{list?.paragraph}</p>
                </div>
              </div>
              {/* right */}
              <div className="lg:flex hidden items-center justify-center cursor-pointer w-14 h-[42px]">
                <Link to={list?.route}>
                  {/* <img className=" h-8 object-cover" alt="" src={arrow} /> */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* right */}
      <div className="flex justify-center items-center w-full md:w-6/12 lg:w-6/12 mb-2 md:pt-0">
        <img
          src="/pp.png"
          alt=""
          className="w-[300px] md:w-[300px] lg:w-[500px] xl:w-[700px] 3xl:w-[700px] rounded-xl pl-3"
        />
      </div>

      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
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
                    <GeneralAddProject closeModal={closeModal} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default AddProject;
