const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async ( req, res, next) => {
  console.log("authMiddleware")

  try {

  
    const authHeader = req.headers['authorization'];

     // Check if Authorization header exists
    if (!authHeader) {
      console.log('no header');
      return res.status(401).json({ success: false, message: 'Access denied, no token provided.' });
    }
 
    const token = authHeader.replace('Bearer ', ''); //extract

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded)
    console.log('decoding tojen')

    const user = await User.findById(decoded.userId);

    if(!user) {
      console.log('no user');
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    req.user = user;
    next();
  
  } catch {
    console.error('Token verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    } else {
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  } 


}

module.exports = authMiddleware;
