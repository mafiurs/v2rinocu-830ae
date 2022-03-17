require('dotenv').config();
const mailerConfig = require('./config');

module.exports = async function sendMail({ to, subject, body }) {
  try {
    const { transporter } = mailerConfig;
    let info = await transporter.sendMail({
      from: process.env.NOREPLY_EMAIL_ADDRESS,
      text: 'TEST!',
      to: to,
      subject: subject,
      html: body
    });
    return info;
  } catch (err) {
    return err;
  }
};
