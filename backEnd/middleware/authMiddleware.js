const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    
  const token = req.header('x-auth-token');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.secretKey);

    // Add the decoded user to the request object
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
