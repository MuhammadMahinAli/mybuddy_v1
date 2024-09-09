import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
const router = express.Router();
import { createNewFriendRequest, deleteFriendRequestController, getAcceptedFriendRequestController, getAllFriendRequestController, getAllPendingFriendRequestByController, getOthersAcceptedFriendRequestController, getPendingFriendRequestController, updateFriendRequestStatusController } from "./friendRequest.controller.js";
import { createFriendRequestZodSchema } from "./friendRequest.validation.js";



router.post("/new-request", validateRequest(createFriendRequestZodSchema), createNewFriendRequest);
router.get("/Pending/getFriendRequest/:id", getPendingFriendRequestController);
router.get("/getAll/:id", getAllFriendRequestController);
router.get("/Pending/getAll/:id", getAllPendingFriendRequestByController);
router.get("/accepted/getFriendRequest/:id", getAcceptedFriendRequestController);
router.get("/others-accepted/getFriendRequest/:id", getOthersAcceptedFriendRequestController);
router.put("/updateStatus/:id",updateFriendRequestStatusController);
router.delete("/deleteFriendRequest/:id", deleteFriendRequestController);
//router.get("/getAll", getAllPost);


export const FriendRequestRoutes = router;