import React, { Component } from "react";
import API from "../../util/API.js";
import "./User.css";

class User extends Component {
    state = {
        spells: [],
        spellInput: ""
    };

    componentDidMount() {
        API.getSpells(this.props.match.params.username).then(res => {
            this.setState({ spells: res.data });
        });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    addSpell = () => {

    }

    render() {
        return (
            <div className="container spell-wrapper">
                <form id="new-spell" className="form-group">
                    <label className="col-form-label col-form-label-lg" htmlFor="spell-name">Add Spell</label>
                    <input name="spellInput" value={this.state.spellInput} className="form-control" placeholder="Magic Missile" onChange={this.handleInputChange} />
                    <div className="invalid-feedback"></div>
                    <button type="submit" className="btn btn-primary">Submit</button><br />
                </form>
                <div id="spell-data"></div>
            </div>
        );
    };
};

export default User;