const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDatumSchema = new Schema({
  resumeString: { type: String, required: true },
  jobDescriptionString: { type: String, required: true },
  coverLetterGenString: { type: String, required: true }
});

// Export model
module.exports = mongoose.model("resumeDatum", userDatumSchema);