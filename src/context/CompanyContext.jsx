import { createContext, useContext, useState, useEffect } from 'react';
import { authContext } from './AuthContext';
const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useContext(authContext);
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated() || !currentUser) {
        return;
      }
      setIsLoading(true);
      try {
        const [profileRes, jobsRes] = await Promise.all([
          fetch(`${baseUrl}/company/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${baseUrl}/company/jobs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        if (!profileRes.ok || !jobsRes.ok) {
          throw new Error('Network response was not ok');
        }
        const profileData = await profileRes.json();
        const jobsData = await jobsRes.json();
        setProfile(profileData);
        setJobs(jobsData);
        console.log(jobsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [isAuthenticated, baseUrl]);

  const updateProfile = async (data) => {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/company/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      const result = await response.json();
      setProfile(result.profile);
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (id, data) => {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated');
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/company/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update job');
      }
      const result = await response.json();
      setJobs(jobs.map(job => (job._id === id ? result.job : job)));
      return result;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    jobs,
    setJobs,
    profile,
    updateProfile,
    updateJob,
    isLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};


export default DashboardContext;