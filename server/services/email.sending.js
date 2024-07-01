import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
dotenv.config();

console.log("send email",process.env.EMAIL_USER, process.env.EMAIL_PASS);
// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
    auth: {
        user: "yokheved.spr@gmail.com", // Your email address
        pass: "my_corect_email_password_is_here"  // Your email password
    }
});

// Function to render EJS template
export const renderEJSTemplate = (templatePath, variables) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, variables, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
};

// Function to send an email
const sendEmail = async (to, subject, templatePath, variables) => {
    const html = await renderEJSTemplate(templatePath, variables);

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to, // List of recipients
        subject, // Subject line
        html // HTML body with variables replaced
    };

    // Send email with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error while sending email:', error);
        }
        console.log('Email sent successfully:', info.response);
    });
};

export default sendEmail;
