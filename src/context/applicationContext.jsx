import { createContext } from "react";

export const applicationContext = createContext();

const ApplicationProvider = ({ children })=>{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const applyJob = async (formData)=>{
        try {
            const res = await fetch(`${baseUrl}/applications`, {
                method: "POST",
                body: formData
            })
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