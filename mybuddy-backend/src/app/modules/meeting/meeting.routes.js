import express from "express";
const router = express.Router();
import {createMeetingController, getMeetingByCreatorController, getMeetingsForMeetingMemberController, getMeetingStatus, getSingleMeetingById, updateAttendanceStatus, updateMembersAttendanceStatusController} from './meeting.controller.js'


router.post('/create-new', createMeetingController);
router.get('/getMeetingById/:id', getSingleMeetingById)
router.get('/getMeetingByMeetingMember/:memberId', getMeetingsForMeetingMemberController)
router.patch('/update-attendance', updateAttendanceStatus);
router.post('/updateAttendance', updateMembersAttendanceStatusController);
router.get("/status", getMeetingStatus);
router.get("/getAllMeetingOf/:id", getMeetingByCreatorController);

export const MeetingRoutes = router;