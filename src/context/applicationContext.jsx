// src/context/applicationContext.jsx
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const applicationContext = createContext();

const ApplicationProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    // Apply for job (send form data)
    const token = localStorage.getItem("accessToken")
    const applyJob = async (formData,jobID) => {
        try {
            const res = await fetch(`${baseUrl}/applications/${jobID}`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            toast.success("Application successfully sent")
            navigate("/dashboard/candidate"); // or "/application-success"
        } catch (err) {
            console.error("Apply job error:", err);
            toast.warning(err.message)
        }
    };

    const fetchUserApplications = async () => {
    try {
      const res = await fetch(`${baseUrl}/applications`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await res.json();
      setApplications(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

    return (
        <applicationContext.Provider value={{ applyJob, fetchUserApplications, applications }}>
            {children}
        </applicationContext.Provider>
    );
};

export default ApplicationProvider;
