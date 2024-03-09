const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

let clients = [];
let facts = [];

// To get the number of clients attached
app.get("/status", (_, res) => {
    res.json({ clients: clients.length });
});

// To send events to all clients
function eventsHandler(req, res, next) {
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(facts)}\n\n`;
    res.write(data);

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res,
    };
    clients.push(newClient);

    req.on("close", () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter((client) => client.id !== clientId);
    });
}

app.get("/events", eventsHandler);

function sendEventsToAll(newFact) {
    clients.forEach((client) =>
        client.res.write(`data: ${JSON.stringify(newFact)}\n\n`),
    );
}

async function addData(req, res, next) {
    const newFact = req.body;
    facts.push(newFact);
    res.json(newFact);
    return sendEventsToAll(newFact);
}

app.post("/data", addData);

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
