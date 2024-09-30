// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes Bearer token format
    if (!token) {
      return res.status(403).json({ message: 'No token provided, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = authorizeRoles;
