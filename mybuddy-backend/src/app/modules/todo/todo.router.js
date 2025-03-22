import express from "express";
import { getSingleMemberTodoController, saveTodoController, updateTodoController } from "./todo.controller.js";
const router = express.Router();



router.post('/add-new', saveTodoController);
router.get('/getTodoOfUser/:id', getSingleMemberTodoController);
router.put("/updateTodo/:todoId", updateTodoController);

export const TodoRoutes = router;