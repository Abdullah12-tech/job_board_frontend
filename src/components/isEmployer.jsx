import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

const IsCandidate = ()=>{
    const {currentUser, fetchCurrentUser } = useContext(authContext);s
    const navigate = useNavigate();
    useEffect(()=>{
        fetchCurrentUser();
        if(!currentUser.role === "employer"){
            navigate("/dashboard/candidate")
        }
    },[currentUser.role, navigate])
    return currentUser.role === "employer" ? <Outlet/> : null 
}
export default IsCandidate;