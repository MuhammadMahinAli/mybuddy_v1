// src/app/modules/projectJoinRequest/projectJoinRequest.controller.js
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync.js';
import { createProjectJoinRequestService, deleteProjectByRequestedByService, getAcceptedProjectByRequestedByService, getAcceptedProjectByRequestedToService, getAcceptedProjectTeamMemberOfAProjectService, getAcceptedProjectTeamMemberService, getAllProjectJoinRequestsService,getAllSentProjectByRequestedByService,getProjectByRequestedByService, getProjectByRequestedToService, updateProjectJoinRequestStatusService } from './projectJoinRequest.service.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { ApiError } from '../../../handleError/apiError.js';

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

//  get all send project join requested to
export const getAllSentProjectByRequestedByController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const projectJoinRequests = await getAllSentProjectByRequestedByService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Project join request by requested by retrieved successfully!",
    data: projectJoinRequests,
  });
});
//  get pending project join requested to
export const getProjectRequestedTo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const projectJoinRequests = await getProjectByRequestedToService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending project join request by requested to retrieved successfully!",
    data: projectJoinRequests,
  });
});

//  get accepted project join requested to
export const getAcceptedProjectRequestedTo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const projectJoinRequests = await getAcceptedProjectByRequestedToService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending project join request by requested to retrieved successfully!",
    data: projectJoinRequests,
  });
});

//  get accepted project team member
export const getAcceptedProjectTeamMemberController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const projectJoinRequests = await getAcceptedProjectTeamMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project team member is retrieved successfully!",
    data: projectJoinRequests,
  });
});
//  get accepted project team member of a project
export const getAcceptedProjectTeamMemberOfAProjectController = catchAsync(async (req, res) => {
  const { projectId, id } = req.params; // keep consistent naming as 'projectId'
  const projectJoinRequests = await getAcceptedProjectTeamMemberOfAProjectService(projectId, id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project team member of a project is retrieved successfully!",
    data: projectJoinRequests,
  });
});

//  get accepted project join requested by
export const getAcceptedProjectRequestedBy = catchAsync(async (req, res) => {
  const { id } = req.params;
  const projectJoinRequests = await getAcceptedProjectByRequestedByService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending project join request by requested by retrieved successfully!",
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