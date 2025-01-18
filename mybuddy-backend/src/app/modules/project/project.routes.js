import express from "express";
import { createNewProject, getAllProjects, getAllProjectByUserController, getSingleProjectController, addTaskToProjectController, deleteProjectController, updateProjectController, deleteTaskFromProjectController, updateTaskStatusController, updateProjectTasksController, updateProjetRequestStatusController, getAllProjectController, updateTaskController, getAllProjectByCategoryController } from "./project.controller.js";
import { createProjectZodSchema } from "./project.validation.js";
import { validateRequest } from "../../middlewars/validateRequest.js";


const router = express.Router();

router.post("/create", createNewProject);
router.post("/create-task/:id", addTaskToProjectController)
router.get("/getAll", getAllProjects);
router.get("/getUserProjectById/:id", getAllProjectByUserController);
router.get("/getProjectById/:id", getSingleProjectController);
router.put('/updateProject/:id', updateProjectController);
router.put('/updateTask/:projectId/:taskId', updateTaskController);
router.delete("/deleteProject/:id", deleteProjectController);
router.delete("/delete-task/:taskId", deleteTaskFromProjectController);
router.put("/:projectId/tasks/:taskId/status", updateTaskStatusController);
router.put('/:projectId/member-request-status', updateProjetRequestStatusController);
router.put("/:projectId/update-tasks", updateProjectTasksController);
router.get("/getAllProject", getAllProjectController);
router.get("/getAllProjectByCategory", getAllProjectByCategoryController);

export const ProjectRoutes = router;