import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
import {loginZodSchema} from "./auth.validation.js";
import {loginUser} from "./auth.controller.js";
const router = express.Router();

router.post("/login", validateRequest(loginZodSchema), loginUser);

export const AuthRoutes = router;
