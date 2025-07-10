import { is } from "date-fns/locale";
import { createContext, useState } from "react";

export const jobContext = createContext();

const JobProvider = ({children}) =>{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [jobs, setJobs] = useState("");
    const [isPostingJob, setIsPostingJob] = useState(false);
    const [singleJob,setSingleJob] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fetchAllJobs = async ()=>{
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/jobs`);
            const data = await res.json();
            setJobs(data);
            console.log(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    const postJob = async (formData)=>{
        setIsPostingJob(true);
        try {
            const res = await fetch(`${baseUrl}/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                alert("There is an error when posting job")
                return
            }
            console.log(res);
            
            alert("You have successfully add a job");
            setIsPostingJob(false);
        } catch (err) {
            console.log(err);
        }finally{
            setIsPostingJob(false);
        }
    }

    const filterJobs = async (type,location)=>{
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/jobs?type=${type}&location=${location}&`)
        } catch (err) {
            console.log(err);
        }
    }
    const deleteJob = async (id)=>{
        try {
            const res = await fetch(`${baseUrl}/jobs/${id}`,{
                method: "DELETE"
            });
            if(!res.ok){
                return alert("job not deleted");
            }
            alert("Job has been deleted");
        } catch (err) {
            console.log(err);
        }
    }

    const fetchSingleJob = async (id)=>{
        setIsLoading(true);
         try {
            const res = await fetch(`${baseUrl}/jobs/${id}`);
            if(!res.ok){
                return alert("Job not gotten")
            }
            const data = await res.json();
            console.log(data);
            setSingleJob(data);
            setIsLoading(false);
         } catch (err) {
            console.log(err);
         }finally{
            setIsLoading(false);
         }
    }
    const value = {
        fetchAllJobs,
        jobs,
        singleJob,
        fetchSingleJob,
        postJob,
        deleteJob,
        isPostingJob,
        isLoading,
        filterJobs
    }
    return (
        <jobContext.Provider value={value}>
            {children}
        </jobContext.Provider>
    )
}

export default JobProvider;