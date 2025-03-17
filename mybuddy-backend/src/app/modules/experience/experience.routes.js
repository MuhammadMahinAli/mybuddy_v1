// socialInformation.routes.js

import express from "express";
const router = express.Router();
import { validateRequest } from "../../middlewars/validateRequest.js";
import {
  getSingleMemberExperienceController,
  postSingleMemberExperienceController,
  updateExperienceController,
} from "./experience.controller.js";
import {
  createExperienceZodSchema,
  updateExperienceZodSchema,
} from "./experience.validation.js";

router.get("/getExperienceByUser/:id", getSingleMemberExperienceController);
router.post(
  "/create-new",
  validateRequest(createExperienceZodSchema),
  postSingleMemberExperienceController
); // Assuming you want to create social info without specifying a user ID upfront
router.put(
  "/updateExperience/:id",
  validateRequest(updateExperienceZodSchema),
  updateExperienceController
);

export const ExperienceRoutes = router;
