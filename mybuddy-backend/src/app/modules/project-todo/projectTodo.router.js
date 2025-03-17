import express from "express";
import { getSingleMemberProjectTodoController, saveProjectTodoController } from "./projectTodo.controller.js";
const router = express.Router();


router.post('/add-new', saveProjectTodoController);
router.get('/getAllOfUser/:id', getSingleMemberProjectTodoController);


export const ProjectTodoRoutes = router;