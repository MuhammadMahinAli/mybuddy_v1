import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useDeletePaypalFundRequestMutation,
  useGetAllPaypalFundInfoQuery,
  useUpdatePaypalFundStatusMutation,
} from "../../../features/paypalfund/paypalFundApi";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PaypalFund = () => {
  const [updatePaypalFundStatus] = useUpdatePaypalFundStatusMutation();
  const [deletePaypalFundRequest] = useDeletePaypalFundRequestMutation();
  const { data: getAllPaypalFundInfo, isLoading } =
    useGetAllPaypalFundInfoQuery();
  const paypals = getAllPaypalFundInfo?.data;
  const [selectedFundId, setSelectedFundId] = useState(null);
  const [fundStatuses, setFundStatuses] = useState({}); // Start with an empty object
  const [openDetails, setOpenDetails] = useState(false);
  const [fundRequest, setFundRequest] = useState(null);

  const handleOpenDetails = (fund) => {
    setFundRequest(fund);
    setOpenDetails(true);
  };

  // Update fundStatuses once data is available
  useEffect(() => {
    if (getAllPaypalFundInfo?.data) {
      const initialStatuses = getAllPaypalFundInfo.data.reduce((acc, fund) => {
        acc[fund._id] = fund.status;
        return acc;
      }, {});
      setFundStatuses(initialStatuses);
    }
  }, [getAllPaypalFundInfo]);

  const toggleDropdown = (fundId) => {
    setSelectedFundId(selectedFundId === fundId ? null : fundId);
  };

  const handleStatusChange = async (fund, status) => {
    const fundId = fund?._id;
    const selectedFund = paypals?.find((perFund) => perFund?._id === fundId);

    if (!selectedFund) {
      console.log("No fund found for the selected ID.");
      return;
    }

    const swalOptions = {
      title: "Are you sure?",
      text: `Do you want to mark this fund as "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status}!`,
    };

    const result = await Swal.fire(swalOptions);
    if (result.isConfirmed) {
      try {
        const postData = { status };

        await updatePaypalFundStatus({ id: fundId, data: postData }).unwrap();
        setSelectedFundId(null);
        setFundStatuses((prevStatuses) => ({
          ...prevStatuses,
          [fund?._id]: status,
        }));

        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `You have successfully updated the status to "${status}".`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Update",
          text: "There was an error updating the status.",
        });
        console.error("Error updating status:", error);
      }
    }
  };
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
        deletePaypalFundRequest(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "This fund request has been deleted.",
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
              "There was an issue to cancelled fund request.",
              "error"
            );
          });
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {paypals?.length === 0 ? (
        <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`No fund request available to show.`}</p>
      ) : (
        <div className="w-[300px] xs:w-[330px] ssm:w-[370px] sm:w-[570px] md:w-[630px] lg:w-full overflow-x-auto xl:overflow-hidden">
          {/* Header */}
          <div className="min-w-[900px] md:min-w-[900px] 2xl:min-w-[1000px]  py-4 bg-[#e9f2f9] flex my-5 items-center shadow rounded-xl">
            <div className="text-center w-2/12 md:w-3/12 font-semibold">
              Payment
            </div>
            <div className="text-center w-2/12 md:w-2/12 lg:w-3/12  font-semibold">
              Project
            </div>
            <div className="text-center w-2/12 md:w-2/12 lg:w-3/12  font-semibold">
              Details
            </div>
            <div className="text-center w-2/12 md:w-2/12 lg:w-2/12  font-semibold">
              Amount
            </div>
            <div className="text-center w-2/12 md:w-2/12 font-semibold">
              Status
            </div>
            {/* <div className="text-center w-2/12 md:w-2/12 font-semibold">
              Action
            </div> */}
          </div>

          {/* PayPal Funds */}
          {paypals?.map((p) => (
            <div
              key={p?._id}
              className="min-w-[900px] md:min-w-[900px] 2xl:min-w-[1000px] py-4 bg-[#e9f2f9] flex my-5 items-center shadow rounded-xl"
            >
              <div className="w-2/12 md:w-3/12 flex flex-col md:flex-row justify-center items-center pl-3 text-lg border-r">
                <img
                  src="https://i.ibb.co.com/NYDfhjQ/paypal-1.png"
                  className="w-8 h-8 rounded-lg"
                  alt="Paypal"
                />
                <p className="capitalize">Paypal</p>
              </div>
              <div className="capitalize w-2/12 md:w-2/12 lg:w-3/12 text-center border-r">
                {p.projectName}
              </div>
              <div
                onClick={() => handleOpenDetails(p)}
                className="cursor-pointer w-2/12 md:w-2/12 lg:w-3/12 text-center border-r"
              >
                View Details
              </div>
              <div className="w-2/12 md:w-2/12 lg:w-2/12 text-center border-r">
                ${p.amount}
              </div>
              <div className="w-2/12 md:w-2/12 text-center border-r">
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
                {selectedFundId === p?._id && p.status === "Pending" && (
                  <div className="relative">
                    <ul className="absolute right-2 bg-white border rounded-lg shadow-lg mt-2 z-10">
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
              </div>
              {/* <div className="flex justify-center space-x-3 items-center text-[16px] md:text-lg  text-start e w-2/12 md:w-2/12 lg:w-2/12">
              {fundStatuses[p?._id] === "Pending" ? (
                  <FaRegTrashCan
                    title="Status is still pending"
                    className="cursor-not-allowed h-5 md:h-7 text-red-400"
                  />
                ) : (
                  <FaRegTrashCan
                    onClick={() => handleDeleteFundRequest(p?._id)}
                    className="h-5 md:h-7 cursor-pointer text-red-600"
                  />
                )}
                   </div> */}
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

                      {/* <div className="mb-4 space-y-1">
                        <h3 className="text-lg font-semibold text-gray-700">
                          Request Details
                        </h3>
                      
                        <p className="text-gray-600">
                          <span className="font-medium pl-4">
                            <strong>Payment Platform:</strong>
                          </span>{" "}
                          Stripe
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium pl-4">
                            <strong>Amount:</strong>
                          </span>{" "}
                          ${fundRequest?.amount}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium pl-4">
                            <strong>Status:</strong>
                          </span>{" "}
                          {fundRequest?.status}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium pl-4">
                            <strong>Request Date:</strong>
                          </span>{" "}
                          {new Date(
                            fundRequest?.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div> */}
                         <div className="mb-4 space-y-1">
              <h3 className="text-lg font-semibold text-gray-700">
                Request Details
              </h3>
              
              <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Payment Platform:</strong>
                </span>{" "}
                PayPal
              </p>
              <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Transation ID:</strong>
                </span>{" "}
                {fundRequest?.transactionId}
              </p>
              <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Payoneer Email:</strong>
                </span>{" "}
                {fundRequest?.paypalEmail}
              </p>
              <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Amount:</strong>
                </span>{" "}
                ${fundRequest?.amount}
              </p>
              <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Status:</strong>
                </span>{" "}
                {fundRequest?.status}
              </p>
              <p className="text-gray-600">
                <span className="font-medium pl-4">
                  <strong>Request Date:</strong>
                </span>{" "}
                {new Date(fundRequest?.createdAt).toLocaleDateString()}
              </p>
            </div>
                    </div>
                  </div>
                )}
           
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PaypalFund;
