// Required NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// Config file for twilio to make API calls
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");
const log = console.log;
// get env file that posses private keys
const dotenv = require("dotenv");
dotenv.config();

// connect Mongo Atlas
const DB = process.env.MONGO_URL; // URL string to connect DB
// call the Mongo Atlas for connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connections successful"))
  .catch((err) => console.log(err));

// create app from express
const app = express();

// Cors config in order to remove any error while deployment
app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes module to handle any activity related to chat
const chatRoute = require("./Routes/chat.routes");
app.use("/chat", chatRoute);

// Routes module to handle any activity related to user
const userRoute = require("./Routes/user.routes");
app.use("/user", userRoute);

// Routes module to handle any activity related to meet
const videoRoute = require("./Routes/video.routes");
app.use("/video", videoRoute);

// Routes module to handle any activity related to assignment
const assignmentRoute = require("./Routes/assignment.routes");
app.use("/assignment", assignmentRoute);

// Step 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID, // TODO: your gmail account
    pass: process.env.MAIL_SECRET, // TODO: your gmail password
  },
});

// Step 2
// Step 2
transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));
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

// Step 4

app.post("/send", (req, res) => {
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return log("Error occurs", err);
    }
    return log("Email sent!!!");
  });
});

// route to test working of backend
app.get("/", (req, res) => {
  res.send("Backend for MS teams clone");
});
// Server to run express app
app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server started");
});
