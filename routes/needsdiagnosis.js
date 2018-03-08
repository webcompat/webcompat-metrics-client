const express = require("express");

const router = express.Router();

/* GET needsdiagnosis dashboard and related routes. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "insert dashboard here" });
});

module.exports = router;
