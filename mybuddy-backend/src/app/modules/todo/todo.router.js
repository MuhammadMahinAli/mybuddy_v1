import express from "express";
import { saveTodoController } from "./todo.controller.js";
const router = express.Router();



router.post('/add-new', saveTodoController);


export const TodoRoutes = router;