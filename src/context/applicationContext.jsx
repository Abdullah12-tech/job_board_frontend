import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthContext";

export const applicationContext = createContext();

const ApplicationProvider = ({ children })=>{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const {currentUser} = useContext(authContext);
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
        } catch (err) {
            console.log(err);
        }
    }
    const value = {
        applyJob,
        getAllApplicationForCurrentUser
    }
    return (
        <applicationContext.Provider value={value}>
            {children}
        </applicationContext.Provider>
    )
}
export default ApplicationProvider;