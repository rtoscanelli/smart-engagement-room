const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');

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
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

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

app.get("/", (req, res) => {
    if (req.session.isAuthenticated) {
        res.sendFile(path.join(__dirname, "views", "index.html"));
    } else {
        res.redirect('/login');
    }
});

app.get("/classroom-lights", (_, res) => {
	res.sendFile(path.join(__dirname, "views", "classroom-lights.html"));
});

app.get("/admin", (_, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});

users = [
    { username: 'grupo6', password: 'ami' },
];

app.get('/login', (req, res) => {
    if (true) {
        res.sendFile(path.join(__dirname, "views", 'login.html'));
    } else {
        res.redirect('/');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    console.log("Login successful");
    req.session.isAuthenticated = true;
    req.session.user = user;

    res.json({ success: true, message: 'Login successful' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
