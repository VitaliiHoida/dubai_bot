import axios from "@/api/axios";

const getCitiesTo = () => {
    return axios.get(`/city-to`)
        .then(response => response.data);
}

const getCitiesFrom = () => {
    return axios.get('/city-from')
        .then(response => response.data);
}

export default {
    getCitiesTo,
    getCitiesFrom,
}