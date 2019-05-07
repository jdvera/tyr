const axios = require("axios");
const cheerio = require("cheerio");

const removeLinks = str => {
    let keepGoing = true;
    while (keepGoing) {
        let start = str.indexOf("<a ");
        let end = str.indexOf(">", start + 1);
        str = str.substring(0, start) + str.substring(end + 1);
        if (str.indexOf("<a ") === -1) {
            keepGoing = false;
        }
    }

    keepGoing = true;
    while (keepGoing) {
        let start = str.indexOf("</a>");
        str = str.substring(0, start) + str.substring(start + 4);
        if (str.indexOf("</a>") === -1) {
            keepGoing = false;
        }
    }

    return str;
}

module.exports = (spell, cb) => {
    console.log("looking for " + spell);
    const url = `https://roll20.net/compendium/dnd5e/${spell}#content`;
    axios.get(url).then(response => {
        console.log("gottem");
        const $ = cheerio.load(response.data);

        const spellObj = {
            Description: removeLinks($("#pagecontent").html()),
            url
        };

        if (spellObj.Description.length > 0) {
            $("div.attrListItem").each((j, element) => {

                let attrName = $(element).find(".attrName").text();
                console.log(spell + ' attrName:', attrName)
                if (
                    attrName === "Casting Time" ||
                    attrName === "Range" ||
                    attrName === "Level" ||
                    attrName === "Target" ||
                    attrName === "Duration" ||
                    attrName === "Classes" ||
                    attrName === "Name"
                ) {
                    spellObj[attrName] = $(element).find(".attrValue").find(".value").text();
                }
            });

            cb({
                status: true,
                spellObj
            });
        }
        else {
            cb({
                status: false,
                message: "Spell not in the Player Handbook"
            })
        }
    }).catch(err => {
        console.log(err);
        cb({
            status: false,
            message: "Couldn't find spell, possibly a typo"
        })
    });
};