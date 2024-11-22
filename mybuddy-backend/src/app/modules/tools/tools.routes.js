import express from "express";
import { getAllToolsController, saveToolsController } from "./tools.controller.js";
const router = express.Router();


router.post("/add-new", saveToolsController);
router.get('/getAll', getAllToolsController);
//router.put("/updateStatus/:id",updateBankTransferFundStatusServiceController);
//router.delete("/deleteAdminBankInfo/:id", deleteAdminBankInfoController);
//router.get('/getAdminBankInfo/:id', getAdminBankInfoController);
//router.get('/getFundByProject/:id', getBankFundByProjectController);
//router.put('/updateAdminBankInfo/:id', updateAdminBankInfoController);




//



export const AdminToolsRoutes = router;