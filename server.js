const express = require("express");
const mongojs = require("mongojs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const databaseUrl = "spellsdb";
const collections = ["spells"];

const db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

const getSpellInfo = require("./util/getSpellInfo.js");

// --- ROUTES
app.get("/user/:username", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/user.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/api/:username", (req, res) => {
    getSpellInfo(0, req.params.username, db, spellData => {
        res.json(spellData);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
