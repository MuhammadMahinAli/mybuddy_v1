// emailService.js

import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: 'kwsfatema@gmail.com',
      pass: 'hynu cmjv wzga knes',
    },
  });

  const mailOptions = {
    from: 'kwsfatema@gmail.com',
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};
