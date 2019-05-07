import axios from "axios";

export default {
    getUsers: () => axios.get(`/api/allUsers`),
    getSpells: user => axios.get(`/api/${user}`)
}