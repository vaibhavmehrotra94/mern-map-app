"use strict";
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({});

deviceSchema.index({ id: 1 });

module.exports = mongoose.model("devices", deviceSchema);
