import express from "express";
import { createCommitController, getAllCommitController, getCommitByProjectController, getMyAllCommitController, updateCommitStatusController } from "./commit.controller.js";

const router = express.Router();

router.post("/create-new", createCommitController);
router.get("/getAll", getAllCommitController);
router.get("/getMyAllCommit/:id", getMyAllCommitController);
router.get("/getCommitByProject/:id", getCommitByProjectController);
router.put("/updateStatus/:id",updateCommitStatusController);

export const CommitRoutes = router;