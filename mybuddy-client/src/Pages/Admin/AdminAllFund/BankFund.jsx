import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDeleteBankFundRequestMutation, useGetAllBankTransferFundInfoQuery, useUpdateBankFundStatusMutation } from "../../../features/banktransferfund/bankTransferFundApi";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";

const BankFund = () => {
  const [updateBankFundStatus] = useUpdateBankFundStatusMutation();
  const {
    data: getAllBankTransferFundInfo,
  } = useGetAllBankTransferFundInfoQuery();
  const bankTransferFunds = getAllBankTransferFundInfo?.data;
  const [selectedFundId, setSelectedFundId] = useState(null);
  const [deleteBankFundRequest] = useDeleteBankFundRequestMutation();
  const [fundStatuses, setFundStatuses] = useState({}); // Start with an empty object
  const [openDetails, setOpenDetails] = useState(false);
  const [fundRequest, setFundRequest] = useState(null); 

  const handleOpenDetails = (fund) => {
    setFundRequest(fund);
    setOpenDetails(true);
  };

  // Update fundStatuses once data is available
  useEffect(() => {
    if (getAllBankTransferFundInfo?.data) {
      const initialStatuses = getAllBankTransferFundInfo.data.reduce((acc, fund) => {
        acc[fund._id] = fund.status;
        return acc;
      }, {});
      setFundStatuses(initialStatuses);
    }
  }, [getAllBankTransferFundInfo]);

  const toggleDropdown = (fundId) => {
    setSelectedFundId(selectedFundId === fundId ? null : fundId);
  };

  const handleStatusChange = async (fund, status) => {
    const fundId = fund?._id;
    const selectedFund = bankTransferFunds?.find(
      (perFund) => perFund?._id === fundId
    );

    if (!selectedFund) {
      console.log("No fund found for the selected ID.");
      return;
    }

    // Define Swal options
    const swalOptions = {
      title: "Are you sure?",
      text: `Do you want to mark this fund as "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status}!`,
    };

    // Show confirmation dialog
    const result = await Swal.fire(swalOptions);
    if (result.isConfirmed) {
      try {
        // Define the data to be sent
        const postData = {
          status: status, // e.g., "Declined"
        };

        // Call the update function with selected fund ID and post data
        await updateBankFundStatus({
          id: fundId, // Ensure the correct ID is passed
          data: postData,
        }).unwrap();
        setSelectedFundId(null);
        setFundStatuses((prevStatuses) => ({
          ...prevStatuses,
          [fund._id]: status,
        }));

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `You have successfully updated the status to "${status}".`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Optionally, update the UI without reloading
        // For example, refetch the funds or update the local state
      } catch (error) {
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Failed to Update",
          text: "There was an error updating the status.",
        });
        console.error("Error updating status:", error);
      }
    }
  };

  // const handleDeleteFundRequest = (id) => {
  //   console.log(id);
  //   Swal.fire({
  //     title: "Are you sure to delete it ?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteBankFundRequest(id)
  //         .unwrap()
  //         .then(() => {
  //           Swal.fire(
  //             "Well done!",
  //             "This fund request has been deleted.",
  //             "success"
  //           );
  //           // setTimeout(() => {
  //           //   window.location.reload();
  //           // }, 2500);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           Swal.fire(
  //             "Error!",
  //             "There was an issue to cancelled fund request.",
  //             "error"
  //           );
  //         });
  //     }
  //   });
  // };

  return (
    <>
    {bankTransferFunds?.length === 0 ? (
      <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`No fund request available to show.`}</p>
    ) : (
    <div className="w-[300px] xs:w-[330px] ssm:w-[370px] sm:w-[570px] md:w-[630px] lg:w-full overflow-x-auto xl:overflow-hidden">
      <div  className="min-w-[900px] md:min-w-[900px] 2xl:min-w-[1000px] py-4 bg-[#e9f2f9] flex my-5 items-center  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
        <div className="text-[16px] md:text-[21px] font-semibold  border-r-2 border-white text-center w-2/12 md:w-3/12 lg:w-3/12">
          Payment
        </div>
        <div className="text-[21px] font-semibold  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-3/12">
          Project
        </div>
        <div className="text-[21px] font-semibold  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-3/12">
          Details
        </div>
        <div className="text-[21px] font-semibold  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-2/12">
          Amount
        </div>
        <div className="text-[16px] md:text-[21px]  font-semibold  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-2/12">
          Status
        </div>

        {/* <div className="text-[16px] md:text-[21px]  text-start e w-2/12 md:w-2/12 lg:w-2/12">
          <p className="font-semibold text-center">Action</p>
        </div> */}
      </div>
      {/* bankTransferFund */}

      {bankTransferFunds?.map((p, i) => (
        <div
          key={i}
           className="min-w-[900px] md:min-w-[900px] 2xl:min-w-[1000px] py-4 bg-[#e9f2f9] flex my-5 items-center  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
        >
          <div className="flex flex-col md:flex-row justify-center items-center pl-3 space-x-2 text-[16px] md:text-lg   border-r-2 border-white text-center w-2/12 md:w-3/12 lg:w-3/12">
            <img
              src="https://i.ibb.co.com/zJ3bWNk/bank.png"
              className="w-8 h-8 md:w-9 md:h-9 rounded-lg"
              loading="lazy"
              alt=""
            />
            <p className="capitalize">Bank</p>
          </div>
          <div className="capitalize text-[16px] md:text-[18px]  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-3/12">
            {p.projectName}
          </div>

          <div onClick={() => handleOpenDetails(p)} className="cursor-pointer px-3 text-lg  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-3/12">
            View Details
          </div>
          <div className="text-lg  border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-2/12">
            ${p.amount}
          </div>
          <div className="text-[16px] md:text-lg   border-r-2 border-white text-center w-2/12 md:w-2/12 lg:w-2/12">
            <>
              <span
                className={`border py-1 px-3 rounded-full text-sm cursor-pointer ${
                  fundStatuses[p?._id] === "Done"
                    ? "border-green-500 text-green-600"
                    : fundStatuses[p?._id] === "Declined"
                    ? "border-red-500 text-red-600"
                    : "border-blue-500 text-blue-600"
                }`}
                onClick={() => toggleDropdown(p?._id)}
              >
                {fundStatuses[p?._id] === "Pending"
                  ? "Select"
                  : fundStatuses[p?._id]}
              </span>
              {selectedFundId === p?._id && p?.status === "Pending" && (
                <div className="relative pt-1">
                  <ul className="absolute right-2 bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStatusChange(p, "Done")}
                    >
                      Done
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStatusChange(p, "Declined")}
                    >
                      Decline
                    </li>
                  </ul>
                </div>
              )}
            </>
          </div>
          {/* <div className="flex justify-center space-x-3 items-center text-[16px] md:text-lg  text-start e w-2/12 md:w-2/12 lg:w-2/12">
          {fundStatuses[p?._id] === "Pending" ? (
              <FaRegTrashCan title="Status is still pending" className="cursor-not-allowed h-5 md:h-7 text-red-400" />
            ) : (
              <FaRegTrashCan
                onClick={() => handleDeleteFundRequest(p?._id)}
                className="h-5 md:h-7 cursor-pointer text-red-600"
              />
            )}
        </div> */}
        </div>
        
      ))}
        {openDetails && fundRequest && (
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
                  <p className="text-gray-600 pl-4">
                    <strong>Name :</strong> {fundRequest?.projectName}
                  </p>
                  <p className="text-gray-600 pl-4">
                    <strong>ID:</strong> {fundRequest?.projectId}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Requester
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-medium pl-4">
                      <strong>Name:</strong>
                    </span>{" "}
                    {fundRequest?.requestedBy?.name?.firstName}{" "}
                    {fundRequest?.requestedBy?.name?.lastName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium pl-4">
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
                  <p className="text-gray-600">
                    <span className="font-medium pl-4">
                      <strong>Name:</strong>
                    </span>{" "}
                    {fundRequest?.requestedTo?.name?.firstName}{" "}
                    {fundRequest?.requestedTo?.name?.lastName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium pl-4">
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
                        <strong>Payment Platform:</strong>
                      </span>{" "}
                      Bank Transfer
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium pl-4 capitalize">
                        <strong> Account Holder Name:</strong>
                      </span>{" "}
                      {fundRequest?.accountName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium pl-4 capitalize">
                        <strong>Bank Account Number:</strong>
                      </span>{" "}
                      {fundRequest?.bankAccountNumber}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium pl-4 capitalize">
                        <strong>Bank :</strong>
                      </span>{" "}
                      {fundRequest?.bankName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium pl-4 capitalize">
                        <strong>Branch:</strong>
                      </span>{" "}
                      {fundRequest?.branchName}
                    </p>
                    <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Transaction ID:</strong>
                </span>{" "}
                {fundRequest?.transactionId}
              </p>
                    <p className="text-gray-600">
                      <span className="font-medium pl-4 capitalize">
                        <strong>Amount:</strong>
                      </span>{" "}
                      ${fundRequest?.amount}
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
    </div>
  )}
  </>
  );
};

export default BankFund;
