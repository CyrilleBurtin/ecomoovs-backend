var mongoose = require("../models/bdd");

var moovShema = mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  email: String,
  phone: String,
  url: String,
  title: {
    type: String,
    required: true
  },
  punchline: String,
  description: {
    type: String,
    required: true
  },
  regNumber: String,
  tags: {
    type: Array
  },
  facebook: String,
  instagram: String,
  twitter: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  img: Object,
  validated: Boolean
});

module.exports = mongoose.model("moovs", moovShema);