import axios from 'axios'

const imagesApiHttp = axios.create({
    baseURL: "https://picsum.photos",
})

imagesApiHttp.interceptors.response.use((response) => response.data);

export default imagesApiHttp