const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "Blue";

app.get("/status", (req, res) => {
  res.status(200).json({
    status: "API is running successfully",
    service: "NodeJS Blue-Green CI/CD REST API",
    version: VERSION
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "NodeJS Blue-Green Deployment API",
    version: VERSION,
    endpoint: "/status"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});