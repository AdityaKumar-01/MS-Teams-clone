//  Required NPM packages
const mongoose = require("mongoose");

// User schema tostore data in Mongo DB
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
  assignments:{
    type:Array
  }

};

// model for CRUD operations
const user = mongoose.model("user", userSchema);

// Export the module
module.exports = user;
