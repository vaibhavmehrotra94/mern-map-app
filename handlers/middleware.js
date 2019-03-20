"use strict";
require("dotenv").config({ path: "./.." });

const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers["x-access-token"] || req.headers["authentication"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log("token error in middleware");
        return res.redirect("http://localhost:3000/"); //Some CORS Issue
      } else {
        req.decoded = decoded;
        console.log("middleware success");
        next();
      }
    });
  } else {
    console.log("Token not found in middleware");
    return res.redirect("http://localhost:3000/"); //Some CORS Issue
  }
};

module.exports = {
  checkToken: checkToken
};
