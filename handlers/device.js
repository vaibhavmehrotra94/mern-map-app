"use strict";

const mongoose = require("mongoose"),
  Devices = require("../model/devices");

module.exports = (req, res) => {
  console.log("GetDevice accessed.");
  Devices.find()
    .select("id")
    .exec((err, device) => {
      if (err) {
        console.log("from GetDevice---", err);
        // res.json();
      } else {
        res.json(device);
        console.log("Done: Get Device Names.");
      }
    });
}