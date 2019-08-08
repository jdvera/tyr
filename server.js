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
const collections = ["spells", "characters", "characterSpells"];

const db = mongojs(databaseUrl, collections);
db.on("error", error => console.log("Database Error:", error));
db.on('connect', () => console.log('database connected'));


// --- ROUTES
app.get("/api/allUsers", (req, res) => {
    db.characters.find({}, (err, doc) => {
        res.json(doc);
    });
});

app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    db.characters.findOne({ _id: mongojs.ObjectID(id) }, (err, charDoc) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        }
        else {
            db.characterSpells.find({ characterId: mongojs.ObjectID(id) }, (err, charSpellsDoc) => {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }
                const spellIdArr = charSpellsDoc.map(elem => mongojs.ObjectID(elem.spellId));
                db.spells.find({
                    _id: {
                        $in: spellIdArr
                    }
                }, (err, spellsDoc) => {
                    res.json({ ...charDoc, spells: spellsDoc });
                });
            });
        }
    });
});

app.get("/api/character-name/:id", (req, res) => {
    const { id } = req.params;
    db.characters.findOne({ _id: mongojs.ObjectID(id) }, (err, charDoc) => {
        if (err) {
            return res.json(err);
        }
        const { character } = charDoc;
        res.json({ character });
    });
});

app.post("/api/add", (req, res) => {
    const { characterId, spellName } = req.body;
    // Getting the id of the new spell
    db.spells.findOne({ name: spellName }, (err1, newSpellDoc) => {
        if (err1) throw err1;
        console.log('id of new spell:', newSpellDoc._id);

        db.characterSpells.findOne({
            spellId: newSpellDoc._id,
            characterId
        }, (err2, checkDoc) => {
            if (err2) throw err2;
            db.characters.find({ characterId }, (err3, doc) => {
                if (err3) throw err3;
                const spellsArr = doc.map(elem => elem.spellId);


                // getOneSpell(spell, data => {
                //     if (!data.status) {
                //         return res.send(data);
                //     }
                //     db.spells.update({ name }, {
                //         $push: { spells: data.spellObj }
                //     }, () => res.send(data));
                // });
                db.spells.insert({ characterId, spellId }, (err, doc) => {
                    if (err) throw err;
                    console.log('doc:', doc)
                    res.json(doc)
                })
            });
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

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
