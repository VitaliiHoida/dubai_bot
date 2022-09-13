import axios from "@/api/axios";

const getTransportation = slug => {
    return axios.get(`/search/`, {slug})
        .then(response => response.data);
}

const createTransportation = transportation => {
    return axios.post('/send-parcel', transportation)
        .then();
}

export default {
    getTransportation,
    createTransportation,
}