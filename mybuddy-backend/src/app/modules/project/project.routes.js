import express from "express";
import { createNewProject, getAllProjects, getAllProjectByUserController } from "./project.controller.js";
import { createProjectZodSchema } from "./project.validation.js";
import { validateRequest } from "../../middlewars/validateRequest.js";


const router = express.Router();

router.post("/create", validateRequest(createProjectZodSchema),createNewProject);
router.get("/getAll", getAllProjects);
router.get("/getUserProjectById/:id", getAllProjectByUserController);


export const ProjectRoutes = router;