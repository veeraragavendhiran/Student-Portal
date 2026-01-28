const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the request header
  const authHeader = req.headers.authorization;

  // The header looks like: "Bearer [THE_TOKEN]"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // 2. Verify the token is valid
    const decoded = jwt.verify(token, 'your-secret-jwt-key');

    // 3. Attach user info (id, role) to the request object
    req.user = decoded; 

    // 4. Continue to the actual API route
    next(); 
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;