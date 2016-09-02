const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = function(config, method, receipients, subject, htmlBody, textBody, sender, replyTo, done) {

  let mailOptions = {
    from: sender, // sender address
    to: receipients, // list of receivers
    subject: subject // Subject line
  };

  if (textBody !== ''){
    mailOptions.text = textBody;  // plaintext body
  }

  if (htmlBody !== ''){
    mailOptions.html = htmlBody; // html body
  }

  if(replyTo !== ''){
    mailOptions.replyTo = replyTo;
  }

  const transporter = getTransport(method, config);

  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      done(error, null);
    } else {
      done(null);
    }
  });

};

const getTransport = function(method, config) {
  let transporter;

  switch (method) {
  case 'gmail':
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.gmail.username,
        pass: config.gmail.appPassword
      }
    });
    break;

  case 'smtp':
    transporter = nodemailer.createTransport(smtpTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      tls: config.smtp.tls
    }));
    break;

  default:
    console.log('unsupported email type specified');
  }

  return transporter;
};

module.exports = {
  send: sendEmail
};
