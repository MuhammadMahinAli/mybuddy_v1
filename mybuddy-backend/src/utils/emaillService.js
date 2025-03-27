// emailService.js

import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service hynu cmjv wzga knes
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Research Buddy" <${process.env.NODEMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};
