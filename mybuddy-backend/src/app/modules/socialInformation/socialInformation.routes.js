// socialInformation.routes.js

import express from "express";
const router = express.Router();
import {getSingleMemberSocialInfoById, postSingleMemberSocialInfo, updateSocialInfoController} from "./socialInformation.controller.js";
import { createSocialInfoZodSchema, updateSocialInfoZodSchema } from "./socialInformation.validation.js";
import { validateRequest } from "../../middlewars/validateRequest.js";


router.get("/getSocialInfoByUser/:id", getSingleMemberSocialInfoById);
router.post("/add-new", validateRequest(createSocialInfoZodSchema), postSingleMemberSocialInfo); // Assuming you want to create social info without specifying a user ID upfront
router.put("/updateSocialInfo/:id",validateRequest(updateSocialInfoZodSchema), updateSocialInfoController);

export const SingleMemberSocialInfoRoutes = router;