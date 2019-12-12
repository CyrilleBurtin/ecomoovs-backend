const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const token = req.headers.authorization.split(" ")[1];
  const tokenChecker = jwt.verify(
    token,
    process.env.SECRET_TOKEN,
    (err, decodedToken) => {
      var currentTime = Date.now() / 1000;

      if (err || !decodedToken) {
        return console.log(err);
      } else if (decodedToken > current_time) {
        return decodedToken;
      } else {
        return false
      }
    }
  );
  return tokenChecker;
};
