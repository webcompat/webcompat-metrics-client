const express = require("express");

const router = express.Router();
// TODO: server data from database
const fakeData = require("../data/needsdiagnosis.json");

/* GET needsdiagnosis API data. */
router.get("/needsdiagnosis", function(req, res, next) {
  res.json(fakeData);
});

module.exports = router;
