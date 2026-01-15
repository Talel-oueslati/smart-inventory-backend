// src/middlewares/error.middleware.js

const AppError = require("../utils/AppError"); // optional if you use it

const globalErrorHandler = (err, req, res, next) => {
  console.error("❌ ERROR:", err.message);

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
};

// ✅ Correct export
module.exports = { globalErrorHandler };
