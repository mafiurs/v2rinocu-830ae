require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NOREPLY_EMAIL_ADDRESS,
    pass: process.env.NOREPLY_EMAIL_PASSWORD
  }
});
transporter.verify().then(() => {
  console.log('ready to send emails');
});

module.exports = {
  transporter
};
