import express from "express";
import {  confirmPaymentController, createPaymentSessionController, getAllFundRequestByProjectController, getAllFundRequestByRequestedByController } from "./fundProposal.controller.js";
const router = express.Router();


//router.post('/new-request', createPaymentSessionController);
router.get('/confirm-payment', confirmPaymentController);
router.get('/getAll/:id', getAllFundRequestByProjectController);
router.get('/getFundByRequestedBy/:id', getAllFundRequestByRequestedByController);
router.post("/new-request", createPaymentSessionController);




export const FundRequestRoutes = router;