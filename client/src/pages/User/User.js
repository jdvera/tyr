import React, { Component } from "react";
import API from "../../util/API.js";
import AddInput from "../../components/AddInput";
import LevelWrapper from "../../components/LevelWrapper";
import SpellCard from "../../components/SpellCard";
import "./User.css";

class User extends Component {
    state = {
        //  From database
        _id: "",
        character: "",
        user: "",
        spells: [],
        variant: "",

        //  Input
        spellInput: ""
    };

    componentDidMount() {
        API.getUserData(this.props.match.params.userId).then(({ data }) => {
            this.setState(data);
        });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    addSpell = () => {
        const { _id, spellInput } = this.state;
        const apiObj = { _id, spellInput };
        API.addSpell(apiObj).then(({ data }) => {
            console.log('data:', data);
            API.getUserData(this.props.match.params.userId).then(({ data }) => {
                this.setState(data);
            });
        })
    };

    // TODO removeSpell method

    renderSpellsByLevel = () => {
        const spellsObj = {};
        console.log('first spell:', this.state.spells[0]);
        this.state.spells.forEach((elem, i) => {
            if (spellsObj[elem.level]) {
                spellsObj[elem.level].push(<SpellCard {...elem} key={i} variant={this.state.variant} />);
            }
            else {
                spellsObj[elem.level] = [<SpellCard {...elem} key={i} variant={this.state.variant} />];
            }
        });

        const levelOrder = ["Cantrip", "1st", "2nd", "3rd", "4th", "5th"];
        const renderThis = [];

        levelOrder.forEach(elem => {
            if (spellsObj[elem]) {
                renderThis.push(
                    <LevelWrapper key={renderThis.length} level={elem}>
                        {spellsObj[elem]}
                    </LevelWrapper>
                );
            }
        });

        return renderThis;
    };

    render() {
        return (
            <div id="user-wrapper">
                <AddInput handleInputChange={this.handleInputChange} spellInput={this.state.spellInput} />
                <div id="spell-data">
                    {this.renderSpellsByLevel()}
                </div>
            </div>
        );
    };
};

export default User;