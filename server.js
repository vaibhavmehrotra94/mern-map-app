"use strict";
require("dotenv").config();

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  cors = require('cors'),
  PORT = 5500;

// Include Files
// *************
const Login = require("./handlers/login"),
  Middleware = require("./handlers/middleware"),
  GetDevices = require("./handlers/device"),
  GetStatus = require("./handlers/status");


// Set Up work Environment
// ***********************
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Connect to DB using .connect
// ****************************
// Connect to MongoDB
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true
});

// API endpoints
// *************

// Auth Endpoint
app.get("/api/auth", Middleware.checkToken, (req, res) => {
  res.sendStatus(200);
})

// Login EndPoint
app.post("/", Login);

// EndPoint for Device Name
app.get("/api/device", Middleware.checkToken, GetDevices);

// Endpoint for Device Coordinates
app.get("/api/device/:id", Middleware.checkToken, GetStatus);

// Server EndPoint
// ***************
app.listen(PORT, (err, a) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
