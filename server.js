const express = require("express");
const mongojs = require("mongojs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const databaseUrl = process.env.MONGODB_URI || "spellsdb";
const collections = ["spells"];

const db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

const getOneSpell = require("./util/getOneSpell.js");

// --- ROUTES
app.get("/user/:username", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/user.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/api/:username", (req, res) => {
    db.spells.findOne({ name: req.params.username }, (err, data) => {
        if (err) throw err;
        if (!data) {
            db.spells.insert({
                name: userName,
                spells: []
            }, (err, inserted) => {
                if (err) throw err;
                console.log(inserted);
                cb(inserted.spells);
            });
        }
        else {
            res.json(data.spells);
        }
    });
});

app.post("/api/add", (req, res) => {
    const { name, spell } = req.body;
    getOneSpell(name, spell, spellObj => {
        db.spells.update({ name }, {
            $push: { spells: spellObj }
        }, () => res.send(true));
    });
});

app.post("/api/remove", (req, res) => {
    console.log(req.body);
    const { name, spell } = req.body;
    db.spells.update({ name }, {
        $pull: { spells: { Name: spell } }
    }, () => res.send(true));
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
