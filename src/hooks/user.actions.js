import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_API_URL = "http://localhost:8000/api"

function useUserActions(){
    const navigate = useNavigate();
  
    return {
        login,
        register,
        logout
    }

    function login(data){
        return axios.post(`${BASE_API_URL}/auth/login/`, data).then((res) => {
            //Register the acount and tokens in the store
            setUserData(res)
            navigate("/")
        })
    }

    function register(data){
        return axios.post(`${BASE_API_URL}/auth/register/`, data).then((res) =>{
            setUserData(res)
            navigate("/")

        })
    }

    function logout(){
        localStorage.removeItem("auth");
        navigate("/login/")
    }

    function setUserData(res){
        localStorage.setItem("auth", JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user
        }));
    }
}

const auth = JSON.parse(localStorage.getItem("auth"))

//get user
function getUser(){
    return auth.user;
}
//get access token
function getAccessToken(){
    return auth.access;

}
//get refresh token
function getRefreshToken(){
    return auth.refresh;
}

export {getAccessToken,getRefreshToken, getUser, useUserActions, BASE_API_URL}

