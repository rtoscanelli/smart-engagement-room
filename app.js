const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const sessionStore = MongoStore.create({
    mongoUrl: uri,
    collection: 'sessions',
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

const webpages = require("./routes/webpages");
const clientApi = require("./routes/client-api");
const postApi = require("./routes/post-api");
app.use("/", webpages);
app.use("/api", clientApi);
app.use("/api", postApi);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
