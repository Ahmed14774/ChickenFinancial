const jwt = require('jsonwebtoken');
const TOKEN_SECRET='youllneverfindthiskey';

function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
  
    // if (token == null) return res.sendStatus(401)
  
    // jwt.verify(token, TOKEN_SECRET as string, (err: any, user: any) => {
    //   console.log(err)
    //   if (err) return res.sendStatus(403)
    //   req.user = user
    //   next()
    // })
    return true;
  }

  module.exports = jwt;
  exports.authenticateToken = authenticateToken;
  exports.TOKEN_SECRET = TOKEN_SECRET;

  // To use this function you will need to include the line in your routes file:
  // const authVerify = require('./util/authVerify');
  // To call the authenticateToken function use the following:
  // ${authVerify.authenticateToken()}