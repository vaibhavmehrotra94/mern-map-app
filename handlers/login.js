"use strict";
require("dotenv").config({ path: "./.." });

const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  let authString = new Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
  authString = authString.split(":");


  const username = authString[0],
    password = authString[1];

  // For the given username fetch user from DB
  const mockedUsername = "admin",
    mockedPassword = "password";

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      const token = jwt.sign({ username: username }, process.env.SECRET, {
        expiresIn: "1h" // expires in 1 hour (120 sec)
      });

      console.log("Auth Matched*****");
      // return the JWT token for the future API calls
      res.status(200).json({ "authorization": token });

    }
    else {
      console.log("Auth not matching.");
      res.sendStatus(203);
      // res.redirect("http://localhost:3000/");
    }
  }
  else {
    console.log("Username & Password not found");
    res.sendStatus(204);
  }
};
