var express = require("express");
var router = express.Router();
var axios = require("axios");
var https = require("https");

var env = process.env.NODE_ENV || "development";

var username = process.env.admin_username || "";
var password = process.env.admin_password || "";

const instance = axios.create({
  auth: {
    username,
    password,
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

let validIps = [];
if (process.env.NM_IP_WHITELIST) {
  validIps = process.env.NM_IP_WHITELIST.split(",");
}

function isOpen(req, res, next) {
  const open = process.env.NM_SCORE_ADMIN;
  if (open === "true") {
    next();
  } else {
    res.status("403");

    res.send("Forbidden");
  }
}

router.post("/match", isOpen, (req, res) => {
  const { home_score, away_score, match_id } = req.body;
  instance
    .put(`${process.env.NM_REST_API_URL}/Matches/${match_id}`, {
      home_team_goals: Number(home_score),
      away_team_goals: Number(away_score),
    })
    .then((resp) => {
      res.send({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send({ status: "error" });
    });
});

router.post("/resetMatch", isOpen, (req, res) => {
  const { match_id } = req.body;
  console.log("delete match", match_id);
  instance
    .delete(`${process.env.NM_REST_API_URL}/Matches/${match_id}`)
    .then((resp) => {
      res.send({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send({ status: "error" });
    });
});

router.get("*", isOpen, (req, res) => {
  res.render("admin", {
    apiUrl: process.env.NM_REST_API_URL ? process.env.NM_REST_API_URL : null,
  });
});

module.exports = router;
