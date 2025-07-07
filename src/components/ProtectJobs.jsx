import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";

const JobProtect = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        if(!isLoggedIn){
            navigate("/login");
        }
    },[isLoggedIn, navigate])
    return isLoggedIn ? <Outlet/> : null;
}
export default JobProtect;