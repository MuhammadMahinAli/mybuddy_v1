import express from "express";
import {  confirmPaymentController, createPaymentSessionController, deleteFundRequestController, getAllFundRequestByProjectController, getAllFundRequestByRequestedByController, getAllFundRequestByRequestedToController, getAllStripeFundRequestController, updateStripeFundStatusServiceController } from "./fundProposal.controller.js";
const router = express.Router();

router.get('/confirm-payment', confirmPaymentController);
router.get('/getAll/:id', getAllFundRequestByProjectController);
router.get('/getAll', getAllStripeFundRequestController);
router.get('/getFundByRequestedBy/:id', getAllFundRequestByRequestedByController);
router.get('/getFundByRequestedTo/:id', getAllFundRequestByRequestedToController);
router.post("/new-request", createPaymentSessionController);
router.delete("/deleteFundRequest/:id", deleteFundRequestController);
router.put("/updateStatus/:id",updateStripeFundStatusServiceController);


export const FundRequestRoutes = router;