import express from "express";
import { deleteConferenceLinkController, getConferenceLinkController, saveConferenceLinkController, updateConferenceLinkController } from "./conference.controller.js";
const router = express.Router();


router.post("/addLink", saveConferenceLinkController);
router.get('/getLink', getConferenceLinkController);
router.put('/updateLink/:id', updateConferenceLinkController);
router.delete("/deleteLink/:id", deleteConferenceLinkController);



//



export const ConferenceLinkRoutes = router;