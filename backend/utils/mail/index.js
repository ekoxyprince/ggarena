import nodemailer from "nodemailer";

export default function sendMail(mailOption, cb) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mail = transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return cb(error);
    } else {
      cb("Message sent: %s", info.messageId);
    }
  });
}
