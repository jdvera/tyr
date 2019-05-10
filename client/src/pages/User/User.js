import React, { Component } from "react";
import API from "../../util/API.js";
import AddInput from "../../components/AddInput";
import LevelWrapper from "../../components/LevelWrapper";
import SpellCard from "../../components/SpellCard";
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
        this.setState({ [name]: value });
    }

    addSpell = () => {
        //TODO finish this method
    }

    // TODO removeSpell method

    renderSpellsByLevel = () => {
        const spellsObj = {};
        this.state.spells.forEach((elem, i) => {
            let color;
            switch (this.props.match.params.username) {
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
                default:
                    color = "primary";
                    break;
            }

            if (spellsObj[elem.Level]) {
                spellsObj[elem.Level].push(<SpellCard {...elem} key={i} color={color} />);
            }
            else {
                spellsObj[elem.Level] = [<SpellCard {...elem} key={i} color={color} />];
            }
        });

        const renderThis = [];

        for (let level in spellsObj) {
            renderThis.push(
                <LevelWrapper level={level}>
                    {spellsObj[level]}
                </LevelWrapper>
            );
        }

        return renderThis;
    }

    render() {
        return (
            <div className="container spell-wrapper">
                <AddInput handleInputChange={this.handleInputChange} spellInput={this.state.spellInput} />
                <div id="spell-data">
                    {this.renderSpellsByLevel()}
                </div>
            </div>
        );
    };
};

export default User;