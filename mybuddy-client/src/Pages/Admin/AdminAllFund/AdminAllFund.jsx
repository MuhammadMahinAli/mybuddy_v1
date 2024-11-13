import { useState } from "react";
import rightMark from "../../../assets/checkmark.png";
import xMark from "../../../assets/xmark.png";
import filter from "../../../assets/filter.png";
import PaypalFund from "./PaypalFund";
import PayoneerFund from "./PayoneerFund";
import BankFund from "./BankFund";
import StripeFund from "./StripeFund";

const AdminAllFund = () => {
  const [showFilterOption, setShowFilterOption] = useState(false);
  const [openPaypal, setOpenPaypal] = useState(true);
  const [openPayoneer, setOpenPayoneer] = useState(false);
  const [openBankTransfer, setOpenBankTransfer] = useState(false);
  const [openStripe, setOpenStripe] = useState(false);

  const togglePaypal = () => {
    setOpenPaypal(true);
    setOpenPayoneer(false);
    setOpenBankTransfer(false);
    setOpenStripe(false);
    setShowFilterOption(false);
  };
  const togglePayoneer = () => {
    setOpenPaypal(false);
    setOpenPayoneer(true);
    setOpenBankTransfer(false);
    setOpenStripe(false);
    setShowFilterOption(false);
  };
  const toggleBankTransfer = () => {
    setOpenPaypal(false);
    setOpenPayoneer(false);
    setOpenBankTransfer(true);
    setOpenStripe(false);
    setShowFilterOption(false);
  };
  const toggleStripe = () => {
    setOpenPaypal(false);
    setOpenPayoneer(false);
    setOpenBankTransfer(false);
    setOpenStripe(true);
    setShowFilterOption(false);
  };

  // console.log("data", getAllPayoneerFundInfo?.data);
  return (
    <>
      <h1 className=" text-[20px] lg:text-[28px] py-4 font-bold uppercase">
        Fund Requests
      </h1>
      <div className="relative">
        <button
          onClick={() => setShowFilterOption(!showFilterOption)}
          className={`flex justify-center  items-center space-x-1 w-16 my-3 md:px-3 py-1 lg:px-4 md:py-2 text-[14px] md:text-[16px]  font-semibold shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] h-8 rounded-[10px]`}
        >
          <img src={filter} />
          <span className="hidden">Filter</span>
        </button>
        {showFilterOption && (
          <ul className="w-40 absolute top-8 left-0 float-right  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
            <li
              onClick={togglePaypal}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Paypal
            </li>
            <li
              onClick={togglePayoneer}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Payoneer
            </li>
            <li
              onClick={toggleBankTransfer}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Bank Transfer
            </li>
            <li
              onClick={toggleStripe}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Stripe
            </li>
          </ul>
        )}
      </div>
      {openPaypal && <PaypalFund rightMark={rightMark} xMark={xMark} />}
      {openPayoneer && <PayoneerFund rightMark={rightMark} xMark={xMark} />}
      {openBankTransfer && <BankFund rightMark={rightMark} xMark={xMark} />}
      {openStripe && <StripeFund />}
    </>
  );
};

export default AdminAllFund;
