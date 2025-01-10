const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Hide stack trace in production
  });
};

module.exports = errorHandler;