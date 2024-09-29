import { useContext, useState } from "react";
import filter from "../../../assets/filter.png";
import { AuthContext } from "../../../Context/UserContext";
import GeneralSentFundProposal from "./GeneralSentFundProposal";
import GeneralRecieveFundProposal from "./GeneralRecieveFundProposal";
import Swal from "sweetalert2";
import { useDeleteFundRequestMutation } from "../../../features/fund/fundApi";
const GeneralFundProposal = () => {
  const { getFundByRequestedBy, getFundByRequestedTo } =
    useContext(AuthContext);
  const [deleteFundRequest] = useDeleteFundRequestMutation();

  const allSentFundRequest = getFundByRequestedBy?.data;
  const allRecieveFundRequest = getFundByRequestedTo?.data;

  const [showFilterOption, setShowFilterOption] = useState(false);
  const [isOpenSentRequest, setIsOpenSentRequest] = useState(true);
  const [isOpenRecieveRequest, setIsOpenRecieveRequest] = useState(false);

  const toggleSentRequest = () => {
    setIsOpenSentRequest(true);
    setIsOpenRecieveRequest(false);
    setShowFilterOption(false);
  };

  const toggleRecieveRequest = () => {
    setIsOpenSentRequest(false);
    setIsOpenRecieveRequest(true);
    setShowFilterOption(false);
  };
  //------- delete fund request

  const handleDeleteFundRequest = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete it ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFundRequest(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "Your request has been deleted.",
              "success"
            );
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2500);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an issue to cancelled request.",
              "error"
            );
          });
      }
    });
  };
  
  return (
    <div className="relative gray600 space-y-6 w-11/12 md:w-full pb-6">
      <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
        {isOpenSentRequest ? "SENT" : "RECIEVED"} FUND PROPOSAL
      </h1>
      <button
        onClick={() => setShowFilterOption(!showFilterOption)}
        className={`flex justify-center  items-center space-x-1 w-16 my-3 md:px-3 py-1 lg:px-4 md:py-2 text-[14px] md:text-[16px]  font-semibold shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] h-8 rounded-[10px]`}
      >
        <img src={filter} />
        <span className="hidden">Filter</span>
      </button>
      {/* filt */}
      {showFilterOption && (
        <ul className="w-40 absolute top-20 left-1  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
          <li
            onClick={toggleSentRequest}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Sent Request
          </li>
          <li
            onClick={toggleRecieveRequest}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Recieve Request
          </li>
        </ul>
      )}
      {isOpenSentRequest && (
        <GeneralSentFundProposal
          allSentFundRequest={allSentFundRequest}
          handleDeleteFundRequest={handleDeleteFundRequest}
        />
      )}
      {isOpenRecieveRequest && (
        <GeneralRecieveFundProposal
          allRecieveFundRequest={allRecieveFundRequest}
          handleDeleteFundRequest={handleDeleteFundRequest}
        />
      )}
    </div>
  );
};

export default GeneralFundProposal;
