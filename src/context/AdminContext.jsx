import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // Fetch dashboard statistics
  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch dashboard stats");
      }

      const data = await res.json();
      setStats(data);
      return data;
    } catch (error) {
      console.error("Fetch stats error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Fetch all users
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
      return data;
    } catch (error) {
      console.error("Fetch users error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Fetch user by ID
  const fetchUserById = useCallback(async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch user");
      }

      const data = await res.json();
      setSelectedUser(data);
      return data;
    } catch (error) {
      console.error("Fetch user error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Update user
  const updateUser = useCallback(async (userId, userData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const data = await res.json();
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === data._id ? data : user
        )
      );
      
      if (selectedUser?._id === data._id) {
        setSelectedUser(data);
      }

      toast.success("User updated successfully");
      return data;
    } catch (error) {
      console.error("Update user error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, selectedUser]);

  // Delete user
  const deleteUser = useCallback(async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      // Update local state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
      }

      toast.success("User deleted successfully");
      return true;
    } catch (error) {
      console.error("Delete user error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, selectedUser]);

  // Fetch all jobs
  const fetchAllJobs = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch jobs");
      }

      const data = await res.json();
      setJobs(data);
      return data;
    } catch (error) {
      console.error("Fetch jobs error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Fetch job by ID
  const fetchJobById = useCallback(async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch job");
      }

      const data = await res.json();
      setSelectedJob(data);
      return data;
    } catch (error) {
      console.error("Fetch job error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Update job
  const updateJob = useCallback(async (jobId, jobData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update job");
      }

      const data = await res.json();
      
      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === data._id ? data : job
        )
      );
      
      if (selectedJob?._id === data._id) {
        setSelectedJob(data);
      }

      toast.success("Job updated successfully");
      return data;
    } catch (error) {
      console.error("Update job error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, selectedJob]);

  // Delete job
  const deleteJob = useCallback(async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}/admin/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete job");
      }

      // Update local state
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      
      if (selectedJob?._id === jobId) {
        setSelectedJob(null);
      }

      toast.success("Job deleted successfully");
      return true;
    } catch (error) {
      console.error("Delete job error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, selectedJob]);

  // Clear errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value = {
    stats,
    users,
    jobs,
    selectedUser,
    selectedJob,
    loading,
    error,
    fetchDashboardStats,
    fetchAllUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    fetchAllJobs,
    fetchJobById,
    updateJob,
    deleteJob,
    setSelectedUser,
    setSelectedJob,
    clearError,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;