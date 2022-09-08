import axios from "@/api/axios";

const getTransportation = slug => {
    return axios.get(`/articles/${slug}`)
        .then(response => response.data.article);
}

const createTransportation = articleInput => {
    return axios.post('/articles', {article: articleInput})
        .then(response => response.data.article);
}

export default {
    getTransportation,
    createTransportation,
}