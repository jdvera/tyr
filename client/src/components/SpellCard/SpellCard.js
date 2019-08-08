import React from "react";
import Card, { Body } from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import ListGroup, { Item } from "react-bootstrap/ListGroup";

function SpellCard(props) {
    return (
        <Card className={`text-white mb-3 bg-${props.variant}`}>
            <Body>
                <Button variant={props.variant} className="close" aria-label="Close">
                    <span aria-hidden="true" className="remove" data-name={props.name}>&times;</span>
                </Button>
                {/* eslint-disable-next-line */}
                <a href={props.url} target="_blank"><h3>{props.name}</h3></a>
                <ul>
                    <li>Casting Time: {props.casting_time}</li>
                    <li>Range: {props.range}</li>
                    {/* <li>Level: {props.level === "0" ? "Cantrip" : props.level}</li> */}
                    {/* <li>Target: {props.Target}</li> */}
                    <li>Duration: {props.duration}</li>
                    {/* <li>Classes: {Object.keys(props.class).join(", ")}</li> */}
                </ul>
                <p>{props.description}</p>
            </Body>
        </Card>
    );
};

export default SpellCard;