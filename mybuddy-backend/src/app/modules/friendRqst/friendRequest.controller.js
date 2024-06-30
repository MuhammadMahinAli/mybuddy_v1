import {createFriendRequest,  getAcceptedFriendRequestService,  getOthersAcceptedFriendRequestService,  getPendingFriendRequestService,  updateFriendRequestStatusService} from "./friendRequest.service.js";
import {catchAsync} from "../../../utils/catchAsync.js";
import {sendResponse} from "../../../utils/sendResponse.js";
import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";




//------create a new friend request
export const createNewFriendRequest= catchAsync(async (req, res, next) => {
    const data = req.body;
    const newRequest = await createFriendRequest(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request created successfully!",
      data: newRequest,
    });
  });
//----- pending
  export const getPendingFriendRequestController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const friendRequests = await getPendingFriendRequestService(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request is retrieved successfully!",
      data: friendRequests,
    });
  });
//----- accepted 
  export const getAcceptedFriendRequestController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const friendRequests = await getAcceptedFriendRequestService(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request is retrieved successfully!",
      data: friendRequests,
    });
  });
//----- others accepted 
  export const getOthersAcceptedFriendRequestController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const friendRequests = await getOthersAcceptedFriendRequestService(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Friend request is retrieved successfully!",
      data: friendRequests,
    });
  });


 //------- update status
 
 export const updateFriendRequestStatusController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updateFriendRequest = await updateFriendRequestStatusService(id, status);
  sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: "Friend request status updated successfully",
     data: updateFriendRequest,
  });
 });