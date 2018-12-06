const path = require("path");

const express = require("express");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.resolve(__dirname, "../build")));

// Handles any requests that don't match the ones above
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
