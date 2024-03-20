const express = require("express");
const router = express.Router();
const dataProcessor = require("../utils/process-data");

router.post("/post-statistics", (req, res) => {
    dataProcessor.updateData(req.body);
    res.sendStatus(200);
});

router.post("/post-attendance", (req, res) => {
    dataProcessor.updateAttendance(req.body);
    res.sendStatus(200);
});

router.post("/post-regions", (req, res) => {
    dataProcessor.updateRegions(req.body);
    res.sendStatus(200);
});

router.post("/post-reset-data", (_, res) => {
    dataProcessor.resetData();
    res.sendStatus(200);
});

module.exports = router;
