import express from "express";
import { deletePayoneerLinkController, getPayoneerLinkController, savePayoneerInfoController,  updatePayoneerLinkController } from "./payoneerInfo.controller.js";
const router = express.Router();


//router.post("/add-paypal-link", savePayoneerInfoController);
router.post("/addLink", savePayoneerInfoController);
router.get('/getLink/:id', getPayoneerLinkController);
//router.put('/update-paypal-link/:id', updatePayoneerLinkController);
router.put('/updateLink/:id', updatePayoneerLinkController);
router.delete("/deleteLink/:id", deletePayoneerLinkController);


// router.get('/confirm-payment', confirmPaymentController);
// 
// router.get('/getFundByRequestedBy/:id', getAllFundRequestByRequestedByController);
// router.get('/getFundByRequestedTo/:id', getAllFundRequestByRequestedToController);
//



export const PayoneerInfoRoutes = router;