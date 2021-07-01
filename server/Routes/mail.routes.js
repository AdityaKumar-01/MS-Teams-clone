// required NPM packages
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var dateFormat = require("dateformat");

require("dotenv").config();

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");

const user = require("../Models/user.js");

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
    viewPath: "./views/",
  })
);

const scriptFormatter = (data, name) => {
  var now = new Date();

  var topSection = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mail Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "Ubuntu", sans-serif;
        width: 100%;
        background-color: rgb(237, 237, 237);
      }
      .mail-wrapper {
        padding: 0 3%;
      }
      .mail-wrapper,
      .mail-container {
        width: 100%;
      }
      .mail-container {
        width: 100%;
        border-radius: 5px;
        background-color: rgb(237, 237, 237);
      }
      .header {
        width: 100%;
        height: 100px;
        padding: 1%;
        background-color: #343f56;
        margin-bottom: 5%;
      }
      .header-text,
      .header-time {
        color: #f54748;
      }
      .header-text {
        font-size: 25px;
        margin-bottom: 10px;
      }
      .title {
        text-align: center;
        font-size: 28px;
      }
      .details {
        text-align:center;
        height: 100%;
      }
      .receiver {
        font-size: 25px;
        margin-bottom: 2%;
      }
      .instruction-title {
        font-size: 23px;
        text-align: center;
      }
      
      .instruction-container {
        padding-top: 2%;
      }
      .instruction-list {
        margin-top: 3%;
      }
      .btn {
        height: 30px;
        width: 50%;
        background-color: #343f56;
        outline: none;
        border: none;
        border-radius: 5px;
        margin: 3%;
      }
      .btn a,
      .footer p a {
        text-decoration: none;
        color: #f54748;
      }
      .footer {
        text-align: center;
        margin: 3%;
      }
      .head-img img {
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="mail-wrapper">
      <div class="mail-container">
        <div class="header">
          <div class="header-text">Assignment Update</div>
          <div class="header-time">${dateFormat(
            now,
            "mmmm dS, yyyy"
          )} | ${dateFormat(now, "h:MM TT")}</div>
        </div>
        <div class="title">You have a new Assignment on MS Teams Clone</div>
        <div class="head-img">
          <img
            src="https://tlr.stripocdn.email/content/guids/CABINET_84164752b8a377d5e94cfc0e1ea2c8e6/images/92931515066045884.jpg"
            alt="img"
          />
        </div>
        <div class="details">
          <div class="receiver">Hey ${name} !!!</div
          ><div class="instruction-title">Assignment by ${data.sender}</div
          ><div class="instruction-container"
            ><div>Instructions for ${data.title}</div>
            <div class="instruction-list">`;
  data.instructions.forEach((point) => {
    topSection += `<div
    ><img
      src="https://tlr.stripocdn.email/content/guids/cab_pub_7cbbc409ec990f19c78c75bd1e06f215/images/Check_Mark_Black5.png"
      alt
      width="16"
    />
    ${point}</div
  >
</div>`;
  });

  var lowerSection = `<button class="btn">
              <a href="https://ms-teams-clone.netlify.app/" target="_blank"
                >Open Assignment</a
              >
            </button>
          </div>
        </div>
        <div class="footer">
          <p>
            You receive this mail beacuse ${data.sender} assign you this on<a
              href="https://ms-teams-clone.netlify.app/"
              target="_blank"
            >
              MS Teams Clone</a
            >
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
  return topSection + lowerSection;
};

router.post("/send",  (req, res) => {
  var data = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    title: req.body.title,
    dueDay: req.body.dueDay,
    dueTime: req.body.dueTime,
    instructions: req.body.instructions,
  };
  data.receiver.forEach(async (name) => {
    var script = scriptFormatter(data, name);
    userObj = await user.find({ userName: name });
    if(userObj[0]){
      
      let mailOptions = {
        from: "MS Teams Clone", // TODO: email sender
        to: userObj[0].email, // TODO: email receiver
        subject: "New Assignment on MS Teams Clone",
        text: "Assignment Update!!",
        html: script,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return console.log("Error occurs", err);
        }
        return console.log("Email sent!!!");
      });
    }
    res.json({ status: 200, msg:"Mail sent successfully!" });
  });
});
module.exports = router; // export the module
