const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

let data = [];
let currentNumber = 0;

async function addData(req, res, next) {
	console.log("Received data", req.body);
	const newData = req.body;
	data.push(newData);
    currentNumber = newData.totalNumber;
	res.json(newData);
}

app.get("/number", (_, res) => {
    res.json({ totalNumber: currentNumber });
});

app.post("/data", addData);

app.get("/", (_, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/classroom-lights.html", (_, res) => {
	res.sendFile(path.join(__dirname, "views", "classroom-lights.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
