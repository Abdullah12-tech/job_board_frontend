import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

const IsCandidate = ()=>{
    const {currentUser } = useContext(authContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(currentUser?.role !== "candidate"){
            navigate("/dashboard/company")
        }
    },[currentUser, navigate])
    return currentUser?.role === "candidate" ? <Outlet/> : null 
}
export default IsCandidate;