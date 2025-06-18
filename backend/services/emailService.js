const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, message) => {
  await transporter.sendMail({
    from: `"News Alerts" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
    html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
  });
};

module.exports = sendEmail;
