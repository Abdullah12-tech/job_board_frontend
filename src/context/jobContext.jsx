import { createContext, useState } from "react";

export const jobContext = createContext();

const JobProvider = ({children}) =>{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [jobs, setJobs] = useState("");
    const [singleJob,setSingleJob] = useState("");
    const fetchAllJobs = async ()=>{
        try {
            const res = await fetch(`${baseUrl}/jobs`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.log(err);
        }
    }

    const postJob = async (formData)=>{
        try {
            const res = await fetch(`${baseUrl}/jobs`, {
                method: "POST",
                body: formData
            })
            if (!res.ok) {
                alert("There is an error when posting job")
                return
            }
            alert("You have successfully add a job");
        } catch (err) {
            console.log(err);
        }
    }
    const deleteJob = async (id)=>{
        try {
            const res = await fetch(`${baseUrl}/jobs/${id}`,{
                method: "DELETE"
            });
        } catch (err) {
            console.log(err);
        }
    }

    const fetchSingleJob = async (id)=>{
         try {
            const res = await fetch(`${baseUrl}/jobs/${id}`);
            const data = await res.json();
            setSingleJob(data);
         } catch (err) {
            console.log(err);
         }
    }
    const value = {
        fetchAllJobs,
        jobs,
        singleJob,
        fetchSingleJob,
        postJob,
        deleteJob
    }
    return (
        <jobContext.Provider value={value}>
            {children}
        </jobContext.Provider>
    )
}

export default JobProvider;