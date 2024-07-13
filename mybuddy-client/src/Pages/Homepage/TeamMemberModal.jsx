import  { useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Context/UserContext";

const TeamMemberModal = ({ isTeamOpen, closeTeamModal, updatedTeamMembers }) => {
  const theme = useSelector((state) => state.theme.theme);
  const { getAcceptedFriendRequest } = useContext(AuthContext);
  const currentFriend = getAcceptedFriendRequest?.data;

  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedMembers((prevSelectedMembers) => {
      const newSelectedMembers = prevSelectedMembers.includes(id)
        ? prevSelectedMembers.filter((memberId) => memberId !== id)
        : [...prevSelectedMembers, id];

      const updatedMembers = newSelectedMembers.map(memberId => ({ member: memberId }));
      updatedTeamMembers(updatedMembers);
      return newSelectedMembers;
    });
  };

  console.log(selectedMembers);



  const bgColors = [
    "#fff3c4", "#e0ebf6", "#d0cddd", "#d0eafd", 
    "#d0cddd", "#e0ffd2", "#fddac2", "#b0d3e8"
  ];

  return (
    <Transition appear show={isTeamOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeTeamModal}>
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
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="px-[3px] rounded-m bg-white">
                  <div className="w-full py-5">
                    <div className="flex flex-col justify-center items-center">
                    { currentFriend?.length !== 0 &&
                      <p className="text-xl font-semibold mb-3">
                        Selected Team Members
                      </p>
}
                      { currentFriend?.length === 0 &&
                        <div className="text-sm md:text-[16px] text-start pt-5 py-1 px-3 rounded-md font-semibold capitalize">
                        {`You don't have any friends to add.`}
                      </div>
                      }
                      <div className="w-full px-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 pt-3">
                          {currentFriend?.map((item, index) => (
                            <div
                              key={item?.requestedBy?._id}
                              style={{ backgroundColor: bgColors[index % bgColors.length] }}
                              className="flex items-center px-3 py-2 rounded-lg shadow-lg"
                            >
                              <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(item?.requestedBy?._id)}
                                checked={selectedMembers.includes(item?.requestedBy?._id)}
                              />
                              <img
                                src={item?.requestedBy?.profilePic || "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"}
                                loading="lazy" alt={item?.requestedBy?.name?.firstName}
                                className="h-9 w-9 rounded-lg ml-2"
                              />
                              <div className="text-sm md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
                                {item?.requestedBy?.name?.firstName}    {item?.requestedBy?.name?.lastName}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeTeamModal}
                  >
                        { currentFriend?.length === 0 ?   "Go Back!" : "Save!" }
                    
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TeamMemberModal;