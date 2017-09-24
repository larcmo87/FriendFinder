const express = require("express");
const htmlRouter = express.Router();
const path = require("path");

htmlRouter.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../public", "home.html"));
});

htmlRouter.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname + "/../public", "survey.html"));
});

module.exports = htmlRouter;