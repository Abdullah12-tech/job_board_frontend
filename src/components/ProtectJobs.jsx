import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const JobProtect = ()=>{
    const {isAuthenticated} = useContext(authContext);
    const isAuth = isAuthenticated();
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuth){
            navigate("/login");
        }
    },[isAuth, navigate])
    return isAuth ? <Outlet/> : null;
}
export default JobProtect;