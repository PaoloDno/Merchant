const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
      next(); // Proceed to next middleware or route handler
  } else {
      const error = new Error('Admin access required');
      error.statusCode = 403;
      next(error); // Pass the error to the error handler
  }
};

module.exports = adminMiddleware;