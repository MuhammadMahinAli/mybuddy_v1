import express from "express";
import { createNewProject, getAllProjects, getAllProjectByUserController, getSingleProjectController, addTaskToProjectController, deleteProjectController, updateProjectController, deleteTaskFromProjectController, updateTaskStatusController, updateProjectTasksController } from "./project.controller.js";
import { createProjectZodSchema } from "./project.validation.js";
import { validateRequest } from "../../middlewars/validateRequest.js";


const router = express.Router();

router.post("/create", createNewProject);
router.post("/create-task/:id", addTaskToProjectController)
router.get("/getAll", getAllProjects);
router.get("/getUserProjectById/:id", getAllProjectByUserController);
router.get("/getProjectById/:id", getSingleProjectController);
router.put('/updateProject/:id', updateProjectController);
router.delete("/deleteProject/:id", deleteProjectController);
router.delete("/delete-task/:taskId", deleteTaskFromProjectController);
router.put("/:projectId/tasks/:taskId/status", updateTaskStatusController);


router.put("/:projectId/update-tasks", updateProjectTasksController);

export const ProjectRoutes = router;