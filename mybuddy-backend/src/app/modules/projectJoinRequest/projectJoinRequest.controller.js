// src/app/modules/projectJoinRequest/projectJoinRequest.controller.js
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync.js';
import { createProjectJoinRequestService, deleteProjectByRequestedByService, getAllProjectJoinRequestsService,getProjectByRequestedByService, getProjectByRequestedToService, updateProjectJoinRequestStatusService } from './projectJoinRequest.service.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export const createNewProjectJoinRequest = catchAsync(async (req, res, next) => {
    const data = req.body;
   
    const projectJoinRequest = await createProjectJoinRequestService(data);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project request created successfully!",
      data: projectJoinRequest ,
    });
  });

export const getAllProjectJoinRequests = async (req, res) => {
 const projectJoinRequests = await getAllProjectJoinRequestsService();
 res.status(200).json(projectJoinRequests);
};

// ************* get project join requestedby

// export const getProjectRequestedBy = catchAsync(async (req, res) => {
//   const RequestedBy = await getProjectByRequestedByService (req?.params?.id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Project RequestedBy retrieved successfully!",
//     data: RequestedBy,
//   });
// });

export const getProjectRequestedBy = catchAsync(async (req, res) => {
  const { id } = req.params;
  //const status = "Pending"; // Enforce "Pending" status

  const projectJoinRequests = await getProjectByRequestedByService(id);

  if (projectJoinRequests.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No pending project join request found with the given id");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending project join request retrieved successfully!",
    data: projectJoinRequests,
  });
});

//  get project join requested to
export const getProjectRequestedTo = catchAsync(async (req, res) => {
  const { id } = req.params;
  //const status = "Pending"; // Enforce "Pending" status
  
  const projectJoinRequests = await getProjectByRequestedToService(id);

  // if (projectJoinRequests.length === 0) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "No pending project join request found with the given id");
  // }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending project join request by requested to retrieved successfully!",
    data: projectJoinRequests,
  });
});


// ************ delete project join request

export const deleteProjectByRequestedBy = catchAsync(async (req, res) => {
  const id = req.params.id;

  const request = await deleteProjectByRequestedByService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request deleted successfully!",
    data: request,
  });
});

//
// src/app/modules/projectJoinRequest/projectJoinRequest.updateStatus.controller.js
export const updateProjectJoinRequestStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedProjectJoinRequest = await updateProjectJoinRequestStatusService(id, status);
  sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: "Project join request status updated successfully",
     data: updatedProjectJoinRequest,
  });
 });