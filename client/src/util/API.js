import axios from "axios";

export default {
    getUsers: () => axios.get(`/api/allUsers`),
    getSpells: user => axios.get(`/api/${user}`)

    // TODO Need methods to
    //  1) add new spells: POST /api/add
    //  2) remove spells: POST /api/remove
}