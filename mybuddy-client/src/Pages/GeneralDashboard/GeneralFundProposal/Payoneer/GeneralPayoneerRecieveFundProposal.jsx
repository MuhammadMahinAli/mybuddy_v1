// /* eslint-disable react/prop-types */

// import xMark from '../../../../assets/xmark.png';

// const GeneralPayoneerRecieveFundProposal = ({allRecieveFundRequest,handleDeleteFundRequest}) => {

//     return (
//         <div>
//           {allRecieveFundRequest?.length === 0 ? (
//         <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not sent any fund proposal yet.`}</p>
//       ) : (
//         <>
//           <div className="w-full py-4 bg-[#e9f2f9] flex my-5 items-center  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
//             <div className="text-[16px] md:text-[21px] font-semibold  border-r-2 border-white text-center w-4/12 md:w-3/12 lg:w-3/12">
//               To
//             </div>
//             <div className="text-[21px] hidden md:block font-semibold  border-r-2 border-white text-center md:w-2/12 lg:w-2/12">
//               Project
//             </div>
//             <div className="text-[21px] hidden lg:block font-semibold  border-r-2 border-white text-center md:w-2/12 lg:w-4/12">
//               Details
//             </div>
//             <div className="text-[21px] hidden md:block font-semibold  border-r-2 border-white text-center md:w-2/12 lg:w-2/12">
//               Amount
//             </div>
//             <div className="text-[16px] md:text-[21px]  font-semibold  border-r-2 border-white text-center w-4/12 md:w-2/12 lg:w-2/12">
//               Status
//             </div>

//             <div className="text-[16px] md:text-[21px]  text-start e w-4/12 md:w-2/12 lg:w-2/12">
//               <p className="font-semibold text-center">Action</p>
//             </div>
//           </div>
//           {allRecieveFundRequest?.map((fundRqst, index) => (
//             <div
//               key={index}
//               className="w-full py-4 bg-[#e9f2f9] flex my-5 items-center  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
//             >
//               <div className="flex flex-col md:flex-row justify-start items-center pl-3 space-x-2 text-[16px] md:text-lg   border-r-2 border-white text-center w-4/12 md:w-3/12 lg:w-3/12">
//                 <img
//                   src="https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//                   className="w-8 h-8 md:w-10 md:h-10 rounded-full"
//                   loading="lazy"
//                   alt=""
//                 />
//                 <p className="capitalize">
//                   {fundRqst?.requestedBy?.name?.firstName}{" "}
//                   {fundRqst?.requestedBy?.name?.lastName}
//                 </p>
//               </div>
//               <div className="text-[16px] md:text-[18px] hidden md:block capitalize  border-r-2 border-white text-center md:w-2/12 lg:w-2/12">
//                 {fundRqst?.projectId?.projectName}
//               </div>

//               <div className="px-3 text-lg hidden lg:block  border-r-2 border-white text-start md:w-2/12 lg:w-4/12">
//                 <div
//                   className="capitalize"
//                   dangerouslySetInnerHTML={{
//                     __html: fundRqst?.projectId?.description.slice(0, 40),
//                   }}
//                 />
//               </div>
//               <div className="text-lg hidden md:block  border-r-2 border-white text-center md:w-2/12 lg:w-2/12">
//                 $ {fundRqst?.amount}
//               </div>
//               <div className="text-[16px] md:text-lg   border-r-2 border-white text-center w-4/12 md:w-2/12 lg:w-2/12">
//                 {fundRqst?.status}
//               </div>

//               <div onClick={()=>handleDeleteFundRequest(fundRqst?._id)}  className="flex justify-center space-x-3 items-center text-[16px] md:text-lg  text-start e w-4/12 md:w-2/12 lg:w-2/12">
//                 {/* <img src={rightMark} className="h-5 md:h-7" /> */}
//                 <img  src={xMark} className="h-5 md:h-7 cursor-pointer" />
//               </div>
//             </div>
//           ))}
//         </>
//       )}
            
//         </div>
//     );
// };

// export default GeneralPayoneerRecieveFundProposal;



const GeneralPayoneerRecieveFundProposal = () => {
  return (
    <div>
      GeneralPayoneerRecieveFundProposal
    </div>
  );
};

export default GeneralPayoneerRecieveFundProposal;