import React from "react";
import Card, { Body } from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

function LevelWrapper(props) {

    // const cardHeader = $(`<div class="card-header" id="heading${level}">`);
    // const h5 = $(`<h5 class="mb-0">`);
    // const accordButton = $(`<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${level}" aria-expanded="${level === "0"}" aria-controls="collapse${level}">`);
    // accordButton.text(level === "0" ? "Cantrips" : `Level ${level}`);
    // h5.append(accordButton);
    // cardHeader.append(h5);

    // const collapseBody = $(`<div id="collapse${level}" class="collapse${level === "0" ? " show" : ""}" aria-labelledby="heading${level}" data-parent="#accordion-main">`);

    // spellsObj[level].forEach(elem => {
    //     collapseBody.append(elem);
    // });

    // const levelWrapper = $(`<div class="card">`);
    // levelWrapper.append(cardHeader).append(collapseBody);
    // accordion.append(levelWrapper);


    return (
        <Card className="mb-5">
            <Body>
                <h3>{props.level === "Cantrip" ? "Cantrips" : `${props.level} Level`}</h3>
                {props.children}
            </Body>
        </Card>
    );
}

export default LevelWrapper;