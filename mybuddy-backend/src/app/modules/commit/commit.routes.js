import express from "express";
import { createCommitController, getAllCommitController, updateCommitStatusController } from "./commit.controller.js";

const router = express.Router();

router.post("/create-new", createCommitController);
router.get("/getAll", getAllCommitController);
router.put("/updateStatus/:id",updateCommitStatusController);

export const CommitRoutes = router;