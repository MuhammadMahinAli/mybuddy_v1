
import httpStatus from "http-status";
import { FriendRequest } from "./friendRequest.model.js";
import { ApiError } from "../../../handleError/apiError.js";


//--------- create friend request
// export const createFriendRequest = async(postData) => {
//     try {
//        const result = await FriendRequest.create(postData);
     
//        if (!result) {
//          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create friend request");
//        }
//        return result;
//     } catch (error) {
//        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//     }
//    };


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



//------------- get friend request with pending status
   export const getPendingFriendRequestService = async (id) => {
      const friendRequests = await FriendRequest.find({requestedTo: id}).find({ status: "Pending" }).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
      return friendRequests;
    };


//------------- get friend request with accepted status
   export const getAcceptedFriendRequestService = async (id) => {
      const friendRequests = await FriendRequest.find({requestedTo: id}).find({ status: "Accepted" }).populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
      return friendRequests;
    };

//------------- get other's friend request with accepted status
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


  ////////////
  