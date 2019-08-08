import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import API from "../../util/API.js";
import "./Main.css";

class Main extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        API.getUsers().then(res => {
            this.setState({ users: res.data });
        })
    };

    resetDB = () => {
        API.resetDB().then(() => {
            API.getUsers().then(res => {
                this.setState({ users: res.data });
            });
        });
    };

    beforeLink = character => {
        this.props.updateAppState({ character });
    };

    render() {
        if (!this.state.users.length) {
            return (
                <div>
                    One Moment Please...<Spinner animation="border" variant="info" />
                </div>
            );
        }

        return (
            <div id="main-wrapper">
                <Jumbotron fluid>
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="display-3">Welcome!</h1>
                        <p>Choose your Character</p>
                    </div>
                </Jumbotron>
                {this.state.users.map((user, i) =>
                    <span key={i} onClick={() => this.beforeLink(user.character)}>
                        <Link to={`user/${user._id}`}>
                            <button type="button" className={`btn btn-${user.variant} btn-lg btn-block`}>
                                {user.character}
                            </button>
                        </Link>
                    </span>
                )}
                <button onClick={this.resetDB}>Reset DB</button>
                {/* TODO make a button that will go to a page for the DM (we haven't made that page at all yet) */}
            </div>
        );
    };
};

export default Main;