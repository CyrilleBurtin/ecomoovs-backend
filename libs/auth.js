const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {

    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
    if (!token) {
      throw new Error('No token detected');
    }

    try {
      var decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    } catch (err) {
      console.log('err', err);
    }
   
    req.userData = { userId: decoded.userId };

    next();
  } catch (error) {
    throw new Error('Authentification failed');
    return next(error);
  }
};
