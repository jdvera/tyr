import React, { Component } from "react";
import API from "../../util/API.js";
import "./Main.css";

class Main extends Component {
    state = {
        colors: ["danger", "success", "info", "secondary"],
        users: []
    };

    componentDidMount() {
        API.getUsers().then(res => {
            this.setState({ users: res.data });
        })
    };

    render() {
        if (!this.state.users.length) {
            return <div>One Moment Please...</div>;
        }

        return (
            <div className="container">
                {this.state.users.map((user, i) =>
                    <a href={`user/${user.name}`}>
                        <button type="button" className={`btn btn-${this.state.colors[i]} btn-lg btn-block`}>
                            {user.character}
                        </button>
                    </a>
                )}
                {/* TODO make a button that will go to a page for the DM (we haven't made that page at all yet) */}
            </div>
        );
    };
};

export default Main;