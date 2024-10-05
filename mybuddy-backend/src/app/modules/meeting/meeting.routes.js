import express from "express";
const router = express.Router();
import {createMeetingController} from './meeting.controller.js'


router.post('/create-new', createMeetingController);



export const MeetingRoutes = router;