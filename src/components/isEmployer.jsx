import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

const IsEmployer = ()=>{
    const {currentUser } = useContext(authContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!currentUser.role === "employer"){
            navigate("/dashboard/candidate")
        }
    },[currentUser.role, navigate])
    return currentUser.role === "employer" ? <Outlet/> : null 
}
export default IsEmployer;