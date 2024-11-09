import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://payease-server-production.up.railway.app/"
})

export default apiClient;