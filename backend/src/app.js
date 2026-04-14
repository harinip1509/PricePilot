const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const { getDocsHtml } = require("./docs/html");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({
    message: "PricePilot backend is running.",
    docs: "/docs",
    health: "/health",
  });
});

app.get("/docs", (_req, res) => {
  res.type("html").send(getDocsHtml());
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "Internal server error.",
  });
});

module.exports = app;
