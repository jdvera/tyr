const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getSpellInfo = require("./util/getSpellInfo.js");

// --- ROUTES
app.get("/user/:username", (req, res) => {
    console.log("route hit for " + req.params.username);
    res.sendFile(path.join(__dirname + '/public/user.html'));
});

app.get('/', function (req, res) {
    console.log("home");
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/api/:username", (req, res) => {
    console.log("getting spells for " + req.params.username);
    getSpellInfo(0, req.params.username, spellData => res.json(spellData));
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
