const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    console.log('req.headers', req.headers)
    let header = JASON.parse(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Authentification failed");
    }

 
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    throw new Error("Authentification failed");
  }
};
