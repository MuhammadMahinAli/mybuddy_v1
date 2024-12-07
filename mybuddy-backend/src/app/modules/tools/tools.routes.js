import express from "express";
import { deleteToolController, getAllToolsController, saveToolsController, updateToolController } from "./tools.controller.js";
const router = express.Router();


router.post("/add-new", saveToolsController);
router.get('/getAll', getAllToolsController);
router.put("/updateInfo/:id",updateToolController);
router.delete("/deleteTool/:id", deleteToolController);



export const AdminToolsRoutes = router;