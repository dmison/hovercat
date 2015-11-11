(function() {

  var sendEmail = function(config, method, receipients, subject, htmlBody, textBody, sender, done) {
    console.log(sender)

    var mailOptions = {
      from: sender, // sender address
      to: receipients, // list of receivers
      subject: subject, // Subject line
      text: textBody, // plaintext body
      html: htmlBody // html body
    };

    var transporter = getTransport(method, config);

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        done(error);
      } else {
        console.log('Message sent: ' + info.response);
        done();
      }
    });

  }

  var getTransport = function(method, config) {
    var transporter;

    switch (method) {
      case 'gmail':
        transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: config.email.gmail.username,
            pass: config.email.gmail.appPassword
          }
        });
        break;

      case 'smtp':
        transporter = nodemailer.createTransport(smtpTransport({
          host: config.email.smtp.host,
          port: config.email.smtp.port,
          tls: config.email.smtp.tls
        }));
        break;

      default:
        console.log('unsupported email type specified');
    };

    return transporter;
  };

  module.exports = {
    sendEmail: sendEmail
  }

}())
