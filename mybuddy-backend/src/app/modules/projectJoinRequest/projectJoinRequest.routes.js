// src/app/modules/projectJoinRequest/projectJoinRequest.routes.js
import express from "express";
import { createNewProjectJoinRequest, deleteProjectByRequestedBy, getAcceptedProjectRequestedTo, getAllProjectJoinRequests, getProjectRequestedBy, getProjectRequestedTo, updateProjectJoinRequestStatus } from "./projectJoinRequest.controller.js";
import { validateRequest } from "../../middlewars/validateRequest.js";
import { createProjectJoinRequestZodSchema, updateStatusZodSchema } from "./projectJoinRequest.validation.js";

const router = express.Router();

router.post("/create-new",  validateRequest(createProjectJoinRequestZodSchema), createNewProjectJoinRequest);
router.get("/getAll", getAllProjectJoinRequests);
router.get("/Pending/getProjectOfRequestBy/:id", getProjectRequestedBy);
router.get("/Pending/getProjectOfRequestTo/:id", getProjectRequestedTo);
router.get("/Accepted/getProjectOfRequestTo/:id", getAcceptedProjectRequestedTo);
router.delete("/deleteRequest/:id", deleteProjectByRequestedBy);
router.put("/updateStatus/:id",updateProjectJoinRequestStatus);

export const ProjectJoinRequestRoutes = router;