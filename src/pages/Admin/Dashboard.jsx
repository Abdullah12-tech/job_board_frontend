import { useContext, useEffect } from 'react';
import { FaUsers, FaUserTie, FaUserGraduate, FaBriefcase, FaFileAlt } from 'react-icons/fa';
import { AdminContext } from '../../context/AdminContext';
import StatCard from '../../components/Admin/StatsCard';
import RecentJobs from '../../components/Admin/RecentJobs';
import RecentUsers from '../../components/Admin/RecentUsers';

const DashboardPage = () => {
  const { stats, loading, error, fetchDashboardStats } = useContext(AdminContext);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats?.usersCount || 0} 
          icon={<FaUsers className="text-blue-500" />} 
          color="bg-blue-100" 
        />
        <StatCard 
          title="Employers" 
          value={stats?.employersCount || 0} 
          icon={<FaUserTie className="text-green-500" />} 
          color="bg-green-100" 
        />
        <StatCard 
          title="Candidates" 
          value={stats?.candidatesCount || 0} 
          icon={<FaUserGraduate className="text-purple-500" />} 
          color="bg-purple-100" 
        />
        <StatCard 
          title="Total Jobs" 
          value={stats?.jobsCount || 0} 
          icon={<FaBriefcase className="text-yellow-500" />} 
          color="bg-yellow-100" 
        />
        <StatCard 
          title="Active Jobs" 
          value={stats?.activeJobsCount || 0} 
          icon={<FaBriefcase className="text-indigo-500" />} 
          color="bg-indigo-100" 
        />
        <StatCard 
          title="Applications" 
          value={stats?.applicationsCount || 0} 
          icon={<FaFileAlt className="text-red-500" />} 
          color="bg-red-100" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentJobs />
        <RecentUsers />
      </div>
    </div>
  );
};

export default DashboardPage;