import express from "express";
import {createMember,getAllMemberByFilterController,getAllMembers,getSingleMemberById,resendVerificationEmail,resetPasswordController,sendForgetPasswordEmailController,updateMemberById, updateMemberCoverPicController, updateMemberInfoController, updateMemberProfilePicController, verifyEmail} from "./member.controller.js";
import {validateRequest} from "../../middlewars/validateRequest.js";
import {createMemberZodSchema, updateMemberCoverPicZodSchema} from "./member.validation.js";
const router = express.Router();

router.post("/sign-up", validateRequest(createMemberZodSchema), createMember);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);
router.get("/getAll", getAllMembers);
router.get("/getUserById/:id", getSingleMemberById);
router.put('/updateUser/:id', updateMemberById);
router.put("/updateCoverPic/:id", updateMemberCoverPicController);
router.put("/updateProfilePic/:id", updateMemberProfilePicController);
router.put("/updateUserInfo/:id", updateMemberInfoController);
router.post('/sendResetPasswordEmail', sendForgetPasswordEmailController);
router.put('/reset-password', resetPasswordController);
router.get("/getAllMember", getAllMemberByFilterController);
  

export const MemberRoutes = router;
