import express from "express";
import { createNewProject, getAllProjects, getAllProjectByUserController, getSingleProjectController, addTaskToProjectController } from "./project.controller.js";
import { createProjectZodSchema } from "./project.validation.js";
import { validateRequest } from "../../middlewars/validateRequest.js";


const router = express.Router();

router.post("/create", createNewProject);
router.post("/create-task", addTaskToProjectController)
router.get("/getAll", getAllProjects);
router.get("/getUserProjectById/:id", getAllProjectByUserController);
router.get("/getProjectById/:id", getSingleProjectController);

export const ProjectRoutes = router;