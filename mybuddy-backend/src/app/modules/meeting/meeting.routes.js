import express from "express";
const router = express.Router();
import {createMeetingController, deleteMeetingController, getMeetingByCreatorController, getMeetingsForMeetingMemberController, getMeetingStatus, getSingleMeetingById, updateAttendanceStatus, updateMeetingController, updateMembersAttendanceStatusController} from './meeting.controller.js'


router.post('/create-new', createMeetingController);
router.get('/getMeetingById/:id', getSingleMeetingById)
router.get('/getMeetingByMeetingMember/:id', getMeetingsForMeetingMemberController)
router.patch('/update-attendance', updateAttendanceStatus);
router.put('/update-info/:id', updateMeetingController);
router.post('/updateAttendance', updateMembersAttendanceStatusController);
router.get("/status", getMeetingStatus);
router.get("/getAllMeetingOf/:id", getMeetingByCreatorController);
router.delete("/deleteMeeting/:id", deleteMeetingController);

export const MeetingRoutes = router;