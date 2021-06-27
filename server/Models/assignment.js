//  Required NPM packages
const mongoose = require("mongoose");
// assignment schema to store data in Mongo DB
const assignmentSchema = {
  assignmentId: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    require: [true],
  },
  title: {
    type: String,
    require: [true],
  },
  dueDate: {
    type: String,
    require: [true],
  },
  dueTime: {
    type: String,
    require: [true],
  },
  formLink: {
    type: String,
  },
  assigneesName: {
    type: Array,
    require: [true],
  },
  assignmentInstructions:{
    type: Array,
  }
};

// model for CRUD operations
const assignment = mongoose.model("assignment", assignmentSchema);

// Export the module
module.exports = assignment;
