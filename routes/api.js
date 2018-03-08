const express = require("express");

const router = express.Router();

const fakeData = require("../data/needsdiagnosis.json");

/* GET /api/needsdiagnosis. */
router.get("/needsdiagnosis", function(req, res, next) {
  res.json(fakeData);
});

module.exports = router;
