import express from "express";
import { getUsersToolByMemberController, saveUsersToolsController } from "./usersTools.controller.js";
const router = express.Router();


router.post("/add-new", saveUsersToolsController);
router.get('/getAll/:id', getUsersToolByMemberController);
//router.put("/updateStatus/:id",updateBankTransferFundStatusServiceController);
//router.delete("/deleteAdminBankInfo/:id", deleteAdminBankInfoController);
//router.get('/getAdminBankInfo/:id', getAdminBankInfoController);
//router.get('/getFundByProject/:id', getBankFundByProjectController);
//router.put('/updateAdminBankInfo/:id', updateAdminBankInfoController);




//



export const UsersToolsRoutes = router;