import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
const router = express.Router();
import { createNewFriendRequest, getAcceptedFriendRequestController, getOthersAcceptedFriendRequestController, getPendingFriendRequestController, updateFriendRequestStatusController } from "./friendRequest.controller.js";
import { createFriendRequestZodSchema } from "./friendRequest.validation.js";



router.post("/new-request", validateRequest(createFriendRequestZodSchema), createNewFriendRequest);
router.get("/Pending/getFriendRequest/:id", getPendingFriendRequestController);
router.get("/accepted/getFriendRequest/:id", getAcceptedFriendRequestController);
router.get("/others-accepted/getFriendRequest/:id", getOthersAcceptedFriendRequestController);
router.put("/updateStatus/:id",updateFriendRequestStatusController);
//router.get("/getAll", getAllPost);


export const FriendRequestRoutes = router;