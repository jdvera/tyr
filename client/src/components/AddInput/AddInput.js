import React from "react";
import Autocomplete from "react-autocomplete";
import InputGroup, { Prepend, Text } from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import spellList from "../../util/spellList.js";

const styles = {
    menu: {
        borderRadius: "3px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2px 0",
        fontSize: "90%",
        position: "fixed",
        overflow: "auto",
        maxHeight: "15%",
        zIndex: 100,
        paddingLeft: "13px"
    }
};

let i;

const badDontDoThis = () => {
    i++;
    return i;
};

function AddInput(props) {
    return (
        <form id="new-spell" className="form-group">
            <Autocomplete
                getItemValue={item => item}
                items={spellList}
                renderItem={(item, isHighlighted) =>
                    <div key={badDontDoThis()} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item}
                    </div>
                }
                menuStyle={styles.menu}
                inputProps={{ name: "spellInput" }}
                value={props.spellInput}
                onChange={props.handleInputChange}
                onSelect={value => {
                    props.handleInputChange({
                        target: { name: "spellInput", value }
                    });
                }}
                shouldItemRender={(item, value) => item.toLowerCase().includes(value.toLowerCase())}
                renderInput={props =>
                    <InputGroup className="mb-3">
                        <Prepend>
                            <Text id="inputGroup-sizing-default">Add Spell</Text>
                        </Prepend>
                        <FormControl {...props} aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </InputGroup>
                }
            />

            <div className="invalid-feedback"></div>
            <button type="submit" className="btn btn-primary">Submit</button><br />
        </form>
    );
};

export default AddInput;