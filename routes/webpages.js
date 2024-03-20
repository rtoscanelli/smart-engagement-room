const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.isAuthenticated) {
        res.sendFile(path.join(__dirname, "../views", "index.html"));
    } else {
        res.redirect('/login');
    }
});

router.get("/attendance", (req, res) => {
    if (req.session.isAuthenticated) {
        res.sendFile(path.join(__dirname, "../views", "attendance.html"));
    }
    else {
        res.redirect('/login');
    }
});

router.get("/classroom-lights", (req, res) => {
    if (req.session.isAuthenticated) {
        res.sendFile(path.join(__dirname, "../views", "classroom-lights.html"));
    }
    else {
        res.redirect('/login');
    }
});

router.get("/admin", (req, res) => {
    if (req.session.isAuthenticated) {
        res.sendFile(path.join(__dirname, "../views", "admin.html"));
    }
    else {
        res.redirect('/login');
    }
});

users = [
    { username: 'grupo6', password: 'ami' },
];

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../views", 'login.html'));
});

router.post('/login', (req, res) => {
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

module.exports = router;
