import express from "express";
const router = express.Router();
import { getLicensesByUserController, postCreateLicenseController, putUpdateLicenseController } from "./license.controller.js";
import { createLicenseZodSchema, updateLicenseZodSchema } from "./license.validation.js";
import { validateRequest } from "../../middlewars/validateRequest.js";

router.post("/create-new", validateRequest(createLicenseZodSchema), postCreateLicenseController);
router.put("/updateLicense/:id", validateRequest(updateLicenseZodSchema), putUpdateLicenseController);
router.get("/getLicenseByUser/:id", getLicensesByUserController);

export const LicenseRoutes = router;