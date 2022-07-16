import axios from 'axios'

const apiHttp = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

apiHttp.interceptors.response.use((response) => response.data);

export default apiHttp