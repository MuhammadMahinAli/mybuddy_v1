
import httpStatus from "http-status";
import { FriendRequest } from "./friendRequest.model.js";
import { ApiError } from "../../../handleError/apiError.js";


//--------- create friend request

export const createFriendRequest = async(postData) => {
  try {
    // Check if the friend request already exists
    const existingRequest = await FriendRequest.findOne({
      requestedBy: postData.requestedBy,
      requestedTo: postData.requestedTo,
    });

    if (existingRequest) {
      throw new ApiError(httpStatus.BAD_REQUEST, "You have already sent a friend request to this user.");
    }

    // Create the friend request if it doesn't exist
    const result = await FriendRequest.create(postData);

    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create friend request");
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};



//------------- Get all friend requests of  request by
export const getAllFriendRequestService = async (id) => {
 const friendRequests = await FriendRequest.find({requestedBy: id}).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
  return friendRequests;
};

//------------- get friend request with pending status of requested by
export const getPendingFriendRequestByService = async (id) => {
  const friendRequests = await FriendRequest.find({requestedBy: id}).find({ status: "Pending" }).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
  return friendRequests;
};

//------------- get friend request with pending status of requested to
   export const getPendingFriendRequestService = async (id) => {
      const friendRequests = await FriendRequest.find({requestedTo: id}).find({ status: "Pending" }).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
      return friendRequests;
    };


//------------- get friend request with accepted status requested to
  //  export const getAcceptedFriendRequestService = async (id) => {
  //     const friendRequests = await FriendRequest.find({requestedTo: id}).find({ status: "Accepted" }).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
  //     return friendRequests;
  //   };
  export const getAcceptedFriendRequestService = async (id) => {
    try {
      const friendRequests = await FriendRequest.find({
        status: "Accepted",
        $or: [
          { requestedBy: id },
          { requestedTo: id }
        ]
      })
        .populate('requestedBy')
        .populate('requestedTo')
        .sort({ createdAt: -1 });
  
      return friendRequests;
    } catch (error) {
      throw new Error("Error fetching accepted friend requests: " + error.message);
    }
  };
  

//------------- get other's friend request with accepted status requested by
   export const getOthersAcceptedFriendRequestService = async (id) => {
      const friendRequests = await FriendRequest.find({requestedBy: id}).find({ status: "Accepted" }).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
      return friendRequests;
    };


//------------update request status
   export const updateFriendRequestStatusService = async (id, status) => {
   const friendRequest = await FriendRequest.findById({_id:id});
   if (!friendRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, "Friend request not found");
   }
   friendRequest.status = status;
   await friendRequest.save();
   return friendRequest;
  };


//----------------- delete friend request

export const deleteFriendRequestService = async (id) => {
  const result = await FriendRequest.findByIdAndDelete({ _id: id });
  return result;
};
  