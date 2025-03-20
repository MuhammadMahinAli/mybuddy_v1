import express from "express";
import { addTodoToProjectTodoController, getSingleMemberProjectTodoController, saveProjectTodoController, updateProjectTodoController } from "./projectTodo.controller.js";
const router = express.Router();


router.post('/add-new', saveProjectTodoController);
router.get('/getAllOfUser/:id', getSingleMemberProjectTodoController);
router.put("/updateProjectTodo/:projectId/:todoId", updateProjectTodoController);
router.patch("/:projectId/add-todo", addTodoToProjectTodoController);


export const ProjectTodoRoutes = router;