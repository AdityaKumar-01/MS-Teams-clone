const mongoose = require("mongoose");

const userSchema = {
  email: {
    type: String,
    require: [true],
  },
  userName: {
    type: String,
    require: [true],
  },
  password: {
    type: String,
    require: [true],
  },
};

const user = mongoose.model("user", userSchema);

module.exports = user;
