import express from "express";
import {  deleteTutorialController, getTutorialsController, saveTutorialsController } from "./tutorials.controller.js";
const router = express.Router();


router.post("/addTutorial", saveTutorialsController);
router.get('/getAll', getTutorialsController);
//router.put('/updateLink/:id', updateConferenceLinkController);
router.delete("/deleteTutorial", deleteTutorialController);
//


//



export const TutorialsRoutes = router;