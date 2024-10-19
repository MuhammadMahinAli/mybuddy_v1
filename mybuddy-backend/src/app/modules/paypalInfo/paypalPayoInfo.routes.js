import express from "express";
import { savePayoneerInfoController, savePaypalInfoController } from "./paypalPayoInfo.controller.js";
const router = express.Router();


router.post("/add-paypal-link", savePaypalInfoController);
router.post("/add-payoneer-link", savePayoneerInfoController);


// router.get('/confirm-payment', confirmPaymentController);
// router.get('/getAll/:id', getAllFundRequestByProjectController);
// router.get('/getFundByRequestedBy/:id', getAllFundRequestByRequestedByController);
// router.get('/getFundByRequestedTo/:id', getAllFundRequestByRequestedToController);
// router.delete("/deleteFundRequest/:id", deleteFundRequestController);



export const PaypalPayoInfoRoutes = router;