// import { useContext, useState } from "react";
// import filter from "../../../../assets/filter.png";
// import { AuthContext } from "../../../Context/UserContext";
// import GeneralSentFundProposal from "./Stripe/GeneralSentFundProposal";
// import GeneralRecieveFundProposal from "./Stripe/GeneralStripeStripeRecieveFundProposal";
// import Swal from "sweetalert2";
// import { useDeleteFundRequestMutation } from "../../../features/fund/fundApi";
// const GeneralPayoneerFundProposal = () => {
//   const { getFundByRequestedBy, getFundByRequestedTo } =
//     useContext(AuthContext);
//   const [deleteFundRequest] = useDeleteFundRequestMutation();

//   const allSentFundRequest = getFundByRequestedBy?.data;
//   const allRecieveFundRequest = getFundByRequestedTo?.data;

//   const [showPaymentOption, setShowPaymentOption] = useState(false);
//   const [showFilterOption, setShowFilterOption] = useState(false);

//   const [isOpenPaypal, setIsOpenPaypal] = useState(false);
//   const [isOpenPayoneer, setIsOpenPayoneer] = useState(false);
//   const [isOpenStripe, setIsOpenStripe] = useState(false);
//   const [isOpenBank, setIsOpenBank] = useState(false);


  

//   const togglePaypal = () => {
//     setIsOpenPaypal(true);
//     setIsOpenPayoneer(false);
//     setIsOpenStripe(false);
//     setIsOpenBank(false);
//     setShowFilterOption(false);
//   };
//   const togglePayoneer = () => {
//      setIsOpenPaypal(false);
//     setIsOpenPayoneer(true);
//     setIsOpenStripe(false);
//     setIsOpenBank(false);
//     setShowFilterOption(false);
//   };
//   const toggleStripe = () => {
//      setIsOpenPaypal(false);
//     setIsOpenPayoneer(false);
//     setIsOpenStripe(true);
//     setIsOpenBank(false);
//     setShowFilterOption(false);
//   };

//   const toggleBank = () => {
//     setIsOpenPaypal(false);
//     setIsOpenPayoneer(false);
//     setIsOpenStripe(false);
//     setIsOpenBank(true);
//     setShowFilterOption(false);
//   };
//   //------- delete fund request

//   const handleDeleteFundRequest = (id) => {
//     console.log(id);
//     Swal.fire({
//       title: "Are you sure to delete it ?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteFundRequest(id)
//           .unwrap()
//           .then(() => {
//             Swal.fire(
//               "Well done!",
//               "Your request has been deleted.",
//               "success"
//             );
//             // setTimeout(() => {
//             //   window.location.reload();
//             // }, 2500);
//           })
//           .catch((error) => {
//             console.log(error);
//             Swal.fire(
//               "Error!",
//               "There was an issue to cancelled request.",
//               "error"
//             );
//           });
//       }
//     });
//   };

//   return (
//     <div className="relative gray600 space-y-6 w-11/12 md:w-full pb-6">
//       <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
//         {isOpenSentRequest ? "SENT" : "RECIEVED"} FUND PROPOSAL
//       </h1>
//       <div className="flex items-center space-x-3 focus:none ">
//         <select className="h-8 bg-transparent focus:none outline-none shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]  rounded-[10px]">
//           <option className="pl-4" value="paypal">
//             PayPal
//           </option>
//           <option className="pl-4">Payoneer</option>
//           <option className="pl-4">
//             <p>Stripe</p>
//           </option>
//           <option className="pl-4">
//             <p>Bank Transfer</p>
//           </option>
//         </select>

//         {/* <div className="bg-white w-36 pl-4 py-4">
//           <ul className="space-y-3">
//             <li className="flex items-center space-x-2">
//               <img
//                 src="https://i.ibb.co.com/NYDfhjQ/paypal-1.png"
//                 className="h-8 w-8"
//               />
//               <p className="font-semibold text-lg">lorem</p>
//             </li>
//             <li className="flex items-center space-x-2">
//               <img
//                 src="https://i.ibb.co.com/qR4yw1g/payoneer-logo1.png"
//                 className="h-8 w-8"
//               />
//               <p className="font-semibold text-lg">lorem</p>
//             </li>
//             <li className="flex items-center space-x-2">
//               <img
//                 src="https://i.ibb.co.com/rstQvKT/stripe.png"
//                 className="h-8 w-8"
//               />
//               <p className="font-semibold text-lg">lorem</p>
//             </li>
//             <li className="flex items-center space-x-2">
//               <img
//                 src="https://i.ibb.co.com/zJ3bWNk/bank.png"
//                 className="h-8 w-8"
//               />
//               <p className="font-semibold text-lg">lorem</p>
//             </li>
//           </ul>
//         </div> */}
//         <button
//           onClick={() => setShowFilterOption(!showFilterOption)}
//           className={`flex justify-center  items-center space-x-1 w-16 my-3 md:px-3 py-1 lg:px-4 md:py-2 text-[14px] md:text-[16px]  font-semibold shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] h-8 rounded-[10px]`}
//         >
//           <img src={filter} />
//           <span className="hidden">Filter</span>
//         </button>
//       </div>

//       {/* filt */}
//       {showFilterOption && (
//         <ul className="w-40 absolute top-20 left-1  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
//           <li
//             onClick={toggleSentRequest}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             Sent Request
//           </li>
//           <li
//             onClick={toggleRecieveRequest}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             Recieve Request
//           </li>
//         </ul>
//       )}
//       {isOpenSentRequest && (
//         <GeneralSentFundProposal
//           allSentFundRequest={allSentFundRequest}
//           handleDeleteFundRequest={handleDeleteFundRequest}
//         />
//       )}
//       {isOpenRecieveRequest && (
//         <GeneralRecieveFundProposal
//           allRecieveFundRequest={allRecieveFundRequest}
//           handleDeleteFundRequest={handleDeleteFundRequest}
//         />
//       )}
//     </div>
//   );
// };

// export default GeneralPayoneerFundProposal;



const GeneralPayoneerFundProposal = () => {
  return (
    <div>
      z
    </div>
  );
};

export default GeneralPayoneerFundProposal;