import express from "express";
import { savePaypalFundInfoController } from "./paypalfund.controller.js";
const router = express.Router();


router.post("/addInfo", savePaypalFundInfoController);
// router.get('/getLink/:id', getPaypalLinkController);
// router.put('/updateLink/:id', updatePaypalLinkController);
// router.delete("/deleteLink/:id", deletePaypalLinkController);



//



export const PaypalFundInfoRoutes = router;