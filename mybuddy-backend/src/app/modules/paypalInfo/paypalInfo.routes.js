import express from "express";
import { deletePaypalLinkController, getPaypalLinkController, savePaypalInfoController, updatePaypalLinkController } from "./paypalInfo.controller.js";
const router = express.Router();


router.post("/addLink", savePaypalInfoController);
//router.post("/add-payoneer-link", savePayoneerInfoController);
router.get('/getLink/:id', getPaypalLinkController);
router.put('/updateLink/:id', updatePaypalLinkController);
//router.put('/update-payoneer-link/:id', updatePayoneerLinkController);
router.delete("/deleteLink/:id", deletePaypalLinkController);



//



export const PaypalInfoRoutes = router;