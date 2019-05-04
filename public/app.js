$("#spell-data").text("One Moment...");

$.get("/api/" + window.location.pathname.split("/")[2], function (spellData) {
    $('#spell-data').empty();
    console.log(spellData);

    spellData.forEach(elem => {
        let cardWrapper = $('<div class="card text-white bg-primary mb-3">');
        let body = $('<div class="card-body">');
        body.append($(`<h3>${elem.Name}</h3>`));

        let ul = $('<ul>');
        ul.append(`
            <li>${elem["Casting Time"]}</li>
            <li>${elem.Range}</li>
            <li>${elem.Level}</li>
            <li>${elem.Target}</li>
            <li>${elem.Duration}</li>
            <li>${elem.Classes}</li>
        `);
        body.append(ul);

        let description = $(`<p>${elem.Description}</p>`);
        body.append(description);

        cardWrapper.append(body);
        $("#spell-data").append(cardWrapper);
    });
});
