import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_VERCEL_BASE_URL,
});

export default api;


api.interceptors.request.use((config) => {
    const token =  localStorage.getItem("token");
    if(token) config.headers.Authorization = token;
    return config;
});


api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(`error: ${error}`);
}

)