$("#spell-data").text("One Moment...");
const loadSpells = () => {
    $.get("/api/" + window.location.pathname.split("/")[2], function (spellData) {
        $(`#spell-data`).empty();

        const div = $(`<div>`);
        div.append(`<input id="spell-name" placeholder="Magic Missile" />`);
        div.append($(`<button id="submit">`).text("New Spell"));

        $(`#spell-data`).append(div);

        if (!spellData) {
            $(`#spell-data`).append("No spells yet 💁‍");
            return;
        }

        let color = "";
        switch (window.location.pathname.split("/")[2]) {
            case "james":
                color = "danger";
                break;
            case "ashley":
                color = "success";
                break;
            case "athena":
                color = "info";
                break;
            case "siobhan":
                color = "secondary";
                break;
        }

        const spellsObj = {};

        spellData.forEach(elem => {
            let cardWrapper = $(`<div class="card text-white bg-${color} mb-3">`);
            let body = $(`<div class="card-body">`);

            let button = $(`<button class="close" data-dismiss="modal" aria-label="Close">`);
            let x = $(`<span aria-hidden="true" class="remove" data-name="${elem.Name}">&times;</span>`);

            button.append(x);
            body.append(button);
            body.append($(`<h3>${elem.Name}</h3>`));

            let ul = $(`<ul>`);
            ul.append(`
                <li>Casting Time: ${elem["Casting Time"]}</li>
                <li>Range: ${elem.Range}</li>
                <li>Level: ${elem.Level === "0" ? "Cantrip" : elem.Level}</li>
                <li>Target: ${elem.Target}</li>
                <li>Duration: ${elem.Duration}</li>
                <li>Classes: ${elem.Classes}</li>
            `);
            body.append(ul);

            let description = $(`<p>${elem.Description}</p>`);
            body.append(description);

            cardWrapper.append(body);
            if (spellsObj[elem.Level]) {
                spellsObj[elem.Level].push(cardWrapper);
            }
            else {
                spellsObj[elem.Level] = [cardWrapper];
            }
        });

        for (level in spellsObj) {
            const levelWrapper = $(`<div id="level-wrapper">`);
            const levelHeader = $(`<h2>`).text(level === "0" ? "Cantrips" : `Level ${level}`);
            levelWrapper.append(levelHeader);
            levelWrapper.append($(`<hr>`));
            spellsObj[level].forEach(elem => {
                levelWrapper.append(elem);
            });
            $(`#spell-data`).append(levelWrapper);
        }
    });
};

$(`#spell-data`).on(`click`, `#submit`, (event) => {
    event.preventDefault();
    const spellName = $(`#spell-name`).val();
    console.log(spellName);

    const apiObj = {
        name: window.location.pathname.split("/")[2],
        spell: spellName
    };
    $.post("/api/add", apiObj, loadSpells);
});

$(`#spell-data`).on(`click`, `.remove`, function () {
    const spellName = $(this).attr("data-name");
    console.log("removing: " + spellName);

    const apiObj = {
        name: window.location.pathname.split("/")[2],
        spell: spellName
    };
    $.post("/api/remove", apiObj, loadSpells);
});

loadSpells();
