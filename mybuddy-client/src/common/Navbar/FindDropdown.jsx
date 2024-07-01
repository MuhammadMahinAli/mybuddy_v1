import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const FindDropdown = ({ theme }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      className="z-50"
    >
      <Menu.Items
        className={`${
          theme === "light" ? "bg-white" : "bg-[#63666a]"
        } absolute right-0 mt-4 w-44  origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none`}
      >
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <Link to="/find/researcher">
                <button
                  className={`${
                    active
                      ? theme === "light"
                        ? "bg-[#2adba4] text-white"
                        : "bg-[#333333] text-white"
                      : ""
                  } group flex w-full items-center rounded-md px-2 py-2 text-[16px] `}
                >
                  Find Researcher
                </button>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link to="/find/project">
                <button
                  className={`${
                    active
                      ? theme === "light"
                        ? "bg-[#2adba4] text-white"
                        : "bg-[#333333] text-white"
                      : ""
                  } group flex w-full items-center rounded-md px-2 py-2 text-[16px] `}
                >
                  Find Project
                </button>
              </Link>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default FindDropdown;