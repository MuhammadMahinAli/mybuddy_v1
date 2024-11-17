import express from "express";
import { deleteAdminBankInfoController, getAdminBankInfoController, saveAdminBankInfoController, updateAdminBankInfoController } from "./adminBankInfo.controller.js";
const router = express.Router();


router.post("/addInfo", saveAdminBankInfoController);
//router.get('/getAll', getAllBankTransferFundInfoController);
//router.put("/updateStatus/:id",updateBankTransferFundStatusServiceController);
router.delete("/deleteAdminBankInfo/:id", deleteAdminBankInfoController);
router.get('/getAdminBankInfo/:id', getAdminBankInfoController);
//router.get('/getFundByProject/:id', getBankFundByProjectController);
router.put('/updateAdminBankInfo/:id', updateAdminBankInfoController);




//



export const AdminBankInfoRoutes = router;