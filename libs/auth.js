const jwt = require('jsonwebtoken')

function verifyJWTToken(token){

  const tokenChecker = jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => 
  {
    console.log('toto')
    var currentTime = Date.now() / 1000;

    if (err || !decodedToken){
      console.log(err)
    } else if (decodedToken > current_time ){
      console.log('currentTime', currentTime)
      console.log('decodedToken', decodedToken)
      return (decodedToken) 
    }
  })
  return tokenChecker
}

module.exports = verifyJWTToken