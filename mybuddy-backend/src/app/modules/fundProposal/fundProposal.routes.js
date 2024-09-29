import express from "express";
import {  confirmPaymentController, createPaymentSessionController, deleteFundRequestController, getAllFundRequestByProjectController, getAllFundRequestByRequestedByController, getAllFundRequestByRequestedToController } from "./fundProposal.controller.js";
const router = express.Router();



router.get('/confirm-payment', confirmPaymentController);
router.get('/getAll/:id', getAllFundRequestByProjectController);
router.get('/getFundByRequestedBy/:id', getAllFundRequestByRequestedByController);
router.get('/getFundByRequestedTo/:id', getAllFundRequestByRequestedToController);
router.post("/new-request", createPaymentSessionController);
router.delete("/deleteFundRequest/:id", deleteFundRequestController);



export const FundRequestRoutes = router;