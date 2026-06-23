import logger from "../config/logger.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  // Log error using pino
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
    // Only expose stack trace in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;