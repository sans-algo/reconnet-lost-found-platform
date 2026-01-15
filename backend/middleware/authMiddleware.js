const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes - checks if user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  // Format: "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token (remove "Bearer " prefix)
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token and attach to request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Continue to next middleware/route handler
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token found
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };