import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
const router = express.Router();
import {getSingleMemberSkillById, postSingleMemberSkillController, updateSingleMemberSkillController} from "./skills.controller.js";
import { createSkillZodSchema, updateSkillZodSchema } from "./skills.validation.js";


router.get("/getUserSkillById/:id", getSingleMemberSkillById);
router.post("/addSkills",validateRequest(createSkillZodSchema), postSingleMemberSkillController);
router.put("/updateSkills/:id", validateRequest(updateSkillZodSchema), updateSingleMemberSkillController);


export const SingleMemberSkillRoutes = router;