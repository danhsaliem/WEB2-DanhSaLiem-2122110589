import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8081/api/',
});

Api.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default Api;
