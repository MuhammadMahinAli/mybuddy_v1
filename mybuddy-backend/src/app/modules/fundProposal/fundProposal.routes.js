import express from "express";
import {  confirmPaymentController, createPaymentSessionController, getAllFundRequestByProjectController, getAllFundRequestByRequestedByController, getAllFundRequestByRequestedToController } from "./fundProposal.controller.js";
const router = express.Router();


//router.post('/new-request', createPaymentSessionController);
router.get('/confirm-payment', confirmPaymentController);
router.get('/getAll/:id', getAllFundRequestByProjectController);
router.get('/getFundByRequestedBy/:id', getAllFundRequestByRequestedByController);
router.get('/getFundByRequestedTo/:id', getAllFundRequestByRequestedToController);
router.post("/new-request", createPaymentSessionController);




export const FundRequestRoutes = router;