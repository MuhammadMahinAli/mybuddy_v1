
import crypto from 'crypto';
import { Attendance } from './attendance.model.js';

// Generate OTP and expiry date (valid for 5 minutes)
export const generateOtpAndExpiry = () => {
  const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Expiry time set to 5 minutes from now
  return { otp, otpExpires };
};

// Update attendance with OTP and attended status
export const updateAttendanceService = async (attendanceId, otp) => {
  const attendance = await Attendance.findById(attendanceId);

  if (!attendance) throw new Error('Attendance record not found');
  if (attendance.otpExpires < Date.now()) throw new Error('OTP expired');

  if (attendance.otp === otp) {
    attendance.attended = true;
    await attendance.save();
    return attendance;
  } else {
    throw new Error('Invalid OTP');
  }
};
