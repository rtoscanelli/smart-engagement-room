const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const uri = "mongodb+srv://Admin:mongodbadmin@mycluster.n2rbgja.mongodb.net/smart-engagement-room-database?retryWrites=true&w=majority&appName=MyCluster"
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Could not connect to MongoDB");
        console.log("Error: ", err);
    });

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

app.post("/regions", (req, res) => {
    dataProcessor.updateRegions(req.body);
    res.sendStatus(200);
});

app.get("/number", (_, res) => {
    res.send(dataProcessor.getCurrentStatistics());
});

app.get("/regions-data", (_, res) => {
    res.send(dataProcessor.getRegions());
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
