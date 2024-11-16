// import { useContext, useState } from "react";
// import filter from "../../../assets/filter.png";
// import { AuthContext } from "../../../Context/UserContext";
// import GeneralSentFundProposal from "./Stripe/GeneralSentFundProposal";
// import GeneralRecieveFundProposal from "./Stripe/GeneralStripeStripeRecieveFundProposal";
// import Swal from "sweetalert2";
// import { useDeleteFundRequestMutation } from "../../../features/fund/fundApi";
// import GeneralPayoneerSentFundProposal from "../Payoneer/GeneralPayoneerSentFundProposal";
// import GeneralPaypalRecieveFundProposal from "./GeneralPaypalRecieveFundProposal";
// import GeneralPaypalSentFundProposal from "./GeneralSentPaypalFundProposal";

// const GeneralPaypalFundProposal = () => {
//   // const { getFundByRequestedBy, getFundByRequestedTo } =
//   //   useContext(AuthContext);
//   // const [deleteFundRequest] = useDeleteFundRequestMutation();

//   // const allSentFundRequest = getFundByRequestedBy?.data;
//   // const allRecieveFundRequest = getFundByRequestedTo?.data;

//   const [showPaymentOption, setShowPaymentOption] = useState(false);
//   // const [showFilterOption, setShowFilterOption] = useState(false);



//   const [isOpenPaypalSentRequest, setIsOpenPaypalSentRequest] = useState(true);
//   const [isOpenPaypalRecieveRequest, setIsOpenPaypalRecieveRequest] = useState(false);


//   const toggleSentPaypal = () => {
//     setIsOpenPaypalSentRequest(true);
//     setIsOpenPaypalRecieveRequest(false);
//     setShowPaymentOption(false);
//   };
//   const toggleRecievePaypal = () => {
//     setIsOpenPaypalSentRequest(true);
//     setIsOpenPaypalRecieveRequest(false);
//     setShowPaymentOption(false);
//   };


//   return (
//     <div className="relative gray600 space-y-6 w-11/12 md:w-full pb-6">
//       <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
//         {isOpenPaypalSentRequest ? "SENT" : "RECIEVED"} FUND PROPOSAL
//       </h1>
      

//       {/* filt */}
//       {showPaymentOption && (
//         <ul className="w-40 absolute top-20 left-1  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
//           <li
//             onClick={toggleSentPaypal}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             Sent Request
//           </li>
//           <li
//             onClick={toggleRecievePaypal}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             Recieve Request
//           </li>
//         </ul>
//       )}
//       {isOpenPaypalSentRequest && (
//         <GeneralPaypalSentFundProposal
//         />
//       )}
//       {isOpenPaypalRecieveRequest && (
//         <GeneralPaypalRecieveFundProposal
//         />
//       )}
//     </div>
//   );
// };

// export default GeneralPaypalFundProposal;




const GeneralPaypalFundProposal = () => {
  return (
    <div>
      f
    </div>
  );
};

export default GeneralPaypalFundProposal;