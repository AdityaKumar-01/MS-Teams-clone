// Required NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

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

// Server to run express app
app.listen(5000, (req, res) => {
  console.log("server started");
});
