const express = require("express");
const router = express.Router();
const dataProcessor = require("../utils/process-data");

router.get("/get-statistics", (_, res) => {
    res.send(dataProcessor.getCurrentStatistics());
});

router.get("/get-attendance", (_, res) => {
    res.send(dataProcessor.getAttendances());
});

router.get("/get-regions", (_, res) => {
    res.send(dataProcessor.getRegions());
});

module.exports = router;
