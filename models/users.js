var mongoose = require('../models/bdd');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  firstname: {
    type: String,
    required: true,
    min : 4,
    max: 255
  },
  lastname: {
    type: String,
    required: true,
    min : 4,
    max: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    min : 4,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min : 6,
    max : 1024
  },
  phone: String,
  location: {
    address: String,
    zipcode: String,
    city: String,
    country: String
  },
  validated: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

var userModel = mongoose.model('users', userSchema);
userSchema.plugin(uniqueValidator);

module.exports = userModel;
