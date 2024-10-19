import { useState } from "react";
import CreatorTab from "./CreatorTab";
import MeetingMemberTab from "./MeetingMemberTab";
import filter from "../../../assets/filter.png";

const GeneralMeetingSchedule = () => {
  const [showFilterOption, setShowFilterOption] = useState(false);
  const [isOpenCreatorTab, setIsOpenCreatorTab] = useState(true);
  const [isOpenMeetingMember, setIsOpenMeetingMember] = useState(false);

  const toggleCreatorTab = () => {
    setIsOpenCreatorTab(true);
    setIsOpenMeetingMember(false);
    setShowFilterOption(false);
  };
  const toggleMeetingMember = () => {
    setIsOpenCreatorTab(false);
    setIsOpenMeetingMember(true);
    setShowFilterOption(false);
  };

  return (
    <div className="relative">
      <div className="flex space-x-2 lg:space-x-3 items-center w-6/12 md:w-5/12 xl:w-5/12 2xl:w-5/12 3xl:w-5/12 md:px-4">
        <button
          onClick={() => setShowFilterOption(!showFilterOption)}
          className={`flex justify-center  items-center space-x-1 w-16 my-3 md:px-3 py-1 lg:px-4 md:py-2 text-[14px] md:text-[16px]  font-semibold shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] h-8 rounded-[10px]`}
        >
          <img src={filter} />
          <span className="hidden">Filter</span>
        </button>
        {/* filter option */}
        {showFilterOption && (
          <ul className="w-40 absolute top-12 left-2 float-right  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
            <li
              onClick={toggleCreatorTab}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              My Meeitng
            </li>
            <li
              onClick={toggleMeetingMember}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Member Meeting
            </li>
          </ul>
        )}
      </div>
      {isOpenCreatorTab && <CreatorTab />}
      {isOpenMeetingMember && <MeetingMemberTab  />}
    </div>
  );
};

export default GeneralMeetingSchedule;
