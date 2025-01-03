import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
//import { useUpdateJoinRequestStatusMutation } from "../../../features/projectJoinRequest/projectJoinRequestApi";
import { useUpdateFriendRequestStatusMutation } from "../../../features/friend/friendApi";
import Swal from "sweetalert2";


const Requests = () => {
  const [openFriendRequest, setOpenFriendRequest] = useState(true);
  const [openProjectRequest, setOpenProjectRequest] = useState(false);
  const {  getFriendRequest } = useContext(AuthContext);


  const friendRequests = getFriendRequest?.data;
  //const projectRequests = allRecieveRequest?.data;

console.log(friendRequests);
  // Use the mutation hook for update
 // const [updateJoinRequestStatus] = useUpdateJoinRequestStatusMutation();
  const [updateFriendRequestStatus] = useUpdateFriendRequestStatusMutation();

  const handleUpdateFRStatusAccept = (e, index) => {
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

  
  const handleUpdateFRStatusReject = (e, index) => {
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



  const toggleFriendRequest = () => {
    setOpenFriendRequest(true);
    setOpenProjectRequest(false);
  };
  const toggleProjectRequest = () => {
    setOpenFriendRequest(false);
    setOpenProjectRequest(true);
  };

  return (
    <div className="mt-5 md:mt-0 lg:mr-5 xl:mr-6 2xl:mr-0">
      <h1 className="gray600 text-[20px] lg:text-[28px] md:pb-5 font-bold w-full">
        NEW REQUESTS
      </h1>
      <div className="my-5 flex items-center justify-between md:space-x-5">
        <button
          onClick={toggleFriendRequest}
          className={`${openFriendRequest ? "shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] hover:shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]" :"hover:shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]"}  text-[11px] sm:text-[16px] md:text-[18px] lg:text-xl gray600 font-bold bg-[#e4ecf7] cursor-pointer rounded-[9px] md:rounded-[13px] [background:linear-gradient(125.26deg,_#d9d9d9,_#efefef_55.46%,_#fcfcfc)]  px-3 py-1 sm:py-2 xs:px-5 sm:px-10 lg:px-7 2xl:px-10 4xl:px-14 flex justify-center items-center`}
        >
          Friend
        </button>
        <button
          onClick={toggleProjectRequest}
          className={`${openProjectRequest ? "shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] hover:shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]" :"hover:shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]"}  text-[11px] md:text-[14px] lg:text-xl gray600 font-bold bg-[#e4ecf7]  cursor-pointer rounded-[9px] md:rounded-[13px] [background:linear-gradient(125.26deg,_#d9d9d9,_#efefef_55.46%,_#fcfcfc)]  px-3 py-1  xs:px-5 sm:px-10 lg:px-7 2xl:px-10 4xl:px-14 md:py-2 flex justify-center items-center`}
        >
           Project
        </button>
     
        <button
          className={`hidden hover:shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]  text-[11px] md:text-[14px] lg:text-xl gray600 font-bold bg-[#e4ecf7]  cursor-pointer rounded-[9px] md:rounded-[13px] [background:linear-gradient(125.26deg,_#d9d9d9,_#efefef_55.46%,_#fcfcfc)]  px-3 py-1  xs:px-5 sm:px-10 lg:px-7 2xl:px-10 4xl:px-14 md:flex justify-center items-center`}
        >
           Fund
        </button>
        <button
          className={`hidden hover:shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]  text-[11px] md:text-[14px] lg:text-xl gray600 font-bold bg-[#e4ecf7]  cursor-pointer rounded-[9px] md:rounded-[13px] [background:linear-gradient(125.26deg,_#d9d9d9,_#efefef_55.46%,_#fcfcfc)]  px-3 py-1  xs:px-5 sm:px-10 lg:px-7 2xl:px-10 4xl:px-14 md:flex justify-center items-center`}
        >
           Proposal
        </button>
        
      </div>

      {/* projects */}
      {openProjectRequest  && (
        <>
          {/* {projectRequests?.slice(0, 2).map((r, i) => (
            <div
              key={i}
              className="w-12/12 3xl:w-9/12 md:space-x-5 p-5 flex flex-col md:flex-row  justify-between rounded-[25px] bg-skyblue shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] overflow-hidden"
            >
              <div className="flex justify-center items-center h-12 w-16 xl:w-20 3xl:w-16 rounded-xl bg-white">
                <img
                  src={r.projectId?.images[0]}
                  className="h-10 w-14 xl:w-16 rounded-xl"
                />
              </div>

              <div>
                <p className="text-xl font-semibold text-gray-500">
                  {r.projectId?.projectName.slice(0, 7)}...
                </p>
                <div
                  className="lg:hidden text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: r?.projectId?.description.slice(0, 18),
                  }}
                />
                <div
                  className="hidden lg:block text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: r?.projectId?.description.slice(0, 13),
                  }}
                />
              </div>

              <div className="flex space-x-3 items-center mt-3">
                <button
                  onClick={(e) => handleUpdatePJRStatusAccept(e, i)}
                  className="text-sm md:text-xl font-semibold py-1 px-3 rounded-[10px] border-[3px] border-[#7fa0fa]"
                >
                  Aceept
                </button>
                <button
                  onClick={(e) => handleUpdatePJRStatusReject(e, i)}
                  className="text-sm md:text-xl font-semibold py-1 px-3 rounded-[10px] border-[3px] border-[#ff59ad]"
                >
                  Decline
                </button>
              </div>
            </div>
          ))} quests?.length === 0 && (
            <p className="text-gray-600 text-[16px] md:text-[18px]  lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not recieved any project request.`}</p>
          )}*/}
     
            <p className="text-gray-600 text-[16px] md:text-[18px]  lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not recieved any project request.`}</p>
      
        </>
      )}

      {/* friend request */}
      {openFriendRequest && (
        <>
          <div className="flex flex-col space-y-5 3xl:space-y-9 items-enter  3xl:pt-5">
            {friendRequests?.slice(0, 2).map((p, i) => (
              <div
                key={i}
                className="w-12/12  md:space-x-10 p-3 sm:p-5 flex flex-row  justify-between items-center rounded-[15px] bg-skyblue shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] overflow-hidden"
              >
                <div className="flex space-x-2 ssm:space-x-4 items-center">
                  <img
                    src={
                      p?.requestedBy?.profilePic ||
                      "https://i.ibb.co.com/FKKD4mT/opp.png"
                    }
                    className="w-8 h-8 sm:w-12 sm:h-12 md:w-10 md:h-10 3xl:h-14 3xl:w-14 rounded-full border border-gray-500"
                    loading="lazy" alt=""
                  />
                  <p className="text-sm sm:text-[18px] md:text-xl font-semibold text-gray-600 capitalize">
                    {p?.requestedBy?.name?.firstName}{" "}
                    <span>{p?.requestedBy?.name?.lastName.length > 4 ? `${p?.requestedBy?.name?.lastName.slice(0,4)}...` : p?.requestedBy?.name?.lastName }</span>
                    
                  </p>
                </div>
                <div className="flex space-x-1 xs:space-x-3 items-center">
                  <button
                    onClick={(e) => handleUpdateFRStatusAccept(e, i)}
                    className="text-[10px] xs:text-[14px] md:text-xl font-semibold py-1 px-3 rounded-[6px] border-[1px] sm:border-[2px] border-[#7fa0fa]"
                  >
                    Aceept
                  </button>
                  <button
                    onClick={(e) => handleUpdateFRStatusReject(e, i)}
                    className="text-[10px] xs:text-[14px] md:text-xl font-semibold py-1 px-3 rounded-[6px] border-[1px] sm:border-[2px] border-[#ff59ad]"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
          {friendRequests?.length === 0 && (
            <p className="text-gray-600 text-[16px] md:text-[18px]  lg:text-[24px] xl:pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not recieved any friend request.`}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Requests;
