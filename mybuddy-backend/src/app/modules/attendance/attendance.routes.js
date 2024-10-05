import express from "express";
const router = express.Router();
import {updateAttendanceController} from './attendance.controller.js'


router.patch('/update-attendance', updateAttendanceController);



export const MeetingRoutes = router;