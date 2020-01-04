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
  punchline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  tags: {
    type: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("news", newsShema);
