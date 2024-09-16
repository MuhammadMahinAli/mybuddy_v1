// utils/forgotPassword.js

import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email, user, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAIL_USER,
    to: email,
    subject: "Research Buddy - Password Reset Request",
    html: `
    <div style="font-family: Arial, sans-serif;">
      <img src="https://i.ibb.co/g9fcnQq/logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
      <p style="padding-top: 10px;">Dear ${user.name.firstName} ${user.name.lastName},</p>
      <p>You have requested to reset your password. Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
       <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Research Buddy Team</p>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
