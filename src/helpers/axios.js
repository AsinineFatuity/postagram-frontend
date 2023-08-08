import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {getAccessToken, getRefreshToken, BASE_URL}  from "../../hooks/user.actions";


const axiosService = axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type":"application/json",
    },
});

axiosService.interceptors.request.use(async (config)=>{
    /* Retrieve the access token from the localStorage and add
    it to the headers of the request */
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
});
axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);

const refreshAuthLogic = async (failedRequest) =>{
    return axios.post("/refresh/token/",null,{
        baseURL: BASE_URL,
        headers: {
            Authorization:`Bearer ${getRefreshToken()}`,
        },
    }).then((resp)=>{
        const {access,refresh} = resp.data;
        failedRequest.response.config.headers["Authorization"] = `Bearer ${access}`;
        localStorage.setItem("auth",JSON.stringify({access,refresh}));
    }).catch(() =>{
        localStorage.removeItem("auth");
    });
};

createAuthRefreshInterceptor(axiosService,refreshAuthLogic);

export function fetcher(url){
    return axiosService.get(url).then((res)=>res.data);
}

export default axiosService;