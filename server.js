const express = require("express");
const mongojs = require("mongojs");
const path = require("path");

// - Server Setup
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


// - Mongo Setup
const databaseUrl = process.env.MONGODB_URI || "spellsdb";
const collections = ["spells"];

const db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});


// - Scraping Function
const getOneSpell = require("./util/getOneSpell.js");





// --- ROUTES
// app.get("/user/:username", (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/user.html'));
// });

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.get("/api/:username", (req, res) => {
    db.spells.findOne({ name: req.params.username }, (err, data) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        }
        else if (!data) {
            db.spells.insert({
                name: userName,
                spells: []
            }, (err, inserted) => {
                if (err) throw err;
                console.log(inserted);
                res.json(inserted.spells);
            });
        }
        else {
            res.json(data.spells);
        }
    });
});

app.post("/api/add", (req, res) => {
    const { name, spell } = req.body;
    db.spells.findOne({ name }, (err, doc) => {
        if (err) throw err;
        const spellNames = doc.spells.map(elem => elem.Name);
        if (spellNames.includes(spell)) {
            return res.json({
                status: false,
                message: "You already have that spell"
            });
        }

        getOneSpell(spell, data => {
            if (!data.status) {
                return res.send(data);
            }
            db.spells.update({ name }, {
                $push: { spells: data.spellObj }
            }, () => res.send(data));
        });

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
