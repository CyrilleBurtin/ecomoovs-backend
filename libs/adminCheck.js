const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('No token detected');
    }

    try {
      let decoded = jwt.decode(token, process.env.SECRET_TOKEN);
      if (decoded.user.admin !== true) {
        throw new Error('vous devez être administrataur');
        return next(error);   
      }
    } catch (error) {
      throw new Error('vous devez être administrataur');
      return next(error);
    }

    next();
  } catch (error) {
    throw new Error('Authentification failed');
    return next(error);
  }
};
