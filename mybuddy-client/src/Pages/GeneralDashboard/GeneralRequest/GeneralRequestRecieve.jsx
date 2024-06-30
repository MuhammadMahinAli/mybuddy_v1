import { useSelector } from "react-redux";
import xMark from "../../../assets/xmark.png";
import rightMark from '../../../assets/checkmark.png'
import { useContext, useState } from "react";
import ViewTaskDetails from "./ViewTaskDetails";
import { useUpdateJoinRequestStatusMutation } from "../../../features/projectJoinRequest/projectJoinRequestApi";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/UserContext";

const GeneralRequestRecieve = () => {
    const { user } = useSelector((state) => state.auth);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // ******* fetch request
  // const { data: allRequest, isLoading: isFetchingRequest } =
  //   useGetAllProjectByRequestedByQuery(user?._id);
  // console.log(allRequest);
  const {allRecieveRequest} = useContext(AuthContext);

  function closeModal() {
    setIsOpenModal(false);
  }

  const openModal = (e, index) => {
    e.preventDefault();
    setIsOpenModal(true);
    setSelectedRequestIndex(index);
  };

  // Use the mutation hook
  const [updateJoinRequestStatus] = useUpdateJoinRequestStatusMutation();

  const handleUpdateStatusAccept = (e, index) => {
    e.preventDefault();
    setSelectedRequestIndex(index);
    const selectedTask = allRecieveRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to accept the request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Accepted";
          console.log({ id: selectedTask._id, data: { status: newStatus } });
          updateJoinRequestStatus({
            id: selectedTask._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have accepted the request successfully!",
              });
            })
            .catch((error) => {
              alert("Failed to accept the request.");
              console.error(error);
            });
        }
        
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };
  const handleUpdateStatusReject = (e, index) => {
    e.preventDefault();
    setSelectedRequestIndex(index);
    const selectedTask = allRecieveRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to reject the request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Rejected";
          console.log({ id: selectedTask._id, data: { status: newStatus } });
          updateJoinRequestStatus({
            id: selectedTask._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have rejected the request successfully!",
              });
            })
            .catch((error) => {
              alert("Failed to reject the request.");
              console.error(error);
            });
        }
      });
    } else {
      console.log("No task found for the selected index.");
    }
  };

  

console.log('l',allRecieveRequest?.data);
    return (
        <>
      {allRecieveRequest?.data?.length === 0 ? (
        <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not recieved any request yet.`}</p>
      ) : (
        <div className=" gray600 space-y-6 w-11/12 md:w-full">
          <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
            REQUESTS
          </h1>
          <div className="w-full py-4 flex my-5 items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <div className="text-[16px] md:text-[21px] font-semibold text-center w-4/12 md:w-3/12 lg:w-3/12">
              From
            </div>
            <div className="text-[21px] hidden md:block font-semibold text-center md:w-2/12 lg:w-2/12">
              Project
            </div>
            <div className="text-[16px] md:text-[21px]  font-semibold text-center w-4/12 md:w-2/12 lg:w-2/12">
              Task
            </div>
            <div className="text-[21px] hidden lg:block font-semibold text-center md:w-2/12 lg:w-4/12">
              Details
            </div>

            <div className="text-[16px] md:text-[21px]  text-start e w-4/12 md:w-2/12 lg:w-2/12">
              <p className="font-semibold text-center">Action</p>
            </div>
          </div>
          {/* table */}
          {allRecieveRequest?.data?.map((request, i) => (
            <div
              key={i}
              className="w-full py-4  flex my-5 items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
            >
              <div className="flex flex-col md:flex-row justify-center items-center space-x-2 text-[16px] md:text-lg   border-r-2  text-center w-4/12 md:w-3/12 lg:w-3/12">
                <img
                  src={request?.requestedTo?.profilePic || "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  alt=""
                />
                <p className="capitalize pt-1 md:pt-0">
                  {request?.requestedTo?.name?.firstName}{" "}
                  {request?.requestedTo?.name?.lastName}
                </p>
              </div>
              <div className="capitalize text-[16px] md:text-[18px] hidden md:block  border-r-2  text-center md:w-2/12 lg:w-2/12">
                {request?.projectId?.projectName.slice(0,6)}..
              </div>
              <div className="text-[16px] md:text-lg   border-r-2  text-center w-4/12 md:w-2/12 lg:w-2/12">
                Task {request?.tasks?.length}
              </div>
              <div
                onClick={(e) => openModal(e, i)}
                className="text-center cursor-pointer px-3 text-lg hidden lg:block  border-r-2  md:w-2/12 lg:w-4/12"
              >
                View Details
                {/* modal */}
              </div>
              {isOpenModal && (
                <ViewTaskDetails
                  isOpenModal={isOpenModal}
                  tasks={allRecieveRequest?.data[selectedRequestIndex]?.tasks || []}
                  closeModal={closeModal}
                />
              )}
              <div className="flex justify-center space-x-3 items-center text-[16px] md:text-lg  text-start e w-4/12 md:w-2/12 lg:w-2/12">
                {/* <img
                onClick={(e) => handleUpdateStatus(e, i)}
                src={rightMark}
                className="h-5 md:h-7" 
              /> */}
                {/* <img
                onClick={(e) => handleUpdateStatus(e, i)}
                src={rightMark}
                className={allRecieveRequest?.data[selectedRequestIndex]?.status === "Pending" ?   "cursor-not-allowed" : "cursor-pointer" }
              /> */}
                {/* {allRequest?.data[selectedRequestIndex]?.status ===
                "Accepted" ? (
                  <img
                    onClick={(e) => handleUpdateStatus(e, i)}
                    src={rightMark}
                    className="h-5 md:h-7"
                  />
                ) : (
                  <p onClick={handleWalletClick}>Wallet</p>
                )} */}
<img
                    onClick={(e) => handleUpdateStatusAccept(e, i)}
                    src={rightMark}
                    className="h-5 md:h-7"
                  />
                <img
                  onClick={(e) => handleUpdateStatusReject(e,i)}
                  src={xMark}
                  className="h-5 md:h-7"
                />
              </div>
            </div>
          ))}
          {/* {showWalletForm && (
            <form onSubmit={handleSubmit} className="w-[500px]">
              <PaymentElement />
              <button disabled={!stripe}>Submit</button>
              {errorMessage && <div>{errorMessage}</div>}
            </form>
          )} */}
        </div>
      )}
    </>
    );
};

export default GeneralRequestRecieve;