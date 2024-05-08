const express = require("express");
const app = express();
const port = 4000;

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", (req, res) => {
  res.send("post!");
});

app.post("/users", (req, res) => {
  res.send("post users!");
});

app.post("/timeout", (req, res) => {
  let duration = parseInt(req.query.duration, 10); // Parse the duration parameter as an integer
  if (isNaN(duration) || duration <= 0) {
    duration = 10000;
  }

  let status = req.query.status,
    statusCode = 200;

  if (!req.query.status) status = "success";

  switch (status) {
    case "success":
      statusCode = 200;
      break;
    case "error":
      statusCode = 500;
      break;
    case "bad":
      statusCode = 400;
      break;
    default:
      statusCode = 200;
  }

  setTimeout(() => {
    console.log(`request from ${req.originalUrl} processed`);
    res.status(statusCode).json({ duration, status });
  }, duration);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
