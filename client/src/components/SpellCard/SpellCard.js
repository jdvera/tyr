import React from "react";
import Card, { Body } from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import ListGroup, { Item } from "react-bootstrap/ListGroup";

function SpellCard(props) {
    return (
        <Card className={`text-white mb-3 bg-${props.color}`}>
            <Body>
                <Button variant={props.color} className="close" aria-label="Close">
                    <span aria-hidden="true" className="remove" data-name={props.Name}>&times;</span>
                </Button>
                {/* eslint-disable-next-line */}
                <a href={props.url} target="_blank"><h3>{props.Name}</h3></a>
                <ul>
                    <li>Casting Time: {props["Casting Time"]}</li>
                    <li>Range: {props.Range}</li>
                    <li>Level: {props.Level === "0" ? "Cantrip" : props.Level}</li>
                    <li>Target: {props.Target}</li>
                    <li>Duration: {props.Duration}</li>
                    <li>Classes: {props.Classes}</li>
                </ul>
                <p>{props.Description}</p>
            </Body>
        </Card>
    );
}

export default SpellCard;