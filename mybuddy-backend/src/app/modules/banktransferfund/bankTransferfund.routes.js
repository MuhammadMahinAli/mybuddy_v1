import express from "express";
import {
  deleteBankFundController,
  getAllBankTransferFundInfoController,
  getBankFundByProjectController,
  getBankFundByRequestedByController,
  getBankFundByRequestedToController,
  saveBankTransferFundInfoController,
  updateBankTransferFundStatusServiceController,
} from "./bankTransferfund.controller.js";
const router = express.Router();

router.post("/addInfo", saveBankTransferFundInfoController);
router.get("/getAll", getAllBankTransferFundInfoController);
router.put("/updateStatus/:id", updateBankTransferFundStatusServiceController);
router.delete("/deleteFundRequest/:id", deleteBankFundController);
router.get("/getFundByRequestedTo/:id", getBankFundByRequestedToController);
router.get("/getFundByRequestedBy/:id", getBankFundByRequestedByController);
router.get("/getFundByProject/:id", getBankFundByProjectController);
// router.put('/updateLink/:id', updatePaypalLinkController);

//

export const BankTransferFundInfoRoutes = router;
