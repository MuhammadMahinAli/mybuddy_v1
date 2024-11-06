import express from "express";
import { savePayoneerFundInfoController } from "./payoneerfund.controller.js";
const router = express.Router();


router.post("/addInfo", savePayoneerFundInfoController);
// router.get('/getLink/:id', getPaypalLinkController);
// router.put('/updateLink/:id', updatePaypalLinkController);
// router.delete("/deleteLink/:id", deletePaypalLinkController);



//



export const PayoneerFundInfoRoutes = router;