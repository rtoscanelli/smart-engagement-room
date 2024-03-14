const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const dataProcessor = require("./utils/process-data");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/data", (req, res) => {
    dataProcessor.updateData(req.body);
    res.sendStatus(200);
});

app.get("/number", (_, res) => {
    res.send(dataProcessor.getCurrentStatistics());
});

app.get("/load-data", (_, res) => {
    res.send(dataProcessor.loadDataFromFile("utils/data.json"));
});

app.post("/reset-data", (_, res) => {
    dataProcessor.resetData();
    res.sendStatus(200);
});

app.get("/", (_, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/classroom-lights", (_, res) => {
	res.sendFile(path.join(__dirname, "views", "classroom-lights.html"));
});

app.get("/admin", (_, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
