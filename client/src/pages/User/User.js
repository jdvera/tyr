import React, { Component } from "react";
import API from "../../util/API.js";
import spellList from "../../util/spellList.js";
import SpellCard from "../../components/SpellCard";
// import AutoComplete from "../../components/AutoComplete";
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
        //TODO finish this method
    }

    // TODO removeCard method

    render() {
        return (
            <div className="container spell-wrapper">
                {/* TODO potentially make the form below into it's own component? */}
                <form id="new-spell" className="form-group">
                    {/* <input name="spellInput" value={this.state.spellInput} className="form-control" placeholder="Magic Missile" onChange={this.handleInputChange} /> */}
                    <AutoComplete suggestions={spellList} />
                    <div className="invalid-feedback"></div>
                    <button type="submit" className="btn btn-primary">Submit</button><br />
                </form>
                <div id="spell-data">
                    {this.state.spells.map((elem, i) => {
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

                        return <SpellCard {...elem} key={i} color={color} />;
                    })}
                </div>
            </div>
        );
    };
};

export default User;