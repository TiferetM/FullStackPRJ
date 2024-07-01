const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password
  }
});

// Function to send an email
const sendEmail = (to, subject, template, variables) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // List of recipients
    subject, // Subject line
    html: template(variables) // HTML body with variables replaced
  };

  // Send email with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error while sending email:', error);
    }
    console.log('Email sent successfully:', info.response);
  });
};

module.exports = sendEmail;
