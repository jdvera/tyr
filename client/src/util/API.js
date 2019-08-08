import axios from "axios";

export default {
    getUsers: () => axios.get(`/api/allUsers`),
    getUserData: userId => axios.get(`/api/user/${userId}`),
    resetDB: () => axios.get(`/api/resetDb`),
    getCharacterName: id => axios.get(`/api/character-name/${id}`),
    addSpell: data => axios.post(`/api/add`, data),
    removeSpell: data => axios.post(`/api/remove`, data)
};