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
    const auth = JSON.parse(localStorage.getItem("auth"))
    if (auth){
        return auth.user
    }else{
        return null;
    }
}
//get access token
function getAccessToken(){
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth.access;

}
//get refresh token
function getRefreshToken(){
    const auth = JSON.parse(localStorage.getItem("auth"))
    return auth.refresh;
}

// Set the access, token and user property
function setUserData(data){
    localStorage.setItem("auth", JSON.stringify({
        access: data.access,
        refresh: data.refresh,
        user: data.user
    }));
    console.log(JSON.parse(localStorage.getItem("auth")))
}

export {getAccessToken,getRefreshToken, getUser, useUserActions, setUserData, BASE_API_URL, BASE_URL}

