import axios from "@/api/axios";

const createTransportation = transportation => {
    return axios.post('/send-parcel', transportation)
        .then();
}

const getTransportation = slug => {
    return axios.get(`/search?${slug}`)
        .then(response => response.data);
}


export default {
    createTransportation,
    getTransportation
}