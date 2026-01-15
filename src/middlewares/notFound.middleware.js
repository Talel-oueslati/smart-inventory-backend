const AppError = require("../utils/AppError");

exports.notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
};
