import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

const AdminProtect = ()=>{
    const {currentUser } = useContext(authContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(currentUser?.role !== "employer"){
            navigate("/")
        }
    },[currentUser, navigate])
    return currentUser?.role === "employer" ? <Outlet/> : null 
}
export default AdminProtect;