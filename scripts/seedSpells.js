const mongojs = require("mongojs");

const databaseUrl = process.env.MONGODB_URI || "spellsdb";
const collections = ["spells"];
const db = mongojs(databaseUrl, collections);

db.on("error", error => console.log("Database Error:", error));
db.on('connect', () => console.log('database connected'));

const spellData = require("../util/spellData.js");
const spellArr = Object.keys(spellData);
console.log('spellArr:', spellArr)
let i = 0;

db.spells.remove(err => {
    if (err) throw err;
    console.log('cleared db');
    seedSpell();
});


seedSpell = () => {
    console.log()
    if (!spellArr[i]) {
        console.log("done");
        process.exit(0);
    }
    db.spells.insert(spellData[spellArr[i]], err => {
        if (err) throw err;
        i++;
        seedSpell();
    });
}
