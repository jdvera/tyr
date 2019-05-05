const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (user, spell, cb) => {
    console.log("looking for " + spell);
    axios.get(`https://roll20.net/compendium/dnd5e/${spell}#content`).then(response => {
        console.log("gottem");
        const $ = cheerio.load(response.data);

        const Description = $("#pagecontent").text();
        const Name = spell;

        const spellObj = { Name, Description };

        $("div.attrListItem").each((j, element) => {

            let attrName = $(element).find(".attrName").text();
            console.log(spell + ' attrName:', attrName)
            if (
                attrName === "Casting Time" ||
                attrName === "Range" ||
                attrName === "Level" ||
                attrName === "Target" ||
                attrName === "Duration" ||
                attrName === "Classes"
            ) {
                spellObj[attrName] = $(element).find(".attrValue").find(".value").text();
            }
        });

        cb(spellObj);
    });
};