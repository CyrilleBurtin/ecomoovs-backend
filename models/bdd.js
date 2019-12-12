var mongoose = require("mongoose");
// .set('debug', true);

const dotenv = require("dotenv");
dotenv.config();

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

mongoose.connect(process.env.DB_CONNECT, options, err => {
  err ? console.log(err) : console.log("Base de données connectée");
});

module.exports = mongoose;
