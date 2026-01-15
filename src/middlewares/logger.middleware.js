exports.logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const time = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} → ${res.statusCode} (${time}ms)`
    );
  });

  next();
};
