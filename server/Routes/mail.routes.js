// required NPM packages
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
require("dotenv").config();
// Config file for twilio to make API calls
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID, // TODO: your gmail account
    pass: process.env.MAIL_SECRET, // TODO: your gmail password
  },
});

// Step 2
transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath:"./views/",
  })
);


// Step 4


router.post("/send", (req, res) =>{
    let mailOptions = {
      from: "MS Teams Clone", // TODO: email sender
      to: "aditya.2019@vitstudent.ac.in", // TODO: email receiver
      subject: "Nodemailer - Test",
      text: "Wooohooo it works!!",
      template: "index",
      context: {
        name: "Accime Esterling",
      }, // send extra values to template
    };


    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return log("Error occurs",err);
      }
      return log("Email sent!!!");
    });
})
module.exports = router; // export the module
