// AdminContext.js
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

const AdminProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  // Common fetch function
  const fetchData = async (url, options = {}) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch(`${baseUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Request failed");
      }

      return await res.json();
    } catch (error) {
      console.error("Request error:", error);
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    const data = await fetchData('/admin/dashboard/stats');
    setStats(data);
    return data;
  }, []);

  // Users
  const fetchAllUsers = useCallback(async () => {
    const data = await fetchData('/admin/users');
    setUsers(data);
    return data;
  }, []);

  const fetchUserById = useCallback(async (userId) => {
    const data = await fetchData(`/admin/users/${userId}`);
    setSelectedUser(data);
    return data;
  }, []);

  const updateUser = useCallback(async (userId, userData) => {
    const data = await fetchData(`/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData)
    });
    
    setUsers(prev => prev.map(u => u._id === data._id ? data : u));
    if (selectedUser?._id === data._id) setSelectedUser(data);
    toast.success("User updated successfully");
    return data;
  }, [selectedUser]);

  const deleteUser = useCallback(async (userId) => {
    await fetchData(`/admin/users/${userId}`, { method: "DELETE" });
    setUsers(prev => prev.filter(u => u._id !== userId));
    if (selectedUser?._id === userId) setSelectedUser(null);
    toast.success("User deleted successfully");
  }, [selectedUser]);

  // Jobs
  const fetchAllJobs = useCallback(async () => {
    const data = await fetchData('/admin/jobs');
    setJobs(data);
    return data;
  }, []);

  const fetchJobById = useCallback(async (jobId) => {
    const data = await fetchData(`/admin/jobs/${jobId}`);
    setSelectedJob(data);
    return data;
  }, []);

  const updateJob = useCallback(async (jobId, jobData) => {
    const data = await fetchData(`/admin/jobs/${jobId}`, {
      method: "PUT",
      body: JSON.stringify(jobData)
    });
    
    setJobs(prev => prev.map(j => j._id === data._id ? data : j));
    if (selectedJob?._id === data._id) setSelectedJob(data);
    toast.success("Job updated successfully");
    return data;
  }, [selectedJob]);

  const deleteJob = useCallback(async (jobId) => {
    await fetchData(`/admin/jobs/${jobId}`, { method: "DELETE" });
    setJobs(prev => prev.filter(j => j._id !== jobId));
    if (selectedJob?._id === jobId) setSelectedJob(null);
    toast.success("Job deleted successfully");
  }, [selectedJob]);

  // Companies
  const fetchAllCompanies = useCallback(async () => {
    const data = await fetchData('/admin/companies');
    setCompanies(data);
    return data;
  }, []);

  const fetchCompanyById = useCallback(async (companyId) => {
    const data = await fetchData(`/admin/companies/${companyId}`);
    setSelectedCompany(data);
    return data;
  }, []);

  const approveCompany = useCallback(async (companyId) => {
    const data = await fetchData(`/admin/companies/${companyId}/approve`, { method: "PUT" });
    setCompanies(prev => prev.map(c => c._id === data._id ? data : c));
    if (selectedCompany?._id === data._id) setSelectedCompany(data);
    toast.success("Company approved successfully");
    return data;
  }, [selectedCompany]);

  const rejectCompany = useCallback(async (companyId) => {
    await fetchData(`/admin/companies/${companyId}/reject`, { method: "PUT" });
    setCompanies(prev => prev.filter(c => c._id !== companyId));
    if (selectedCompany?._id === companyId) setSelectedCompany(null);
    toast.success("Company rejected successfully");
  }, [selectedCompany]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    stats,
    users,
    jobs,
    companies,
    selectedUser,
    selectedJob,
    selectedCompany,
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
    fetchAllCompanies,
    fetchCompanyById,
    approveCompany,
    rejectCompany,
    setSelectedUser,
    setSelectedJob,
    setSelectedCompany,
    clearError,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;