import { createContext, useState } from "react";
import { toast } from "sonner";

export const jobContext = createContext();

const JobProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [jobs, setJobs] = useState([]);
    const [isPostingJob, setIsPostingJob] = useState(false);
    const [singleJob, setSingleJob] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("accessToken");

    const fetchAllJobs = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/jobs`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const postJob = async (formData) => {
        setIsPostingJob(true);
        try {
            const res = await fetch(`${baseUrl}/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                alert("There was an error posting the job");
                return;
            }
            alert("Job posted successfully!");
        } catch (err) {
            console.error("Error posting job:", err);
        } finally {
            setIsPostingJob(false);
        }
    };

    const filterJobs = async (type, location) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/jobs?type=${type}&location=${location}`);
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error("Error filtering jobs:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteJob = async (id) => {
        try {
            const res = await fetch(`${baseUrl}/jobs/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) return alert("Failed to delete job");
            alert("Job deleted successfully");
            fetchAllJobs(); // refresh list
        } catch (err) {
            console.error("Error deleting job:", err);
        }
    };

    const fetchSingleJob = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/jobs/${id}`);
            console.log(res);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            console.log(data);
            setSingleJob(data);
        } catch (err) {
            console.error("Error fetching single job:", err);
            toast.warning(err.message)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <jobContext.Provider
            value={{
                fetchAllJobs,
                jobs,
                singleJob,
                fetchSingleJob,
                postJob,
                deleteJob,
                isPostingJob,
                isLoading,
                filterJobs,
            }}
        >
            {children}
        </jobContext.Provider>
    );
};

export default JobProvider;
