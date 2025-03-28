/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import xMark from "../../../../assets/xmark.png";
import { AuthContext } from "../../../../Context/UserContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

const GeneralStripeSentFundProposal = () => {
  const { getFundByRequestedBy } = useContext(AuthContext);
  const [openDetails, setOpenDetails] = useState(false);
  const [fundRequest, setFundRequest] = useState(null);

  const handleOpenDetails = (fund) => {
    setFundRequest(fund);
    setOpenDetails(true);
  };

  const allSentFundRequest = getFundByRequestedBy?.data;
  return (
    <div>
      {allSentFundRequest?.length === 0 ? (
        <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not sent any fund proposal yet.`}</p>
      ) : (
        <div className="w-[300px] xs:w-[330px] ssm:w-[370px] sm:w-[570px] md:w-[630px] lg:w-full overflow-x-auto xl:overflow-hidden">
          <div className="min-w-[900px] md:min-w-[900px] 3xl:min-w-[1000px] py-4 bg-[#e9f2f9] flex my-5 items-center  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <div className="text-[16px] md:text-[21px] font-semibold  border-r-2 border-white text-center w-3/12 md:w-3/12 lg:w-3/12">
              To
            </div>
            <div className="text-[16px] md:text-[21px]   font-semibold  border-r-2 border-white text-center w-2/12 lg:w-2/12">
              Project
            </div>
            <div className="text-[16px] md:text-[21px]   font-semibold  border-r-2 border-white text-center w-2/12 lg:w-4/12">
              Details
            </div>
            <div className="text-[16px] md:text-[21px]   font-semibold  border-r-2 border-white text-center w-2/12 lg:w-2/12">
              Amount
            </div>
            <div className="text-[16px] md:text-[21px]  font-semibold  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-2/12">
              Status
            </div>
          </div>
          {allSentFundRequest?.map((fundRqst, index) => (
            <div
              key={index}
              className="min-w-[900px] md:min-w-[900px] 3xl:min-w-[1000px] py-4 bg-[#e9f2f9] flex my-5 items-center  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
            >
              <div className="flex justify-start items-center pl-3 space-x-2 text-[16px] md:text-lg   border-r-2 border-white text-center w-3/12 md:w-3/12 lg:w-3/12">
                <img
                  src="https://i.ibb.co.com/FKKD4mT/opp.png"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  loading="lazy"
                  alt=""
                />
                <p className="capitalize">
                  {fundRqst?.requestedTo?.name?.firstName}{" "}
                  {fundRqst?.requestedTo?.name?.lastName}
                </p>
              </div>
              <div className="capitalize text-[16px] md:text-[18px]    border-r-2 border-white text-center w-2/12 lg:w-2/12">
                {fundRqst?.projectId?.projectName}
              </div>

              <div
                onClick={() => handleOpenDetails(fundRqst)}
                className="cursor-pointer px-3 text-[16px] md:text-lg    border-r-2 border-white text-center w-2/12 lg:w-4/12"
              >
                View Details
              </div>
              <div className="text-[16px] md:text-lg    border-r-2 border-white text-center w-2/12 lg:w-2/12">
                $ {fundRqst?.amount}
              </div>
              <div className="text-[16px] md:text-lg   border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-2/12">
                {fundRqst?.status}
              </div>
            </div>
          ))}
        </div>
      )}
      <>
        {openDetails && (
          <div className="fixed top-0 left-0  flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll">
            <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[600px] 3xl:w-[800px] cursor-pointer">
              <IoIosCloseCircleOutline
                onClick={() => setOpenDetails(false)}
                className="text-xl float-right"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Fund Request Summary
              </h2>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Project{" "}
                </h3>
                <p className="text-gray-600 pl-4  capitalize">
                  <strong>Name :</strong> {fundRequest?.projectName}
                </p>
                {/* <p className="text-gray-600 pl-4">
                          <strong>ID:</strong> {fundRequest?.projectId}
                        </p> */}
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Requester
                </h3>
                <p className="text-gray-600 capitalize">
                  <span className="font-medium pl-4 capitalize">
                    <strong>Name:</strong>
                  </span>{" "}
                  {fundRequest?.requestedBy?.name?.firstName}{" "}
                  {fundRequest?.requestedBy?.name?.lastName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium pl-4 capitalize">
                    <strong>ID:</strong>
                  </span>{" "}
                  {fundRequest?.requestedBy?.uniqueId
                    ? fundRequest?.requestedBy?.uniqueId
                    : "Id"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recipient
                </h3>
                <p className="text-gray-600 capitalize">
                  <span className="font-medium pl-4 capitalize">
                    <strong>Name:</strong>
                  </span>{" "}
                  {fundRequest?.requestedTo?.name?.firstName}{" "}
                  {fundRequest?.requestedTo?.name?.lastName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium pl-4 capitalize">
                    <strong>ID:</strong>
                  </span>{" "}
                  {fundRequest?.requestedTo?.uniqueId
                    ? fundRequest?.requestedTo?.uniqueId
                    : "Id"}
                </p>
              </div>

              <div className="mb-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-700">
                  Request Details
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium pl-4 capitalize">
                    <strong>Amount:</strong>
                  </span>{" "}
                  ${fundRequest?.amount}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium pl-4 capitalize">
                    <strong>Payment Platform:</strong>
                  </span>{" "}
                  Stripe
                </p>

                <p className="text-gray-600">
                  <span className="font-medium pl-4 capitalize">
                    <strong>Status:</strong>
                  </span>{" "}
                  {fundRequest?.status}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium pl-4 capitalize">
                    <strong>Request Date:</strong>
                  </span>{" "}
                  {new Date(fundRequest?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default GeneralStripeSentFundProposal;

// const GeneralStripeSentFundProposal = () => {
//   return (
//     <div>
//       GeneralStripeSentFundProposal
//     </div>
//   );
// };

// export default GeneralStripeSentFundProposal;
