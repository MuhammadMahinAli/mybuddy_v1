// src/app/modules/projectJoinRequest/projectJoinRequest.routes.js
import express from "express";
import { createNewProjectJoinRequest, deleteProjectByRequestedBy, getAcceptedProjectRequestedBy, getAcceptedProjectRequestedTo, getAcceptedProjectTeamMemberController, getAcceptedProjectTeamMemberOfAProjectController, getAllProjectJoinRequests, getAllSentProjectByRequestedByController, getProjectRequestedBy, getProjectRequestedTo, leaveTaskFromProjectController, updateProjectJoinRequestStatus } from "./projectJoinRequest.controller.js";
import { validateRequest } from "../../middlewars/validateRequest.js";
import { createProjectJoinRequestZodSchema, updateStatusZodSchema } from "./projectJoinRequest.validation.js";

const router = express.Router();

router.post("/create-new",  validateRequest(createProjectJoinRequestZodSchema), createNewProjectJoinRequest);
router.get("/getAll", getAllProjectJoinRequests);
router.get("/getAll/sentRequest/:id", getAllSentProjectByRequestedByController);
router.get("/Pending/getProjectOfRequestBy/:id", getProjectRequestedBy);
router.get("/Pending/getProjectOfRequestTo/:id", getProjectRequestedTo);
router.get("/Accepted/getProjectOfRequestTo/:id", getAcceptedProjectRequestedTo);
router.get("/Accepted/teamMemberOf/:projectId/:id", getAcceptedProjectTeamMemberOfAProjectController);
router.get("/Accepted/team-member/:id", getAcceptedProjectTeamMemberController);
router.get("/Accepted/getProjectOfRequestBy/:id", getAcceptedProjectRequestedBy);
router.delete("/deleteRequest/:id", deleteProjectByRequestedBy);
router.patch("/leaveTask/:projectId/:taskId", leaveTaskFromProjectController);
router.put("/updateStatus/:id",updateProjectJoinRequestStatus);

export const ProjectJoinRequestRoutes = router;