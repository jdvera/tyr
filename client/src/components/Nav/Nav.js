import React from "react";
import Navbar, { Brand } from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
    return (
        <Navbar fixed="top" bg="primary">
            <Container>
                <Brand href="/">Spells!</Brand>
                <span>{props.character}</span>
            </Container>
        </Navbar>
    );
};

export default Nav;