import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getAccessToken, getRefreshToken, getUser, BASE_API_URL } from '../hooks/user.actions';

const axiosService = axios.create({
    baseURL:BASE_API_URL,
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
    return axios.post("/auth/refresh/",
        {refresh: getRefreshToken()},
        {baseURL: BASE_API_URL,}
        ).then((resp)=>{
        const {access} = resp.data;
        failedRequest.response.config.headers["Authorization"] = `Bearer ${access}`;
        localStorage.setItem(
            "auth", 
            JSON.stringify({access,refresh: getRefreshToken(), user: getUser()}));
        }).catch(() =>{
        localStorage.removeItem("auth");
    });
};

createAuthRefreshInterceptor(axiosService,refreshAuthLogic);

export function fetcher(url){
    return axiosService.get(url).then((res)=>res.data);
}

export default axiosService;