

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message); // Logs error message
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack); // Logs stack trace in development
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Hide stack trace in production
  });
};

module.exports = errorHandler;
