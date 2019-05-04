const axios = require("axios");
const cheerio = require("cheerio");

const users = {
    james: {
        name: "james",
        spells: [
            // - Cantrips
            // "Toll the Dead",
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
    },
    ashley: {
        name: "ashley",
        spells: [
            // - Cantripts
            "mage hand",
            "guidance",
            "shillelagh",
            "poison spray",

            // - Magic initiate cantrips
            "sacred flame",
            "spare the dying",

            // - Spells level 1 and higher
            // "wild cunning",
            "cure wounds",
            "detect magic",
            // "snare",
            "spike growth",
            "locate object",
            "enhance ability",

            // - Magic initiate 1st level spell
            "command",

            // - Circle of the Shepherd spell
            // "spirit totem"
        ]
    }
};

const resultsArr = [];

getSpellInfo = (i, userName, cb) => {
    console.log("looking for " + users[userName].spells[i]);
    axios.get(`https://roll20.net/compendium/dnd5e/${users[userName].spells[i]}#content`).then(response => {
        console.log("gottem");
        const $ = cheerio.load(response.data);

        const Description = $("#pagecontent").text();
        const Name = users[userName].spells[i];

        const spellObj = { Name, Description };

        $("div.attrListItem").each((j, element) => {

            let attrName = $(element).find(".attrName").text();
            console.log(users[userName].spells[i] + ' attrName:', attrName)
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

        if (i < users[userName].spells.length - 1) {
            i++;
            getSpellInfo(i, userName, cb);
        }
        else {
            cb(resultsArr);
        }
    });
};

module.exports = getSpellInfo;