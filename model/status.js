"use strict";
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({});

statusSchema.index({ device: 1 });

module.exports = mongoose.model("status", statusSchema);
