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
// {
//   "_id": "67e79a62f1306722d8965a92",
//   "projectName": "ai agent test",
//   "fundingProject": "67e52bfa5d7ff55aa3b266c3",
//   "requestedTo": "67626e1a5088216c5cd83408",
//   "requestedBy": {
//       "_id": "67e5324d5d7ff55aa3b2692c",
//       "email": "maahinnnn@gmail.com",
//       "name": {
//           "firstName": "Test",
//           "lastName": "Buddy",
//           "_id": "67e5324d5d7ff55aa3b2692d"
//       },
//       "uniqueId": "464687",
//       "phoneNumber": "3465345654",
//       "phoneNumberPrivacy": false,
//       "address": "",
//       "addressPrivacy": false,
//       "country": "",
//       "role": "",
//       "profilePic": "",
//       "coverPic": "",
//       "about": "",
//       "emailVerified": true,
//       "createdAt": "2025-03-27T11:11:09.348Z",
//       "updatedAt": "2025-03-27T11:12:57.176Z",
//       "__v": 0
//   },
//   "status": "Done",
//   "transactionId": "Ddd",
//   "paypalEmail": "dddddddd@gmail.com",
//   "amount": "588",
//   "date": "2025-03-31",
//   "createdAt": "2025-03-29T06:59:46.253Z",
//   "updatedAt": "2025-03-29T07:01:16.545Z",
//   "__v": 0
// }