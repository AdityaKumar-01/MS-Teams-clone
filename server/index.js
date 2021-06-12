const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const DB = process.env.MONGO_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connections successful"))
  .catch((err) => console.log(err));

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

const chatRoute = require("./Routes/chat.routes");
app.use("/chat", chatRoute);

const userRoute = require("./Routes/user.routes");
app.use("/user", userRoute);

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("server started");
});
