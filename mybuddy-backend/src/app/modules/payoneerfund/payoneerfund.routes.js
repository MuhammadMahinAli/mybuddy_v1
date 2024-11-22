import express from "express";
import { deletePayoneerFundController, getAllPayoneerFundInfoController, getPayoneerFundByProjectController, getPayoneerFundByRequestedByController, getPayoneerFundByRequestedToController, savePayoneerFundInfoController, updatePayoneerFundStatusServiceController } from "./payoneerfund.controller.js";
const router = express.Router();


router.post("/addInfo", savePayoneerFundInfoController);
router.get('/getAll', getAllPayoneerFundInfoController);
router.put("/updateStatus/:id",updatePayoneerFundStatusServiceController);
router.delete("/deleteFundRequest/:id", deletePayoneerFundController);
router.get('/getFundByRequestedTo/:id', getPayoneerFundByRequestedToController);
router.get('/getFundByRequestedBy/:id', getPayoneerFundByRequestedByController);
router.get('/getFundByProject/:id', getPayoneerFundByProjectController);

// router.put('/updateLink/:id', updatePaypalLinkController);




//



export const PayoneerFundInfoRoutes = router;