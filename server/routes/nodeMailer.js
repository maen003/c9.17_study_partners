// Require modules
const nodemailer = require('nodemailer');
const { USERNAME, PASSWORD } = require('../nodemailerConfig.js');

// If you're going to use your own gmail
// You have to allow less secure apps
// My Account >> Sign-in & Security >> Connected apps & sites >> Allow less secure apps: ON

// You're free to use whatever service you would like
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: USERNAME,     
    pass: PASSWORD  
  }                             
});

// Four important options for our mailOptions
const mailOptions = {
  from: 'kryseno.server@gmail.com',         // Sender of the email
  to: 'kryseno@gmail.com',  // Recipient of the email
  subject: 'FROM ZE SERVER',              // Subject of the email
  text: 'Sah dooo',                // Message of the email
  html: '<h1>Sah dooo</h1>'     // Can be used in place of the text
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent successfully' + info.response);
  }
});

module.exports = nodemailer;