import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
import {loginZodSchema} from "./auth.validation.js";
import {loginUser, updatePassword} from "./auth.controller.js";
const router = express.Router();

router.post("/login", validateRequest(loginZodSchema), loginUser);
router.put('/update-password', updatePassword);


export const AuthRoutes = router;
