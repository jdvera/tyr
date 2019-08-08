const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");

const databaseUrl = process.env.MONGODB_URI || "spellsdb";
const collections = ["spells"];

let db;
(async function() {
    db = await mongojs(databaseUrl, collections);
    await seedDescription();
})();

const spellData = require("../util/spellData.js");
const spellArr = Object.keys(spellData);
let index = 0;

// // Querying the same api that I got the spellData json from
// seedDescription = () => {
//     if (!spellArr[index]) {
//         console.log("done");
//         process.exit(0);
//     }
//     axios.get("https://donjon.bin.sh/5e/spells/rpc.cgi?name=" + spellArr[index]).then(({ data }) => {
//         db.spells.findAndModify({
//             query: { name: spellArr[index] },
//             update: { $set: { description: data.Description || "No description for this spell" } },
//             new: true
//         }, err => {
//             if (err) throw err;
//             i++;
//             seedDescription();
//         });
//     }).catch(err => {
//         throw err;
//     });
// };

const spellsWithErrors = [];


// Scraping a different site that has more spells
seedDescription = async () => {
    if (!spellArr[index]) {
        console.log("done. spells with errors:", spellsWithErrors);
        process.exit(0);
    }
    let removedSpecial = spellArr[index].replace(/[^\w\s]/gi, "");
    if (removedSpecial === "Maximilians Earthen Grasp") {
        removedSpecial = "Maximillians Earthen Grasp";
    }
    else if (removedSpecial === "EnlargeReduce") {
        removedSpecial = "Enlarge Reduce";
    }
    else if (removedSpecial === "Snillocs Snowball Swarm") {
        removedSpecial = "Snillocs Snowball Storm";
    }
    else if (removedSpecial === "Danse Macabre" || removedSpecial === "Charm Monster" || removedSpecial === "Steel Wind Strike" || removedSpecial === "Tensers Transformation" || removedSpecial === "Shadow of Moil" || removedSpecial === "Invulnerability") {
        removedSpecial = "Snillocs Snowball Storm";
        index++;
        return seedDescription();
    }

    console.log("looking for spell:", removedSpecial);
    axios.get("http://dnd5e.wikidot.com/spell:" + removedSpecial).then(({ data }) => {
        const $ = cheerio.load(data);

        $("#page-content p").each(function(i, element) {
            if (i === 2) {
                console.log('found description for:', spellArr[index]);
                db.spells.findAndModify({
                    query: { name: spellArr[index] },
                    update: { $set: { description: $(this).text() } },
                    new: true
                }, err => {
                    if (err) throw err;
                    index++;
                    seedDescription();
                });
            }
        });
    }).catch(err => {
        console.log(' --- ERR:', spellArr[index]);
        spellsWithErrors.push(spellArr[index]);
        index++;
        seedDescription();
    });
};



/*  [
    'Enervation',
    'Psychic Scream',
    'Infernal Calling',
    'Wall of Light',
    'Druid Grove',
    'Synaptic Static',
    'Create Homunculus',
    'Illusory Dragon',
    'Summon Greater Demon',
    'Green-Flame Blade',
    'Tiny Servant',
    'Far Step',
    'Dawn',
    'Healing Spirit',
    'Thunder Step',
    'Scatter',
    'Shadow Blade',
    'Mighty Fortress',
    'Mind Spike',
    'Sickening Radiance',
    'Wrath of Nature',
    'Catnap',
    'Power Word Pain',
    'Negative Energy Flood',
    'Mass Polymorph',
    'Life Transference',
    'Temple of the Gods',
    'Find Greater Steed',
    'Crown of Stars',
    "Abi-Dalzim's Horrid Wilting",
    'Maddening Darkness',
    'Holy Weapon',
    'Blindness/Deafness',
    'Soul Cage',
    'Antipathy/Sympathy',
    'Mental Prison',
    'Summon Lesser Demons',
    'Skill Empowerment'
]  */