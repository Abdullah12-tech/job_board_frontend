import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

const DashboardProtect = ()=>{
    const navigate = useNavigate()
    const {isAuthenticated} = useContext(authContext);
    const isAuth = isAuthenticated();
    useEffect(()=>{
        if(!isAuth){
            navigate("/login")
        }
    },[isAuth,navigate])
    return isAuth ? <Outlet/> : null
}
export default DashboardProtect;