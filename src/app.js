const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");

const { logger } = require("./middlewares/logger.middleware");
const { notFound } = require("./middlewares/notFound.middleware");
const { globalErrorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Smart Inventory API running...");
});
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use(notFound);
console.log("logger:", logger);
console.log("notFound:", notFound);
console.log("globalErrorHandler:", globalErrorHandler);

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
