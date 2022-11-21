const ErrorHandler = require('../utils/errorHandler');
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      status: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;
    res.status(err.statusCode).json({
      status: false,
      message: error.message || 'Internal server error',
    });
  }
  err.message = err.message || 'Internal server error';
  res.status(err.statusCode).json({
    status: false,
    error: err.stack,
  });
};
