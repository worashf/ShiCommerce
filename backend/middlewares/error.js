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

    // wrong modgoose id error
    if (err.name === 'CastError') {
      const message = `Resource not found invalid:${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    //handle mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.values).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // handling mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    }
    res.status(err.statusCode).json({
      status: false,
      message: error.message || 'Internal server error',
    });
  }
};
