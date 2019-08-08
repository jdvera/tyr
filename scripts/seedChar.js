const mongojs = require("mongojs");

const databaseUrl = process.env.MONGODB_URI || "spellsdb";
const collections = ["CharacterSpells", "characters"];
const db = mongojs(databaseUrl, collections);

db.on("error", error => console.log("Database Error:", error));
db.on('connect', () => console.log('database connected'));

const spellArr = require("../util/spellData.js");

const users = [
    {
        name: "james",
        character: "Mace Beleren",
        variant: "info",
        spells: [
            // - Cantrips
            "Toll the Dead",
            "Spare the Dying",
            "Light",
            "Thaumaturgy",

            // - lvl 1
            "Guiding Bolt",
            "Detect Magic",

            // - lvl 2
            "Prayer of Healing",
            "Zone of Truth",

            // - lvl 3
            "Animate Dead",
            "Magic Circle",
            "Mass Healing Word"
        ]
    }, {
        name: "ashley",
        character: "Izel au Arcos",
        variant: "success",
        spells: [
            // - Cantripts
            "Mage Hand",
            "Guidance",
            "Shillelagh",
            "Poison Spray",

            // - Magic initiate cantrips
            "Sacred Flame",
            "Spare the Dying",

            // - Spells level 1 and higher
            // "wild cunning",
            "Cure Wounds",
            "Detect Magic",
            "Snare",
            "Spike Growth",
            "Locate Object",
            "Enhance Ability",

            // - Magic initiate 1st level spell
            "Command",

            // - Circle of the Shepherd spell
            // "spirit totem"
        ]
    }, {
        name: "athena",
        character: "Zahra Asfour",
        variant: "danger",
        spells: []
    }, {
        name: "siobhan",
        character: "Svetlana",
        variant: "secondary",
        spells: []
    }
];



seedCharacters = (i, userIndex) => {
    // If I'm at the end of the users array, end it
    if (userIndex >= users.length) {
        console.log("\n --- No more users\n");
        process.exit(0);
    }

    const { name, character, variant } = users[userIndex];
    console.log(`\n --- Creating db obj for ${name}'s ${character}\n`);
    db.characters.insert({ name, character, variant }, (err, doc) => {
        if (err) throw err;
        console.log("Character: ", doc);

        // If the user doesn't have any spells, insert a collection with an empty spells array
        if (users[userIndex].spells.length === 0) {
            console.log(`\n --- ${users[userIndex].name} has no spells\n`);
            userIndex++;
            return seedCharacters(0, userIndex);
        }

        seedCharacterSpells(0, userIndex, doc._id, () => {
            console.log(`\n --- Finished adding spells for ${users[userIndex].name}\n`);
            userIndex++;
            console.log(`\n --- About to start adding stuff for ${users[userIndex].name}\n`);
            seedCharacters(0, userIndex);
        });
    });
};


seedCharacterSpells = (y, userIndex, charId, cb) => {
    console.log("looking for " + users[userIndex].spells[y]);
    db.spells.findOne({ name: users[userIndex].spells[y] }, (err, spellDoc) => {
        if (err) throw err;
        console.log("Found it:", spellDoc);
        db.characterSpells.insert({
            characterId: charId,
            spellId: spellDoc._id
        }, (err, doc) => {
            if (err) throw err;
            console.log(`Gave ${users[userIndex].name} the spell ${spellDoc.name}`);
            y++;
            if (users[userIndex].spells[y]) {
                console.log("Next spell");
                seedCharacterSpells(y, userIndex, charId, cb);
            }
            else {
                console.log("User has no more spells")
                cb();
            }
        });
    });
};

db.characters.remove(err => {
    if (err) throw err;
    db.characterSpells.remove(err => {
        if (err) throw err;
        console.log('\n --- cleared characters and characterSpells db\n');
        seedCharacters(0, 0);
    });
});