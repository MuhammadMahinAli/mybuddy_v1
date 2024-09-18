// src/app/modules/projectJoinRequest/projectJoinRequest.service.js
import { ProjectJoinRequest } from './projectJoinRequest.model.js';
import { ApiError } from "../../../handleError/apiError.js";
import httpStatus from "http-status";


// export const createProjectJoinRequestService = async(projectData) => {
//    try {
//       // Check if a join request already exists for the given user and project
//       const existingRequest = await ProjectJoinRequest.findOne({
//          projectId: projectData.projectId,
//          requestedBy: projectData.requestedBy
//       });

//       if (existingRequest) {
//          throw new ApiError(httpStatus.CONFLICT, "You have already requested to join this project.");
//       }

//       const result = await ProjectJoinRequest.create(projectData);
      
//       if (!result) {
//         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create post");
//       }
//       return result;
//    } catch (error) {
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//    }
// };

// export const createProjectJoinRequestService = async (projectData) => {
//    try {
//      // Check if a join request already exists for the given user and project
//      const existingRequest = await ProjectJoinRequest.findOne({
//        projectId: projectData.projectId,
//        requestedBy: projectData.requestedBy,
//      });
 
//      // If a request already exists, check for duplicate subtasks
//      if (existingRequest) {
//        // Flatten the existing subtasks into a single array
//        const existingSubTasks = existingRequest.tasks.flatMap(task =>
//          task.subTask.map(sub => sub.todo)
//        );
 
//        // Flatten the new subtasks into a single array
//        const newSubTasks = projectData.tasks.flatMap(task =>
//          task.subTask.map(sub => sub.todo)
//        );
 
//        // Check if any new subtask already exists in the previous request
//        const duplicateSubTask = newSubTasks.find(subTask =>
//          existingSubTasks.includes(subTask)
//        );
 
//        if (duplicateSubTask) {
//          throw new ApiError(
//            httpStatus.CONFLICT,
//            `Subtask "${duplicateSubTask}" has already been requested for this project.`
//          );
//        }
//      }
 
     // If no existing request or no duplicate subtask, create a new request
//      const result = await ProjectJoinRequest.create(projectData);
 
//      if (!result) {
//        throw new ApiError(
//          httpStatus.INTERNAL_SERVER_ERROR,
//          "Failed to create join request"
//        );
//      }
//      return result;
//    } catch (error) {
//      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//    }
//  };


export const createProjectJoinRequestService = async (projectData) => {
   try {
     // Check if a join request already exists for the given user and project
     const existingRequest = await ProjectJoinRequest.findOne({
       projectId: projectData.projectId,
       requestedBy: projectData.requestedBy,
     });
 
     if (existingRequest) {
       // Extract task titles from existing and new requests
       const existingTaskTitles = existingRequest.tasks.map((task) => task.title.toLowerCase());
       const newTaskTitles = projectData.tasks.map((task) => task.title.toLowerCase());
 
       // Find all matching task titles
       const duplicateTitles = newTaskTitles.filter((title) =>
         existingTaskTitles.includes(title)
       );
 
       if (duplicateTitles.length > 0) {
         // Capitalize each duplicate title
         const capitalizeTitle = (title) => title.replace(/\b\w/g, (char) => char.toUpperCase());
         const duplicateTitlesList = duplicateTitles.map(capitalizeTitle).join(', ');
 
         throw new ApiError(
           httpStatus.CONFLICT,
           `You have already requested to join this project with the same task title(s): ${duplicateTitlesList}.`
         );
       }
     }
 
     const result = await ProjectJoinRequest.create(projectData);
 
     if (!result) {
       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create project join request");
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
// ***************** get all send request by requestedBy
export const getAllSentProjectByRequestedByService = async (id) => {
   const projectByRequestedBy = await ProjectJoinRequest.find({requestedBy: id}).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return projectByRequestedBy;
 };

// ***************** get pending send request by requestedBy
export const getProjectByRequestedByService = async (id) => {
   const projectByRequestedBy = await ProjectJoinRequest.find({requestedBy: id}).find({ status: "Pending" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return projectByRequestedBy;
 };



// export const getProjectByRequestedByService = async (id) => {
//   // Fetch all join requests for the requestedBy user
//   const projectByRequestedBy = await ProjectJoinRequest.find({ requestedBy: id, status: "Pending"  })
//     .populate('projectId')
//     .populate('requestedBy')
//     .populate('requestedTo')
//     .sort({ createdAt: -1 });

//   // Group requests by projectId and combine tasks
//   const groupedProjects = projectByRequestedBy.reduce((acc, request) => {
//     const projectId = request.projectId._id.toString();
    
//     // If the projectId already exists in the accumulator, combine tasks
//     if (!acc[projectId]) {
//       acc[projectId] = {
//         projectId: request.projectId,
//         requestedBy: request.requestedBy,
//         requestedTo: request.requestedTo,
//         tasks: [], // Initialize tasks as an empty array
//       };
//     }

//     // Flatten all tasks into a single array
//     acc[projectId].tasks = acc[projectId].tasks.concat(request.tasks);

//     return acc;
//   }, {});

//   // Convert the grouped projects object back to an array
//   return Object.values(groupedProjects);
// };


// ***************** get pending send request by requestedTo
export const getProjectByRequestedToService = async (id) => {
   const projectByRequestedTo = await ProjectJoinRequest.find({requestedTo: id}).find({ status: "Pending" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return projectByRequestedTo;
 };

// export const getProjectByRequestedToService = async (id) => {
//   const projectByRequestedBy = await ProjectJoinRequest.find({ requestedTo: id, status: "Pending"  })
//     .populate('projectId')
//     .populate('requestedBy')
//     .populate('requestedTo')
//     .sort({ createdAt: -1 });

 
//   const groupedProjects = projectByRequestedBy.reduce((acc, request) => {
//     const projectId = request.projectId._id.toString();
    
 
//     if (!acc[projectId]) {
//       acc[projectId] = {
//         projectId: request.projectId,
//         requestedBy: request.requestedBy,
//         requestedTo: request.requestedTo,
//         tasks: [], 
//       };
//     }

    
//     acc[projectId].tasks = acc[projectId].tasks.concat(request.tasks);

//     return acc;
//   }, {});

//   return Object.values(groupedProjects);
// };


// ***************** get accepted send request by requestedTo
// export const getAcceptedProjectByRequestedToService = async (id) => {
//    const acceptedProjectByRequestedTo = await ProjectJoinRequest.find({requestedTo: id}).find({ status: "Accepted" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
//    return acceptedProjectByRequestedTo;
//  };
export const getAcceptedProjectByRequestedToService = async (id) => {
   const acceptedOrDoneProjects = await ProjectJoinRequest.find({
     requestedTo: id,
     $or: [{ status: "Accepted" }, { status: "Done" }],
   })
   .populate('projectId')
   .populate('requestedBy')
   .populate('requestedTo')
   .sort({ createdAt: -1 });
 
   return acceptedOrDoneProjects;
 };
 
// ***************** get accepted project team member
export const getAcceptedProjectTeamMemberService = async (id) => {
   const acceptedProjectByRequestedTo = await ProjectJoinRequest.find({projectId : id}).find({ status: "Accepted" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return acceptedProjectByRequestedTo;
 };
// ***************** get accepted send request by requestedBy
export const getAcceptedProjectByRequestedByService = async (id) => {
   const acceptedProjectByRequestedTo = await ProjectJoinRequest.find({requestedBy: id}).find({ status: "Accepted" }).populate('projectId').populate('requestedBy').populate('requestedTo').sort({ createdAt: -1 });
   return acceptedProjectByRequestedTo;
 };

 // *******delete request

export const deleteProjectByRequestedByService = async (id) => {
   const result = await ProjectJoinRequest.findByIdAndDelete({_id: id});
   return result;
 };
 
 //------------- update status

export const updateProjectJoinRequestStatusService = async (id, status) => {
   const projectJoinRequest = await ProjectJoinRequest.findById({_id:id});
   if (!projectJoinRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project join request not found");
   }
   projectJoinRequest.status = status;
   await projectJoinRequest.save();
   return projectJoinRequest;
  };

 



