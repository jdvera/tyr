const axios = require("axios");
const cheerio = require("cheerio");

const users = {
    James: {
        name: "James",
        spells: [
            // - Cantrips
            // "Toll the Dead",
            "Spare the Dying",
            "Light",
            // "Thaumaturgy",

            // // - lvl 1
            // "Guiding Bolt",
            // "Detect Magic",

            // // - lvl 2
            // "Prayer of Healing",
            // "Zone of Truth",

            // // - lvl 3
            // "Animate Dead",
            // "Magic Circle",
            // "Mass Healing Word"
        ]
    },
    Ashley: {
        name: "Ashley",
        spells: []
    }
};

const resultsArr = [];

getSpellInfo = (i, userName, cb) => {
    console.log("looking for " + users[userName].spells[i]);
    axios.get(`https://roll20.net/compendium/dnd5e/${spells[i]}#content`).then(response => {
        console.log("gottem");
        const $ = cheerio.load(response.data);

        const Description = $("#pagecontent").text();
        const Name = spells[i];



        const spellObj = { Name, Description };

        $("div.attrListItem").each((j, element) => {

            let attrName = $(element).find(".attrName").text();
            console.log(spells[i] + ' attrName:', attrName)
            if (
                attrName === "Casting Time" ||
                attrName === "Range" ||
                attrName === "Level" ||
                attrName === "Target" ||
                attrName === "Duration"
            ) {
                spellObj[attrName] = $(element).find(".attrValue").find(".value").text();
            }
        });

        resultsArr.push(spellObj);

        if (i < spells.length - 1) {
            i++;
            getSpellInfo(i, userName, cb);
        }
        else {
            cb(resultsArr);
        }
    });
};

module.exports = app => {
    app.get("/", (req, res) => {
        res.json(users.map(elem => elem.name));
    });

    app.get("/:userName", (req, res) => {
        getSpellInfo(0, req.params.userName, spellData => {
            res.json(spellData);
        });
    });
}

