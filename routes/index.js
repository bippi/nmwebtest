var express = require("express");
var router = express.Router();
var _ = require("lodash");

/* GET home page. */
router.get("*", (req, res) => {
  res.render("index", {
    apiUrl: process.env.NM_REST_API_URL ? process.env.NM_REST_API_URL : null
  });
});

module.exports = router;
