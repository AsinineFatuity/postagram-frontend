import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000"
const BASE_API_URL = `${BASE_URL}/api`


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
            setUserData(res.data)
            navigate("/")
        })
    }

    function register(data){
        return axios.post(`${BASE_API_URL}/auth/register/`, data).then((res) =>{
            setUserData(res.data)
            navigate("/")

        })
    }

    function logout(){
        localStorage.removeItem("auth");
        navigate("/login/")
    }

}


//get user
function getUser(){
    return localStorage.getItem("user") || null
    }

//get access token
function getAccessToken(){
    return localStorage.getItem("access") || null

}
//get refresh token
function getRefreshToken(){
    return localStorage.getItem("refresh") || null
}

// Set the access, token and user property
function setUserData(data){
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('user', data.user);
}

function removeUserData(){
    const userDataKey = ["access", "user", "refresh"]
    for(let key of userDataKey){
        localStorage.removeItem(key)
    }
}

export {getAccessToken,getRefreshToken, getUser, useUserActions, setUserData, removeUserData, BASE_API_URL, BASE_URL}

