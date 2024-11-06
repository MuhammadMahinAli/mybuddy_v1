import express from "express";
import { saveBankTransferFundInfoController } from "./bankTransferfund.controller.js";
const router = express.Router();


router.post("/addInfo", saveBankTransferFundInfoController);
// router.get('/getLink/:id', getPaypalLinkController);
// router.put('/updateLink/:id', updatePaypalLinkController);
// router.delete("/deleteLink/:id", deletePaypalLinkController);



//



export const BankTransferFundInfoRoutes = router;