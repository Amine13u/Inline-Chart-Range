const express = require("express");

const router = express.Router();

const metric = require("../services/metricService");

/* GET metric listing */
router.get("/", function (req, res, next) {
  try {
    res.json(metric.getMultiple(req.query.startDate, req.query.endDate));
  } catch (err) {
    console.error(`Error while getting metric `, err.message);
    next(err);
  }
});

module.exports = router;
