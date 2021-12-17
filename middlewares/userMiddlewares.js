const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const a = require("../utils/generateToken");

module.exports = (req, res, next) => {
  console.log("req.headers", req.headers);
  console.log("jwt", jwt);
};
