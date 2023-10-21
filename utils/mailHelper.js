const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const MailEnum = require('../enum/mailEnum');
const messageString = require('../response/responseMessage');

dotenv.config({ path: './config.env' });

const sentMail = async (mailDetails, callback) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp-mail.gmail.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3',
    },
    service: 'gmail',
    auth: {
      user: process.env.SUPPORT_MAIL,
      pass: process.env.SUPPORT_MAIL_PASSWORD,
    },
  });
  if (mailDetails.type == MailEnum.merchantWelcomeMail) {
    const message = mailDetails.text
      .replace(/\[User Name]/g, mailDetails.name)
      .replace(/\[Your Service Name]/g, process.env.SERVICE)
      .replace(/\[User Email\]/g, mailDetails.email)
      .replace(/\[Default Password\]/g, mailDetails.password)
      .replace(/\[Support Email\]/g, process.env.SUPPORT_MAIL)
      .replace(/\[Name\]/g, process.env.ADMIN)
      .replace(/\[Service Name\]/g, process.env.SERVICE);
    let mailOptions = {
      from: process.env.SUPPORT_MAIL,
      to: mailDetails.email,
      subject: mailDetails.subject,
      text: message,
    };
    transporter.sendMail(mailOptions, callback, (err, info) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(messageString.emailSent, info.response);
        callback(null, info.response);
      }
    });
  }
};

module.exports = {
  sentMail,
};
