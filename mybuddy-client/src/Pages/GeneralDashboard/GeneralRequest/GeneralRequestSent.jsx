//import { useSelector } from "react-redux";
import xMark from "../../../assets/xmark.png";
import { useContext, useState } from "react";
import ViewTaskDetails from "./ViewTaskDetails";
import {
  useDeleteProjectByRequestedByMutation,
  useUpdateJoinRequestStatusMutation,
} from "../../../features/projectJoinRequest/projectJoinRequestApi";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/UserContext";

const GeneralRequestSent = () => {
  //const { user } = useSelector((state) => state.auth);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // ******* fetch request
  const { allSentRequest } = useContext(AuthContext);

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

  const handleUpdateStatus = (e, index) => {
    e.preventDefault();
    setSelectedRequestIndex(index);
    const selectedTask = allSentRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel your request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Declined";
          console.log({ id: selectedTask?._id, data: { status: newStatus } });
          updateJoinRequestStatus({
            id: selectedTask?._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Great !",
                text: "You have cancelled the request successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            })
            .catch((error) => {
              alert("Failed to update task status.");
              console.error(error);
            });
        }
      });
    } else {
      alert("No task found for the selected index.");
    }
  };

  // delete
  const [deleteProjectByRequestedBy] = useDeleteProjectByRequestedByMutation();

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
        deleteProjectByRequestedBy(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "This request has been deleted.",
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
  console.log("sent request", allSentRequest?.data);
  return (
    <>
      <h1 className="gray600 text-[20px] lg:text-[28px] font-bold w-full">
        SENT REQUESTS
      </h1>
      {allSentRequest?.data === undefined ? (
        <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not sent any request yet.`}</p>
      ) : (
        // <p className="text-gray-600 text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not sent any request yet.`}</p>
        <div className=" gray600 space-y-6 w-11/12 md:w-full">
          <div className="w-full py-4 flex my-5 items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
            <div className="text-[16px] md:text-[21px] font-semibold text-center w-3/12 md:w-3/12 lg:w-3/12">
              To
            </div>
            <div className="text-[21px] hidden md:block font-semibold text-center md:w-2/12 lg:w-2/12">
              Project
            </div>
            <div className="text-[16px] md:text-[21px]  font-semibold text-center w-4/12 md:w-2/12 lg:w-2/12">
              Task
            </div>
            <div className="text-[16px] md:text-[21px]  font-semibold text-center w-4/12 md:w-2/12 lg:w-2/12">
              Status
            </div>
            <div className="text-[21px] hidden lg:block font-semibold text-center md:w-2/12 lg:w-4/12">
              Details
            </div>

            <div className="text-[16px] md:text-[21px]  text-start e w-4/12 md:w-2/12 lg:w-2/12">
              <p className="font-semibold text-center">Action</p>
            </div>
          </div>
          {/* table */}
          {allSentRequest?.data?.map((request, i) => (
            <div
              key={i}
              className="w-full py-4  flex my-5 items-center  bg-[#e9f2f9] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl"
            >
              <div className="flex flex-col md:flex-row  items-center pl-2 space-x-2 text-[16px] md:text-lg   border-r-2  text-center w-3/12 md:w-3/12 lg:w-3/12">
                <img
                  src={
                    request?.requestedTo?.profilePic ||
                    "https://i.ibb.co.com/FKKD4mT/opp.png"
                  }
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  loading="lazy"
                  alt=""
                />
                <p className="capitalize font-semibold pt-1 md:pt-0">
                  {request?.requestedTo?.name?.firstName}{" "}
                  {request?.requestedTo?.name?.lastName}
                </p>
              </div>
              <div
                title={request?.projectId?.projectName}
                className="capitalize text-[16px] md:text-[18px] hidden md:block  border-r-2  text-center md:w-2/12 lg:w-2/12"
              >
                {request?.projectId?.projectName.slice(0, 6)}..
              </div>
              <div className="text-[16px] md:text-lg   border-r-2  text-center w-4/12 md:w-2/12 lg:w-2/12">
                {request?.tasks?.length}
              </div>
              <div className="text-[16px] md:text-lg   border-r-2  text-center w-4/12 md:w-2/12 lg:w-2/12">
                {request?.status}
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
                  tasks={
                    allSentRequest?.data[selectedRequestIndex]?.tasks || []
                  }
                  closeModal={closeModal}
                />
              )}
              <div className="flex justify-center space-x-3 items-center text-[16px] md:text-lg  text-start e w-4/12 md:w-2/12 lg:w-2/12">
                <img
                  onClick={() => handleDeleteFundRequest(request?._id)}
                  src={xMark}
                  className="h-5 md:h-7"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GeneralRequestSent;
