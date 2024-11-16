import express from "express";
import { deletePaypalFundController, getAllPaypalFundInfoController, getPaypalFundByProjectController, getPaypalFundByRequestedToController, savePaypalFundInfoController, updatePaypalFundStatusServiceController } from "./paypalfund.controller.js";
const router = express.Router();


router.post("/addInfo", savePaypalFundInfoController);
router.get('/getAll', getAllPaypalFundInfoController);
router.put("/updateStatus/:id",updatePaypalFundStatusServiceController);
router.delete("/deleteFundRequest/:id", deletePaypalFundController);
router.get('/getFundByRequestedTo/:id', getPaypalFundByRequestedToController);
router.get('/getFundByProject/:id', getPaypalFundByProjectController);

// router.get('/getLink/:id', getPaypalLinkController);
// router.put('/updateLink/:id', updatePaypalLinkController);




//



export const PaypalFundInfoRoutes = router;