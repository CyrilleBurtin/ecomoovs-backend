var mongoose = require("../models/bdd");

var eventShema = mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  punchline: {
    type: String,
    required: true
  },
  dateIn: {
    type: String,
    required: true
  },
  dateOut: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  zipcode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = mongoose.model("event", eventShema);
