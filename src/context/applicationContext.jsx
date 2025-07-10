import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthContext";

export const applicationContext = createContext();

const ApplicationProvider = ({ children })=>{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {currentUser} = useContext(authContext);
    const [applications, setApplications] = useState("");
    const navigate = useNavigate();
    const applyJob = async (formData)=>{
        try {
            const res = await fetch(`${baseUrl}/applications`, {
                method: "POST",
                body: formData
            })
            if(!res.ok){
                return alert("Application not successful")
            }
            alert("Your application has been sent");
            navigate("/dashboard")
        } catch (err) {
            console.log(err);
        }
    }
    const getAllApplicationForCurrentUser = async ()=>{
        try {
            const res = await fetch(`${baseUrl}/applications`)
            const data = await res.json();
            setApplications(data);
        } catch (err) {
            console.log(err);
        }
    }
    const value = {
        applyJob,
        getAllApplicationForCurrentUser,
        applications
    }
    return (
        <applicationContext.Provider value={value}>
            {children}
        </applicationContext.Provider>
    )
}
export default ApplicationProvider;