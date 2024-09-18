import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { useUpdateFriendRequestStatusMutation } from "../../../features/friend/friendApi";
import Swal from "sweetalert2";
import filter from "../../../assets/filter.png";
import RecieveFriendRequest from "./RecieveFriendRequest";
import SentFriendRequest from "./SentFriendRequest";

const GeneralFriendRequest = () => {
  const {
    getFriendRequest,
    getAllSentPendingFriendRequest,
    deleteFriendRequest,
  } = useContext(AuthContext);
  const [updateFriendRequestStatus] = useUpdateFriendRequestStatusMutation();

  const handleUpdateStatusAccept = (e, index) => {
    e.preventDefault();
    const selectedTask = getFriendRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to accept the request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Accepted";
          console.log({ id: selectedTask?._id, data: { status: newStatus } });
          updateFriendRequestStatus({
            id: selectedTask?._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have accepted the request successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
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
    const selectedTask = getFriendRequest?.data[index];
    if (selectedTask) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to reject the request?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newStatus = "Rejected";
          console.log({ id: selectedTask?._id, data: { status: newStatus } });
          updateFriendRequestStatus({
            id: selectedTask?._id,
            data: { status: newStatus },
          })
            .unwrap()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Well done !",
                text: "You have rejected the request successfully!",
              });
              setTimeout(() => {
                window.location.reload();
              }, 2500);
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

  // delete friend request

  const handleDeleteFriendRequest = (id) => {
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
        deleteFriendRequest(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Well done!",
              "Your request has been deleted.",
              "success"
            );
            setTimeout(() => {
              window.location.reload();
            }, 2500);
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

  const requests = getFriendRequest?.data;
  const sentRequests = getAllSentPendingFriendRequest?.data;

  console.log(getFriendRequest?.data?.length);
  return (
    <div className="relative">
      <h1 className="gray600 text-[20px] lg:text-[28px] md:pb-5 font-bold w-full pb-3 xl:pb-7">
        FRIEND REQUESTS
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
        <ul className="w-40 absolute top-32 left-5  bg-white border rounded-lg border-gray-300 shadow-lg mt-2 z-10">
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
      {/* recieve friend request */}
      {isOpenRecieveRequest && (
        <RecieveFriendRequest
          getFriendRequest={getFriendRequest}
          requests={requests}
          handleUpdateStatusAccept={handleUpdateStatusAccept}
          handleDeleteFriendRequest={handleDeleteFriendRequest}
        />
      )}
      {/* sent friend request */}
      {isOpenSentRequest && (
        <SentFriendRequest
          getAllSentPendingFriendRequest={getAllSentPendingFriendRequest}
          sentRequests={sentRequests}
          handleDeleteFriendRequest={handleDeleteFriendRequest}
        />
      )}
    </div>
  );
};

export default GeneralFriendRequest;
