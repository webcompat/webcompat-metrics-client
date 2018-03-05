var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Yo" });
});

/* GET home page. */
router.get("/needsdiagnosis", function(req, res, next) {
  res.render("index", { title: "insert dashboard here" });
});

module.exports = router;
