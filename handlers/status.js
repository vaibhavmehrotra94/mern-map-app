const mongoose = require("mongoose"),
  Status = require("../model/status");

module.exports = (req, res) => {
  const id = req.params.id,
    perPage = 10,
    page = parseInt(req.query.page);

  Status.find({ device: id, gps: { $exists: true } })
    .sort({ createdAt: -1 })
    .skip(page * perPage)
    .limit(perPage)
    .select("gps -_id")
    .exec((err, coords) => {
      if (err) {
        console.log("from GetStatus---", err);
      } else {
        res.json(coords);
        console.log("Done: Got Coords.");
      }
    });
}