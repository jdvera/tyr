import React from "react";
import "./Nav.css";

function Nav(props) {
    const home = window.location.pathname.length === 1;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            {home ? <h1 class="navbar-brand">Choose Your Character</h1> :
                <a className="navbar-brand" href="/">Back to Character List</a>
            }
        </nav>
    );
}

export default Nav;