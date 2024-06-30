import { useState } from "react";
import Calendar from "react-calendar";

const SmallCalender = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div
      style={{ zIndex: 1000 }}
      className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 bg-[#9ec9e2] shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] rounded-[30px] p-5"
    >
      <Calendar onChange={onChange} value={value} className="react-calender" />
      <div>
        <div className="flex flex-col space-y-2 md:space-y-4">
          <button className="text-[14px] lg:text-[18px] px-4 py-1 font-normal gray500 rounded-[10px]  bg-[#dde1e6] shadow-[-2px_-1px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset]">
            Last 7 days
          </button>
          <button className="text-[14px] lg:text-[18px] px-4 py-1 font-normal gray500 rounded-[10px] bg-[#dde1e6] shadow-[-2px_-1px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset]">
            Last 14 days
          </button>
          <button className="text-[14px] lg:text-[18px] px-4 py-1 font-normal gray500 rounded-[10px] bg-[#dde1e6] shadow-[-2px_-1px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset]">
            Last 30 days
          </button>
          <button className="text-[14px] lg:text-[18px] text-white px-4 py-2 font-normal  rounded-[10px] bg-blue-600 shadow-[-2px_-1px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)_inset]">
            Custome Range
          </button>
          <div className="flex justify-between md:space-x-4">
            {/* left */}
            <div>
              <p className="text-[13px] lg:text-sm font-medium">From</p>
              <button className="text-[11px] lg:text-sm font-semibold py-1 px-3 rounded-[10px] border-[3px] border-[#7fa0fa]">
                09-01-2023
              </button>
            </div>
            {/* left */}
            <div>
              <p className="text-[13px] lg:text-sm font-medium">To</p>
              <button className="text-[11px] lg:text-sm font-semibold py-1 px-3 rounded-[10px] border-[3px] border-[#ff59ad]">
                09-01-2023
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCalender;