var mongoose = require("../models/bdd");

var newsShema = mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  punchLine: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  img: String
});

module.exports = mongoose.model("news", newsShema);
