// src/app/modules/projectJoinRequest/projectJoinRequest.service.js
import { ProjectJoinRequest } from './projectJoinRequest.model.js';
import { ApiError } from "../../../handleError/apiError.js";
import httpStatus from "http-status";

// export const createProjectJoinRequestService = async(projectData) => {
//    try {
//       const result = await ProjectJoinRequest.create(projectData);
//       console.log(result);
//       if (!result) {
//         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
//       }
//       return result;
//    } catch (error) {
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//    }
//   };

export const createProjectJoinRequestService = async(projectData) => {
   try {
      // Check if a join request already exists for the given user and project
      const existingRequest = await ProjectJoinRequest.findOne({
         projectId: projectData.projectId,
         requestedBy: projectData.requestedBy
      });

      if (existingRequest) {
         throw new ApiError(httpStatus.CONFLICT, "You have already requested to join this project.");
      }

      const result = await ProjectJoinRequest.create(projectData);
      
      if (!result) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
      }
      return result;
   } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
   }
};


export const getAllProjectJoinRequestsService = async () => {
 try {
    const requests = await ProjectJoinRequest.find({}).populate('projectId').populate('requestedBy').populate('requestedTo');
    return requests;
 } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
 }
};
// ***************** get send request by requestedBy
export const getProjectByRequestedByService = async (id) => {
   const projectByRequestedBy = await ProjectJoinRequest.find({requestedBy: id}).find({ status: "Pending" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return projectByRequestedBy;
 };

// ***************** get send request by requestedTo
export const getProjectByRequestedToService = async (id) => {
   const projectByRequestedTo = await ProjectJoinRequest.find({requestedTo: id}).find({ status: "Pending" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return projectByRequestedTo;
 };

 // *******delete request
export const deleteProjectByRequestedByService = async (id) => {
   const result = await ProjectJoinRequest.findByIdAndDelete({_id: id});
   return result;
 };
 
 //

export const updateProjectJoinRequestStatusService = async (id, status) => {
   const projectJoinRequest = await ProjectJoinRequest.findById({_id:id});
   if (!projectJoinRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project join request not found");
   }
   projectJoinRequest.status = status;
   await projectJoinRequest.save();
   return projectJoinRequest;
  };

  // src/services/stripeService.js


// src/services/stripeService.js
